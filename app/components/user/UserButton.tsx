"use client";

import { useDrawerStore } from "@/store";
import { UserIcon } from "lucide-react";

const UserButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setAuthDrawerOpen);
  return (
    <div>
      <UserIcon
        onClick={() => {
          setOpen(storeState);
        }}
        size={22}
        className={`cursor-pointer ${isProfilePage ? "text-[#111111]" : "text-white"}`}
      />
    </div>
  );
};

export default UserButton;
