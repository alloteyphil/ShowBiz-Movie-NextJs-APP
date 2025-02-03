"use client";

import { usePathname } from "next/navigation";
import MobileSideBarTrigger from "./MobileSideBarTrigger";
import SearchButton from "../search/SearchButton";
import Link from "next/link";

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isProfilePage = pathname?.includes("/profile");

  return (
    <div className="p-4 flex w-screen items-center justify-between md:hidden">
      <div className="flex gap-4 items-center">
        <MobileSideBarTrigger />
        <Link className="text-white text-2xl font-bold" href={"/"}>
          ShowBiz
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {children}
        <SearchButton isProfilePage={isProfilePage} />
      </div>
    </div>
  );
};

export default MobileNavbar;
