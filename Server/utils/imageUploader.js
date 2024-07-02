const cloudinary=require('cloudinary').v2;

exports.uploadImageToCloudinary = async(req,res)=>{
    const folder="codehelp";
    const file = req.file;
    const options ={folder};
    // if(height){
    //     options.height = height;
    // }   
    // if(quality){
    //     options.quality = quality;
    // }
    console.log("req.file  :  ",req.file);
    console.log("req is :  ",req);
    options.resource_type="auto";
     
    return await cloudinary.uploader.upload(req.tempFilePath,options);
}

