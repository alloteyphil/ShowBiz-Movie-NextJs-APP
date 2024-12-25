"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatBudget } from "@/lib/helpers/formatBudget";
import { formatDate } from "@/lib/helpers/formatDate";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TVShowType } from "@/types/tv";
import { tvGenreData } from "@/data/genresData";

interface NetworksType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
[];

const TVContentDetails = ({ data }: { data: TVShowType }) => {
  return (
    <Tabs
      defaultValue="key"
      className="grid grid-cols-4 gap-14 w-full max-w-[1400px] py-20 border-b-[0.5px] border-themeGray mb-32 mx-auto"
    >
      <TabsList>
        <TabsTrigger value="key">Key Details</TabsTrigger>
        <TabsTrigger value="film">Filming and Production</TabsTrigger>
      </TabsList>
      <TabsContent value="key">
        <DetailsCard title={"Title: "} value={data.name || "N/A"} />
        <DetailsCard title={"Overview: "} value={data.overview || "N/A"} />
        <DetailsCard
          title={"Genres: "}
          value={
            data.genres
              .map((genre) => tvGenreData.find((g) => g.id === genre.id)?.name)
              .join(", ") || "N/A"
          }
        />
        <DetailsCard
          title={"Languages: "}
          value={
            data.spoken_languages
              .map((language, i) => language.english_name)
              .join(", ") || "N/A"
          }
        />

        <DetailsCard
          title={"Country Origin: "}
          value={data.origin_country || "N/A"}
        />
        <DetailsCard title={"Tagline: "} value={data.tagline || "N/A"} />
      </TabsContent>
      <TabsContent value="film">
        <DetailsCard
          title={"Release Date: "}
          value={formatDate(data.first_air_date) || "N/A"}
        />
        <DetailsCard title={"Status: "} value={data.status || "N/A"} />
        <DetailsCard
          title={"Production Countries: "}
          value={
            data.production_countries
              .map((country, i) => country.name)
              .join(", ") || "N/A"
          }
        />
        <DetailsCard title={"Networks: "} value={""} networks={data.networks} />
      </TabsContent>
    </Tabs>
  );
};

const DetailsCard = ({
  title,
  value,
  networks = undefined,
}: {
  title: string;
  value: string | string[] | number | number[];
  networks?: NetworksType[] | undefined;
}) => {
  return (
    <div className="flex flex-col w-full p-6 bg-themeGray/15 gap-4">
      <h1 className="font-bold text-darkAsh">{title}</h1>
      {networks ? (
        <div className="flex flex-wrap gap-6">
          {networks.map((network, i) => (
            <div key={i} className="flex gap-1 items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  className="object-center object-cover"
                  src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                />
                <AvatarFallback className="rounded-full w-full h-full bg-darkAsh"></AvatarFallback>
              </Avatar>
              <p>{network.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default TVContentDetails;

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
