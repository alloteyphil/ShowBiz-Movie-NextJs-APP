import Image from "next/image";
import _ from "lodash";
import Link from "next/link";
import { movieGenreData } from "@/data/genresData";
import { LoaderIcon } from "lucide-react";
import type { TrendingGenreType } from "@/types/genre";

const Header = async () => {
  let data;

  let shuffleData;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`,
    { cache: "no-store" }
  );

  if (response.ok) {
    data = await response.json();
    shuffleData = _.shuffle(data.results);
  }

  return (
    <div className="grid grid-cols-2 pt-[120px] h-[700px]">
      {data ? (
        shuffleData?.slice(0, 2).map((movie: TrendingGenreType) => (
          <div
            key={movie.id}
            className="relative w-full overflow-hidden group cursor-pointer"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={movie.original_title || movie.original_name || ""}
            />
            <div className="absolute top-16 left-16 flex flex-col gap-3 z-20">
              <h3 className="text-white text-3xl font-bold">
                {movie.original_title}
              </h3>
              <p className="text-lg text-themeGray ">
                {movie.genre_ids
                  .map(
                    (genre) => movieGenreData.find((g) => g.id === genre)?.name
                  )
                  .join(", ")}
              </p>
            </div>
            <Link
              href={`/movie/details/${movie.id}`}
              className="text-sm text-white absolute -bottom-10 right-16 transition group-hover:-translate-y-[100px] duration-700 z-20 ease-in-out hover:underline"
            >
              See More
            </Link>
            <div className="absolute inset-0 w-full h-full bg-black/40 z-10 transition group-hover:opacity-100 opacity-0 ease-in-out duration-700" />
          </div>
        ))
      ) : (
        <div className="w-full grid place-items-center h-full">
          <LoaderIcon size={36} className="text-white animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Header;
