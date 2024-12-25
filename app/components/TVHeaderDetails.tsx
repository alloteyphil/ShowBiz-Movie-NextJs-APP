import { tvGenreData } from "@/data/genresData";
import { formatDate } from "@/lib/helpers/formatDate";
import type { GenreType } from "@/types/genre";
import { DotIcon, HeartIcon, PlayIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tooltips from "./Tooltips";
import type { ITVShow } from "@/types/tv";

const TVHeaderDetails = ({ data }: { data: ITVShow }) => {
  return (
    <>
      <div className="h-[70vh] w-full relative text-white">
        <div className="absolute inset-0 w-full h-full bg-black/60 z-[3]" />
        <Image
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          alt={data.name || ""}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0 z-[2]"
        />
        <div className="flex h-full max-w-[1400px] mx-auto">
          <div className="w-1/3 z-20 relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
              alt={data.name || ""}
              width={400}
              height={600}
              className="object-cover object-center absolute -bottom-36 h-[650px] w-[420px] left-0"
            />
          </div>
          <div className="w-2/3 z-20 pl-12 pb-20 flex flex-col gap-8 justify-end">
            <h4 className="font-semibold text-3xl">
              {data.first_air_date.split("-")[0]}
            </h4>
            <h1 className="text-6xl font-bold text-white">{data.name}</h1>
            <p className="max-w-[900px]">{data.overview}</p>
            <div className="flex mt-8">
              <div className="flex items-center gap-4 border-r border-white pr-8">
                <Link
                  href={data.homepage || "/not-found"}
                  target="_blank"
                  className="rounded-full border-[0.5px] border-white relative p-7 cursor-pointer"
                >
                  <PlayIcon
                    size={24}
                    className="text-white absolute inset-0 m-auto"
                  />
                </Link>
                <p className="uppercase">Watch the trailer</p>
              </div>
              <div className="flex pl-12 text-white/80 items-center gap-2">
                <p>
                  {data.genres
                    .map(
                      (genre: GenreType) =>
                        tvGenreData.find((g) => g.id === genre.id)?.name
                    )
                    .join(", ")}
                </p>
                <DotIcon size={20} className="text-white/80" />
                <p>{formatDate(data.first_air_date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto py-14 max-w-[1400px] text-[#111111]">
        <div className="flex justify-end w-full">
          <div className="flex">
            <div className="flex items-end gap-1 py-4 px-12 border-r-[0.5px] border-themeGray">
              <h6 className="text-4xl font-bold">
                {data.vote_average.toFixed(1)}
              </h6>
              <p>IMDb</p>
            </div>
            <div className="flex flex-col gap-1 py-4 px-12 border-r-[0.5px] border-themeGray">
              <p className="text-darkAsh text-sm">Language</p>
              <p className="">{data.spoken_languages[0].english_name}</p>
            </div>
            <div className="flex flex-col gap-1 py-4 px-12">
              <p className="text-darkAsh text-sm">Status</p>
              <p className="capitalize">{data.status}</p>
            </div>
            <div className="flex gap-4 ml-28">
              <Tooltips message="Add to watchlist">
                <div className="relative w-16 h-12 p-6 my-auto bg-[#111111] text-white">
                  <PlusIcon
                    size={20}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </Tooltips>

              <Tooltips message="Add to favourites">
                <div className="relative w-16 h-12 p-6 my-auto text-[#111111] bg-white border-[0.5px] border-themeGray">
                  <HeartIcon
                    size={20}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </Tooltips>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TVHeaderDetails;
