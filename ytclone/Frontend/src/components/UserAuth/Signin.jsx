import React, { useState } from "react";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "/auth/signin",
        { name, password },
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
  return (
    <div className='card bg-black w-screen h-screen z-[100] flex items-center opacity-70 '>
      <div className="card w-80 mx-auto mt-36 bg-neutral-700 shadow-xl  text-white">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-extrabold">Sign in</h2>
          <p className="text-xl">to continue to YouTube</p>
          <Link to="/">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </Link>
          <div>
            <input
              type="text"
              placeholder="&#128589;username"
              className="input input-bordered input-sm w-full max-w-xs mb-5"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="&#128274;password"
              className="input input-bordered input-sm w-full max-w-xs mb-5"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="card-actions ">
              <button
                className="btn btn-block  mx-auto bg-red-700"
                onClick={handleLogin}
              >
                signIn
              </button>
            </div>
          </div>
          <h2 className="text-2x font-extrabold"> OR</h2>
          <button
            className="btn btn-block bg-red-700"
            onClick={signInWithGoogle}
          >
            <FcGoogle size="24" /> Sign in with Google
          </button>

          <div className="text-white">
            Don't have an account ?
            <Link to="signup" className="text-blue-400">
            <span className="hover:text-yellow-200 mx-2">signUp</span>  
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
