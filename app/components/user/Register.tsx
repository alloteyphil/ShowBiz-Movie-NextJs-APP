"use client";

import type { UserInputType } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { containsNumber } from "@/lib/helpers/containsNumber";
import isEmail from "validator/es/lib/isEmail";
import { validateRegisterPassword } from "@/lib/helpers/validateRegisterPassword";
import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from "lucide-react";
import registerUser from "@/actions/registerUser.actions";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { useRouter } from "next/navigation";
import { useDrawerStore } from "@/store";

const Register = () => {
  const [userDetails, setUserDetails] = useState<UserInputType>({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [reEnteredPassword, setReEnteredPassword] = useState<string>("");

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { toast } = useToast();

  const router = useRouter();

  const storeState = useDrawerStore((state) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Validate First Name
    if (userDetails.fName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your first name",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Last Name
    if (userDetails.lName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your last name",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Name for Numbers
    if (
      containsNumber(userDetails.fName) ||
      containsNumber(userDetails.lName)
    ) {
      toast({
        title: "Invalid Name",
        description: "Name cannot contain numbers",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Email
    if (userDetails.email.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your email",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Email Format
    if (!isEmail(userDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Password
    if (userDetails.password.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your password",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Re-entered Password
    if (reEnteredPassword.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please re-enter your password",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Password Length
    if (userDetails.password.length < 6) {
      toast({
        title: "Short Password",
        description: "Password must be at least 6 characters long",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Password Strength
    if (!validateRegisterPassword(userDetails.password)) {
      toast({
        title: "Weak Password",
        description:
          "Password must contain at least one letter, one number and one special character",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Validate Password Match
    if (userDetails.password.trim() !== reEnteredPassword.trim()) {
      toast({
        title: "Password Mismatch",
        description: "Please re-enter your password correctly",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Check for SQL Injection Attempts
    if (
      isPotentialSQLInjection(
        userDetails.fName ||
          userDetails.lName ||
          userDetails.email ||
          userDetails.password,
      )
    ) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    // Register User
    try {
      setLoading(true);
      const response = await registerUser(
        userDetails.fName,
        userDetails.lName,
        userDetails.email,
        userDetails.password,
      );

      // Handle Duplicate User
      if (response?.statusCode === 409) {
        toast({
          title: "User already exists",
          description: "An account with this email already been registered",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);
        return;
      }

      // Successful Registration
      toast({
        title: "Successfully!",
        description: "Your account has successfully been registered",
        className:
          "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
      });

      const storedUser = localStorage.setItem(
        "user",
        JSON.stringify(response?.user),
      );

      setLoading(false);

      setUserDetails({
        fName: "",
        lName: "",
        email: "",
        password: "",
      });

      setReEnteredPassword("");

      storeState.setAuthDrawerOpen(storeState);

      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Registration error:", errorMessage);
      toast({
        title: "Registration Failed",
        description:
          "An unexpected error occurred during registration. Please try again.",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-md:gap-4 w-full fadeIn">
      <div className="flex flex-col gap-4">
        <label htmlFor="fName">First Name</label>
        <input
          onChange={handleChange}
          value={userDetails.fName}
          type="text"
          id="fName"
          className="w-full max-md:py-3 p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="lName">Last Name</label>
        <input
          onChange={handleChange}
          value={userDetails.lName}
          type="text"
          id="lName"
          className="w-full max-md:py-3 p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email Address</label>
        <input
          onChange={handleChange}
          value={userDetails.email}
          type="email"
          id="email"
          className="w-full max-md:py-3 p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-4 relative">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={userDetails.password}
          type={passwordVisible ? "text" : "password"}
          id="password"
          className="w-full max-md:py-3 p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
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
            className="absolute max-md:w-4 right-4 top-[58px] max-md:top-[55px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute max-md:w-4 right-4 top-[58px] max-md:top-[55px] cursor-pointer"
            size={20}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 relative">
        <label htmlFor="password">Re-enter Password</label>
        <input
          onChange={(e) => setReEnteredPassword(e.target.value)}
          value={reEnteredPassword}
          type={passwordVisible ? "text" : "password"}
          id="re-password"
          className="w-full max-md:py-3 p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
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
            className="absolute max-md:w-4 right-4 top-[58px] max-md:top-[55px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute max-md:w-4 right-4 top-[58px] max-md:top-[55px] cursor-pointer"
            size={20}
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full grid place-items-center bg-[#111111] h-16 max-md:h-12 text-white"
      >
        {loading ? (
          <LoaderCircleIcon size={20} className="animate-spin" />
        ) : (
          "Register"
        )}
      </button>
      <div className="flex justify-center gap-1 text-xs max-md:hidden">
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
      <p className="text-xs md:hidden text-center">
        By signing up you agree to our{" "}
        <span className="underline">terms & conditions</span> and{" "}
        <span className="underline">privacy policy</span>
      </p>
    </div>
  );
};

export default Register;
