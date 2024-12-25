import { tvGenreData } from "@/data/genresData";
import { formatDate } from "@/lib/helpers/formatDate";
import type { GenreType } from "@/types/genre";
import { DotIcon, HeartIcon, PlayIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tooltips from "./Tooltips";
import type { TVShowType } from "@/types/tv";

const TVHeaderDetails = ({ data }: { data: TVShowType }) => {
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
                {/* <p>
                  {data.number_of_seasons} Season
                  {data.number_of_seasons === 1 ? "" : "s"}
                </p> */}
                {/* <DotIcon size={20} className="text-white/80" /> */}
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

// {
//   "adult": false,
//   "backdrop_path": "/2wNuLc0cEoPz6PZItftrZLHjG2k.jpg",
//   "created_by": [
//     {
//       "id": 5021934,
//       "credit_id": "671bedf12685cb6563c0e0fe",
//       "name": "Alaa Hamza",
//       "original_name": "علاء حمزة",
//       "gender": 0,
//       "profile_path": null
//     }
//   ],
//   "episode_run_time": [
//     45
//   ],
//   "first_air_date": "2024-10-27",
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 10751,
//       "name": "Family"
//     }
//   ],
//   "homepage": "https://shahid.mbc.net/ar/series/%D8%AE%D8%B1%D9%8A%D9%81-%D8%A7%D9%84%D9%82%D9%84%D8%A8-%D8%A7%D9%84%D9%85%D9%88%D8%B3%D9%85-1/season-1035897-1035900",
//   "id": 251691,
//   "in_production": true,
//   "languages": [
//     "ar"
//   ],
//   "last_air_date": "2024-12-22",
//   "last_episode_to_air": {
//     "id": 5675017,
//     "name": "Episode 42",
//     "overview": "Despite Nahla’s love and caring attitude, Amal insists on giving her the cold shoulder. Rashed blames Farah for Amal’s emotional insecurities.",
//     "vote_average": 0,
//     "vote_count": 0,
//     "air_date": "2024-12-23",
//     "episode_number": 42,
//     "episode_type": "standard",
//     "production_code": "",
//     "runtime": 42,
//     "season_number": 1,
//     "show_id": 251691,
//     "still_path": "/dMwWVmZBMTYXa23ff1Z9eWazscZ.jpg"
//   },
//   "name": "Autumn of the Heart",
//   "next_episode_to_air": {
//     "id": 5675018,
//     "name": "Episode 43",
//     "overview": "Nahla tries to prove to Farah that Shawq needs a mother’s love, rather than luxury. Mishari accuses his mother of being too controlling.",
//     "vote_average": 0,
//     "vote_count": 0,
//     "air_date": "2024-12-24",
//     "episode_number": 43,
//     "episode_type": "standard",
//     "production_code": "",
//     "runtime": 42,
//     "season_number": 1,
//     "show_id": 251691,
//     "still_path": "/1ZrwzzutcbdvBa63h89FpoMXFlj.jpg"
//   },
//   "networks": [
//     {
//       "id": 963,
//       "logo_path": "/oG6DMW1SajkvYpbMAZ9m2LZURYx.png",
//       "name": "MBC 1",
//       "origin_country": "AE"
//     },
//     {
//       "id": 3626,
//       "logo_path": "/X37sqYsNaok8iZXzJpvFbNSJHe.png",
//       "name": "Shahid",
//       "origin_country": "AE"
//     }
//   ],
//   "number_of_episodes": 90,
//   "number_of_seasons": 1,
//   "origin_country": [
//     "SA"
//   ],
//   "original_language": "ar",
//   "original_name": "خريف القلب",
//   "overview": "A devastating car accident unearths a long-buried secret that turns wealthy businessman Rashid and hardworking Nahla's life around; fifteen years ago, their daughters were switched at birth.",
//   "popularity": 2839.209,
//   "poster_path": "/8uDmIxjBx90y5OCwJDBADtQzxb7.jpg",
//   "production_companies": [
//     {
//       "id": 118387,
//       "logo_path": null,
//       "name": "MBC Group",
//       "origin_country": "AE"
//     },
//     {
//       "id": 150718,
//       "logo_path": "/4RUaTuOrsLf0jnffH1JPmmYNWiY.png",
//       "name": "shahid",
//       "origin_country": "AE"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "SA",
//       "name": "Saudi Arabia"
//     }
//   ],
//   "seasons": [
//     {
//       "air_date": "2024-10-27",
//       "episode_count": 90,
//       "id": 388145,
//       "name": "Season 1",
//       "overview": "A devastating car accident unearths a long-buried secret that turns wealthy businessman Rashid and hardworking Nahla's life around; fifteen years ago, their daughters were switched at birth.",
//       "poster_path": "/kZ5ZOPzEQtpTm19nhpP0BBB69rJ.jpg",
//       "season_number": 1,
//       "vote_average": 0
//     }
//   ],
//   "spoken_languages": [
//     {
//       "english_name": "Arabic",
//       "iso_639_1": "ar",
//       "name": "العربية"
//     }
//   ],
//   "status": "Returning Series",
//   "tagline": "",
//   "type": "Scripted",
//   "vote_average": 6.75,
//   "vote_count": 4
// }
