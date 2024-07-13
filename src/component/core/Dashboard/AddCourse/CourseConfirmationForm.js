import { fetchCourseCategories } from '../../../../services/operations/courseDetailAPI';
import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function CourseConfirmationForm() {

    const {redister,handlerSubmit,setValue,getvalue,formState:{errors}} = useForm()
    const dispatch = useDispatch();
    const {course , editCourse} = useSelector((state)=>state.course);
    const [loading,setLoading] =useState(false);
    const [courseCategories,setCourseCategories] = useState();

    useEffect(()=>{
        const getCategories = async()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length>0){
                setCourseCategories(categories)
            }
            setLoading(false);
        }
        if(editCourse)[
            setValue("courseTitle" , course.courseName)
        ]
    })
    return (
    <div>

    </div>
  )
}

export default CourseConfirmationForm