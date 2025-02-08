"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/helpers/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tvGenreData } from "@/data/genresData";
import type { ITVShow } from "@/types/tv";
import type { ProductionCompaniesType } from "@/types/movie";

interface NetworksType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
[];

const TVContentDetails = ({ data }: { data: ITVShow }) => {
  return (
    <Tabs
      defaultValue="key"
      className="grid grid-cols-4 gap-14 max-xl:gap-4 max-md:gap-6 w-full max-w-[1400px] pb-28 max-xl:pt-4 pt-20 border-b-[0.5px] border-themeGray mb-20 mx-auto max-xl:flex max-md:flex-col max-md:px-4 max-xl:px-8"
    >
      <TabsList>
        <TabsTrigger value="key">Key Details</TabsTrigger>
        <TabsTrigger value="film">Filming and Production</TabsTrigger>
      </TabsList>
      <TabsContent value="key">
        <DetailsCard
          title={"Title: "}
          value={data.name || data.original_name || "N/A"}
        />
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
          title={"Seasons: "}
          value={data.number_of_seasons || "N/A"}
        />
        <DetailsCard
          title={"Number of Episodes: "}
          value={data.number_of_episodes || "N/A"}
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
          title={"Created by: "}
          value={data.created_by[0]?.name || "N/A"}
        />
        <DetailsCard
          title={"Release Date: "}
          value={formatDate(data.first_air_date) || "N/A"}
        />
        <DetailsCard title={"Status: "} value={data.status || "N/A"} />
        <DetailsCard
          title={"In Production: "}
          value={data.in_production ? "Yes" : "No"}
        />
        <DetailsCard
          title={"Pilot Air Date: "}
          value={formatDate(data.first_air_date) || "N/A"}
        />
        <DetailsCard
          title={"Last Air Date: "}
          value={formatDate(data.last_air_date) || "N/A"}
        />
        <DetailsCard
          title={"Production Countries: "}
          value={
            data.production_countries
              .map((country, i) => country.name)
              .join(", ") || "N/A"
          }
        />
        <DetailsCard
          title={"Production Companies: "}
          value={""}
          productionCompanies={data.production_companies}
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
  productionCompanies = undefined,
}: {
  title: string;
  value: string | string[] | number | number[];
  networks?: NetworksType[] | undefined;
  productionCompanies?: ProductionCompaniesType[] | undefined;
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
      ) : productionCompanies ? (
        <div className="flex flex-wrap gap-6">
          {productionCompanies.map((company, i) => (
            <div key={i} className="flex gap-1 items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  className="object-center object-cover"
                  src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                />
                <AvatarFallback className="rounded-full w-full h-full bg-darkAsh"></AvatarFallback>
              </Avatar>
              <p>{company.name}</p>
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
