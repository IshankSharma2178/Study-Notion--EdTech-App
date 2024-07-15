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


    const logFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log("==> ", categories);
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseBenefits", course.whatWillYouLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructor);
        }
        getCategories();
    }, [editCourse, course, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (
            currentValues.courseTitle !== course?.courseName ||
            currentValues.courseShortDescription !== course?.courseDescription ||
            currentValues.coursePrice !== course?.price ||
            currentValues.courseBenefits !== course?.whatWillYouLearn ||
            currentValues.courseCategory !== course?.category._id ||
            currentValues.courseRequirements.toString() !== course.instructor.toString()
        );
    };

    const onSubmit = async (data) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDescription !== course.courseDescription) {
                    formData.append("description", data.courseShortDescription);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags && currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatWillYouLearn) {
                    formData.append("whatWillYouLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseRequirements.toString() !== course.instructor.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage && currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage[0]);
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form");
            }
            return;
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDescription);
        formData.append("price", data.coursePrice);
        // formData.append("tags", JSON.stringify(data.courseTags || []));
        formData.append("whatWillYouLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements || []));
        if (data.courseImage && data.courseImage[0]) {
            formData.append("thumbnailImage", data.courseImage[0]);
        }
        logFormData(formData); 
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        setLoading(false);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border border-richblack-700 text-black  bg-richblack-800 p-6 space-y-8'>
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

            <div className='relative text-richblack-25 flex flex-col gap-2  '>
                <label htmlFor='coursePrice' className='tracking-wider text-[14px]'>Course Price <sup className='text-pink-200 '>*</sup></label>
                <input 
                    id="coursePrice"
                    placeholder=' Enter Course Price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base pl-10   bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'
                />
                <HiOutlineCurrencyRupee className='absolute text-richblack-300 bottom-8 -translate-y-[24%]  text-2xl z-10 mx-2' />
                {errors.coursePrice && <div className='text-pink-200 text-[12px]'>Course Price is Required</div>}
            </div>

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
            
            <ChipInput
                name={"tag"}
                placeholder={"Enter tags"}
                label={"Tags"}
                errors={errors}
                register={register}
                setValue={setValue}
                />

            <FileUpload 
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />


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

            <RequirementField 
                name="courseRequirements"
                label="Requirements / Instructor"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            
            <div  className='text-end '>
                {editCourse && (
                    <button onClick={() => dispatch(setStep(2))} className='flex items-center gap-x-2 bg-richblack-300'>
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
