"use client";

import { useState } from "react";
import Login from "../user/Login";
import Register from "../user/Register";

const Auth = () => {
  const [view, setView] = useState<string>("login");

  return (
    <div className="flex flex-col gap-20 max-md:gap-10 text-[#111111] w-[650px] max-md:w-screen max-md:px-12 items-center">
      <div className="flex gap-12 max-md:gap-6">
        <h3
          onClick={() => setView("login")}
          className={`text-6xl max-md:text-2xl font-bold cursor-pointer ${
            view === "login" ? "text-[#111111]" : "text-[#111111]/20"
          }`}
        >
          Login
        </h3>
        <h3
          onClick={() => setView("register")}
          className={`text-6xl max-md:text-2xl font-bold cursor-pointer ${
            view === "register" ? "text-[#111111]" : "text-[#111111]/20"
          }`}
        >
          Register
        </h3>
      </div>
      {view === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
