"use client";

import { useStore } from "@/store";
import { SearchIcon } from "lucide-react";

const SearchButton = () => {
  const storeState = useStore((state) => state);

  const setSearch = useStore((state) => state.setSearchDrawerOpen);

  return (
    <div>
      <SearchIcon
        onClick={() => {
          setSearch(storeState);
        }}
        size={22}
        className="cursor-pointer"
        color="#fff"
      />
    </div>
  );
};

export default SearchButton;
