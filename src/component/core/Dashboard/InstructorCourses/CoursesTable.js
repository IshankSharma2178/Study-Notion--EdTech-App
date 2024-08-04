import React, { useEffect ,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteCourse, getInstructorCourses} from "../../../../services/operations/courseDetailAPI"
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {setEntireCourseData} from "../../../../slices/viewCourseSlice"
import { useNavigate } from 'react-router';
import ConfirmationModal from "../../../common/ConfirmationModal"

function CoursesTable() {
    
    const {token}= useSelector((state)=>state.auth)
    const dispatch =useDispatch()
    const navigate = useNavigate() 
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    const [loading , setLoading] =useState(false);
    const [dltModal , setDltModal] = useState(null);
    const handleOnSubmit = ()=>{
        dispatch(getInstructorCourses(token))
    }
    
    const formatDateTime = (dateTimeString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    };

    function calculateTotalDuration(data) {
      let totalDurationSeconds = 0;
      let hours = null;
      let minutes = null;
      let seconds = null;
      let time = null;
  
      data.forEach((ele) => {
          if (ele.subSection) {
              ele.subSection.forEach((e) => {
                  if (e.timeDuration) {
                      const timelength = e.timeDuration.split(':');
                      if (timelength.length === 2) {
                          [minutes, seconds] = timelength.map(Number);
                          totalDurationSeconds += minutes * 60 + seconds;
                      } else if (timelength.length === 1) {
                          [seconds] = timelength;
                          totalDurationSeconds += seconds;
                      } else {
                          [hours, minutes, seconds] = timelength.map(Number);
                          totalDurationSeconds += hours * 3600 + minutes * 60 + seconds;
                      }
                  }
              });
          }
      });
      if (hours !== null) {
          hours = Math.floor(totalDurationSeconds / 3600);
          minutes = Math.floor((totalDurationSeconds % 3600) / 60);
          seconds = totalDurationSeconds % 60;
          time = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes !== null) {
          minutes = Math.floor((totalDurationSeconds % 3600) / 60);
          seconds = totalDurationSeconds % 60;
          time = `${minutes}m ${seconds}s`;
      } else {
          seconds = totalDurationSeconds % 60;
          time = `${seconds}s`;
      }
      return time;
  }
  
  const deleteHandler = (data) => {
    const result= deleteCourse(data._id,token)
    if(result){
      const updatedCourse = courseEntireData.filter((course) => course._id !== data._id)
      dispatch(setEntireCourseData(updatedCourse))

      const storedData = localStorage.getItem("cart");

      if (storedData) {
        let data = JSON.parse(storedData);
        if (Array.isArray(data)) {
          data = data.filter(item => item._id !== data._id);
          const updatedData = JSON.stringify(data); 
          localStorage.setItem("cart", updatedData);
        }
      }}
      setDltModal(null) 
    }

    useEffect(()=>{
      setLoading(true);
      handleOnSubmit()
      setLoading(false);
    },[])

    return (
      <>

        { loading ===true ? 
        (<div className= ' w-full h-full spinner'></div>)
        :( 
            <>
            <div className='md:hidden flex text-richblack-50 text-3xl md:text-2xl font-semibold m-auto w-full mb-5 '>
              My Courses
            </div>
          <div className='text-white border border-richblack-700 rounded-lg'>
        {
          courseEntireData.length >0 && loading===true ? ( 
          <div className={`flex flex-col md:grid md:grid-rows-${courseEntireData.length+3} `}>
            {/* headings */}
            <div className='hidden md:flex  flex-row justify-between border-b border-richblack-600  text-richblack-200 text-[14px] '>
              <div className='p-3 ml-2 w-[65%]'>
                <p>COURSES </p>
              </div>
              <div className='flex flex-row justify-end mr-4 gap-7 tracking-wider p-3 w-[35%]'>
                <p>DURATION</p>
                <p>PRICE</p>
                <p>ACTION</p>
              </div>
          </div>

            
            {/* courses cards */}
            {
              courseEntireData.map((element,index)=>(
                <div key={index} className='flex md:flex-row flex-col md:m-0 m-auto   p-3'>
                  <div  onClick={()=>navigate("/courses/"+element._id)}
                  className='md:flex-row flex-col flex md:w-[65%] w-[291px] cursor-pointer rounded-lg group md:m-0 md:bg-none px-4 md:p-0 py-4 md:bg-richblack-900 md:border-none   bg-richblack-600 bg-opacity-40 border border-richblack-500 m-auto gap-3'>
                    <div className=' rounded-lg '>
                      <img src={element.thumbnail} loading="lazy" className= 'md:border-none border border-richblack-200 group-[]: w-[260px] object-cover  h-[260px] md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[130px] rounded-lg'/>
                    </div>
                    <div className='flex flex-col md:m-0 m-auto justify-center w-full md:w-[60%]'>
                      <p className='text-richblack-25 text-xl '>{element.courseName}</p>
                      <p className='text-richblack-200 mb-2 text-[13px] text-wrap'>{element.courseDescription.length > 100 ?element.courseDescription.slice(0,90)+("...") : element.courseDescription }</p>
                      <p className='text-richblack-50 mb-2 text-[12px] '>Created: {" "}{formatDateTime(element.createdAt)}</p>
                      <div className='bg-richblack-600 mb-1 rounded-3xl w-fit px-2 text-[13px] text-yellow-50  '>
                       {element.status==="Published"? "Published" : (<div className='text-pink-200 '>Draft</div>)} 
                      </div>
                    </div>
                    <div className='w-[100%] m-auto flex md:hidden flex-row items-center gap-10 md:mr-5 justify-center md:justify-end text-richblack-200'>
                    <p>
                      {calculateTotalDuration(element.courseContent) || "-"}
                    </p>
                    <p>₹{element.price}</p>
                    <div className='flex flex-row gap-3 text-[20px]'>
                      <p  onClick={(e)=>{e.stopPropagation(); navigate(`/dashboard/edit-course/${element._id}`)}} ><MdModeEdit /></p>
                      <p 
                        onClick={(e)=>{e.stopPropagation();
                                        setDltModal({
                                            text1:"Are you sure?",
                                            text2:"Do you want to delete Course?",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn2Handler:()=>setDltModal(null),
                                            btn1Handler:()=>deleteHandler(element)
                      })}}
                      ><RiDeleteBin6Line /></p>
                    </div>
                  </div>
                  </div>
  
                  <div className='w-[35%] m-auto hidden md:flex flex-row items-center gap-10 md:mr-5 justify-center md:justify-end text-richblack-200'>
                    <p>
                      {calculateTotalDuration(element.courseContent) || "-"}
                    </p>
                    <p>₹{element.price}</p>
                    <div className='flex flex-row gap-2 text-[20px]'>
                      <p><MdModeEdit className='cursor-pointer ' onClick={()=>{ navigate(`/dashboard/edit-course/${element._id}`)}}/></p>
                      <p onClick={(e)=>{e.stopPropagation();
                                        setDltModal({
                                            text1:"Are you sure?",
                                            text2:"Do you want to delete Course?",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn2Handler:()=>setDltModal(null),
                                            btn1Handler:()=>deleteHandler(element)
                      })}} className='cursor-pointer'><RiDeleteBin6Line /></p>
                    </div>
                  </div>
                </div>
              ))
            }
            {dltModal!==null  && <ConfirmationModal modalData={dltModal}/>}
        </div>) 
        
        :(<>
          <div className='hidden md:flex  flex-row justify-between border-b border-richblack-600  text-richblack-200 text-[14px] '>
              <div className='p-3 w-[65%]'>
                <p>COURSES </p>
              </div>
              <div className='flex flex-row justify-end mr-4 gap-7 tracking-wider p-3 w-[35%]'>
                <p>DURATION</p>
                <p>PRICE</p>
                <p>ACTION</p>
              </div>
          </div>
          
          <div className='flex justify-center items-center  text-richblack-100 text-4xl my-10 '>No Course Added Yet</div>
          </>
        )
        }
      </div>
      </>
        )

    
        }
      </>
  )
}


export default CoursesTable