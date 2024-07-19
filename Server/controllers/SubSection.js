const SubSection = require("../models/SubSection")
const Section =require("../models/Section")
const {uploadImageToCloudinary}=require("../utils/imageUploader")
const Course = require("../models/Course")
const cloudinary = require("cloudinary").v2;
require("dotenv").config()

async function uploadVideoToCloudinary(video){
    const folder="codehelp";
    const option={};
    option.resource_type="auto";
    option.folder=folder;


    return  cloudinary.uploader.upload_stream(video.tempFilePath,option);
}

exports.createSubSection = async(req,res)=>{
    try{
        //fetch data from req body
        console.log("body  , ",req.body)
        const {sectionId , title, timeDuration , description,courseId} =req.body;
        
        //extract file/video
        const video=req.files.video;
        console.log(video)
        
        //validate
        if(!sectionId || !title || !timeDuration || !description || !video || !courseId){
            return res.status(400).json({
                success: false,
                message:"all field are required"
            })
        } 

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create a subsection    
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
         
        //update section with this subsection objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, {$push:{subSection:subSectionDetails._id}},{new:true})
        const data = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
              path: "subSection"
            }
          });
          
        //todo : log updated section here after adding populate query

        return res.status(200).json({
            success: true,
            message:"sub section created successfully",
            data:data
        })

    }catch(err){
    return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//  todo updateSubsection and delete subsection  

//update SubSection   --------------------------------

exports.updateSubSection=async(req,res)=>{

    try{
        const {sectionId , title,timeDuration ,description ,subSectionId} = req.body;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"cannot get sectionId"
            })
        }
        console.log(req.body)
        // if(!title  !timeDuration && !description ){
        //     return res.status(404).json({
        //         success:false,
        //         message:"give atleast one field for updation"
        //     })
        // }
        
        const video=req.files?.video;
        
        const updateData={};
        if(title) updateData.title = title;
        if(timeDuration) updateData.timeDuration = timeDuration
        if(description) updateData.description = description
        if(video){
            var videoData =await uploadVideoToCloudinary(video,process.env.FOLDER_NAME)
            updateData.videoUrl =  videoData.secure_url
        }

        const data = await SubSection.findByIdAndUpdate(subSectionId,{$set:updateData},{new:true})
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        console.log("updated Successfully")
        return res.status(200).json({
            success: true,
            data: updatedSection,
            videoData:videoData
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
   }

exports.deleteSubSection = async(req,res)=>{
    try{
        const {sectionId , subSectionId,course}=req.body;

        if(!sectionId || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"please enter all fields"
            })
        }      

        const sectionResponse = await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});
        
        if (!sectionResponse) {
            return res.status(400).json({
                success: false,
                message: "Section not found" 
            })
          }
          const subSectionResponse = await SubSection.findByIdAndDelete(subSectionId);
          const updatedSection = await Section.findById(sectionId).populate("subSection")

          if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:'SubSection not found',
            });
        }

        return res.status(200).json({
            success:true,
            sectionResponse:updatedSection,
            subSectionResponse:subSectionResponse
        })
          
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
