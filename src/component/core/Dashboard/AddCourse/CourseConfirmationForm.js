import { fetchCourseCategories } from '../../../../services/operations/courseDetailAPI';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import RequirementField from "./RequirementField";
import IconBtn from "../../../common/IconBtn";
import { setCourse, setStep } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { editCourseDetails, addCourseDetails } from "../../../../services/operations/courseDetailAPI";
import { COURSE_STATUS } from '../../../../utils/constants';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import FileUpload from "../../../common/FileUpload"
import ChipInput from './ChipInput';

function CourseConfirmationForm() {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState();




    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log("==> ", editCourse);
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.Category?.name);
            setValue("courseRequirements", course.instructor);
            setValue("tag", course.tag);
            setValue("courseImage", course.thumbnail);
        }
        getCategories();
    }, [editCourse, course, setValue,]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        console.log("course :: " , course);
        console.log("currentValues :: " , currentValues);
        
        const isTagsUpdated = arraysEqual(currentValues.tag, course.tag)
        console.log("tags :: " , isTagsUpdated);
        if(isTagsUpdated) return true;
            if(currentValues.courseTitle !== course?.courseName ||
                currentValues.courseShortDescription !== course?.courseDescription ||
                currentValues.coursePrice !== course?.price ||
                currentValues.courseBenefits !== course?.whatYouWillLearn ||  
                currentValues.courseCategory !== course?.Category.name ||
                arraysEqual(currentValues.tag, course.tag) ||
                arraysEqual(currentValues.courseRequirements !== course.instructions)
            ) {
                    return true;
                       
                }
                return false;
    };

    const arraysEqual = (a, b) => {
        for (var i = 0; i < a.length; ++i) {
            console.log(a[i] , "0000" , b[i]);
            if (a[i] !== b[i]) return true;
        }
        return false;
    }

    const onSubmit = async (data) => {
        console.log(isFormUpdated())
        console.log("updated true")
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDescription);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags && currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatWillYouLearn) {
                    formData.append("whatWillYouLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory !== course.Category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseRequirements !== course.instructor) {
                    formData.append("instructions", (data.courseRequirements));
                }
                if (currentValues.courseImage && currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnail", data.courseImage[0]);
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                console.log("resu : ",result);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form");
                dispatch(setStep(2));
            }
            return;
        }
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDescription);
        formData.append("price", data.coursePrice);
        formData.append("tag", (data.tag || []));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage",data.courseImage)
        formData.append("instructions", (data.courseRequirements || []));
        if (data.courseImage && data.courseImage[0]) {
            formData.append("thumbnailImage", data.courseImage[0]);
        }
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        console.log("result",result);
        console.log("two");
        setLoading(false);
        if (result) {
            console.log("three");
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border border-richblack-700 text-black  bg-richblack-800 p-6 space-y-8'>

        {/* Course title Input Field */}
            <div className='text-richblack-25 flex flex-col gap-2  '>
                <label htmlFor='courseTitle' className='tracking-wider text-[14px]'>Course Title <sup className='text-pink-200 '>*</sup></label>
                <input 
                    id="courseTitle"
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                    className="w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25"
                />
                {errors.courseTitle && <div className='text-pink-200 text-[12px]'>Course Title is Required</div>}
            </div>

        {/* Course Description INput Field */}
            <div  className='text-richblack-25 flex flex-col gap-2  ' >
                <label htmlFor='courseShortDescription' className='tracking-wider text-[14px]'>Course Short Description <sup className='text-pink-200'>*</sup></label>
                <textarea 
                    id="courseShortDescription"
                    placeholder='Enter Course Description'
                    {...register("courseShortDescription", { required: true })}
                    className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base  bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25 min-h-[140px]'
                />
                {errors.courseShortDescription && <span className='text-pink-200 text-[12px]'>Course Description is required</span>}
            </div>

        {/* Price Input Field */}
            <div className='relative text-richblack-25 flex flex-col gap-2  '>
                <label htmlFor='coursePrice' className='tracking-wider text-[14px]'>Course Price <sup className='text-pink-200 '>*</sup></label>
                <input 
                    id="coursePrice"
                    placeholder=' Enter Course Price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base pl-10   bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'
                />
                <HiOutlineCurrencyRupee className='absolute text-richblack-300 bottom-3 -translate-y-[2%]  text-2xl z-10 mx-2' />
            </div>
                {errors.coursePrice && <div className=' text-pink-200 -translate-y-6  text-[12px]'>Course Price is Required</div>}

        {/* Course Category Input Field */}
            <div className='text-richblack-25 flex flex-col gap-2  '>
                <label htmlFor='courseCategory' className='tracking-wider text-[14px]'>Course Category <sup className='text-pink-200'>*</sup></label>
                <select
                    id='courseCategory'
                    defaultValue=""
                    className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base   bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'
                    {...register("courseCategory", { required: true })}
                >
                    <option value="" disabled>Choose Category</option>
                    {!loading && courseCategories?.map((category, index) => (
                        <option key={index} value={category?._id}
                        className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base   bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'

                        >
                            {category?.name}
                        </option>
                    ))}
                </select>
                {errors.courseCategory && <div className='text-pink-200 text-[12px]'>Course Category is Required</div>}
            </div>

        {/*Tags Input Field  */}
            <ChipInput
                name={"tag"}

                placeholder={"Enter tags"}
                label={"Tags"}
                errors={errors}
                register={register}
                setValue={setValue}
                />

        {/* Image Upload Field */}
            <FileUpload 
                name="courseImage"
                id="thumbnail"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                image={true}
                editData={editCourse ? course?.thumbnail : null}
            />

        {/* Course Benefit Input Field */}
            <div className='text-richblack-25 flex flex-col gap-2  '>
                <label htmlFor='courseBenefits' className='tracking-wider text-[14px]'>Benefits of the Course <sup className='text-pink-200'>*</sup></label>
                <textarea 
                    id='courseBenefits'
                    placeholder='Enter Benefits of the Course'
                    {...register("courseBenefits", { required: true })}
                    className='min-h-[130px] w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base  bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'
                />
                {errors.courseBenefits && <div className='text-pink-200 text-[12px]'>Benefits of the Course Required</div>}
            </div>

        {/* Requiremnt Input Field */}
            <RequirementField 
                name="courseRequirements"
                label="Requirements / Instructor"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            
        {/* Buttons */}
            <div  className='text-end md:flex gap-3 flex-col-reverse flex md:flex-row flex-col md:flex-row justify-between items-center'>
                {editCourse && (
                    <button onClick={() => dispatch(setStep(2))} className='flex text-richblack-800 items-center gap-x-2 px-2 py-2 font-semibold hover:scale-95 transition-all duration-200  rounded-lg bg-richblack-200'>
                        Continue Without Saving
                    </button>
                )}
                <IconBtn 
                    type="submit"
                    text={!editCourse ? "Next" : "Save Changes"}
                >
                <MdOutlineKeyboardArrowRight />
                </IconBtn>
            </div>
        </form>
    );
}

export default CourseConfirmationForm;
