import React, { useState } from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { subscription } from "../../redux/userSlice";
import { like, dislike } from "../../redux/videoSlice";
import { PiShareFatLight } from "react-icons/pi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa6";
import Share from "../SinglevidComp/Share";
import EditVideo from "../editvideo/EditVideo";
import DeleteVideo from "../editvideo/DeleteVideo";
const Videonav = ({
  currentVideo,
  content,
  channel,
  channelSub,
  SetChannelSub,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  //for dislikes
  const handleDislike = async () => {
    await axios.put(
      `/users/dislike/${currentVideo._id}`
    );
    dispatch(dislike(currentUser._id));
  };

  //for video channel subscribers and current user subscribed user
  const handleSub = async () => {
    if (currentUser.subscribedusers.includes(channel._id)) {
      await axios.put(`/users/unsub/${channel._id}`);
    } else {
      await axios.put(`/users/sub/${channel._id}`);
    }
    const fetchSubcribers = await axios.get(
      `/users/find/${channel._id}`
    );
    SetChannelSub(fetchSubcribers.data.subscribers);
    dispatch(subscription(channel._id));
  };

  return (
    <>
      <div className="navbar w-9/12">
        {channel && (
          <div className="my-5 flex-1">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={channel.img} />
              </div>
            </div>
            <h2 className="mx-2 w-32">
              {channel.name}
              <br />
              <span>{channelSub} subscribers</span>
            </h2>
            <button className="btn rounded-full btn-sm mr-2">join</button>
            <button
              className="btn rounded-full btn-sm mr-2"
              onClick={handleSub}
            >
              {currentUser.subscribedusers?.includes(channel._id)
                ? "Subscribed"
                : "Subscribe"}
            </button>
          </div>
        )}

        <div className="flex-none ">
          <div className="btn-join ml-44">
            <button
              className="btn btn-sm  rounded-s-full "
              onClick={handleLike}
            >
              {currentVideo.likes?.includes(currentUser._id) ? (
                <FaThumbsUp size="24" />
              ) : (
                <FaRegThumbsUp size="24" />
              )}
              {currentVideo.likes?.length}
            </button>
            <button
              className="btn btn-sm  rounded-e-full"
              onClick={handleDislike}
            >
              {currentVideo.dislikes?.includes(currentUser._id) ? (
                <FaThumbsDown size="24" />
              ) : (
                <FaRegThumbsDown size="24" />
              )}
            </button>
          </div>

          <button
            className="btn btn-sm  rounded-full ml-2 mr-2"
            onClick={() => document.getElementById("share").showModal()}
          >
            <PiShareFatLight size="24" /> share
          </button>
          <dialog id="share" className="modal">
            <Share content={content} />
          </dialog>

        
          {currentVideo.userId === currentUser._id && (
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn m-1 rounded-full btn-sm">
                <HiEllipsisHorizontal />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-lg text-white  w-40 "
              >
                <>
                  <li
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <p>
                      <FiEdit size="18" className="" /> Edit
                    </p>
                  </li>
                  <dialog id="my_modal_3" className="modal">
                    <EditVideo />
                  </dialog>
                </>
                <li
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <p>
                    <RiDeleteBin6Line size="20" />
                    Delete
                  </p>

                  <dialog id="my_modal_1" className="modal bg-black">
                    <DeleteVideo />
                  </dialog>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Videonav;
