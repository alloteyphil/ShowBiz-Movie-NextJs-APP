"use client";

import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { useDrawerStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchMovies = () => {
  const [search, setSearch] = useState<string>("");

  const { toast } = useToast();

  const router = useRouter();

  const storeState = useDrawerStore((state) => state);

  const setSearchDrawer = useDrawerStore((state) => state.setSearchDrawerOpen);

  const handleSearch = () => {
    if (search.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter a search keyword",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    if (isPotentialSQLInjection(search)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    setSearchDrawer(storeState);

    router.push(`/search/movie?query=${search}&page=1`);
  };

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10 fadeIn">
      <input
        type="text"
        className="
      w-full 
      border-b border-themeGray 
      py-2 md:py-3 lg:py-4 xl:py-5
      focus:outline-none 
      placeholder:text-themeGray placeholder:font-light 
      placeholder:text-xl md:placeholder:text-2xl lg:placeholder:text-3xl xl:placeholder:text-4xl
      text-xl md:text-2xl lg:text-3xl xl:text-4xl
      text-[#111111] text-center
    "
        placeholder="Type here to search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="text-darkAsh w-full text-center text-xs md:text-sm lg:text-base xl:text-lg">
        Press enter or return to begin your search
      </p>
    </div>
  );
};

export default SearchMovies;
