"use client";

import type { UserInputType } from "@/types/user";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [userDetails, setUserDetails] = useState<UserInputType>({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    if (userDetails.fName === "") {
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <label htmlFor="fName">First Name</label>
        <input
          onChange={handleChange}
          type="text"
          id="fName"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="lName">Last Name</label>
        <input
          onChange={handleChange}
          type="text"
          id="lName"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email Address</label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-[#111111] py-4 text-white"
      >
        Register
      </button>
      <div className="flex justify-center gap-1 text-xs">
        <p>By signing up you agree to our </p>
        <Link href={"#"} className="underline">
          terms & conditions
        </Link>{" "}
        and{" "}
        <Link href={"#"} className="underline">
          {" "}
          privacy policy
        </Link>
      </div>
    </div>
  );
};

export default Register;
