import Link from "next/link";
import { NavLinks } from "./NavLinks";
import SearchBar from "./SearchBar";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import User from "./User";

const NavBar = () => {
  return (
    <div className="w-full fixed top-0 z-50 py-10 bg-[#111111]">
      <div className="flex justify-between items-center mx-auto max-w-[1600px]">
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
            <SearchBar />
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
