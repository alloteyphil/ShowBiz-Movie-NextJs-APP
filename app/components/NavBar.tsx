"use client";

import Link from "next/link";
import { NavLinks } from "./NavLinks";
import SearchButton from "./SearchButton";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import User from "./User";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const isDetailedPage =
    pathname.includes("/movie/details") || pathname.includes("/tv/details");

  return (
    <div
      className={`w-full top-0 z-50 py-10 ${
        !isDetailedPage
          ? "bg-[#111111] fixed"
          : "bg-transparent mx-auto max-w-[1600px] absolute border-b-[0.5px] border-themeGray left-1/2 -translate-x-1/2"
      }`}
    >
      <div
        className={`flex justify-between items-center mx-auto max-w-[1600px]`}
      >
        <Link
          href={"/"}
          className="text-white text-4xl font-black cursor-pointer"
        >
          ShowBiz
        </Link>
        <div className="flex items-center gap-16">
          <div className="flex gap-4">
            <NavLinks />
          </div>
          <div className="flex gap-4 items-center">
            <User />
            <SearchButton />
          </div>
          <div className="flex gap-4">
            <Link href="#">
              <FacebookIcon size={14} className="cursor-pointer" color="#fff" />
            </Link>
            <Link href="#">
              <TwitterIcon size={14} className="cursor-pointer" color="#fff" />
            </Link>
            <Link href="#">
              <InstagramIcon
                size={14}
                className="cursor-pointer"
                color="#fff"
              />
            </Link>
            <Link href="#">
              <YoutubeIcon size={14} className="cursor-pointer" color="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
