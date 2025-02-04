"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { movieGenreData, tvGenreData } from "@/data/genresData";
import { usePathname, useRouter } from "next/navigation";

export const GenreMovieSelect = () => {
  const pathname = usePathname();

  const router = useRouter();

  const genreId = pathname?.split("/").pop();
  return (
    <Select defaultValue={genreId}>
      <SelectTrigger className="w-[180px] md:hidden max-md:w-full rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white focus:outline-none">
        <SelectValue
          placeholder="Select a genre"
          className="placeholder:text-themeGray"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#111111] text-white rounded-none border-[0.5px] border-themeGray">
        {movieGenreData.map((genre, i) => (
          <SelectItem
            key={i}
            onClick={() => router.push(`/genre/movie/${genre.id}?page=1`)}
            className="py-2 rounded-none"
            value={genre.id.toString()}
          >
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const GenreTvSelect = () => {
  const pathname = usePathname();

  const router = useRouter();

  const genreId = pathname?.split("/").pop();
  return (
    <Select defaultValue={genreId}>
      <SelectTrigger className="w-[180px] md:hidden max-md:w-full rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white focus:outline-none">
        <SelectValue
          placeholder="Select a genre"
          className="placeholder:text-themeGray"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#111111] text-white rounded-none border-[0.5px] border-themeGray">
        {tvGenreData.map((genre, i) => (
          <SelectItem
            key={i}
            onClick={() => router.push(`/genre/tv/${genre.id}?page=1`)}
            className="py-2 rounded-none"
            value={genre.id.toString()}
          >
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const GeneralGenreMovieSelect = () => {
  const router = useRouter();

  return (
    <Select>
      <SelectTrigger className="w-[180px] md:hidden max-md:w-full rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white focus:outline-none">
        <SelectValue
          placeholder="Select a genre"
          className="placeholder:text-themeGray"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#111111] text-white rounded-none border-[0.5px] border-themeGray">
        {movieGenreData.map((genre, i) => (
          <SelectItem
            key={i}
            onClick={() => router.push(`/genre/movie/${genre.id}?page=1`)}
            className="py-2 rounded-none"
            value={genre.id.toString()}
          >
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const GeneralGenreTvSelect = () => {
  const router = useRouter();

  return (
    <Select>
      <SelectTrigger className="w-[180px] md:hidden max-md:w-full rounded-none p-4 border-[0.5px] border-themeGray bg-[#111111] text-white focus:outline-none">
        <SelectValue
          placeholder="Select a genre"
          className="placeholder:text-themeGray"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#111111] text-white rounded-none border-[0.5px] border-themeGray">
        {tvGenreData.map((genre, i) => (
          <SelectItem
            key={i}
            onClick={() => router.push(`/genre/tv/${genre.id}?page=1`)}
            className="py-2 rounded-none"
            value={genre.id.toString()}
          >
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
