import NotFoundCard from "@/app/components/NotFoundCard";
import SearchPagination from "@/app/components/SearchPagination";
import TVSearchBar from "@/app/components/TVSearchBar";
import TVShowCard from "@/app/components/TVShowCard";
import type { ISearchTv, ISearchTVResponse } from "@/types/search";

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
          <p className="text-white text-center w-full font-bold text-5xl">
            No results
          </p>
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
      }`
    );
    data = (await res.json()) as ISearchTVResponse;
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
              <TVSearchBar />
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
                    : ""
                })`}
              </p>
            </div>
            <TVSearchBar />
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
      <div className="flex flex-wrap gap-14 w-full justify-evenly">
        {data ? (
          data.results
            .filter((result: ISearchTv) => result.poster_path !== null)
            .map((tv) => {
              return (
                <div key={tv.id} className="w-[270px]">
                  <TVShowCard
                    id={tv.id}
                    image={tv.poster_path || ""}
                    title={tv.original_name || ""}
                    genres={tv.genre_ids}
                  />
                </div>
              );
            })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="w-full my-10 grid place-items-center">
        <SearchPagination totalResults={data?.total_results || 0} />
      </div>
    </div>
  );
};

export default page;
