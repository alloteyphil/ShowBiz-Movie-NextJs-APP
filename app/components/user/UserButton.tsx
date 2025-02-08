"use client";

import { useDrawerStore } from "@/store";
import { UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const UserButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const pathname = usePathname();

  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setAuthDrawerOpen);

  const isDetailedPage =
    pathname?.includes("/movie/details") || pathname?.includes("/tv/details");
  return (
    <div>
      <UserIcon
        onClick={() => {
          setOpen(storeState);
        }}
        size={22}
        className={`cursor-pointer ${isProfilePage ? "text-[#111111]" : "text-white"} ${isDetailedPage ? "max-xl:text-[#111111]" : "max-xl:text-white"}`}
      />
    </div>
  );
};

export default UserButton;
