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
    { cache: "no-store" },
  );

  if (response.ok) {
    data = await response.json();
    shuffleData = _.shuffle(data.results).slice(0, 2);
  }

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 pt-[88.5px] max-lg:pt-0 md:h-[500px] lg:h-[700px] max-sm:h-[300px]">
      {data ? (
        shuffleData?.map((movie: TrendingGenreType, i: number) => (
          <div
            key={movie.id}
            className={`relative w-full overflow-hidden group cursor-pointer ${i === 1 ? "max-md:hidden" : ""}`}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={
                movie.title ||
                movie.name ||
                movie.original_title ||
                movie.original_name ||
                ""
              }
            />
            <div className="absolute lg:top-16 md:top-12 max-md:bottom-8 lg:left-16 md:left-12 max-md:left-8 flex flex-col gap-3 max-md:gap-1 z-20 max-md:max-w-[250px]">
              <h3 className="text-white text-3xl max-md:text-2xl font-bold max-lg:hidden">
                {movie.title || movie.original_title || "N/A"}
              </h3>
              <Link
                className="text-white text-3xl max-md:text-2xl font-bold lg:hidden"
                href={`/movie/details/${movie.id}`}
              >
                {movie.title || movie.original_title || "N/A"}
              </Link>
              <p className="text-base text-themeGray max-md:text-sm max-md:leading-tight">
                {movie.genre_ids
                  .map(
                    (genre) => movieGenreData.find((g) => g.id === genre)?.name,
                  )
                  .join(", ")}
              </p>
            </div>

            <Link
              href={`/movie/details/${movie.id}`}
              className="text-sm text-white absolute -bottom-10 right-16 transition group-hover:-translate-y-[100px] duration-700 z-20 ease-in-out hover:underline max-lg:hidden"
            >
              See More
            </Link>

            <div className="absolute inset-0 w-full h-full bg-black/40 z-10 transition group-hover:opacity-100 opacity-0 ease-in-out duration-700" />
          </div>
        ))
      ) : (
        <>
          <div className="w-full grid place-items-center h-full">
            <LoaderIcon size={36} className="text-white animate-spin" />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
