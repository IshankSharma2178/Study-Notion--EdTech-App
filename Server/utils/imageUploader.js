const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (req, res) => {
  const folder = "codehelp";
  const options = { folder };

  options.resource_type = "auto";

  return await cloudinary.uploader.upload(req.tempFilePath, options);
};
