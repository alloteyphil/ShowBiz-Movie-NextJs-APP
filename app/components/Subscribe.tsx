"use client";

import { usePathname } from "next/navigation";

const Subscribe = () => {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname !== "/" ? "border-t-[0.5px] border-themeGray" : ""
      } h-[100px] w-full`}
    >
      Subscribe
    </div>
  );
};

export default Subscribe;
