import React from "react";
import { BsDot } from "react-icons/bs";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
const ChannelVideos = ({ channelVideo, currentUser }) => {
  const navigate = useNavigate();
  const handleClick = (channelVideo) => {
    navigate(`/video/${channelVideo._id}`);
  };
  return (
    <div
      className="card w-9/12 h-44 shadow-xl mr-10 mb-10 ml-60 bg-black text-white hover:shadow-sm hover:shadow-orange-200 hover:rounded-none"
      onClick={() => handleClick(channelVideo)}
    >
      <div className="flex">
        <img
          src={channelVideo.imgUrl}
          className="w-96 h-44 rounded-lg bg-gray-900"
          alt="Movie"
        />

        <h2 className="card-title  ms-3 -mt-28 text-xl ">
          {channelVideo.title.length > 65
            ? channelVideo.title.substring(0, 65) + "..."
            : channelVideo.title}
        </h2>
      </div>
      <div className="-mt-7">
        <div className="flex ">
          <div className="avatar">
            <div className=" ms-[25rem] w-12 h-12 -mt-[5rem] rounded-full">
              <img src={currentUser.img} />
            </div>
          </div>
          <h2 className=" mx-2 -mt-[4.5rem] text-lg ">{currentUser.name}</h2>
        </div>
        <h2 className="text-sm  -mt-[2rem] ms-[28.5rem] flex  ">
          {channelVideo.Views} views <BsDot size="24" />{" "}
          {format(channelVideo.createdAt)}
        </h2>
      </div>
    </div>
  );
};

export default ChannelVideos;
