const Course =require("../models/Course")
const Category=require("../models/category");
const User =require("../models/User");
const CourseProgress = require("../models/CourseProgress");
// const convertSecondsToDuration =require("../utils/secToDuration")
const Comment = require("../models/Comments");
const cloudinary =require("cloudinary");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const category = require("../models/category");
const RatingAndReview = require("../models/RatingAndReview");
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
        const {courseName,courseDescription,whatYouWillLearn,price,category,tag,instructions} = req.body      //Category m id ayegi becoz course model m Category ref le rkha hai
        
        //get thumbnail 
        const thumbnail =req.files.thumbnailImage;
        

        if(!courseName || !courseDescription|| !whatYouWillLearn || !price || !category || !thumbnail || !tag || !instructions){
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
            thumbnail:thumbnailImage.secure_url,
            tag:tag,
            instructions:instructions
        })
        
        const addCourseToCategory = await Category.findByIdAndUpdate({_id:category},{$push:{course:newCourse._id}},{new:true});

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
                                                studentsEnrolled:true},{new:true})
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

        const userId =req.user.id;

        let courseProgress = await CourseProgress?.findOne({
            courseID: courseId,
            userId: userId,
          });
          
        let totalDurationInSeconds = 0
        details.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        
        return res.status(200).json({
            success: true,
            totalDuration,
            message:"course details fetch successfully",
            courseDetails:details,
            courseProgress:courseProgress?.completedVideos
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
        const {courseName,courseDescription,price,tag,whatYouWillLearn,category,courseId,instructions} = req.body;
        const thumbnailImage = req.files?.thumbnailImage;
        
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
        if(instructions) updateData.instructions = instructions;

        const response = await Course.findByIdAndUpdate(courseId,{$set:updateData},{new:true})
                                                                        .populate({
                                                                            path:"courseContent",
                                                                            populate:{
                                                                                path:"subSection"
                                                                            }
                                                                        })
                                                                        .populate("Category").exec();
        
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


        if(!userId){
            return res.status(400).json({
                success:false,
                message:"cannot get userId"
            })
        }

        const data = await User.findById(userId).populate({
                                                path:"courses",
                                                populate:{
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                }
        });

        const result=data.courses
        return res.status(200).json({
            data:result
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }
        // Find the course with its content and subsections
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).populate("Category");
        
        const categoryId = course.Category._id;

        const category = await Category.findById(categoryId).populate("course");

        
        category.course = category.course.filter(cour => cour._id.toString() !== courseId.toString());
        console.log("Updated category course array:", category.course);

        // Save the updated category
        const savedCategory = await category.save();
        console.log("Saved category:", savedCategory);

        // Find the user and remove the course from their list of courses
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found"
            });
        }


        // Find the user and remove the course from their list of courses
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.courses = user.courses.filter((course) => course.toString() !== courseId);
        await user.save();

        // Delete course content and subsections
        const deleteSubSectionsPromises = course.courseContent.map(section => {
            return Promise.all(section.subSection.map(async subSection => {
                await SubSection.findByIdAndDelete(subSection._id);
            }));
        });

        await Promise.all(deleteSubSectionsPromises);

        // Delete sections
        const deleteSectionsPromises = course.courseContent.map(async section => {
            await Section.findByIdAndDelete(section._id);
        });

        await Promise.all(deleteSectionsPromises);

        const courseRatings = await RatingAndReview.deleteMany({course:courseId});

        const courseComments = await Comment.deleteMany({course:courseId});

        const courseProgress = await CourseProgress.deleteMany({courseID:courseId });

        // Delete the course itself
        const courseResponse = await Course.findByIdAndDelete({course:courseId});

        return res.status(200).json({
            success: true,
            message: "Course and associated content deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//get course details

exports.getCourseDetails = async (req, res) => {
    try {
      //get id
      const {courseId} = req.body;
      //find course details
      const courseDetails = await Course.findById(courseId)
                                  .populate(
                                      {
                                          path:"instructor",
                                          populate:{
                                              path:"additionalDetails",
                                          },
                                      }
                                  )
                                  .populate("Category")
                                  .populate("ratingAndReviews")
                                  .populate({
                                      path:"courseContent",
                                      populate:{
                                          path:"subSection",
                                          //select: "-videoUrl",
                                      },
                                  })
                                  .exec();
  
          //validation
          if(!courseDetails) {
              return res.status(400).json({
                  success:false,
                  message:`Could not find the course with ${courseId}`,
              });
          }

          return res.status(200).json({
              success:true,
              message:"Course Details fetched successfully",
              data:{courseDetails}
          })
  
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
  }

exports.updateCourseStatus= async(req, res)=>{
    try{
        const {courseId ,status} = req.body;

        if(!courseId || !status){
            return res.status(404).json({
                success: false,
                message: 'all fields are required'
            })
        }            
        const response = await Course.findByIdAndUpdate(courseId,{status:status},{new:true});

        return res.status(200).json({success:true, message:response});
    }catch(e){
        return res.status(500).json({success:false, message:e.message});
    }
}

