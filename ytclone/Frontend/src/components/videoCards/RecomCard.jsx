import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
const RecomCard = ({ video }) => {
  const navigate = useNavigate();
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `/users/find/${video.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  
  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div className="card w-96 shadow-xl mr-10 mb-10" onClick={handleClick}>
      <div className="flex">
        <img
          src={video.imgUrl}
          className="w-48 h-32 rounded-lg bg-gray-900"
          alt="Movie"
        />

        <h2 className="card-title text-sm ms-3 -mt-16  ">
          {video.title.length > 25
            ? video.title.substring(0, 25) + "..."
            : video.title}
        </h2>
      </div>
      <h2 className="ms-[12.7rem] text-neutral-400 -mt-14 text-xs ">
        {channel.name}
      </h2>
      <h2 className="text-xs text-neutral-400 ms-[12.7rem] ">
        {video.Views} views <span>{format(video.createdAt)}</span>
      </h2>
    </div>
  );
};

export default RecomCard;
