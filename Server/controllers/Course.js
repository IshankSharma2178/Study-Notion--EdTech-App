const Course =require("../models/Course")
const Category=require("../models/category");
const User =require("../models/User");
const cloudinary =require("cloudinary")
// const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    options.resource_type="auto";

    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

//create course
exports.createCourse = async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body      //Category m id ayegi becoz course model m Category ref le rkha hai
        
        //get thumbnail 
        const thumbnail =req.files.thumbnailImage;
        console.log(courseName, req.files.thumbnailImage , courseDescription ,whatYouWillLearn,price,category )
        

        if(!courseName || !courseDescription|| !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success: false,
                message:"all fields are required"
            })
        }
        
        //need to store course created in that instructor db
        const userId=req.user.id;                  //ye user id h object id nhi hai   //payload m pda hai user id
        const instructorDetails = await User.findById(userId);    // yahan se hmne object id nikali hai taki  ham schema m update kr payen

        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message:"instructor not found"
            })
        }

        //check Category is valid or not
        const CategoryDetails = await Category.find({_id:category});
        if(!CategoryDetails){
            return res.status(400).json({
                success: false,
                message:"Category details not found"
            })
        }

        //upload image to cloudinary server
        const thumbnailImage = await uploadFileToCloudinary(thumbnail , process.env.FOLDER_NAME);

        //create an entry for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            Category:CategoryDetails[0]._id,
            thumbnail:thumbnailImage.secure_url
        })

        //add new course to user schema of instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},{$push:{courses:newCourse._id}},{new:true});
 
        //update Category schema


        return res.status(200).json({
            success: true,
            message:"course created successfully",
            data:newCourse
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//get all courses
exports.showAllCourses = async(req,res)=>{
    try{
        const allCourses=await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true})
                                                .populate("instructor")
                                                .exec();

        return res.status(200).json({
            success: true,
            message:"all courses data fetched successfully",
            data:allCourses
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//get all details of a particular course
exports.getFullCourseDetails = async (req,res)=>{
    try{
        const {courseId} = req.body;

         const details =await Course.findById(courseId)
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            }
                                        }
                                    )
                                    .populate(
                                        {
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection"
                                            }
                                        }   
                                    )
                                    .populate("ratingAndReviews")
                                    .populate("Category")
                                    .populate("studentEnrolled")
                                    .exec();

        if(!details){
            return res.status(400).json({
                success: false,
                message:`could not find the course with ${courseId}`
            })
        }
        
        return res.status(200).json({
            success: true,
            message:"course details fetch successfully",
            courseDetails:details
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//edit course
exports.editCourse = async(req,res)=>{
    try{
        const {courseName,courseDescription,price,tag,whatYouWillLearn,category,courseId} = req.body;
        const thumbnailImage = req.files?.thumbnailImage;
        
        console.log("thumbnail :  ", thumbnailImage)
        console.log("hello")

        if(!courseId){
            return res.status(404).json({
                success: false,
                message: 'please enter a course ID',
            })
        }

        if( !courseName && !courseDescription && !price && !tag && !whatYouWillLearn && !category && !thumbnailImage){
            return res.status(400).json({
                success: false,
                message:"please enter atleast one field"
            })
        }

        const updateData={};
        if(courseName) updateData.courseName = courseName;
        if(courseDescription) updateData.courseDescription = courseDescription;
        if(category) updateData.category = category;
        if(tag) updateData.tag = tag;
        if(whatYouWillLearn) updateData.whatYouWillLearn = whatYouWillLearn;
        if(price) updateData.price = price;

        const response = await Course.findByIdAndUpdate(courseId,{$set:updateData},{new:true});
        
        if(thumbnailImage) {
            try{
             var thumbnailResponse = await uploadFileToCloudinary(thumbnailImage,"codehelp");  
        }
            catch(Err){
                return res.status(400).json({
                    success:false,
                    message:Err.message
                })
            }
        }

        console.log(updateData);

        return res.status(200).json({
            success: true,
            message: response,
            imageRes:thumbnailResponse
        })


    }catch(err){

    }
}

//get a instructor courses    

exports.getInstructorCourses = async(req,res)=>{
    try{
        const userId = req.user.id;

        console.log("heello", userId);
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"cannot get userId"
            })
        }

        const data = await User.findById(userId).populate("courses");
        console.log(data.courses);
        return res.status(200).json({
            success:false,
            data:data.courses
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//delete a course

exports.deleteCourse = async (req,res)=>{
    try{
        const {courseId}=req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"cannot get courseId"
            })
        }   

        const data = await Course.findById(courseId);
        
        if(!data){
            return res.status(400).json({
                success:false,
                message:"cannot find course on this id"
            })
        } 

        const response = await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            response:response
        })

    }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
    }
}