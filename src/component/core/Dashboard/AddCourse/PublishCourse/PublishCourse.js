import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../../common/IconBtn"
import {COURSE_STATUS} from "../../../../../utils/constants"
import { useUpdateCourseStatus } from '../../../../../hooks/useCourses'
import {setStep , resetCourseState} from "../../../../../slices/courseSlice"
import { useNavigate } from 'react-router'
import { BiLeftArrow } from 'react-icons/bi'

function PublishCourse() {
  
    const {register,getValues,setValue,handleSubmit} = useForm()
    const {course } = useSelector((state)=>state.course);
    const dispatch =useDispatch();
    const navigate =useNavigate()
    const { updateCourseStatus, isLoading } = useUpdateCourseStatus();

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        } else if (course?.status === COURSE_STATUS.DRAFT) {
            setValue("public", false);
        }
    }, [course, setValue]);

    const gotToCourses = ()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = () =>{
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true) ||  (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)){
                gotToCourses();
                return;
        }
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT; 
        updateCourseStatus({ courseId: course._id, status: courseStatus }, {
            onSuccess: () => {
                gotToCourses();
            }
        });
    }

    const onSubmit = () =>{
        handleCoursePublish()
    }
    const goBack = () =>{
        dispatch(setStep(2))
    }

    return (
    <div className='rounded-lg border bg-richblack-800 p-6 border-richblack-700'>
        <form onSubmit={handleSubmit(onSubmit)} className='md:flex-none flex flex-col gap-4'>
            <div>
                <label htmlFor='public'>
                <input 
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='rounded h-4 w-4 '
                />
                <span className='ml-3 text-richblack-25 text-lg ' >Make this Course as Public</span>
                </label>
            </div>
            <div className='flex justify-end gap-x-3 '> 

                <button text="Back" 
                  className='flex flex-row-reverse items-center w-fit ransition-all hover:scale-95 hover:shadow-none duration-200 shadow-custom justify-center gap-1 py-2 px-4 bg-yellow-50 rounded-lg text-black'
                  onClick={goBack}>
                    <p className="font-semibold ">Back</p>
                    <BiLeftArrow className="font-bold "/>
                </button>

                <IconBtn disabled={isLoading} text="Save Changes"/>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse