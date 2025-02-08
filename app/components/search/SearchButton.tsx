"use client";

import { useDrawerStore } from "@/store";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const SearchButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const pathname = usePathname();

  const storeState = useDrawerStore((state) => state);

  const setSearch = useDrawerStore((state) => state.setSearchDrawerOpen);

  const isDetailedPage =
    pathname?.includes("/movie/details") || pathname?.includes("/tv/details");

  return (
    <SearchIcon
      onClick={() => {
        setSearch(storeState);
      }}
      size={22}
      className={`cursor-pointer w-5 ${isProfilePage ? "text-[#111111]" : "text-white"} ${isDetailedPage ? "max-xl:text-[#111111]" : "max-xl:text-white"}`}
    />
  );
};

export default SearchButton;
