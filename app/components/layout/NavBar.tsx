"use client";

import Link from "next/link";
import { NavLinks } from "./NavLinks";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SearchButton from "../search/SearchButton";

const NavBar = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const pathname = usePathname();

  const isDetailedPage =
    pathname?.includes("/movie/details") || pathname?.includes("/tv/details");

  const isProfilePage = pathname?.includes("/profile");

  return (
    <div
      className={`w-full top-0 z-50 py-6 ${
        !isDetailedPage
          ? isProfilePage
            ? "bg-white border-b-[0.5px] border-themeGray absolute"
            : "bg-[#111111] fixed"
          : "bg-transparent absolute border-b-[0.5px] border-themeGray left-1/2 -translate-x-1/2 mx-auto max-w-[1600px]"
      }`}
    >
      <div
        className={`flex justify-between items-center mx-auto max-w-[1600px]`}
      >
        <Link
          href={"/"}
          className={`${isProfilePage ? "text-[#111111]" : "text-white"} text-4xl font-black cursor-pointer`}
        >
          ShowBiz
        </Link>
        <div className="flex items-center gap-16">
          <div className="flex gap-4">
            <NavLinks isProfilePage={isProfilePage} />
          </div>
          <div className="flex gap-4 items-center">
            {children}
            <SearchButton isProfilePage={isProfilePage} />
          </div>
          <div
            className={`flex gap-4 ${isProfilePage ? "text-[#111111]" : "text-white"}`}
          >
            <Link href="#">
              <FacebookIcon size={14} className="cursor-pointer" />
            </Link>
            <Link href="#">
              <TwitterIcon size={14} className="cursor-pointer" />
            </Link>
            <Link href="#">
              <InstagramIcon size={14} className="cursor-pointer" />
            </Link>
            <Link href="#">
              <YoutubeIcon size={14} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
