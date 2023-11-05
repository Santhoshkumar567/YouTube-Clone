import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "../../axios";
const Card = ({ type, video }) => {
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

  if (!channel) {
    return ; // You can replace this with a loading indicator
  }
  //fo
  return (

    <Link to={`/video/${video._id}`}>
      <div
        className="card w-96 bg-black text-white shadow-sm my-2 
      hover:rounded-none duration-100 hover:shadow-sm hover:shadow-slate-400"
      >
        <figure className="h-44 w-96 bg-slate-300">
          <img type={type} src={video.imgUrl} alt={video.title} width="390" />
        </figure>
        <div className="card-body p-2">
          <div className="flex">
            <div className="avatar">
              <div className="w-12  rounded-full">
                <img type={type} src={channel.img} />
              </div>
            </div>
            <p className="ms-3 mb-3">
              {video.title.length > 35
                ? video.title.substring(0, 35) + "..."
                : video.title}{" "}
            </p>
          </div>
          <h3 className="ms-14 -mt-8 opacity-70">{channel.name}</h3>

          <p className="ms-14 -mt-2 opacity-70">
            {video.Views} views : {format(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );


};

export default Card;
