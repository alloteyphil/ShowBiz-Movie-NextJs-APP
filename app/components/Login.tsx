"use client";

import { loginUser } from "../../actions/Login.actions";
import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { useStore } from "@/store";
import type { UserLoginType } from "@/types/user";
import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import isEmail from "validator/es/lib/isEmail";

const Login = () => {
  const [userDetails, setUserDetails] = useState<UserLoginType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { toast } = useToast();

  const storeState = useStore((state) => state);

  const handleSubmit = async () => {
    // Validate Email
    if (userDetails.email.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your email",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // Validate Password
    if (userDetails.password.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your password",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // Validate Email Format
    if (!isEmail(userDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // Check for SQL Injection Attempts
    if (isPotentialSQLInjection(userDetails.email || userDetails.password)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // Login User
    try {
      setLoading(true);
      const response = await loginUser(userDetails.email, userDetails.password);

      if (response.statusCode === 400) {
        toast({
          title: "Field(s) missing",
          description: "Please enter your email and password",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      if (response.statusCode === 404) {
        toast({
          title: "User not found",
          description: "An account with this email does not exist",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      if (response.statusCode === 401) {
        toast({
          title: "Incorrect Password",
          description: "Please enter the correct password",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      if (response.statusCode === 500) {
        toast({
          title: "Internal Server Error",
          description: "Please try again later",
          className: "bg-red-500 text-white",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Successfully Logged In",
        description: "You have successfully logged in",
        className: "bg-green-400 text-white",
      });

      localStorage.setItem("user", JSON.stringify(response.response));

      setLoading(false);

      setUserDetails({
        email: "",
        password: "",
      });

      storeState.setAuthDrawerOpen(storeState);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          value={userDetails.email}
          onChange={handleChange}
          id="email"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <div className="flex flex-col relative gap-4">
        <label htmlFor="password">Password</label>
        <input
          type={passwordVisible ? "text" : "password"}
          value={userDetails.password}
          onChange={handleChange}
          id="password"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        {passwordVisible ? (
          <EyeIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[58px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[58px] cursor-pointer"
            size={20}
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-[#111111] grid place-items-center h-16 text-white"
      >
        {loading ? (
          <LoaderCircleIcon size={20} className="animate-spin" />
        ) : (
          "Login"
        )}
      </button>
      <div className="flex justify-center gap-1 text-xs">
        <p>By signing in you agree to our </p>
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

export default Login;
