import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { CgSoftwareUpload } from "react-icons/cg";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  image=false,
  video=false ,
  viewData = null,
  editData = null,
}) {

  const [file , setFile] =useState(null)
  const [previewFile , setPreviwFile] =useState(null)
  const { acceptedFiles, getRootProps, getInputProps ,open } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((img) => {
        console.log(img);
        console.log(acceptedFiles);
        setFile(img);
        setValue(name, img, { shouldValidate: true });
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onloadend = () => {
          setPreviwFile(reader.result)
        }
      });
    },
    accept: 
      image ? { "image/*": [".jpeg", ".jpg", ".png"] }
      :video ? { "video/*": [".mp4"] } : { "pdf/*": [".pdf"]}
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="w-full rounded-[0.5rem] min-h-[200px] flex justify-center items-center flex-col outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25">
      {
        acceptedFiles.length!==0 ? (
          <div className="flex flex-col gap-6">
            <img src={previewFile}  className="size-[130px] aspect-auto"/>
            <button
              type="button"
              onClick={open}
              className="flex justify-center text-richblack-100 items-center gap-2">
              Reuplaod
              <CgSoftwareUpload />
            </button>
          </div>
        ):(
          <div>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div >
              <h4>Files</h4>
              <ul>{files}</ul>
            </div>
          </div>
        )
      

      }
    </section>
  );
}


