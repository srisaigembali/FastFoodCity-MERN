import React, { useEffect, useState } from "react";
import LoginInput from "../components/LoginInput";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import LoginBg from "../assets/images/loginbg.jpg";
import Logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userAction";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
    //eslint-disable-next-line
  }, [user]);

  const signinWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmail = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required fields should not be empty!"));
    } else if (password === confirmPassword) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };

  const signInWithEmail = async () => {
    if (email === "" || password === "") {
      dispatch(alertWarning("Required fields should not be empty!"));
    } else {
      setEmail("");
      setPassword("");
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    }
  };

  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
      {/* background image */}
      <img
        src={LoginBg}
        className='w-full h-full object-cover absolute top-0 left-0'
        alt='login background'
      />

      {/* content box */}
      <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md px-6 py-8 gap-6'>
        {/* top logo */}
        <div className='flex items-center justify-start gap-4 w-full'>
          <img src={Logo} className='w-8' alt='logo' />
          <p className='text-headingColor font-semibold text-2xl'>City</p>
        </div>
        {/* welcome text */}
        <p className='text-headingColor font-semibold text-3xl -mt-2'>
          Welcome Back
        </p>
        <p className='text-textColor font-semibold text-xl -mt-6'>
          {isSignUp ? "Sign up" : "Sign in"} with following
        </p>
        {/* input section */}
        <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
          <LoginInput
            placeHolder='Email Here'
            type='email'
            icon={<FaEnvelope className='text-xl text-textColor' />}
            inputState={email}
            inputStateFunc={setEmail}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder='Password Here'
            type='password'
            icon={<FaLock className='text-xl text-textColor' />}
            inputState={password}
            inputStateFunc={setPassword}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder='Confirm Password Here'
              type='password'
              icon={<FaLock className='text-xl text-textColor' />}
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
                className='text-blue-600 cursor-pointer'
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
                className='text-blue-600 cursor-pointer'
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          )}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className='w-full px-4 py-2 bg-blue-500 rounded-lg cursor-pointer text-white text-xl hover:bg-blue-600 transition-all duration-75'
              onClick={signUpWithEmail}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className='w-full px-4 py-2 bg-blue-500 rounded-lg cursor-pointer text-white text-xl hover:bg-blue-600 transition-all duration-75'
              onClick={signInWithEmail}
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className='flex items-center justify-between gap-16'>
          <div className='w-24 h-[1.5px] rounded-md bg-white'></div>
          <p className='text-white'>or</p>
          <div className='w-24 h-[1.5px] rounded-md bg-white'></div>
        </div>

        <motion.div
          {...buttonClick}
          className='flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md rounded-3xl cursor-pointer gap-4'
          onClick={signinWithGoogle}
        >
          <FcGoogle className='text-3xl' />
          <p className='capitalize text-base text-headingColor'>
            Sign in with google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
