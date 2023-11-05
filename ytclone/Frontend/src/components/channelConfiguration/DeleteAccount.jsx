import React from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
const DeleteAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/users/${currentUser._id}`);

      dispatch(logout());
      res.status = 200 && navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="modal-box w-72 p-5 mx-[34rem] my-[15rem] bg-black shadow-gray-600 shadow-2xl">
      <h3 className="font-bold text-lg">Delete a Channel</h3>
      <p className="">Click to delete a Channel permenantly</p>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn mx-2 bg-green-700 hover:bg-green-100 hover:text-black">
            Cancel
          </button>
        </form>
        <button
          className="btn  mx-2 bg-red-700 hover:bg-red-100 hover:text-black "
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
