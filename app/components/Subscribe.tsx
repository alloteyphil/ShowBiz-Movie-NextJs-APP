"use client";

import { sendEmail, storeEmail } from "@/actions/subscribe.action";
import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import type { UserSubscribeDetailsType } from "@/types/subscribe";
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
    if (userDetails.email.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your email",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (userDetails.fName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your name",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (userDetails.lName.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your name",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (!isEmail(userDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (
      isPotentialSQLInjection(
        userDetails.email || userDetails.fName || userDetails.lName,
      )
    ) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await sendEmail(
        userDetails.email,
        userDetails.fName,
        userDetails.lName,
      );

      if (response.status === "error") {
        toast({
          title: "Error",
          description: "An error occurred while subscribing to our newsletter",
          className:
            "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);

        return response.message;
      }

      const savedSubscriber:
        | {
            statusCode: number;
            message: string;
            subscriber: UserSubscribeDetailsType | null;
          }
        | undefined = await storeEmail(
        userDetails.email,
        userDetails.fName,
        userDetails.lName,
      );

      if (savedSubscriber?.statusCode === 409) {
        toast({
          title: "Already subscribed",
          description: "You have already subscribed to our newsletter",
          className:
            "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
        });
        setLoading(false);

        return;
      }

      if (savedSubscriber?.statusCode === 200) {
        toast({
          title: "Great!",
          description: "You have successfully subscribed to our newsletter",
          className:
            "bg-green-200 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });
        setLoading(false);

        setUserDetails({
          email: "",
          fName: "",
          lName: "",
        });

        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong. Please try again",
        className:
          "bg-red-200 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });

      return;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
    }
  };

  return (
    <div
      className={`${
        !pathname.includes("details") ? "border-t-[0.5px] border-themeGray" : ""
      } w-full`}
    >
      <div className="w-[1600px] mx-auto py-36 flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold text-white">
            Subscribe to our Newsletter
          </h3>
          <p className="text-themeGray max-w-[600px]">
            Stay in the loop with ShowBiz, your ultimate movie app! Discover the
            latest blockbusters, timeless classics, and hidden gems tailored to
            your taste. Get insider news, exclusive updates, and personalized
            recommendations delivered straight to your inbox. Subscribe to the
            ShowBiz newsletter today and never miss a moment of movie magic!
            🎥🍿
          </p>
        </div>
        <div className="flex flex-col text-themeGray">
          <div className="flex w-[450px] flex-col gap-4">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                value={userDetails.fName}
                type="text"
                id="fName"
                className="w-[225px] p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
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
                className="w-[225px] p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
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
              className="p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
              placeholder="Your email address"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center border-[0.5px] h-14 text-white font-semibold uppercase p-4"
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
