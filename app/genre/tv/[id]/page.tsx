import GenrePagination from "@/app/components/genre/GenrePagination";
import TVShowCard from "@/app/components/tv/TVShowCard";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { TVGenreType } from "@/types/genre";
import { redirect } from "next/navigation";
import { GenreTvSelect } from "@/app/components/genre/GenreSelect";
import GenrePageBreadcrumbs from "@/app/components/genre/GenrePageBreadcrumbs";

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

  let results: TVGenreType[] | undefined;

  let error;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.IMDB_API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=${id}`,
    );

    if (res.ok) {
      data = await res.json();
      results = data.results as TVGenreType[];
    } else {
      error = (await res.json()) as FailedDetailsPageResponse;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Genre TV shows fetch error:", errorMessage);
    redirect("/not-found");
  }

  if (error) {
    redirect("/not-found");
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-32 lg:pt-28 max-md:pb-12 text-white flex flex-col gap-14 max-md:gap-8 max-w-[1400px] mx-auto">
      <GenrePageBreadcrumbs id={id} type="tv" generalGenrePage={false} />
      <GenreTvSelect />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-6 max-md:gap-y-10 max-md:gap-x-4">
        {results &&
          results.map((tv, i) => {
            if (!tv.poster_path || !tv.backdrop_path) {
              return;
            }
            return (
              <TVShowCard
                key={i}
                id={tv.id}
                image={tv.poster_path}
                title={tv.name || tv.original_name || "N/A"}
                genres={tv.genre_ids}
              />
            );
          })}
      </div>
      {data && <GenrePagination totalResults={data.total_results} />}
    </div>
  );
};

export default page;
