"use client";

import { storeEmail } from "@/actions/subscribe.action";
import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import type { UserSubscribeDetailsType } from "@/types/subscribe";
import { sendEmail } from "@/utils/sendEmail";
import { LoaderCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import isEmail from "validator/es/lib/isEmail";

const Subscribe = () => {
  const [userDetails, setUserDetails] = useState<UserSubscribeDetailsType>({
    email: "",
    fName: "",
    lName: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname() || "";

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !userDetails.email.trim() ||
      !userDetails.fName.trim() ||
      !userDetails.lName.trim()
    ) {
      toast({
        title: "All fields are required",
        description: "Please enter your first name, last name, and email",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (!isEmail(userDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (
      isPotentialSQLInjection(userDetails.email) ||
      isPotentialSQLInjection(userDetails.fName) ||
      isPotentialSQLInjection(userDetails.lName)
    ) {
      toast({
        title: "Invalid Input",
        description: "Detected potentially harmful input",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    try {
      setLoading(true);

      const emailResponse = await sendEmail(
        userDetails.email,
        userDetails.fName,
        userDetails.lName,
      );

      if (emailResponse.status === "error") {
        toast({
          title: "Error",
          description: "Could not send the email. Please try again.",
          className:
            "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);
        return;
      }

      const savedSubscriber = await storeEmail(
        userDetails.email,
        userDetails.fName,
        userDetails.lName,
      );

      if (savedSubscriber?.statusCode === 409) {
        toast({
          title: "Already Subscribed",
          description: "You are already subscribed to our newsletter.",
          className:
            "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
      } else if (savedSubscriber?.statusCode === 200) {
        toast({
          title: "Success!",
          description: "You have successfully subscribed to our newsletter.",
          className:
            "bg-green-200 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });

        setUserDetails({ email: "", fName: "", lName: "" });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          className:
            "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        !pathname.includes("details") ? "border-t-[0.5px] border-themeGray" : ""
      } w-full text-sm`}
    >
      <div className="max-w-[1600px] w-full max-md:w-screen mx-auto py-36 max-md:py-12 md:py-24 lg:py-36 flex max-md:flex-col max-md:gap-8 md:gap-12 lg:gap-16 max-md:px-4 md:px-8 lg:px-12 justify-between items-center">
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-3xl md:text-4xl lg:text-3xl font-bold text-white">
            Subscribe to our Newsletter
          </h3>
          <p className="text-themeGray max-w-[600px] max-md:hidden md:text-base lg:text-sm">
            Stay in the loop with ShowBiz, your ultimate movie app! Discover the
            latest blockbusters, timeless classics, and hidden gems tailored to
            your taste. Get insider news, exclusive updates, and personalized
            recommendations delivered straight to your inbox. Subscribe to the
            ShowBiz newsletter today and never miss a moment of movie magic!
            🎥🍿
          </p>
        </div>
        <div className="flex flex-col max-md:w-full text-themeGray">
          <div className="flex w-[450px] max-md:w-full md:w-[400px] lg:w-[450px] flex-col gap-4">
            <div className="flex max-md:flex-col gap-2 max-md:gap-4">
              <input
                onChange={handleChange}
                value={userDetails.fName}
                type="text"
                id="fName"
                className="w-[225px] max-md:w-full md:w-[195px] lg:w-[220px] rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray max-md:placeholder:text-sm md:text-base lg:text-sm focus:outline-none"
                placeholder="Your first name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <input
                onChange={handleChange}
                value={userDetails.lName}
                type="text"
                id="lName"
                className="w-[225px] max-md:w-full md:w-[195px] lg:w-[220px] rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray max-md:placeholder:text-sm md:text-base lg:text-sm focus:outline-none"
                placeholder="Your last name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <input
              onChange={handleChange}
              value={userDetails.email}
              type="email"
              id="email"
              className="p-4 border-[0.5px] rounded-none border-themeGray bg-[#111111] text-white placeholder:text-themeGray max-md:placeholder:text-sm md:text-base lg:text-sm focus:outline-none"
              placeholder="Your email address"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center border-[0.5px] h-14 text-white font-semibold uppercase p-4 md:text-base lg:text-sm"
            >
              {loading ? (
                <LoaderCircleIcon size={20} className="animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
