import _ from "lodash";

import type { MovieType } from "@/types/genre";
import * as React from "react";
import RelatedMovieCarousel from "./RelatedMovieCarousel";

const RelatedMovies = async ({ id }: { id: number }) => {
  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`
    );

    if (res.ok) {
      data = (await res.json()).results as MovieType[];
      data = _.shuffle(data);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col gap-16 max-w-[1400px] mx-auto text-[#111111]">
      <h4 className="text-4xl font-bold">Related Titles</h4>
      {data ? <RelatedMovieCarousel data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default RelatedMovies;
