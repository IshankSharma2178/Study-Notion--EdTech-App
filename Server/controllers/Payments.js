const {instance}=require("../config/razorpay")
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const {courseEnrollment, courseEnrollmentEmail}=require ("../mail/templates/courseEnrollement");
const { default: mongoose } = require("mongoose");
const crypto = require('crypto');
const {paymentSuccessEmail } =require ("../mail/templates/paymentSuccessEmail");
require("dotenv").config();


// initialize razorPay order
exports.capturePayment = async (req, res) => {
    const {courses} = req.body;
    const userId =  req.user.id;

    if (courses.length === 0) {
        return res.json({
            success:false,
            message:"Provide courseId"
        })
    }

    let totalAmount = 0;

    for (const courseId of courses){
        let course;
        try {
            
            course = await Course.findById(courseId);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Course doesn't exist"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"User already registered"
                })
            }

            totalAmount += parseInt(course.price);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    
    
    const currency = "INR"

    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success:true,
            message: paymentResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
}

exports.verifyPayment = async (req,res) => {
    
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex")
    console.log(expectedSignature === razorpay_signature)

    if (expectedSignature === razorpay_signature) {
            console.log(courses,userId)
        await enrollStudents(courses, userId, res);

        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(200).json({success:"false", message:"Payment Failed"});
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try {
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push: {
                        studentEnrolled: userId
                    }
                }, {new:true})  

            if (!updatedCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos: [],
            })

            const updatedStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }
            }, {new: true})

            const emailResponse = await mailSender(
                updatedStudent.email,
                `Successfully Enrolled into ${updatedCourse.courseName}`,
                courseEnrollmentEmail(updatedCourse.courseName, `${updatedStudent.firstName}`)
            )
        } catch (error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async (req,res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try {
        const user = await User.findById(userId);
        await mailSender(
            user.email,
            `Payment Received`,
            paymentSuccessEmail(`${user.firstName}`,
             amount/100,orderId, paymentId)
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}





// //capture payment and initiate the razorpay 
// exports.capturePayment = async(req,res)=>{
//         const {course_id}=req.body;
//         const userId=req.user.id;

//         if(!course_id){
//             return res.json({
//                 success: false,
//                 message:"Please enter course id"
//             })
//         }

//         //validate course details check kr rhai hai ki courseid se jo details aa rhi h wo correct h ki nhi
//         let course;
//         try{
//             course =await Course.findById(course_id);

//             if(!course){
//                 return res.json({
//                     success: false,
//                     message:"could no find the course"
//                 })
//             }

//             //check user is already enrolled for the course or not
//             const uid=new mongoose.Types.ObjectId(userId);          //userid string m exist kr rhi thi usse obejct type m convert ke liya hai becoz user id course modle ke ander object ki form m exist kr rhi hai
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success: false,
//                     message: 'student is already enrolled for the course'
//                 })
//             }
            
//         }catch(e){
//             return res.status(500).json({
//                 success: false,
//                 message:err.message
//             })
//         }

//         //order create
//         const amount = course.price;
//         const currency = "INR";
//         const options = {
//             name:"edtech",
//             amount : amount*100,
//             currency,
//             receipt :Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId
//             }  
//         };

//         try{
//             // initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
//             return res.status(200).json({
//                 success: true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.offer_id  
//             })
//         }
//         catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message:err.message
//             })
//         }

// }

// //      AUTHORIZATION  
// exports.verifySignature=async (req,res)=>{
//     const webhookSecret = "12345678";

//     const signature= req.headers["x-razorpay-signature"];

//     const shasum= crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature === digest){
//         console.log("payment is authorized");
    
//         //if payment authorized then course id and user m update kr do 
//         const {courseId, userId}=req.body.payload.payment.entity.notes;
    
//         try{
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message:err.message
//                 }) 
//             }
//             console.log(enrolledCourse);

//             //find the student and add the course to their list of enrolled courses 
//             const enrolledStudent  = await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true}) 

//             //send the mail 
//             const emailResponse = await mailSender(enrolledStudent.email,"Congratulations","ypu get the course");

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message:"Signature verified and Course added"
//             })

//         }catch(err){
//             return res.status(500).json({
//                 success: false,
//                 message:err.message
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             message:false,
//             message:"signature not verified "
//         })
//     }

// }