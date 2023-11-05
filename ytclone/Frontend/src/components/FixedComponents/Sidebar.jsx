import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SideBarItems } from "../../constants/data";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { HiOutlineFire } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {RiAccountCircleLine} from "react-icons/ri"
import {LuUserSquare2} from "react-icons/lu";
import {AiFillLike} from "react-icons/ai";
const Sidebar = () => {
  
  const dispatch = useDispatch();
  const handleLogut = () => {
    dispatch(logout());
  };
  return (
    <div className=" w-52 bg-black h-[42.8rem] mt-14 fixed top-0 left-0 text-white p-3 custom-scrollbar overflow-y-scroll">
      <div className="mb-4">
        <Link to="/">
          <div className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 ">
            <span className="mr-3">
              <AiFillHome size="18" />
            </span>
            Home
          </div>
        </Link>
        <Link to="trends">
          <div className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 ">
            <span className="mr-3">
              <HiOutlineFire size="18" />
            </span>
            Trending
          </div>
        </Link>
        <Link to="subcriptions">
          <div className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 ">
            <span className="mr-3">
              <MdOutlineSubscriptions size="18" />
            </span>
            subcriptions
          </div>
        </Link>
        <Link to="likedvideos">
          <div className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 ">
            <span className="mr-3">
              <AiFillLike size="18" />
            </span>
            likedvideos
          </div>
        </Link>
      </div>
      <hr className="text-slate-800" />
      <Link to="userdetails">
          <div className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 mt-1 ">
            <span className="mr-3">
              <LuUserSquare2 size="18" />
            </span>
            Your Channel
          </div>
        </Link>
    
      <div className="mb-4">

        {SideBarItems.Top.map((item, index) => (
          <div
            key={index}
            className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 "
            
          >
            <span className="mr-3">{item.icon({ size: 18 })}</span>
            {item.name}
          </div>
        ))}
      </div>
      <hr className="bg-neutral-900" />
      <div className="my-4">
        {SideBarItems.Middle.map((item, index) => (
          <div
            key={index}
            className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 "
          >
            <span className="mr-3">{item.icon({ size: 18 })}</span>
            {item.name}
          </div>
        ))}
      </div>
      <hr className="bg-neutral-900 " />
      <div className="my-4">
        {SideBarItems.Bottom.map((item, index) => (
          <div
            key={index}
            className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1"
          >
            <span className="mr-3">
              {item.icon({ size: 18, color: "red" })}
            </span>
            {item.name}
          </div>
        ))}
        <hr className="bg-neutral-900" />
        <div className="my-4">
          {SideBarItems.Last.map((item, index) => (
            <div
              key={index}
              className="h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 "
            >
              <span className="mr-3">{item.icon({ size: 18 })}</span>
              {item.name}
            </div>
          ))}
          <Link to="/signin">
          <div
              className='h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1'
            >
              <span className="mr-3">
                <RiAccountCircleLine size="18" />
              </span>
              Change Account
            </div>
          </Link>
          <Link to="/">
            <div
              className={`h-8 flex justify-start px-3 rounded-xl items-center text-sm cursor-pointer hover:bg-slate-900 my-1 `}
              onClick={handleLogut}
            >
              <span className="mr-3">
                <AiOutlineLogout size="18" />
              </span>
              Logout
            </div>
          </Link>
        </div>
        <hr className="bg-neutral-900 " />
        <a href="https://policies.google.com/privacy?hl=en">
          <div className="h-8 flex justify-start p-3 rounded-xl items-center cursor-pointer text-sm ">
            <p className="mt-40 text-xs font-bold text-neutral-600">
              About Press Copyright <br />
              Contact us Creators <br />
              Advertise Developers <br />
              <br />
              TermsPrivacyPolicy & SafetyHow <br />
              YouTube works <br />
              Test new features
              <br />
              <br />© 2023 Google LLC
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
