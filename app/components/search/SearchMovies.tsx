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
    <div className="w-full flex flex-col gap-6 max-md:gap-4 fadeIn">
      <input
        type="text"
        className="w-full border-b-[0.5px] border-themeGray py-10 max-md:py-2 focus:outline-none placeholder:text-themeGray placeholder:text-5xl placeholder:font-light text-5xl max-md:text-2xl text-[#111111] text-center max-md:placeholder:text-2xl"
        placeholder="Type here to search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="text-darkAsh w-full text-center max-md:text-xs">
        Press enter or return to begin your search
      </p>
    </div>
  );
};

export default SearchMovies;
