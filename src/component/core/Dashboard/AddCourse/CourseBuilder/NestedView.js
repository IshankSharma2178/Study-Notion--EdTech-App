import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md' 
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiSolidDownArrow } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import { deleteSection ,deleteSubSection} from '../../../../../services/operations/courseDetailAPI'
import {setCourse} from "../../../../../slices/courseSlice"

function NestedView({handleChnagedSectionName}) {

    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=>state.course)
    const dispatch = useDispatch();

    const [addSubSection,setAddSubSection] = useState(null)
    const [viewSubSection,setViewSubSection] = useState(null)
    const [editSubSection,setEditSubSection] = useState(null)
    const [Confirmation,setConfirmation] = useState(null)

    const handleDeleteSection = async(sectionId) =>{
        const result = await deleteSection({
            sectionId,
            courseId:course._id,
        },token)
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmation(null)
    }

    const handleDeleteSubSection= async(subSectionId,sectionId) =>{ 
        console.log("\\",token)
        const result =await deleteSubSection({subSectionId,sectionId},token)
        if(result){
            dispatchEvent(setCourse(result))
        }
        setConfirmation(null)
    }
  return (
    <div>
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {course?.courseContent?.map((section) =>(
                <details key={section._id} open>
                    <summary  className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                        <div className="flex items-center gap-x-3">
                            <RxDropdownMenu  className="text-2xl text-richblack-50"/>
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
                            <button>
                                <BiSolidDownArrow className='text '/>
                            </button>

                        </div>
                    </summary>
                    <div>
                        {
                            section?.subSection.map((data)=>{
                                <div key={data?._id} 
                                    onClick={()=>setViewSubSection(data)}
                                    className='flex items-center justify-center gap-x-3 border-b-2'
                                >
                                <div className='flex flex-row gap-x-3 items-center'>
                                    <RxDropdownMenu/>
                                    <p  className="font-semibold text-richblack-50">{data.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
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
                            })
                        }
                        <button
                            onClick={()=>setAddSubSection(section._id)}
                            className="mt-3 flex items-center gap-x-1 text-yellow-50">
                            <AiOutlinePlus/>
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}
        </div>

        {addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>):
        viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>):
        editSubSection ?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} editt={true}/>):
        <div></div>}

        {Confirmation && <ConfirmationModal modalData={Confirmation}/>}
    </div>
  )
}

export default NestedView