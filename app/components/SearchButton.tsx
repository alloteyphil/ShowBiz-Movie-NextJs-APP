"use client";

import { useStore } from "@/store";
import { SearchIcon } from "lucide-react";

const SearchButton = ({
  isProfilePage,
}: {
  isProfilePage: boolean | undefined;
}) => {
  const storeState = useStore((state) => state);

  const setSearch = useStore((state) => state.setSearchDrawerOpen);

  return (
    <div>
      <SearchIcon
        onClick={() => {
          setSearch(storeState);
        }}
        size={22}
        className={`cursor-pointer ${isProfilePage ? "text-[#111111]" : "text-white"}`}
      />
    </div>
  );
};

export default SearchButton;
