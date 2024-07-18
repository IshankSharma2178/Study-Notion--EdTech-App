import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CgSoftwareUpload } from "react-icons/cg";

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
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
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

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="w-full rounded-[0.5rem] min-h-[200px] flex justify-center items-center flex-col outline-none shadow-custom2 placeholder-richblack-300  placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25">
      {file ? (
        <div className="flex flex-col gap-6 items-center">
          {image && <img src={previewFile} className="h-[130px] aspect-auto" />}
          {video && (
            <>
              <video src={previewFile} className="h-[230px
              ] sm:h-[330px] aspect-auto" controls />
              {videoDuration && <p>Video duration: {videoDuration.toFixed(2)} seconds</p>}
            </>
          )}
          <ul>{files}</ul>
          <button
            type="button"
            onClick={open}
            className="flex justify-center text-richblack-100 items-center gap-2"
          >
            Reupload
            <CgSoftwareUpload />
          </button>
        </div>
      ) : (
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div>
            <h4>Files</h4>
          </div>
        </div>
      )}
    </section>
  );
}
