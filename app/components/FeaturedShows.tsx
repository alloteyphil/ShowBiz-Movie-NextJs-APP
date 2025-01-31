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
    <div className="mt-24 mb-32 text-white flex flex-wrap justify-between gap-y-14">
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
                <div key={show.id} className="w-[270px]">
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
              <div key={show.id} className="w-[270px]">
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
  );
};

export default FeaturedShows;
