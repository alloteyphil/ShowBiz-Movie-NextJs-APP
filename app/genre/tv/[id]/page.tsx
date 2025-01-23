import GenrePageBreadcrumbs from "@/app/components/GenrePageBreadcrumbs";
import GenrePagination from "@/app/components/GenrePagination";
import TVShowCard from "@/app/components/TVShowCard";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { TVGenreType } from "@/types/genre";
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
          results.map((tv, i) => {
            if (
              tv.poster_path === null ||
              tv.poster_path === "" ||
              tv.backdrop_path === null ||
              tv.backdrop_path === ""
            ) {
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
      {data && <GenrePagination totalResults={data.totalResults} />}
    </div>
  );
};

export default page;
