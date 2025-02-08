import _ from "lodash";
import RelatedMovieCarousel from "./RelatedMovieCarousel";
import type { TrendingGenreType } from "@/types/genre";
import { LoaderIcon } from "lucide-react";

const RelatedMovies = async ({ id }: { id: number }) => {
  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`,
    );

    if (res.ok) {
      data = (await res.json()).results as TrendingGenreType[];
      data = _.shuffle(data);
    } else {
      throw new Error(
        `Failed to fetch related movies: ${res.status} ${res.statusText}`,
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Related movies fetch error:", errorMessage);
  }

  return (
    <div className="flex flex-col gap-20 max-xl:gap-6 max-md:px-4 max-xl:px-8 pb-32 max-md:pb-12 max-xl:pb-16 max-w-[1400px] mx-auto text-[#111111]">
      <h4 className="text-4xl max-xl:text-3xl font-bold">Related Titles</h4>
      {data ? (
        <RelatedMovieCarousel data={data} />
      ) : (
        <LoaderIcon
          size={36}
          className="text-[#111111] mx-auto my-12 animate-spin"
        />
      )}
    </div>
  );
};

export default RelatedMovies;
