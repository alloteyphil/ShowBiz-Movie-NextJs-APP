"use client";

import {
  checkUserPassword,
  updateUserPassword,
} from "@/actions/profile.actions";
import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { validateRegisterPassword } from "@/lib/helpers/validateRegisterPassword";
import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

type PasswordChangeType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditUserProfilePassword = ({ email }: { email: string }) => {
  const [passwordData, setPasswordData] = useState<PasswordChangeType>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (passwordData.currentPassword.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your current password",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (passwordData.newPassword.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your new password",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (passwordData.confirmNewPassword.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please confirm your new password",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (
      isPotentialSQLInjection(
        passwordData.currentPassword ||
          passwordData.newPassword ||
          passwordData.confirmNewPassword,
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

    try {
      setLoading(true);
      const res = await checkUserPassword(email, passwordData.currentPassword);

      if (res?.statusCode === 401) {
        toast({
          title: "Unauthorized",
          description: "Current password is incorrect. Please try again",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);
        return;
      }

      if (res?.statusCode === 200) {
        if (passwordData.currentPassword === passwordData.newPassword) {
          toast({
            title: "Same Password",
            description: "Please enter a different password",
            className:
              "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
          });
          setLoading(false);
          return;
        }

        if (passwordData.newPassword.length < 6) {
          toast({
            title: "Short Password",
            description: "Password must be at least 6 characters long",
            className:
              "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
          });
          setLoading(false);
          return;
        }

        if (!validateRegisterPassword(passwordData.newPassword)) {
          toast({
            title: "Weak Password",
            description:
              "Password must contain at least one letter, one number and one special character",
            className:
              "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
          });
          setLoading(false);
          return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
          toast({
            title: "Passwords do not match",
            description: "Please enter matching passwords",
            className:
              "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
          });
          setLoading(false);
          return;
        }

        const changePassword = await updateUserPassword(
          email,
          passwordData.newPassword,
        );

        if (changePassword.statusCode === 200) {
          toast({
            title: "Password Updated",
            description: "Password updated successfully",
            className:
              "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
          });
          setLoading(false);
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          return;
        }

        toast({
          title: "Error",
          description: "An error occurred. Please try again",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          onChange={handleChange}
          value={passwordData.currentPassword}
          id="currentPassword"
          placeholder="Current Password"
          className="w-full p-4 max-md:py-3 border-[0.3px] border-[#111111]/40 focus:outline-none placeholder:text-themeGray"
        />

        {passwordVisible ? (
          <EyeIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        )}
      </div>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          onChange={handleChange}
          value={passwordData.newPassword}
          id="newPassword"
          placeholder="New Password"
          className="w-full p-4 max-md:py-3 border-[0.3px] border-[#111111]/40 focus:outline-none placeholder:text-themeGray"
        />
        {passwordVisible ? (
          <EyeIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        )}
      </div>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          onChange={handleChange}
          value={passwordData.confirmNewPassword}
          id="confirmNewPassword"
          placeholder="Confirm New Password"
          className="w-full p-4 max-md:py-3 border-[0.3px] border-[#111111]/40 focus:outline-none placeholder:text-themeGray"
        />
        {passwordVisible ? (
          <EyeIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        ) : (
          <EyeClosedIcon
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            className="absolute right-4 top-[20px] cursor-pointer"
            size={20}
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#111111] grid place-items-center h-16 max-md:h-12 text-white"
      >
        {loading ? (
          <LoaderCircleIcon size={20} className="animate-spin" />
        ) : (
          "Update Password"
        )}
      </button>
    </>
  );
};

export default EditUserProfilePassword;
