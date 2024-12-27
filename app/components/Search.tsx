"use client";

import { useState } from "react";
import SearchMovies from "./SearchMovies";
import SearchTV from "./SearchTV";

const Search = () => {
  const [view, setView] = useState<string>("movie");

  return (
    <div className="flex flex-col gap-20 text-[#111111] w-[1200px] items-center">
      <div className="flex gap-12">
        <h3
          onClick={() => setView("movie")}
          className={`text-6xl font-bold cursor-pointer ${
            view === "movie" ? "text-[#111111]" : "text-[#111111]/20"
          }`}
        >
          Movies
        </h3>
        <h3
          onClick={() => setView("tv-show")}
          className={`text-6xl font-bold cursor-pointer ${
            view === "tv-show" ? "text-[#111111]" : "text-[#111111]/20"
          }`}
        >
          TV Shows
        </h3>
      </div>
      {view === "movie" ? <SearchMovies /> : <SearchTV />}
    </div>
  );
};

export default Search;
