"use client";

import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { usePathname } from "next/navigation";
import { useState } from "react";
import isEmail from "validator/es/lib/isEmail";

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");

  const pathname = usePathname();

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter your email",
        className: "bg-[#111111] border-[0.5px] border-red-400 text-red-400",
      });
      return;
    }

    if (!isEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
        className: "bg-[#111111] border-[0.5px] border-red-400 text-red-400",
      });
      return;
    }

    if (isPotentialSQLInjection(email)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Great!",
      description: "You have successfully subscribed to our newsletter",
      className: "bg-[#111111] border-[0.5px] border-white-400 text-white",
    });
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
          <div className="flex">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              className="w-[450px] p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
              placeholder="Your email address"
            />
            <button
              onClick={handleSubmit}
              className="border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] text-white font-semibold uppercase p-4"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
