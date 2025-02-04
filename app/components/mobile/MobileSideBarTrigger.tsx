"use client";

import { useDrawerStore } from "@/store";
import menuIcon from "../../../public/images/bars.png";
import Image from "next/image";

const MobileSideBarTrigger = () => {
  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setMobileMenuOpen);
  return (
    <div
      onClick={() => {
        setOpen(storeState);
      }}
    >
      <Image
        src={menuIcon}
        alt="menu"
        className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
      />
    </div>
  );
};

export default MobileSideBarTrigger;
