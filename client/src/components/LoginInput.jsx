import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  type,
  icon,
  inputState,
  inputStateFunc,
  isSignUp,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        focus ? "shadow-md shadow-blue-500" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => {
          inputStateFunc(e.target.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
