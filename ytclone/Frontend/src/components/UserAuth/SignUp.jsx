import React, { useState,useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
 const navigate = useNavigate();
 const [img, setImg] = useState(undefined);
 const [inputs, setInputs]= useState({})
 const [imgPerc, setImgPerc] = useState(0);
 
 const handleChange = e =>{
  setInputs(prev=>{
    return {...prev, [e.target.name]:e.target.value};
  })
 }
 const uploadFile = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setImgPerc(Math.round(progress) )
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
              return {...prev, img: downloadURL };
          })
      });
    }
  )
};

useEffect(()=>{
  img && uploadFile(img);
 },[img])

 
 const handleSignUP = async (e) =>{
  console.log(inputs)
  e.preventDefault();
  const res = await axios.post("/auth/signup",inputs)
  console.log("posted success fully")
  res.status === 200 && navigate('/signin');
 }
 
  return (
    <div className='card bg-black w-screen h-screen z-[100] flex items-center opacity-70 '>
    <div className='mx-auto text-white my-auto card w-96 bg-gray-900 p-10 '>
      <h3 className='card-title mx-auto mb-5'> SignUp to Youtube </h3>
      <Link to="/">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </Link>
         <input
              type="text"
              placeholder="&#128589;username"
              name="name"
              className="input input-bordered input-sm w-full max-w-xs mb-5"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="&#129511;email"
              name="email"
              className="input input-bordered input-sm w-full max-w-xs mb-5"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="&#128274;password"
              name="password"
              className="input input-bordered input-sm w-full max-w-xs "
              onChange={handleChange}
            />
            { imgPerc > 0 ? ("uploading: " + imgPerc+"%") :(
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered   w-full max-w-xs  my-5"
            onChange={(e) => setImg(e.target.files[0])}
          /> )}
      
          <button className="btn btn-block bg-red-700" onClick={handleSignUP}>
            sign UP
          </button>
          
          <p className='mt-5 text-sm mx-auto'>Already have an Account ? <Link to="/signin" className='text-blue-500 hover:text-yellow-300'>Login here.</Link></p>
    </div>
    
    </div>
  )
}

export default SignUp