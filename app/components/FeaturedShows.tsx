import type { TrendingGenreType } from "@/types/genre";
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
        data.results.map((show: TrendingGenreType) => {
          if (show.media_type === "tv") {
            return (
              <div key={show.id} className="w-[270px]">
                <TVShowCard
                  image={show.poster_path}
                  title={show.name || show.original_name || ""}
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
                title={show.original_title || ""}
                genres={show.genre_ids}
                id={show.id}
              />
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeaturedShows;

//  {
//       "backdrop_path": "/4hvK1uenpT7VVClzoNqXanvgdjX.jpg",
//       "id": 558449,
//       "title": "Gladiator II",
//       "original_title": "Gladiator II",
//       "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
//       "poster_path": "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
//       "media_type": "movie",
//       "adult": false,
//       "original_language": "en",
//       "genre_ids": [
//         28,
//         12,
//         18
//       ],
//       "popularity": 1528.573,
//       "release_date": "2024-11-05",
//       "video": false,
//       "vote_average": 6.684,
//       "vote_count": 1258
//     },
