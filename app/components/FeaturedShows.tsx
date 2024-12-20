import type { MovieType } from "@/types/genre";
import MovieCard from "./MovieCard";
import TVShowCard from "./TVShowCard";

const FeaturedShows = async () => {
  let data;

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.IMDB_API_KEY}&language=en-US`
  );

  if (response.ok) {
    data = await response.json();
  }

  return (
    <div className="my-24 text-white flex flex-wrap justify-between gap-y-14">
      {data ? (
        data.results.map((show: MovieType) => {
          if (show.media_type === "tv") {
            return (
              <TVShowCard
                key={show.id}
                image={show.poster_path}
                title={show.original_name || ""}
                genres={show.genre_ids}
                id={show.id}
              />
            );
          }
          return (
            <MovieCard
              key={show.id}
              image={show.poster_path}
              title={show.original_title || ""}
              genres={show.genre_ids}
              id={show.id}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeaturedShows;
