"use client";

import { usePathname } from "next/navigation";
import MobileSideBarTrigger from "./MobileSideBarTrigger";
import SearchButton from "../search/SearchButton";
import Link from "next/link";

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isProfilePage = pathname?.includes("/profile");

  return (
    <div className="p-4 md:p-6 flex w-screen items-center justify-between lg:hidden">
      <div className="flex gap-4 md:gap-6 items-center">
        <MobileSideBarTrigger />
        <Link className="text-white text-4xl md:text-5xl font-bold" href={"/"}>
          ShowBiz
        </Link>
      </div>
      <div className="flex gap-4 md:gap-6 items-center">
        {children}
        <SearchButton isProfilePage={isProfilePage} />
      </div>
    </div>
  );
};

export default MobileNavbar;
