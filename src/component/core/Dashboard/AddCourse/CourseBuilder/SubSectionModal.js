import { createSubSection ,updateSubSection} from '../../../../../services/operations/courseDetailAPI';
import React, { useState ,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch ,useSelector } from 'react-redux';
import {setCourse} from "../../../../../slices/courseSlice"
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import IconBtn from "../../../../common/IconBtn"
import FileUpload from "../../../../common/FileUpload"

function SubSectionModal({modalData,setModalData,add=false,view=false,edit=false,}) {

    const {register,setValue,getValues,formState:errors,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=>state.course)
    console.log(";;;;;;;;;;;;`",modalData)
    
    useEffect(()=>{
        if(view || edit){
            console.log(" dsd")
            setValue("lectureTitle",modalData.title);
            setValue("lectureDescription",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);            
        }
    },[]);

    const isFormUpdated=() =>{
        const currentValues=getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl){
                return true;
            }else{
                return false;
            }
        }

        const handleEditSubSection = async()=>{
            const currentValues = getValues();
            console.log("Current values , ",currentValues);
            const formData =new FormData();
            formData.append("sectionId",modalData.sectionId);
            formData.append("subSectionId",modalData._id);
             
            if(currentValues.lectureTitle !== modalData.title){
                formData.append("title",currentValues.lectureTitle);
            }
            if(currentValues.lectureDescription !== modalData.description){
                formData.append("description",currentValues.lectureDescription);
            }
            if(currentValues.lectureVideo !== modalData.videoUrl){
                formData.append("video",currentValues.lectureVideo); 
                formData.append("timeDuration",currentValues.timeDuration);
            }
            setLoading(true);
            const result = await updateSubSection(formData,token);
            if(result){
                console.log("llan",result);
                const updatedCourseContent = course.courseContent.map((section) =>section._id === modalData.sectionId ? result : section)
                const updatedCourse = { ...course, courseContent: updatedCourseContent }
                dispatch(setCourse(updatedCourse))
            }
            setModalData(null);
            setLoading(false);
        }

        const onSubmit = async(data) => {
            if(view){
                return
            }
            if(edit){
                if(!isFormUpdated){
                    toast.error("No changes made to the form");
                }
                else{
                    handleEditSubSection();
                }
                return
            }
            const formData = new FormData();
            formData.append("courseId", course._id);
            formData.append("sectionId",modalData);
            formData.append("title",data.lectureTitle);
            formData.append("description",data.lectureDescription);
            formData.append("video",data.lectureVideo);
            formData.append("timeDuration",data.timeDuration);
            setLoading(true);
            const result = await createSubSection(formData,token);
            console.log("two ");
            if(result){
                console.log("three ");
                dispatch(setCourse(result));
            }
            setModalData(null)
                setLoading(false);
        }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
            <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p> 
                    <button 
                        onClick={()=>(!loading ? setModalData(null):{})}
                    > 
                        <RxCross1 className="text-2xl text-richblack-5" />
                    </button>
            </div>
            <form  className="space-y-8 px-8 py-10"
                onSubmit={handleSubmit(onSubmit)}
             >
                <FileUpload 
                    name="lectureVideo"
                    id="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    video={true}
                    errors={errors}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />
                <div>

                {/* Lecture Title Field */}
                <label className="text-sm text-richblack-5" htmlFor="lectureTitle">Lecture Title {!view && <sup className="text-pink-200">*</sup>}</label>
                    <input 
                        id='lectureTitle'
                        placeholder="Enter Lecture Title"
                        {...register("lectureTitle",{required:true})}
                        className="w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25"
                    />
                    {
                        errors.lectureTitle && (<span>
                            Lecture Title is required
                        </span>)
                    }
                </div>
                <div>

                {/* lecture Description Field*/}

                <label className="text-sm text-richblack-5" htmlFor="lectureDesc">Lecture Description{" "}{!view && <sup className="text-pink-200">*</sup>}</label>
                    <textarea 
                        id='lectureDescription'
                        placeholder="Enter Lecture Description"
                        {...register("lectureDescription",{required:true})}
                          className=" rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25 resize-x-none min-h-[130px] w-full"
                    />
                    {
                        errors.lectureDescription && ( <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture Description is required
                        </span>)
                    }
                </div>
                {
                    !view && (
                        <div className="flex justify-end">
                            <IconBtn 
                                text={loading ? "Loading..." : edit ?"Save Changes" : "Save"}  />
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal