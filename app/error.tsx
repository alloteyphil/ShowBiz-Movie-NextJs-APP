"use client";

import Image from "next/image";
import errorImage from "../public/images/error.png";
import Link from "next/link";

const error = () => {
  return (
    <div className="flex flex-col gap-24  text-white w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-4 min-h-screen w-full justify-center items-center">
        <Image src={errorImage} alt="No results" className="w-56" />
        <p className="text-themeGray text-center w-full">
          Oh no! Something went wrong
        </p>
        <Link
          className="bg-white text-[#111111] rounded-none py-2 px-3"
          href={"/"}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default error;
