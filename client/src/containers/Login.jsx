import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import LoginBg from "../assets/images/loginbg.jpg";
import Logo from "../assets/images/logo.png";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signinWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((usercred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
          });
        }
      });
    });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt="login background"
      />

      {/* content box */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md px-6 py-8 gap-6">
        {/* top logo */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="logo" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>
        {/* welcome text */}
        <p className="text-headingColor font-semibold text-3xl -mt-2">
          Welcome Back
        </p>
        <p className="text-textColor font-semibold text-xl -mt-6">
          {isSignUp ? "Sign up" : "Sign in"} with following
        </p>
        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder="Email Here"
            type="email"
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder="Password Here"
            type="password"
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder="Confirm Password Here"
              type="password"
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              isSignUp={isSignUp}
            />
          )}

          {isSignUp ? (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          ) : (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          )}

          <motion.button
            {...buttonClick}
            className="w-full px-4 py-2 bg-blue-500 rounded-lg cursor-pointer text-white text-xl hover:bg-blue-600 transition-all duration-75"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1.5px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1.5px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md rounded-3xl cursor-pointer gap-4"
          onClick={signinWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign in with google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
