import { fetchCourseCategories } from '../../../../services/operations/courseDetailAPI';
import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux'
import RequirementField from "./RequirementField"
import IconBtn from "../../../common/IconBtn"
import {setCourse ,setStep} from "../../../../slices/courseSlice"
import toast from "react-hot-toast"
import {editCourseDetails , addCourseDetails} from "../../../../services/operations/courseDetailAPI" 
import { COURSE_STATUS } from '../../../../utils/constants';

function CourseConfirmationForm() {

    const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm()
    const dispatch = useDispatch();
    const {token}=useSelector((state)=>state.auth)
    const {course , editCourse} = useSelector((state)=>state.course);
    const [loading,setLoading] =useState(false);
    const [courseCategories,setCourseCategories] = useState();

    useEffect(()=>{
        const getCategories = async()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log("==> ",categories)
            if(categories.length>0){
                setCourseCategories(categories)
            }
            setLoading(false);
        }
        if(editCourse){
            setValue("courseTitle" , course.courseName)
            setValue("courseTitle" , course.courseDescription)
            setValue("courseTitle" , course.price)
            setValue("courseTitle" , course.whatYouWillLearn)
            setValue("courseTitle" , course.Category)
            setValue("courseTitle" , course.courseName)
            setValue("courseTitle" , course.instructor)
            setValue("courseTitle" , course.thumbnail)
        }
        getCategories()
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course?.courseName ||
            currentValues.courseShortDescription !== course?.courseDescription ||
            currentValues.coursePrice !== course?.price ||
            // currentValues.courseTags.toString() !== course.tags.toString() ||
            currentValues.courseBenefits !== course?.whatWillYouLearn ||
            currentValues.courseCategory._id !== course?.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructior.toString() 
            // || currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }
    
    const onSubmit = async (data)=> {
        if(editCourse){
            console.log("Form Data is", data)
            if(isFormUpdated()){
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("description", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tags.toString()) {
                formData.append("tags", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatWillYouLearn) {
                formData.append("whatWillYouLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
                }
                if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
                ) {
                formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
                }
                // console.log("Edit Form data: ", formData)
                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if (result) {
                dispatch(setStep(2))
                dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return
        }
        console.log("hello")
        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDescription)
        formData.append("price", data.coursePrice)
        formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("whatWillYouLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        setLoading(true);
        console.log("///",formData);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result))
        }
        setLoading(false)

    }

    return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 text-black bg-richblack-800 p-6 space-y-8'
    >
        <div>
            <label htmlFor='courseTitle'>Course Title <sup className='text-pink-200 '>*</sup></label>
            <input 
                id="courseTitle"
                placeholder='Enter Course Title'
                {...register("courseTitle",{required:true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <div>Course Title is Required</div>
                )
            }
        </div>

        <div>
            <label htmlFor='courseShortDescription'>Course Short Description <sup className='text-pink-200'>*</sup></label>
            <textarea 
                id="courseShortDescription"
                placeholder='Enter Course Description'
                {...register("courseShortDescription",{required:true})}
                className='w-full min-h-[140px]'
            />
            {
                errors.courseShortDescription && (<spna>
                    Course Description is required
                </spna>)
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price <sup className='text-pink-200 '>*</sup></label>
            <input 
                id="coursePrice"
                placeholder='Enter Course Price'
                {...register("coursePrice",{required:true , valueAsNumber:true })}
                className='w-full'
            />
            <HiOutlineCurrencyRupee className='absolute text-richblack-600 bottom-1 z-10' />
            {
                errors.coursePrice && (
                    <div>Course Price is Required</div>
                )
            }

        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category <sup className='text-pink-200'>*</sup></label>
            <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory",{required:true })}
            >
                <option value="" disabled>Choose Category</option>
                    {
                        !loading && courseCategories?.map((category,index) =>(
                            <option key={index} value={category?.id}>
                                {category?.name}
                            </option>
                        ))
                    }
            </select>
            {
                errors.courseCategory && (
                    <div>Course Category is Required</div>
                )
            }
        </div>

        {/* tags field */}
            {/* image upload component */}

        <div>
            <label htmlFor='courseBenefits'>Benefits of the Course <sup className='text-pink-200'>*</sup></label>
            <textarea 
                id='courseBenefits'
                placeholder='Enter Benedits of the Course'
                {...register("courseBenefits",{required:true})}
                className='min-h-[130px] w-full'
            />
            {
                errors.courseCategory && (
                    <div>Benefits of the Course Required</div>
                )
            }
        </div>

        <RequirementField 
            name="courseRequirements"
            label="Requirements/Instructior"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div>
            {
                editCourse &&(
                <button
                    onClick={()=> dispatch(setStep(2))}
                   
                    className='flex items-center gap-x-2 bg-richblack-300'
                >Continue Without Saving</button>
                )
            }

            <IconBtn 
                type="submit"
                text={!editCourse ? "Next" : "Save Changes"}
            />
        </div>
    </form>
  )
}

export default CourseConfirmationForm