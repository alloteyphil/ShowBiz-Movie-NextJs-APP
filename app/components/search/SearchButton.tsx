"use client";

import { useDrawerStore } from "@/store";
import { SearchIcon } from "lucide-react";

const SearchButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const storeState = useDrawerStore((state) => state);

  const setSearch = useDrawerStore((state) => state.setSearchDrawerOpen);

  return (
    <div>
      <SearchIcon
        onClick={() => {
          setSearch(storeState);
        }}
        size={22}
        className={`cursor-pointer w-5 ${isProfilePage ? "text-[#111111]" : "text-white"}`}
      />
    </div>
  );
};

export default SearchButton;
