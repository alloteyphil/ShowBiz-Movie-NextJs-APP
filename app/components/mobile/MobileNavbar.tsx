"use client";

import { usePathname } from "next/navigation";
import MobileSideBarTrigger from "./MobileSideBarTrigger";
import SearchButton from "../search/SearchButton";
import Link from "next/link";

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isProfilePage = pathname?.includes("/profile");

  const isDetailedPage =
    pathname?.includes("/movie/details") || pathname?.includes("/tv/details");

  return (
    <div
      className={`p-4 md:p-6 flex w-screen items-center justify-between xl:hidden ${isDetailedPage ? "bg-white" : ""}`}
    >
      <div className="flex gap-4 md:gap-6 items-center">
        <MobileSideBarTrigger />
        <Link
          className={`${isDetailedPage ? "text-[#111111]" : "text-white"} text-4xl md:text-5xl font-bold`}
          href={"/"}
        >
          ShowBiz
        </Link>
      </div>
      <div className="flex gap-2 md:gap-6 items-center">
        {children}
        <SearchButton isProfilePage={isProfilePage} />
      </div>
    </div>
  );
};

export default MobileNavbar;
