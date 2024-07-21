import React , {useEffect, useState} from 'react'
import {getCatalogPageData} from "../services/operations/PageAndComponentData"
import Footer from '../component/common/Footer'
import { useParams } from 'react-router'
import { apiConnector } from '../services/apiconnector';
import {courseEndpoints} from '../services/apis'

function Catalog() {
    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");

    useEffect (()=>{
        const getCategories= async()=>{
            const res = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
            const category_id=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-".toLowerCase()) === catalogName)[0]._id;
        setCategoryId(category_id);
        }
        getCategories()
    },[catalogName])
     
    useEffect(()=>{
        const getCategoryDetails = async() =>{
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res)
            }catch(error){
                console.log(error)
            }
        }
        getCategoryDetails();
    },[categoryId])

  return (
    <div className=''>
        <div>
            <p></p>
            <p></p>
            <p></p>
        </div>
        
        {/* Section-1 */}
        <div>
            <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            {/* <CourseSlider />  */}
        </div>

        {/* Section-2 */}
        <div>
            <p>Top Course</p>
            <div>
                <CouseSlider />
            </div>
        </div>

        
        {/* Section-3 */}
        <div>
            <p>Frequently Bought Courses</p>
            <div>
                <CouseSlider />
            </div>
        </div>

        <Footer/>``````````
    </div>
  )
}

export default Catalog