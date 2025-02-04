"use client";

import { useState } from "react";
import SearchMovies from "./SearchMovies";
import SearchTV from "./SearchTV";

const Search = () => {
  const [view, setView] = useState<string>("movie");

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] lg:max-w-[800px] px-4 md:px-8 lg:px-0 gap-5 md:gap-10 lg:gap-20 text-[#111111]">
      <div className="flex gap-4 md:gap-8 lg:gap-12">
        <h3
          onClick={() => setView("movie")}
          className={`
        cursor-pointer font-bold 
        text-2xl md:text-4xl lg:text-6xl
        ${view === "movie" ? "text-[#111111]" : "text-[#111111]/20"}
      `}
        >
          Movie
        </h3>
        <h3
          onClick={() => setView("tv-show")}
          className={`
        cursor-pointer font-bold 
        text-2xl md:text-4xl lg:text-6xl 
        ${view === "tv-show" ? "text-[#111111]" : "text-[#111111]/20"}
      `}
        >
          TV Show
        </h3>
      </div>
      {view === "movie" ? <SearchMovies /> : <SearchTV />}
    </div>
  );
};

export default Search;
