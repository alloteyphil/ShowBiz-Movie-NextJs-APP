"use client";

import type { UserResponseType } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { containsNumber } from "@/lib/helpers/containsNumber";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { updateUserName } from "@/actions/profile.actions";
import { useUserProfileStore } from "@/store";

const EditUserProfileName = ({ userData }: { userData: UserResponseType }) => {
  const [userDetails, setUserDetails] = useState<UserResponseType>(userData);

  const [loading, setLoading] = useState<boolean>(false);

  const userState = useUserProfileStore((state) => state);

  const { name, setName } = userState;

  const [user, setUser] = useState<UserResponseType | null>(null);

  const handleSubmit = async () => {
    if (userDetails.fName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your first name",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (userDetails.lName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your last name",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

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

    if (isPotentialSQLInjection(userDetails.fName || userDetails.lName)) {
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
      const res = await updateUserName(
        userDetails.email,
        userDetails.fName,
        userDetails.lName,
      );

      if (res.statusCode === 409) {
        toast({
          title: "Error",
          description: "Both names same as previous",
          className:
            "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);
        return;
      }

      if (res.statusCode === 200) {
        toast({
          title: "Success",
          description: "Name updated successfully",
          className:
            "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });
        const user: UserResponseType | null = JSON.parse(
          localStorage.getItem("user") || "null",
        );
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              fName: userDetails.fName,
            }),
          );
          setName(userDetails.fName, userState);
        }
        setLoading(false);
        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      setLoading(false);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { toast } = useToast();
  return (
    <>
      <input
        type="text"
        value={userDetails.fName}
        onChange={handleChange}
        id="fName"
        placeholder="First Name"
        className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none placeholder:text-themeGray"
      />
      <input
        type="text"
        value={userDetails.lName}
        onChange={handleChange}
        id="lName"
        placeholder="Last Name"
        className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none placeholder:text-themeGray"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-[#111111] grid place-items-center h-16 text-white"
      >
        {loading ? (
          <LoaderCircleIcon size={20} className="animate-spin" />
        ) : (
          "Update Name"
        )}
      </button>
    </>
  );
};

export default EditUserProfileName;
