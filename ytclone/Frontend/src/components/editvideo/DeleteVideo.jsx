
import React from 'react';
import axios from "../../axios"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteVideo = () => {

const { currentVideo } = useSelector((state) => state.video);
const navigate = useNavigate();
const  handleDelete = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.delete(`/videos/${currentVideo._id}`)
        res.status === 200 && navigate("/")
    }catch(err){
        console.error(err)
    }
}
  return (
   <div className='modal-box w-72 p-5 mx-[34rem] my-[15rem] bg-black shadow-gray-600 shadow-2xl'>
     <h3 className="font-bold text-lg">Delete a Video</h3>
    <p className="">Click to delete a video permenantly</p>
    <div className="modal-action">
        
      <form method="dialog">
        <button className="btn mx-2 bg-green-700 hover:bg-green-100 hover:text-black">Cancel</button>
       
      </form>
      <button className="btn  mx-2 bg-red-700 hover:bg-red-100 hover:text-black " onClick={handleDelete}>delete</button>
    
    </div>
    </div>
  )
}

export default DeleteVideo