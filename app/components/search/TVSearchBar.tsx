"use client";

import { useToast } from "@/hooks/use-toast";
import { isPotentialSQLInjection } from "@/lib/helpers/possibleSqlInjections";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TVSearchBar = () => {
  const [tvSearchTerm, setTvSearchTerm] = useState<string>("");

  const { toast } = useToast();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTvSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (tvSearchTerm.trim() === "") {
      toast({
        title: "Field is required",
        description: "Please enter a search keyword",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    if (isPotentialSQLInjection(tvSearchTerm)) {
      toast({
        title: "Invalid Field(s)",
        description: "Please enter a valid input",
        className: "bg-white text-[#111111] border-[0.5px] border-[#111111]",
      });
      return;
    }

    router.push(`/search/tv?query=${tvSearchTerm}&page=1`);

    setTvSearchTerm("");
  };

  return (
    <div className="flex">
      <input
        onChange={handleChange}
        value={tvSearchTerm}
        type="text"
        className="w-[250px] p-4 max-md:p-2 border-[0.5px] max-md:h-[40px] border-themeGray bg-[#111111] text-white placeholder:text-themeGray focus:outline-none"
        placeholder="Type here..."
      />
      <button
        onClick={handleSubmit}
        className="border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] text-white font-semibold uppercase max-md:text-sm px-2"
      >
        Search
      </button>
    </div>
  );
};

export default TVSearchBar;
