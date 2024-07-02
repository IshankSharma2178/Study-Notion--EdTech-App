const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async(req,res)=>{
    try{
        const {rating,review,courseId} = req.body;
        const userId =req.user.id;
        
        //check if user is enrolled or not
        const courseDetails= await Course.findOne({_id:courseId , studentEnrolled : {$elemMatch : {$eq:userId}}});
        
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message:"student is not enrolled"
            })
        }

        //check if already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({user:userId,course:courseId});

        if(!alreadyReviewed){
            return res.status(404).json({
                success: false,
                message:"course is already reviewed by the user"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({rating,review,course:courseId,user:userId});
        //update rating and review in course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReviews: ratingReview._id}},{new:true})
        console.log(updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: "rating and review successfully",
            ratingReview
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//get Average rating
exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId} =req.body;

        const result =await RatingAndReview.aggregate([
            {
                $match:{                            //hmne sari entries dhundh li hai jisme course ki id courseId hai
                    course:new mongoose.Types.ObjectId(courseId),       //courseId string thi isse hmne object id m convert kiya hai using (mongoose.Type.ObjectId)
                }
            },
            {
                $group:{        //null krke hamne jitni bhi entries ayyin thi unhe ekk single grp m wrap kr diya
                    _id:null,
                    averageRating:{$avg:"$rating"} 
                }
            }
        ])
        if(rating.length > 0){
            return res.status(200).json({
                success: true,
                averageRating:result[0].averageRating
            })
        }
        return res.status(400).json({
            success: true,
            message:"average rating is 0 , no ratings given till now",
            averageRating:0
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

//get all ratings
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
                                                        .populate({
                                                            path:"user",
                                                            select:"firstName lastName email image"
                                                        }) 
                                                        .populate({
                                                            path:"course",
                                                            select:"courseName "
                                                        })
                                                        .exec();
                                                        
    return res.status(200).json({
        success:true,
        message:"all reviews fetched successfully",
        data:allReviews
    })

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}