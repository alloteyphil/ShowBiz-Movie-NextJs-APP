import MovieCard from "@/app/components/MovieCard";
import MovieSearchBar from "@/app/components/MovieSearchBar";
import SearchPagination from "@/app/components/SearchPagination";
import type { ISearchMovie, ISearchMovieResponse } from "@/types/search";
import { LoaderIcon } from "lucide-react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;

  let data;

  if (query.query === undefined || query.query === "") {
    return (
      <>
        <div className="flex flex-col gap-24 text-white w-full pt-[160px] max-w-[1400px] mx-auto">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg">Search results for: </h4>
                <p className="text-themeGray">No search query</p>
              </div>
              <MovieSearchBar />
            </div>
          </div>
          <p className="text-white text-center w-full font-bold text-5xl">
            No results
          </p>
        </div>
      </>
    );
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.IMDB_API_KEY
      }&query=${query.query}&include_adult=false&language=en-US&page=${
        query.page || 1
      }`
    );
    data = (await res.json()) as ISearchMovieResponse;
  } catch (error) {
    console.log(error);
  }

  if (data?.total_results === 0) {
    return (
      <>
        <div className="flex flex-col gap-24 text-white w-full pt-[160px] max-w-[1400px] mx-auto">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg">Search results for: </h4>
                <p className="text-themeGray">No search query</p>
              </div>
              <MovieSearchBar />
            </div>
          </div>
          <p className="text-white text-center w-full font-bold text-5xl">
            No results
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-24 text-white w-full pt-[160px] pb-32 max-w-[1400px] mx-auto">
      {query ? (
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg">Search results for: </h4>
              <p className="text-themeGray">
                {`"${query.query}"`}{" "}
                {`(${
                  data
                    ? data.total_results +
                      ` Title${data.total_results === 1 ? "" : "s"}`
                    : "Finding titles..."
                })`}
              </p>
            </div>
            <MovieSearchBar />
          </div>
        </div>
      ) : (
        <LoaderIcon size={20} className="text-white mx-auto animate-spin" />
      )}
      <div className="flex flex-wrap gap-14 w-full justify-evenly">
        {data ? (
          data.results
            .filter(
              (result: ISearchMovie) =>
                result.poster_path !== null &&
                result.genre_ids !== undefined &&
                result.original_title !== undefined
            )
            .map((movie) => {
              return (
                <div key={movie.id} className="w-[270px]">
                  <MovieCard
                    id={movie.id}
                    image={movie.poster_path || ""}
                    title={movie.original_title || ""}
                    genres={movie.genre_ids}
                  />
                </div>
              );
            })
        ) : (
          <LoaderIcon
            size={36}
            className="text-white my-56 mx-auto animate-spin"
          />
        )}
      </div>
      <div className="w-full my-10 grid place-items-center">
        <SearchPagination totalResults={data?.total_results || 0} />
      </div>
    </div>
  );
};

export default page;
