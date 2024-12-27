"use client";

import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MovieSearchBar = () => {
  const [movieSearchTerm, setMovieSearchTerm] = useState<string>("");

  const { toast } = useToast();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (movieSearchTerm.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter a search keyword",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    if (isPotentialSQLInjection(movieSearchTerm)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    router.push(`/search/movies?query=${movieSearchTerm}&page=1`);
  };

  return (
    <div className="flex">
      <input
        onChange={handleChange}
        value={movieSearchTerm}
        type="text"
        className="w-[250px] p-4 border-[0.5px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
        placeholder="Type here..."
      />
      <button
        onClick={handleSubmit}
        className="border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] text-white font-semibold uppercase p-4"
      >
        Search
      </button>
    </div>
  );
};

export default MovieSearchBar;
