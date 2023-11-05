
import React, { useState, useEffect } from "react";
import axios from "../../axios"
import { useDispatch, useSelector } from "react-redux";


import ChannelVideos from "./ChannelVideos";
import EditUserdetails from "../channelConfiguration/EditUserdetails";
import DeleteAccount from "../channelConfiguration/DeleteAccount";
const ChannelInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [channelVideos, setChannelVideos] = useState([]);
 

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await axios.get(
        `/users/userdetails/${currentUser._id}`
      );
      setChannelVideos(res.data.userVideos);
    };
    fetchUserDetails();
  }, [currentUser]);



  return (
    <>
  
      <div className="card  bg-black mt-24 ml-60">
        <div className="flex">
          <div className="avatar">
            <div className="w-44 rounded-full">
              <img src={currentUser.img} />
            </div>
          </div>
          <div className="text-white">
            <p className="text-5xl font-extrabold  mx-8">{currentUser.name}</p>
            <p className="my-4 mx-10">
              {currentUser.subscribers} subcribers . {channelVideos.length}{" "}
              videos
            </p>
            
            <button className="btn btn-neutral ml-8 rounded-full hover:text-black hover:bg-slate-100 -mb-[26rem]"   
            onClick={() =>document.getElementById("channelEdit").showModal()}>
              Customize Channel
            </button>
            <dialog id="channelEdit" className="modal ">
                    <EditUserdetails />
              </dialog>
              
              
              <button className="btn btn-neutral  rounded-full hover:text-black hover:bg-slate-100 -mt-[25rem] ml-16"   
            onClick={() =>document.getElementById("DeleteChannel").showModal()}>
              Delete Channel
            </button>
            <dialog id="DeleteChannel" className="modal ">
                    <DeleteAccount />
              </dialog>
              
           
          </div>
        </div>
      </div>
     
        
      <hr className="text-slate-800 w-10/12 my-5 ml-60" />
      {ChannelVideos &&   channelVideos.map((channelVideo) => (
        <ChannelVideos key={channelVideo._id}  currentUser={currentUser} channelVideo={channelVideo}/> 
      ))}
    
    </>
  );
};

export default ChannelInfo;
