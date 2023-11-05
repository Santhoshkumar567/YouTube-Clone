import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { yt } from "../../assests/index";
import { BiVideoPlus, BiSolidBellRing } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiUserCircle } from "react-icons/bi";
import Upload from "../UploadVideo/Upload";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);



 
 
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-black text-white p-0  fixed z-[10]">
            <div className="flex-none ">
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1  ">
              <Link to="/">
                <span>
                  <img src={yt} className="w-24  bg-black" />
                </span>
              </Link>
              <div className="join ms-36">
                <input
                  className="input  join-item ms-5 border-neutral-800 shadow-xl bg-black rounded-s-full text-white w-[30rem] input-sm"
                  placeholder="Search"
                
                  onChange={(e) => setQ(e.target.value)}
                />
                <span className="btn btn-outline border-neutral-700 btn-sm join-item rounded-r-full bg-neutral-700 text-white">
                  <BsSearch
                    size="12"
                    onClick={() => navigate(`/search?q=${q}`)}
                  />
                </span>
              </div>
              <span>
                <button className="ms-2"   >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
              </span>
            </div>
           

            <div className="flex-none hidden lg:block">
              <ul className="menu-horizontal">
                {/* Navbar menu content here */}

                {currentUser ? (
                  <>
                    <li onClick={() => setOpen(true)}>
                      <BiVideoPlus
                        size={22}
                        className="bg-black text-white rounded-full mt-1 mx-4 "
                      />
                    </li>
                    <li>
                      <BiSolidBellRing
                        size={22}
                        className="bg-black text-white rounded-full mt-1 mr-3"
                      />
                    </li>
                    <li>
                      <div className="avatar">
                        <div className="w-6 rounded-full bg-gray-600 mr-3 mt-0.5">
                          <img src={currentUser.img} />
                        </div>
                      </div>
                    </li>
                    <li className="me-7 ">{currentUser.name}</li>
                  </>
                ) : (
                  <Link to="signin">
                    <button className="btn btn-outline btn-sm bg-orange-700 rounded-xl text-base me-7">
                      <BiUserCircle size="18" />
                      signin
                    </button>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
