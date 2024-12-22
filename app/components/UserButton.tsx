"use client";

import { useStore } from "@/store";
import { UserIcon } from "lucide-react";

const UserButton = () => {
  const storeState = useStore((state) => state);

  const setOpen = useStore((state) => state.setAuthDrawerOpen);
  return (
    <div>
      <UserIcon
        onClick={() => {
          setOpen(storeState);
        }}
        size={22}
        className="cursor-pointer"
        color="#fff"
      />
    </div>
  );
};

export default UserButton;
