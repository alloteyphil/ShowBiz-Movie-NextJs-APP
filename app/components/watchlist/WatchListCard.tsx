import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../../../public/images/no-image.png";
import { watchListGenre } from "@/data/genresData";

const WatchListCard = ({
  id,
  photo,
  genres,
  title,
  type,
}: {
  id: number;
  photo: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  title: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col gap-8 items-center group">
      <Link
        href={`/${type}/details/${id}`}
        prefetch={true}
        className="w-full h-[400px] overflow-hidden cursor-pointer"
      >
        <Image
          width={270}
          height={400}
          src={
            photo !== null
              ? `https://image.tmdb.org/t/p/original${photo}`
              : noImage
          }
          alt={title}
          className="object-cover w-full h-full object-center transition group-hover:scale-125 duration-700 ease-in-out"
        />
      </Link>
      <div className="flex flex-col gap-2 text-center max-w-[250px] text-wrap">
        <Link
          href={`/${type}/details/${id}`}
          prefetch={true}
          className="text-lg font-semibold cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-sm text-themeGray">
          {genres
            .map((genre) => watchListGenre.find((g) => g.id === genre.id)?.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default WatchListCard;
