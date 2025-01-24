import SearchPagination from "@/app/components/SearchPagination";
import TVSearchBar from "@/app/components/TVSearchBar";
import TVShowCard from "@/app/components/TVShowCard";
import type { ISearchTv, ISearchTVResponse } from "@/types/search";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import noResults from "../../../public/images/folder.png";

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
              <TVSearchBar />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Image src={noResults} alt="No results" className="w-56" />
            <p className="text-themeGray text-center w-full text-lg">
              No results
            </p>
          </div>
        </div>
      </>
    );
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${
        process.env.IMDB_API_KEY
      }&query=${query.query}&include_adult=false&language=en-US&page=${
        query.page || 1
      }`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch TV search results: ${res.status} ${res.statusText}`,
      );
    }

    data = (await res.json()) as ISearchTVResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("TV search error:", errorMessage);
    data = { results: [], total_results: 0 };
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
              <TVSearchBar />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Image src={noResults} alt="No results" className="w-56" />
            <p className="text-themeGray text-center w-full text-lg">
              No results
            </p>
          </div>
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
            <TVSearchBar />
          </div>
        </div>
      ) : (
        <LoaderIcon size={20} className="text-white mx-auto animate-spin" />
      )}
      <div className="flex flex-wrap gap-14 w-full justify-evenly">
        {data ? (
          data.results
            .filter(
              (result: ISearchTv) =>
                result.poster_path !== null &&
                result.genre_ids !== undefined &&
                result.original_name !== undefined,
            )
            .map((tv) => {
              return (
                <div key={tv.id} className="w-[270px]">
                  <TVShowCard
                    id={tv.id}
                    image={tv.poster_path || ""}
                    title={tv.name || tv.original_name || "N/A"}
                    genres={tv.genre_ids}
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
