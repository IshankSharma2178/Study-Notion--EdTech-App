import React,{useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { MdEdit } from 'react-icons/md' 
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import { useDeleteSection, useDeleteSubSection } from '../../../../../hooks/useCourses'
import {setCourse} from "../../../../../slices/courseSlice"
import { GoDotFill } from "react-icons/go";
import { IoOptionsOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoEye } from "react-icons/go";

function NestedView({handleChnagedSectionName}) {

    const {course} = useSelector((state)=>state.course)
    const dispatch = useDispatch();
    const { deleteSection } = useDeleteSection();
    const { deleteSubSection } = useDeleteSubSection();

    const [addSubSection,setAddSubSection] = useState(null)
    const [viewSubSection,setViewSubSection] = useState(null)
    const [editSubSection,setEditSubSection] = useState(null)
    const [Confirmation,setConfirmation] = useState(null)

    const handleDeleteSection = (sectionId) =>{
        deleteSection({
            sectionId,
            courseId:course._id,
        }, {
            onSuccess: (result) => {
                dispatch(setCourse(result))
                setConfirmation(null)
            }
        });
    }

    useEffect(()=>{
    },[course])

    const handleDeleteSubSection= (subSectionId,sectionId) =>{ 
        deleteSubSection({
            subSectionId,
            sectionId,
            courseId: course._id,
        }, {
            onSuccess: (result) => {
                const updatedCourseContent = course?.courseContent?.map((section)=>section._id===sectionId ? result : section)
                const updatedCourse = {...course, courseContent: updatedCourseContent}
                dispatch(setCourse(updatedCourse))
                setConfirmation(null)
            }
        });
    }
  return (
    <div>
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {course?.courseContent?.map((section) =>(
                <details key={section._id} open >
                    <summary  className="flex cursor-pointer items-center  justify-between border-b-2 border-b-richblack-400 py-2">
                        <div className="flex items-center gap-x-3   ">
                            <IoOptionsOutline  className="text-xl "/>
                            <p  className="font-semibold text-richblack-50">{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <button
                                onClick={()=>handleChnagedSectionName(section._id,section.sectionName)}
                            >
                                <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button
                                onClick={()=>setConfirmation({
                                    text1: "Delete this Section?",
                                    text2: "All the lectures in this section will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmation(null),      
                                })}
                            >
                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                            <span className="font-medium text-richblack-300">|</span>
                            <div className='text-2xl  '>
                                <IoMdArrowDropdown    />
                            </div>
                        </div>
                    </summary>
                    <div className='w-[95%] m-auto cursor-pointer'>
                        {
                            section?.subSection?.map((data)=>{
                                return <div key={data?._id} onClick={()=>setViewSubSection(data)}
                                    className='flex items-center m-2 pb-2 px-4 justify-between gap-x-3 mt-4  border-b-richblack-600 border-b-2'
                                >
                                <div className='flex flex-row gap-x-3 items-center'>
                                    <GoDotFill className='text-richblack-50'/>
                                    <p  className="font-semibold text-richblack-50">{data.title }</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                     <GoEye className="text-xl text-richblack-300"/>
                                     <div onClick={(e)=>e.stopPropagation()}>
                                        <button
                                            onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                        >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>
                                        <button
                                            onClick={()=>setConfirmation({
                                                text1: "Delete this Sub-Section?",
                                                text2: "Selected Lecture will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                btn2Handler: () => setConfirmation(null),      
                                            })}
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                     </div>
                                    
                                </div>
                                </div>
                            })
                        }
                        <button
                            onClick={()=>setAddSubSection(section._id)}
                            className="mt-3 flex items-center gap-x-1 border border-dashed border-yellow-25 p-2 rounded-lg text-yellow-50">
                            <AiOutlinePlus/>
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}
        </div>

        {addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>):
        viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>):
        editSubSection ?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>):
        <div></div>}

        {Confirmation && <ConfirmationModal modalData={Confirmation}/>}
    </div>
  )
}

export default NestedView