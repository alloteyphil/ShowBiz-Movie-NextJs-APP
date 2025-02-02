import type { TrendingGenreType } from "@/types/genre";
import MovieCard from "./movie/MovieCard";
import TVShowCard from "./tv/TVShowCard";
import { LoaderIcon } from "lucide-react";

const FeaturedShows = async () => {
  let data;

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.IMDB_API_KEY}&language=en-US`,
  );

  if (response.ok) {
    data = await response.json();
  }

  return (
    <div className="max-md:flex max-md:flex-col max-md:gap-8 max-md:px-8 max-md:mt-12">
      <h1 className="text-3xl text-white font-bold md:hidden">Trending</h1>
      <div className="mt-24 max-md:mt-0 mb-32 max-md:mb-12 text-white flex max-md:grid max-md:grid-cols-2 max-md:max-w-[100vw] flex-wrap justify-between gap-y-14 max-md:gap-y-10 max-md:gap-x-4 ">
        {data ? (
          data.results
            .filter(
              (result: TrendingGenreType) =>
                result.poster_path !== null &&
                result.genre_ids !== undefined &&
                (result.original_title !== undefined ||
                  result.name !== undefined ||
                  result.original_name !== undefined),
            )
            .map((show: TrendingGenreType) => {
              if (show.media_type === "tv") {
                return (
                  <div key={show.id} className="w-[270px] max-md:w-full">
                    <TVShowCard
                      image={show.poster_path}
                      title={show.name || show.original_name || "N/A"}
                      genres={show.genre_ids}
                      id={show.id}
                    />
                  </div>
                );
              }
              return (
                <div key={show.id} className="w-[270px] max-md:w-full">
                  <MovieCard
                    image={show.poster_path}
                    title={show.title || show.original_title || "N/A"}
                    genres={show.genre_ids}
                    id={show.id}
                  />
                </div>
              );
            })
        ) : (
          <LoaderIcon
            size={36}
            className="text-white mx-auto my-56 animate-spin"
          />
        )}
      </div>
    </div>
  );
};

export default FeaturedShows;
