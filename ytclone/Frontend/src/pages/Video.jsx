import React, { useEffect, useState } from "react";

// import axios from "axios";
import "../components/UploadVideo/Upload.css";
import axios from "../axios"
import Comments from "../components/videoComments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSuccess, incrementViews } from "../redux/videoSlice";
import { format } from "timeago.js";

import Recomdation from "../components/videoCards/Recomdation";

import Videonav from "../components/SinglevidComp/Videonav"



const Video = () => {
  const { currentVideo } = useSelector((state) => state.video);
  console.log(currentVideo)
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const [channelSub, SetChannelSub] = useState(0);
  const [content, setContent] = useState("");
  const path = useLocation().pathname.split("/")[2];
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `/videos/find/${path}`
        );
       
        setContent(window.location.href);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        
        setChannel(channelRes.data);
        SetChannelSub(channelRes.data.subscribers);
        dispatch(fetchSuccess(videoRes.data));
        addView()
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);


  const addView = async()=>{
    const res = await axios.put(`/videos/view/${path}`)
    dispatch(incrementViews(1))
  }
  
  if (!currentVideo) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }
  




  
  

  return (
    <>
      <div className="bg-black text-white ml-64 mt-20 relative custom-scrollbar ">
        <div className="grid">
          <div className="col-start-1 col-end-7">
            <video
              src={currentVideo.videoUrl}
              controls
              className="w-11/12"
            ></video>
            <h2 className="text-xl w-10/12">{currentVideo.title}</h2>
            <Videonav
              channel={channel}
              channelSub={channelSub}
              content={content}
              currentVideo={currentVideo}
              SetChannelSub={SetChannelSub}
            />
            <div className="bg-gray-900 w-11/12 rounded-box p-5 ">
              <h2 className=" ">
                {currentVideo.Views} views . <span className="text-white opacity-75"> {format(currentVideo.createdAt)}</span>
              </h2>
              <p className="my-2 text-blue-500 hover:text-red-500 ">{currentVideo.tags.map(tag => `#${tag}`).join(",")}</p>
              <p className="my-2">{currentVideo.desc}</p>
            </div>
            <div className="">
              <Comments videoId={currentVideo._id} />
            </div>
          </div>
          <div className="col-start-8 col-end-13">
        
            <Recomdation tags={currentVideo.tags} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
