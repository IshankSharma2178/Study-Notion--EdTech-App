import React from 'react'
import toast from "react-hot-toast"
import { apiConnector } from '../apiconnector'
import { catalogData } from '../apis'

const {CATALOGPAGEDATA_API}=catalogData

export const getCatalogPageData = async(categoryId) => {
    let result =[]
   
    const toastId=toast.loading("loading...")
    try{
        const response = await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId:categoryId})
    
        console.log("api response...",response);
        if(!response?.data?.success){
            throw new Error("Could not Fetch Categories page Data")
        }
        result= response?.data
        toast.dismiss(toastId )

    }catch(err){
        console.log("error while fetching data...",err)
        toast.error(err.message)
        toast.dismiss(toastId )
    }
    
}
