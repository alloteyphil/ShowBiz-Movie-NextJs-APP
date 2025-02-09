import MovieCard from "@/app/components/movie/MovieCard";
import MovieSearchBar from "@/app/components/search/MovieSearchBar";
import type { ISearchMovie, ISearchMovieResponse } from "@/types/search";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import noResults from "../../../public/images/folder.png";
import SearchPagination from "@/app/components/search/SearchPagination";

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
        <div className="flex flex-col gap-24 text-white w-full pt-[160px] max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-4">
              <div className="flex flex-col gap-1 text-center max-md:text-left">
                <h4 className="text-lg sm:text-xl">Search results for:</h4>
                <p className="text-themeGray text-base sm:text-lg">
                  No search query
                </p>
              </div>
              <MovieSearchBar />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Image
              src={noResults}
              alt="No results"
              className="w-40 sm:w-48 md:w-52 lg:w-56"
            />
            <p className="text-themeGray text-center w-full max-w-md text-lg sm:text-xl">
              No results
            </p>
          </div>
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
      }`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch search results: ${res.status} ${res.statusText}`,
      );
    }

    data = (await res.json()) as ISearchMovieResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Movie search error:", errorMessage);
    data = { results: [], total_results: 0 };
  }

  if (data?.total_results === 0) {
    return (
      <>
        <div className="flex flex-col gap-24 pb-32 text-white w-full pt-[160px] max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-4">
              <div className="flex flex-col gap-1 text-center max-md:text-left">
                <h4 className="text-lg sm:text-xl">Search results for:</h4>
                <p className="text-themeGray text-base sm:text-lg">
                  No search query
                </p>
              </div>
              <MovieSearchBar />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Image
              src={noResults}
              alt="No results"
              className="w-40 sm:w-48 md:w-52 lg:w-56 object-contain"
            />
            <p className="text-themeGray text-center w-full max-w-md text-lg sm:text-xl">
              No results
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="sm:px-6 md:px-8 lg:pt-28 max-md:mb-8 max-xl:mb-12 mb-20 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
      {query ? (
        <div className="flex flex-col">
          <div className="flex max-md:flex-col gap-8 w-full xl:items-center justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg max-md:text-sm">Search results for: </h4>
              <p className="text-themeGray max-md:text-sm">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-14 gap-x-6 max-md:gap-y-10 max-md:gap-x-4 md:gap-y-12 md:gap-x-5 lg:gap-y-14 lg:gap-x-6">
        {data ? (
          data.results.map((movie: ISearchMovie, i: number) => {
            if (!movie.poster_path || !movie.backdrop_path) {
              return null;
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
