import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { courseEndpoints } from '../../services/apis'

function SmallNavbar() {

    const [subLinks,setSubLinks] = useState([]);

    const fetchSubLinks = async() =>{
        try{
          const result =await apiConnector("GET",courseEndpoints.CATEGORIES_API)
          console.log("printing  " ,result.data.Categorys);
          setSubLinks(result.data.Categorys);
        }catch(e){
          console.log("could not fetch the category list")
        }
      }
  
      useEffect (()=>{
        fetchSubLinks();
      },[])

  return (
    <div>
         
    </div>
  )
}

export default SmallNavbar