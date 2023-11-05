import React, { useEffect, useState } from "react";
import "./Upload.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs,setInputs]= useState({});
  const [tags,setTags] =useState([])

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>{
        return {...prev, [e.target.name]:e.target.value};
    })
  }

  const handleTags=(e) => {
    setTags(e.target.value.split(","));
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      urlType === "imgUrl" ? setImgPerc(Math.round(progress) ): setVideoPerc(Math.round(progress));
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default : 
        break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
            setInputs(prev=>{
                return {...prev,[urlType]: downloadURL };
            })
        });
      }
    )
  };
  

  useEffect(()=>{
   video && uploadFile(video,"videoUrl");
  },[video])
  useEffect(()=>{
   img && uploadFile(img, "imgUrl");
  },[img])
  console.log(inputs)
  const handleUpload = async (e) =>{
    e.preventDefault();

    const res = await axios.post("/videos", {...inputs, tags})
    setOpen(false)
    res.status === 200 && navigate(`/video/${res.data._id}`)

  }
  return (
    <div className="fixed z-[100] bg-black w-full h-full bg-opacity-40">
      <div className="mx-[20rem] my-16 card w-7/12 bg-gray-900 shadow-lg s shadow-neutral-100 ">
        <div className="card-body">
          <div className="flex">
            <h2 className="card-title upload-modal-title mx-auto">
              Upload a New Video
            </h2>
            <button
              className="upload-modal-close "
              onClick={() => setOpen(false)}
            >
              <IoMdCloseCircleOutline size="24" />
            </button>
          </div>
          <div className="mt-8">
            {videoPerc>0 ? ("Uploading: "+videoPerc+"%"): (<input
              type="file"
              accept="video/*"
              className="file-input file-input-bordered  w-10/12 mx-14"
              onChange={(e) => setVideo(e.target.files[0])}
            />)}
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-10/12 mx-14 mt-8 "
              name = "title"
               onChange={handleChange}
            />

            <textarea
              className="textarea textarea-bordered w-10/12 mx-14 mt-8"
              placeholder="Description"
              name = "desc"
              onChange={handleChange}
            ></textarea>
          </div>
          <input
            type="text"
            placeholder="Separate the tags with commas."
            className="input input-bordered w-10/12 mx-14 mt-8 "
            onChange={handleTags}
          />
          { imgPerc > 0 ? ("uploading: " + imgPerc+"%") :(
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered  w-10/12 mx-14 mt-8"
            onChange={(e) => setImg(e.target.files[0])}
          /> )}

          <button className="btn btn-neutral w-5/12 rounded-full hover:bg-slate-50 hover:text-black mx-auto" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
