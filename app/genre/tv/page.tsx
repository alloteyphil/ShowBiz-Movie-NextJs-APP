import GenrePageBreadcrumbs from "@/app/components/genre/GenrePageBreadcrumbs";
import { GeneralGenreTvSelect } from "@/app/components/genre/GenreSelect";
import PaginationMovieTV from "@/app/components/PaginationMovieTV";
import TVShowCard from "@/app/components/tv/TVShowCard";

interface TrendingTVShowType {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  let data;

  const pageSearchParams = await searchParams;

  const page = pageSearchParams.page;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=${page || 1}`,
  );

  if (res.ok) {
    data = await res.json();
  }

  return (
    <div className="md:pt-24 pb-32 max-md:pb-12 text-white flex flex-col gap-14 max-md:gap-8 max-w-[1400px] mx-auto max-md:px-8">
      <GenrePageBreadcrumbs type="tv" generalGenrePage={true} />
      <GeneralGenreTvSelect />
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-y-14 gap-x-6 max-md:gap-y-10 max-md:gap-x-4">
        {data &&
          data.results.map((tv: TrendingTVShowType, i: number) => {
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
      {data && <PaginationMovieTV totalResults={data.total_results} />}
    </div>
  );
};

export default page;
