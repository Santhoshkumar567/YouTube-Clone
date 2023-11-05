
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { format } from "timeago.js";
import {BsFillTrash3Fill} from "react-icons/bs"
const Comment = ({ comment ,removeComment}) => {
  const [channel, setChannel] = useState({});
  

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `/users/find/${comment.userId}`
      );
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);
  
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/comments/${comment._id}`);

      // If the delete operation was successful, remove the comment from the state
      if (res.status === 200) {
        removeComment(comment._id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="ml-5 pt-5 px-2 w-10/12  rounded-xl hover:bg-neutral-500  hover:text-black duration-200">
      <div className=" my-3 flex ">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={channel.img} />
          </div>
        </div>
        <h2 className="mx-2 text-xs">{channel.name}</h2>
        <h2 className="text-xs">{format(comment.createdAt)}</h2>
      </div>
      <div className="flex ">
      <p className="text-sm mb-10 ml-14 -mt-10 w-full">{comment.desc}</p>
      <a className ="-mt-10 ml-10 hover:text-red-600"   onClick={handleDelete}><BsFillTrash3Fill size="20" /></a>
      </div>
    </div>
  );
};

export default Comment;
