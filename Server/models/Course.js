const mongoose= require('mongoose');
const now= new Date();

const courseSchema= new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true  
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    tag:{
        type:[String],
        required:true,
    },

    status:{
        type:String,
        enum:["Draft", "Published"]
    },
    createdAt:{
        type:Date,
        default:now,
    },
    instructions:{
        type:String,
    }


})

module.exports = mongoose.model("Course",courseSchema);