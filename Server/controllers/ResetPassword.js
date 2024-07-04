const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");

//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    try{
    //get email from body
    const {email}=req.body;
    
    //check validate eamil
    const user= await User.findOne({email: email});
    if(!user){
        return res.json({
            success: false,
            message: "your email is not registered",
        })
    }

    //generate token
    const token=crypto.randomUUID();

    //update user by adding token and expirationt time
    const updatedDetails=await User.findOneAndUpdate({email: email},{token: token,resetPasswordExpires: Date.now()+5*60*60*1000},{new:true});
    
    //create url
    const url=`http://localhost:3000/update-password/${token}`
    
    //send mail containing the url and return response
    await mailSender(email,"Password Reset Link", `Password Reset Link ${url}`)

    return res.status(200).json({
        success: true,
        message: "email send successful"
    })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//resetPassword
exports.resetPassword = async(req,res)=>{
    try{
        const {password,confirmPassword,token}= req.body;
        if(password!==confirmPassword){
            return res.status(500).json({
                success: false,
                message: "password and confirm password do not match"
            })
        }
        const userDetails=await User.findOne({token:token})
        if(!userDetails){
            return res.status(500).json({
                success: false,
                message: "User does not exist"
            })
        }
        if(userDetails.resetPasswordExpires <Date.now()){
            return res.status(500).json({
                success: false,
                message: "link expires"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        
        return res.status(200).json({
            success: true,
            message:"password updated successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message 
        })
    }
}