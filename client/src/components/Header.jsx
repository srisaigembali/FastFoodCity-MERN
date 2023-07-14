import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo1.png";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { buttonClick, slideTop } from "../animations";
import { motion } from "framer-motion";
import { MdLogout, MdShoppingBasket } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../assets/images/avatar.png";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userAction";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6'>
      <NavLink to={"/"} className='flex items-center justify-center gap-4'>
        <img src={Logo} className='w-10' alt='logo' />
        <p className='font-semibold text-2xl me-12'>City</p>
      </NavLink>

      <nav className='flex items-center justify-center gap-8'>
        <ul className='hidden md:flex items-center justify-center gap-8'>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
            onMouseEnter={() => setIsMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
            onMouseEnter={() => setIsMenu(false)}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
            onMouseEnter={() => setIsMenu(false)}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
            onMouseEnter={() => setIsMenu(false)}
          >
            AboutUs
          </NavLink>
        </ul>

        <motion.div
          {...buttonClick}
          className='relative cursor-pointer'
          onMouseEnter={() => setIsMenu(false)}
        >
          <MdShoppingBasket className='text-3xl text-textColor' />
          <div className='w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center absolute -top-4 -right-2'>
            <p className='text-primary text-base font-semibold'>2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className='relative cursor-pointer'
              onMouseEnter={() => {
                setIsMenu(true);
              }}
            >
              <div className='w-12 h-12 -mt-2 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                <motion.img
                  className='w-full h-full object-cover'
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy='no-referrer'
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className='px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4'
                >
                  <Link
                    className=' hover:text-blue-500 text-xl text-textColor'
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>

                  <Link
                    className=' hover:text-blue-500 text-xl text-textColor'
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className=' hover:text-blue-500 text-xl text-textColor'
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className='group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3'
                  >
                    <MdLogout className='text-2xl text-textColor group-hover::text-headingColor' />
                    <p className='text-textColor text-xl group-hover:text-blue-500'>
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className='px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-blue-300 hover:bg-blue-500 hover:text-white cursor-pointer'
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
