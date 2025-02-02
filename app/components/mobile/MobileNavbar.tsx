"use client";

import { usePathname } from "next/navigation";
import UserButton from "../user/UserButton";
import MobileSideBarTrigger from "./MobileSideBarTrigger";
import SearchButton from "../search/SearchButton";

const MobileNavbar = () => {
  const pathname = usePathname();

  const isProfilePage = pathname?.includes("/profile");

  return (
    <div className="p-4 flex w-screen items-center justify-between md:hidden">
      <div className="flex gap-4 items-center">
        <MobileSideBarTrigger />
        <h1 className="text-white text-2xl font-bold">ShowBiz</h1>
      </div>
      <div className="flex gap-4 items-center">
        <UserButton isProfilePage={isProfilePage} />
        <SearchButton isProfilePage={isProfilePage} />
      </div>
    </div>
  );
};

export default MobileNavbar;
