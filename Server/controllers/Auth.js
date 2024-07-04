const OTP=require("../models/OTP")
const User=require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const Profile=require("../models/Profile")

function otpgenerated(){
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    return otp;
}

//send otp
exports.sendOTP=async (req,res)=>{
    try{
        //fetch email from req body
        const {email} = req.body;
        const checkUserPreseent=await User.findOne({email:email});
        if(checkUserPreseent){
            return res.status(401).json({
                sucess: false,
                message:"user already exists",
            })
        }
        
        //check unique otp generated or not
        const result=await OTP.findOne({otp:otp});
        var otp = otpgenerated();
        while(result){
            otp=otpgenerated();
            result=await OTP.findOne({otp:otp});
        }
        console.log("otp generated is : " + otp);
          
        //create an entry for otp
        const otpBody=await OTP.create({email:email,otp:otp});
        console.log("otpbody : ",otpBody);

        res.status(200).json({
            success: true,
            message: "otp sent successfully",
            otp
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//sign up

exports.signup = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;

        //validate entrys
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"All fileds are required",
            })
        }

        /// if password and confirm password are same or not
        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password and confirm password are not the same"
            })
        }

        //if email validate
        const checkUserPreseent=await User.findOne({email:email});
        if(checkUserPreseent){
            return res.status(400).json({ 
                success: false,
                message:"user is already registered"
            })
        }
        
        // find recet otp stored for the user
        const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recentOTP  : ",recentOtp);

        //otp validate
        if(recentOtp.length === 0){
            return res.status(400).json({
                success: false,
                message:"otp not found",
            })
        }else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success: false,
                message:"otp not matching"
            })
        }

        //hash password
        const hashedPassword= await bcrypt.hash(password,10);

        //create entry in db 
         const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         });
         const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
         })

         return res.status(200).json({
            success: true,
            message:"user is registered successfully"
         })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

//Login in
exports.login=async(req,res)=>{
    try{
        //get data from req body
        const {email,password}=req.body;

        //validation data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "please enter your email address and password"
            })
        }

        //user check if exists or not
        const user = await User.findOne({email: email}).populate("additionalDetails");
        if(!user){
            return res.status(403).json({
                success: false,
                message: "email address is incorrect"
            })
        }

        // generate jwttoken ,after matching password
        if(await bcrypt.compare(password, user.password)){
            const payload={
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;
        
        //create cookie and send respond
            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in successfully"
        })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"password is incorrect"
        })
    }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"login failure please try again"
        })
    }
}

//change password
