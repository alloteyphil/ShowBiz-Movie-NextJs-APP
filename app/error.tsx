"use client";

import Image from "next/image";
import errorImage from "../public/images/error.png";
import Link from "next/link";

const error = () => {
  return (
    <div className="flex flex-col gap-12 max-md:gap-6 text-white w-full max-w-[1400px] mx-auto px-4">
      <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
        <Image
          src={errorImage}
          alt="No results"
          className="w-56 max-md:w-32 object-contain"
          priority
        />
        <p className="text-themeGray text-center w-full text-lg max-md:text-base max-md:px-4">
          Oh no! Something went wrong
        </p>
        <Link
          className="bg-white text-[#111111] rounded-none py-2 px-6 max-md:py-1.5 max-md:px-4 text-base max-md:text-sm hover:bg-white/90 transition-all duration-300"
          href={"/"}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default error;
