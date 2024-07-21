import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CgSoftwareUpload } from "react-icons/cg";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  image = false,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [reupload, setReupload] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps, onDropAccepted } = useDropzone({
    accept: image
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : video
      ? { "video/*": [".mp4"] }
      : { "pdf/*": [".pdf"] },
    noKeyboard: true,
    onDrop: (acceptedFiles) => submitHandler(acceptedFiles[0]),
  });

  const submitHandler = (file) => {
    console.log("file  :  ", file);
    acceptedFiles.forEach((a) => console.log("accepted : ", a));
    console.log(acceptedFiles);
    setFile(file);
    console.log("accepted files : ", file);
    setValue(name, file, { shouldValidate: true });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
    if (video) {
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.onloadedmetadata = () => {
        window.URL.revokeObjectURL(videoElement.src);
        setVideoDuration(videoElement.duration);
        console.log("video duration " + videoElement.duration);
        setValue("timeDuration", videoElement.duration.toFixed(2), { shouldValidate: true });
      };
      videoElement.src = URL.createObjectURL(file);
    }
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);
  
  useEffect(() => {
    if(editData){
      if(video){
        console.log("fgbs",editData)
        setValue("lectureVideo",editData)
      }else{
        console.log("fgbs",editData)
        setValue("thumbnail",editData)
        setPreviewFile(editData)
      }
    }
  },[])

  return (
    <section>
      {file ||editData  ? (
        <div className="w-full rounded-[0.5rem] min-h-[200px] flex justify-center items-center flex-col outline-none shadow-custom2 
                         placeholder-richblack-300 placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25">
          {image && <img src={previewFile} className="h-[130px] aspect-auto" alt="preview" />}
          {video && (
            <>
              <video src={previewFile || viewData} className="h-[230px] sm:h-[330px] aspect-auto" controls />
              {videoDuration && <p>Video duration: {videoDuration.toFixed(2)} seconds</p>}
            </>
          )}
          { file && <ul className="my-3">{ <li key={file.path}>{file.path} - {(file.size/1000000).toFixed(2)} Mb</li>}</ul>}
          <div {...getRootProps()}>
            <input {...getInputProps()} id="thumbnail" />
             { (<div className="flex flex-row justify-center items-center cursor-pointer gap-2 ">
              Reupload
              <CgSoftwareUpload className="text-yellow-25"/>
            </div>)}
            
          </div>
        </div>
      ) : (
        <div>
          <div {...getRootProps()}>
           {(editData ||  !reupload) && (<input {...getInputProps()}  id={video ? "lectureVideo":"thumbnail"}/>)}
            <label htmlFor="thumbnail" className='tracking-wider text-[14px] text-richblack-25'>
              Course Thumbnail <sup className="text-pink-200">*</sup>
            </label>
            <div className="w-full rounded-[0.5rem] min-h-[200px] flex justify-center items-center flex-col outline-none shadow-custom2 
                         placeholder-richblack-300 placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25">
               {editData && <video src={editData} className="h-[230px] sm:h-[330px] aspect-auto" controls />}
              {!editData && (<div className="rounded-full bg-[rgb(23,23,23)] text-center items-center flex justify-center size-12">
                <IoCloudUploadOutline className="text-yellow-25 text-2xl" />
              </div>)}
              <p className="text-richblack-200 max-w-[180px] text-sm text-center">
                Drag and drop an image, or click to Browse a file
              </p>
              {image && (<ul className="mt-10 md:flex list-disc justify-between md:space-x-12 text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
