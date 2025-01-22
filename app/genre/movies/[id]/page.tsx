import GenrePageBreadcrumbs from "@/app/components/GenrePageBreadcrumbs";
import GenrePagination from "@/app/components/GenrePagination";
import MovieCard from "@/app/components/MovieCard";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { MovieGenreType } from "@/types/genre";
import { redirect } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;

  const { page } = await searchParams;

  let data;

  let results: MovieGenreType[] | undefined;

  let error;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.IMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=${id}`,
    );

    if (res.ok) {
      data = await res.json();

      results = data.results as MovieGenreType[];
    } else {
      error = (await res.json()) as FailedDetailsPageResponse;
    }
  } catch (error) {
    console.log(error);
  }

  if (error) {
    redirect("/not-found");
  }

  return (
    <div className="mt-24 mb-32 text-white flex flex-col gap-14 max-w-[1400px] mx-auto">
      <GenrePageBreadcrumbs id={id} />
      <div className="grid grid-cols-4 gap-y-14 gap-x-6">
        {results &&
          results.map((movie, i) => {
            if (
              movie.poster_path === null ||
              movie.poster_path === "" ||
              movie.backdrop_path === null ||
              movie.backdrop_path === ""
            ) {
              return;
            }
            return (
              <MovieCard
                key={i}
                id={movie.id}
                image={movie.poster_path}
                title={movie.original_title || ""}
                genres={movie.genre_ids}
              />
            );
          })}
      </div>
      {data && <GenrePagination totalResults={data.totalResults} />}
    </div>
  );
};

export default page;
