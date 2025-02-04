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
    <div className="px-4 md:px-8 lg:px-16 mt-12">
      <h1 className="text-3xl text-white font-bold md:hidden">Trending</h1>
      <div
        className="
      mt-12 md:mt-16 lg:mt-24 
      mb-32 md:mb-20 lg:mb-32 
      text-white 
      grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      gap-y-14 gap-x-4
    "
      >
        {data ? (
          data.results.map((show: TrendingGenreType) => {
            if (!show.poster_path) {
              return;
            }
            return show.media_type === "tv" ? (
              <div key={show.id} className="w-full">
                <TVShowCard
                  image={show.poster_path}
                  title={show.name || show.original_name || "N/A"}
                  genres={show.genre_ids}
                  id={show.id}
                />
              </div>
            ) : (
              <div key={show.id} className="w-full">
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
