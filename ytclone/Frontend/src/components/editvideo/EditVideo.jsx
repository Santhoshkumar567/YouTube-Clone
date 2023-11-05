import React, { useEffect, useState } from "react";
import "../UploadVideo/Upload.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "../../axios"

import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess} from "../../redux/videoSlice";
const EditVideo = () => {
  const { currentVideo } = useSelector((state) => state.video);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  


  const dispatch = useDispatch();

 const [inputs, setInputs] = useState({
    title: currentVideo.title, // Set the title from currentVideo
    desc: currentVideo.desc,   // Set the desc from currentVideo
  });
  const [tags, setTags] = useState(""); // Initialize tags as an empty string

  // Update the tags state when currentVideo changes
  useEffect(() => {
    setTags(currentVideo.tags.join(','));
  }, [currentVideo]);
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

 

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `/videos/${currentVideo._id}`,
      { ...inputs, tags }
    );

    const fetchvideo = await axios.get(
      `/videos/find/${currentVideo._id}`
    );

    dispatch(fetchSuccess(fetchvideo.data));
  };

  return (
    <div className="  modal-box z-[200] bg-black  ms-[64rem] mt-[5rem] overflow-hidden">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg">Edit a current video</h3>

      <div className="mt-8">
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <input
            type="file"
            accept="video/*"
            className="file-input file-input-bordered  w-10/12 mx-14 bg-black"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-10/12 mx-14 mt-8 bg-black"
          name="title"
            value={inputs.title}
          onChange={handleChange}
        />

        <textarea
          className="textarea textarea-bordered w-10/12 mx-14 mt-8 bg-black"
          placeholder="Description"
          name="desc"
            value={inputs.desc}
          onChange={handleChange}
        ></textarea>
      </div>
      <input
        type="text"
        placeholder="Separate the tags with commas."
         value={tags} 
        className="input input-bordered w-10/12 mx-14 mt-8 bg-black"
        onChange={handleTags}
      />
      {imgPerc > 0 ? (
        "uploading: " + imgPerc + "%"
      ) : (
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered  w-10/12 mx-14 mt-8 bg-black"
          onChange={(e) => setImg(e.target.files[0])}
        />
      )}

      <button
        className="btn btn-neutral w-5/12 rounded-full hover:bg-slate-50 hover:text-black mx-36 mt-5"
        onClick={handleEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default EditVideo;
