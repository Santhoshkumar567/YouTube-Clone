import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "../../axios";
import {BsSendFill} from "react-icons/bs"
const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `/comments/${videoId}`
        );

        // Reverse the comments array and set it in reversed order
        setComments(res.data.reverse());
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleSend = async () => {
    try {
      const res = await axios.post("/comments", {
        videoId,
        desc,
      });

      setTimeout(() => {
        setDesc("");
      }, 0.01);

      const fetchNewComments = await axios.get(
        `/comments/${videoId}`
      );
      const newComment =
        fetchNewComments.data[fetchNewComments.data.length - 1];

      // Add the new comment to the beginning of the comments array
      setComments([newComment, ...comments]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeComment = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };


  return (
    <>
      <p className="my-2 ml-2">{comments.length} comments</p>
      <div className="flex mt-5">
        <div className="avatar">
          <div className="w-12  rounded-full">
            <img src={currentUser.img} alt="User Avatar" />
          </div>
        </div>
        <input
          className="ml-2 w-9/12  mt-2 bg-transparent input input-xs text-white "
          type="text"
          placeholder="Add a comment..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <a className="mb-2 ml-10 text-xl hover:text-gray-500 hover:text-2xl" onClick={handleSend}>
          <BsSendFill  />
        </a>
      </div>
      <hr className="text-slate-800 mb-10 ml-14 -mt-4  w-10/12 hr" />

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} removeComment={removeComment} />
      ))}
    </>
  );
};

export default Comments;
