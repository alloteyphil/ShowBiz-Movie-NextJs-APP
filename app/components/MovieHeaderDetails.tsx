import Tooltips from "@/app/components/Tooltips";
import { movieGenreData } from "@/data/genresData";
import { convertMinutes } from "@/lib/helpers/convertMinutes";
import { formatDate } from "@/lib/helpers/formatDate";
import type { GenreType } from "@/types/genre";
import type { Movie } from "@/types/movie";
import { DotIcon, HeartIcon, PlayIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MovieHeaderDetails = ({ data }: { data: Movie }) => {
  return (
    <>
      <div className="h-[70vh] w-full relative">
        <div className="absolute inset-0 w-full h-full bg-black/60 z-[3]" />
        <Image
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          alt={data.original_title || ""}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0 z-[2]"
        />
        <div className="flex h-full max-w-[1400px] mx-auto">
          <div className="w-1/3 z-20 relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
              alt={data.original_title || ""}
              width={400}
              height={600}
              className="object-cover object-center absolute -bottom-36 h-[650px] w-[420px] left-0"
            />
          </div>
          <div className="w-2/3 z-20 pl-12 pb-20 flex flex-col gap-8 justify-end">
            <h4 className="font-semibold text-3xl">
              {data.release_date.split("-")[0]}
            </h4>
            <h1 className="text-6xl font-bold text-white">
              {data.original_title}
            </h1>
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
                <p>{convertMinutes(data.runtime)}</p>
                <DotIcon size={20} className="text-white/80" />
                <p>
                  {data.genres
                    .map(
                      (genre: GenreType) =>
                        movieGenreData.find((g) => g.id === genre.id)?.name
                    )
                    .join(", ")}
                </p>
                <DotIcon size={20} className="text-white/80" />
                <p>{formatDate(data.release_date)}</p>
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

export default MovieHeaderDetails;

// {
//   adult: false,
//   backdrop_path: '/4FnbeuCnsN3MT6omPrivl2ttJ8o.jpg',
//   belongs_to_collection: null,
//   budget: 0,
//   genres: [ { id: 18, name: 'Drama' }, { id: 10752, name: 'War' } ],
//   homepage: 'https://www.netflix.com/title/81590591',
//   id: 1061699,
//   imdb_id: 'tt24458622',
//   origin_country: [ 'US' ],
//   original_language: 'en',
//   original_title: 'The Six Triple Eight',
//   overview: "During World War II, the US Army's only all-Black, all-women battalion takes on an impossible mission: sorting through a three-year backlog of 17 million pieces of mail that hadn't been delivered to American soldiers and finish within six months.",
//   popularity: 47.12,
//   poster_path: '/2N8VL4jePIGpAupSqVcGiPekIf4.jpg',
//   production_companies: [
//     {
//       id: 3096,
//       logo_path: '/fkZTZ4veYYr3lwr2riVrVAOfeqD.png',
//       name: 'Tyler Perry Studios',
//       origin_country: 'US'
//     },
//     {
//       id: 551,
//       logo_path: '/jSlzEZZ4Z1g7B2UExjZEIKsUvD9.png',
//       name: 'Mandalay Pictures',
//       origin_country: 'US'
//     },
//     {
//       id: 188436,
//       logo_path: null,
//       name: 'Her Excellency Productions',
//       origin_country: 'US'
//     },
//     {
//       id: 188437,
//       logo_path: null,
//       name: 'Intuition Productions',
//       origin_country: 'US'
//     }
//   ],
//   production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
//   release_date: '2024-12-06',
//   revenue: 0,
//   runtime: 127,
//   spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
//   status: 'Released',
//   tagline: 'They were ordered to provide hope...',
//   title: 'The Six Triple Eight',
//   video: false,
//   vote_average: 6.886,
//   vote_count: 57
// }
