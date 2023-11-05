import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "../../axios";

const EditUserdetails = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [img, setImg] = useState(undefined);

  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
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
            return { ...prev, img: downloadURL };
          });
        });
      }
    );
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    const res = await axios.put(`/users/${currentUser._id}`, inputs);

    const fetchUser = await axios.get(`/api/users/find/${currentUser._id}`);
    alert("userdetails updated susscessfully");
    dispatch(fetchSuccess(fetchUser.data));
  };

  useEffect(() => {
    img && uploadFile(img);
  }, [img]);

  return (
    <>
      <div className="  modal-box z-[200] bg-slate-900  ms-[64rem] mt-[5rem] overflow-hidden w-[25rem]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg p-5">Edit a current user</h3>

        <input
          type="text"
          placeholder="&#128589;username"
          name="name"
          value={currentUser.name}
          className="input input-bordered input-sm w-full max-w-xs mb-5"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="&#129511;email"
          name="email"
          value={currentUser.email}
          className="input input-bordered input-sm w-full max-w-xs mb-5"
          onChange={handleChange}
        />

        {imgPerc > 0 ? (
          "uploading: " + imgPerc + "%"
        ) : (
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered   w-full max-w-xs  "
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}

        <button
          className="btn btn-neutral w-5/12 rounded-full hover:bg-slate-50 hover:text-black mx-20 mt-5"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default EditUserdetails;
