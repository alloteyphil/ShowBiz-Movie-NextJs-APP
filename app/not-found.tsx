"use client";

import Image from "next/image";
import notFoundImage from "../public/images/not-found.png";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-12 max-md:gap-6 text-white w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col min-h-screen gap-4 w-full xl:justify-center items-center">
        <Image
          src={notFoundImage}
          alt="Not Found"
          className="w-40 sm:w-48 md:w-52 lg:w-56 max-md:w-32 object-contain max-md:mt-48 max-xl:mt-64"
          priority
        />
        <p className="text-themeGray text-center w-full max-w-md text-lg sm:text-xl max-md:text-base max-md:px-4">
          Oh no! We couldn't find what you were looking for
        </p>
        <button
          className="bg-white text-[#111111] rounded-none py-2 px-6 max-md:py-1.5 max-md:px-4 text-base sm:text-lg max-md:text-sm hover:bg-white/90 transition-all duration-300"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
