import GenrePageBreadcrumbs from "@/app/components/genre/GenrePageBreadcrumbs";
import { GeneralGenreMovieSelect } from "@/app/components/genre/GenreSelect";
import MovieCard from "@/app/components/movie/MovieCard";
import PaginationMovieTV from "@/app/components/PaginationMovieTV";

interface TrendingMovieType {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  let data;

  const pageSearchParams = await searchParams;

  const page = pageSearchParams.page;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=${page || 1}`,
  );

  if (res.ok) {
    data = await res.json();
  }

  return (
    <div className="sm:px-6 md:px-8 lg:pt-28 pb-28 md:pb-20 lg:pb-32 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
      <GenrePageBreadcrumbs type="movie" generalGenrePage={true} />
      <GeneralGenreMovieSelect />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-14 gap-x-6 max-md:gap-y-10 max-md:gap-x-4 md:gap-y-12 md:gap-x-5 lg:gap-y-14 lg:gap-x-6">
        {data &&
          data.results.map((movie: TrendingMovieType, i: number) => {
            if (!movie.poster_path || !movie.backdrop_path) {
              return;
            }
            return (
              <MovieCard
                key={i}
                id={movie.id}
                image={movie.poster_path}
                title={movie.title || movie.original_title || "N/A"}
                genres={movie.genre_ids}
              />
            );
          })}
      </div>
      {data && <PaginationMovieTV totalResults={data.total_results} />}
    </div>
  );
};

export default page;
