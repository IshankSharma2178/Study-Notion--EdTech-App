const OTP=require("../models/OTP")
const User=require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const Profile=require("../models/Profile")


//send otp
exports.sendOTP = async (req,res) => {
    try {
        const {email} = req.body;
        console.log("Email in senOtp controller",email)
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success:false,
                message: "Email already exists"
            })
        }

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        

        let result = await OTP.findOne({otp:otp});

        while (result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = OTP.findOne({otp:otp});
        }
        console.log("OTP generated", otp);

        const createdOtp = await OTP.create({
            email,
            otp
        })

        console.log("Created OTP", createdOtp);
        return res.status(200).json({
            success:true,
            message: "OTP created!",
            createdOtp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//sign up

exports.signup = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;

        console.log("firstName  ",email);

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
        console.log("CheckUserPreseent   :  ",checkUserPreseent)
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
        console.log("hello")
        const {email,password}=req.body;
        console.log(email , password);
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
                email: email,
                id: user._id,
                accountType: user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"1000h",
            })
            user.toObject();
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
exports.changePassword = async(req,res)=>{
    try{
        
    }catch(err){

    }
}