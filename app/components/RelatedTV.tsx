import _ from "lodash";
import RelatedTVCarousel from "./RelatedTVCarousel";
import type { TVGenreType } from "@/types/genre";
import { LoaderIcon } from "lucide-react";

const RelatedTV = async ({ id }: { id: number }) => {
  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`
    );

    if (res.ok) {
      data = (await res.json()).results as TVGenreType[];
      data = _.shuffle(data);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col gap-20 pb-32 max-w-[1400px] mx-auto text-[#111111]">
      <h4 className="text-4xl font-bold">Related Titles</h4>
      {data ? (
        <RelatedTVCarousel data={data} />
      ) : (
        <LoaderIcon
          size={36}
          className="text-[#111111] mx-auto my-12 animate-spin"
        />
      )}
    </div>
  );
};

export default RelatedTV;
