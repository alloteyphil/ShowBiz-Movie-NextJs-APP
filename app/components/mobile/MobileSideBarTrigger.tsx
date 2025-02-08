"use client";

import { useDrawerStore } from "@/store";
import menuIcon from "../../../public/images/bars.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import blackBars from "../../../public/images/blackBars.png";

const MobileSideBarTrigger = () => {
  const pathname = usePathname();

  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setMobileMenuOpen);

  const isDetailedPage =
    pathname?.includes("/movie/details") || pathname?.includes("/tv/details");
  return (
    <div
      onClick={() => {
        setOpen(storeState);
      }}
    >
      {isDetailedPage ? (
        <Image
          src={blackBars}
          alt="menu"
          className="cursor-pointer w-6 h-6 md:w-6 md:h-6"
        />
      ) : (
        <Image
          src={menuIcon}
          alt="menu"
          className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
        />
      )}
    </div>
  );
};

export default MobileSideBarTrigger;
