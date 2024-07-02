const {instance}=require("../config/razorpay")
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollment}=require ("../mail/templates/courseEnrollement");

//capture payment and initiate the razorpay 
exports.capturePayment = async(req,res)=>{
        const {course_id}=req.body;
        const userId=req.user.id;

        if(!course_id){
            return res.json({
                success: false,
                message:"Please enter course id"
            })
        }

        //validate course details check kr rhai hai ki courseid se jo details aa rhi h wo correct h ki nhi
        let course;
        try{
            course =await Course.findById(course_id);

            if(!course){
                return res.json({
                    success: false,
                    message:"could no find the course"
                })
            }

            //check user is already enrolled for the course or not
            const uid=new mongoose.Types.ObjectId(userId);          //userid string m exist kr rhi thi usse obejct type m convert ke liya hai becoz user id course modle ke ander object ki form m exist kr rhi hai
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success: false,
                    message: 'student is already enrolled for the course'
                })
            }
            
        }catch(e){
            return res.status(500).json({
                success: false,
                message:err.message
            })
        }

        //order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            name:"edtech",
            amount : amount*100,
            currency,
            receipt :Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId
            }  
        };

        try{
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success: true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.offer_id  
            })
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message:err.message
            })
        }

}

//      AUTHORIZATION  
exports.verifySignature=async (req,res)=>{
    const webhookSecret = "12345678";

    const signature= req.headers["x-razorpay-signature"];

    const shasum= crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature === digest){
        console.log("payment is authorized");
    
        //if payment authorized then course id and user m update kr do 
        const {courseId, userId}=req.body.payload.payment.entity.notes;
    
        try{
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message:err.message
                }) 
            }
            console.log(enrolledCourse);

            //find the student and add the course to their list of enrolled courses 
            const enrolledStudent  = await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true}) 

            //send the mail 
            const emailResponse = await mailSender(enrolledStudent.email,"Congratulations","ypu get the course");

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message:"Signature verified and Course added"
            })

        }catch(err){
            return res.status(500).json({
                success: false,
                message:err.message
            })
        }
    }
    else{
        return res.status(400).json({
            message:false,
            message:"signature not verified "
        })
    }

}