import IconBtn from '../../../../common/IconBtn';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setEditCourse , setStep ,setCourse} from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import {updateSection ,createSection} from "../../../../../services/operations/courseDetailAPI"
import NestedView from './NestedView';

function CourseBuilderForm() {

  const {register ,handleSubmit,setValue,formState:{errors}}=useForm();
  const [editSectionName , setEditSectionName] = useState(null);
  const [loading,setLoading]= useState(false )
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const cancelEdit =() => {
    setEditSectionName(null);
    setValue("sectionName",null);
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }
  
  const onSubmit = async(data) => {
     setLoading(true);
     let result;
     if(editSectionName){
      result =await updateSection (
        {
          sectionName: data.sectionName,
          sectionId :editSectionName,
          courseId : course._id,
        },token
      )
     }else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId : course._id,
      },token)
     }
     console.log("result / ",result)
     if(result){
       dispatch(setCourse(result));
       setEditSectionName(null)
       setValue("sectionName", "")
      }
      setLoading(false);
  }

  const handleChnagedSectionName = (sectionName,sectionId) =>{
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one course");
      return 
    }
    if(course.courseContent.some((section)=>section.subsection.length === 0) ){
      toast.error("Please add atleast one sub-section");
      return
    }
    dispatch(setStep(3))
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor='sectionName'  className="text-sm text-richblack-5">Section Name <sup className='text-pink-200 '>*</sup></label>
            <input 
              id='sectionName'
              placeholder='Enter section name'
              {...register("sectionName",{required:true})}
              className="w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25"
            />
            {
              errors.sectionName && (
                <span  className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
              )
            }
          </div>

          <div className='flex sm:flex-row flex-col gap-4 mt-4 items-center'>
            <button
              type="submit"
              className='flex flex-row gap-2 justify-center items-center border-yellow-25 border p-2  rounded-lg font-bold px-4 text-yellow-25'>
              { editSectionName ?( <div >Edit Section Name</div>) :(<div>Create Section</div> ) }
              <IoAddCircleOutline className='text-xl' />
            </button>

            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {course.courseContent.length > 0 && (
          <NestedView handleChnagedSectionName={handleChnagedSectionName} />
        )}

        {/* next and back buttons */}
        <div>
          <button 
            onClick={goBack}
            className='rounded-md cursor-pointer flex items-center'> 
              Back
          </button>
          <IconBtn text="Next" onClick={goToNext}>
              <BiRightArrow />
          </IconBtn>

        </div>
    </div>
  )
}

export default CourseBuilderForm