"use client";

import { useStore } from "@/store";
import { UserIcon } from "lucide-react";

const UserButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const storeState = useStore((state) => state);

  const setOpen = useStore((state) => state.setAuthDrawerOpen);
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
