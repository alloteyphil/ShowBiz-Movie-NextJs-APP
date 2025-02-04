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
    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:pt-0 h-[700px] max-md:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[700px]">
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
            <div className="absolute max-md:bottom-8 md:top-[15%] lg:top-[18%] xl:top-[20%] max-md:left-8 md:left-12 lg:left-16 xl:left-20 flex flex-col gap-3 max-md:gap-1 z-20 max-w-[80%] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-none">
              <h3 className="text-white text-3xl xl:text-4xl font-bold leading-tight hidden lg:block">
                {movie.title || movie.original_title || "N/A"}
              </h3>
              <Link
                href={`/movie/details/${movie.id}`}
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold block lg:hidden"
              >
                {movie.title || movie.original_title || "N/A"}
              </Link>

              <p className="text-base text-themeGray">
                {movie.genre_ids
                  .map(
                    (genre) => movieGenreData.find((g) => g.id === genre)?.name,
                  )
                  .join(", ")}
              </p>
            </div>
            <Link
              href={`/movie/details/${movie.id}`}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white absolute -bottom-10 md:right-8 lg:right-12 xl:right-16 transition group-hover:-translate-y-[100px] duration-700 z-20 ease-in-out hover:underline max-xl:hidden"
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
          <div className="w-full grid place-items-center h-full">
            <LoaderIcon size={36} className="text-white animate-spin" />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
