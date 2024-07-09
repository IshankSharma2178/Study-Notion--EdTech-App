const Profile=require("../models/Profile");
const User=require("../models/User");
const cloudinary = require('cloudinary').v2;

async function uploadFileToCloudinary(file, folder,quality) {
    const options = {folder};
    options.resource_type="auto";
    // console.log(options);
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//hamne profile ki value ko null kr rkha hai jiss wajah se uss user ki profile details hame update krni h create nhi krni

exports.updateProfile =async(req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber="",gender=""}=req.body;
        
        //get user data
        const id=req.user.id;

        //validation
        // if(!contactNumber || !gender || !id){
        //     return res.status(400).json({
        //         success: false,
        //         message:"all field are required"
        //     })
        // }

        //find profile
        const userDetails =await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails= await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        
        await profileDetails.save();                //yahan object pehele se hi bna hua hai isliye save() kr dinge

        return res.status(200).json({
            success: true,
            message:"profile updated successfully",
            data:profileDetails  
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
    }

///delete Account
exports.deleteAccount = async(req,res)=>{
    try{
        //get id
        const id=req.user.id;

        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message:"user not found"
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});
        
        //todo unroll user from all erolled courses
        
    

        return res.status(200).json({
            success: true,
            message:"user deleted successfully",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    
    }
}


exports.getAllUserDetails =async(req,res)=>{
    try{
        const id=req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        
        return res.status(200).json({
            success: true,
            message:"user deleted successfully",
            data:userDetails  
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try{
        console.log("hello")
        const file=req.files.imageFile;
        console.log(file);
        // console.log("hii")
        const supportedTypes =["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();

        if(!supportedTypes.includes(fileType)){
            return res.status(400).json({
                success: false,
                message: "file type is not supported"
            })
        }

        const response =await uploadFileToCloudinary(file,"codehelp");

        console.log("response is : " , response);

        const updatedUser = await User.findOneAndUpdate({email:req.user.email},{image:response.url},{new:true});        

        console.log("updated user is : " , updatedUser);

        res.status(200).json({
            success: true,
            message: "profile updated successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

