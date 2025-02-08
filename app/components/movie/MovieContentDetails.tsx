"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { movieGenreData } from "@/data/genresData";
import { formatBudget } from "@/lib/helpers/formatBudget";
import { formatDate } from "@/lib/helpers/formatDate";
import type { IMovie, ProductionCompaniesType } from "@/types/movie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertMinutes } from "@/lib/helpers/convertMinutes";

const MovieContentDetails = ({ data }: { data: IMovie }) => {
  return (
    <Tabs
      defaultValue="key"
      className="grid grid-cols-4 gap-14 max-xl:gap-4 max-md:gap-6 w-full max-w-[1400px] pb-28 max-md:pb-12 max-xl:pb-16 max-xl:pt-4 pt-20 border-b-[0.5px] border-themeGray max-md:mb-8 max-xl:mb-12 mb-20 mx-auto max-xl:flex max-md:flex-col max-md:px-4 max-xl:px-8"
    >
      <TabsList>
        <TabsTrigger value="key">Key Details</TabsTrigger>
        <TabsTrigger value="film">Filming and Production</TabsTrigger>
      </TabsList>
      <TabsContent value="key">
        <DetailsCard
          title={"Title: "}
          value={data.title || data.original_title || "N/A"}
        />
        <DetailsCard title={"Overview: "} value={data.overview || "N/A"} />
        <DetailsCard
          title={"Genres: "}
          value={
            data.genres
              .map(
                (genre) => movieGenreData.find((g) => g.id === genre.id)?.name,
              )
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
          title={"Runtime: "}
          value={convertMinutes(data.runtime) || "N/A"}
        />
        <DetailsCard
          title={"Country Origin: "}
          value={data.origin_country || "N/A"}
        />
        <DetailsCard title={"Tagline: "} value={data.tagline || "N/A"} />
      </TabsContent>
      <TabsContent value="film">
        <DetailsCard
          title={"Budget: "}
          value={formatBudget(data.budget) || "N/A"}
        />
        <DetailsCard
          title={"Release Date: "}
          value={formatDate(data.release_date) || "N/A"}
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
        <DetailsCard
          title={"Production Companies: "}
          value={""}
          productionCompanies={data.production_companies}
        />
        <DetailsCard
          title={"Revenue: "}
          value={formatBudget(data.revenue) || "N/A"}
        />
      </TabsContent>
    </Tabs>
  );
};

const DetailsCard = ({
  title,
  value,
  productionCompanies = undefined,
}: {
  title: string;
  value: string | string[] | number | number[];
  productionCompanies?: ProductionCompaniesType[] | undefined;
}) => {
  return (
    <div className="flex flex-col w-full p-6 bg-themeGray/15 gap-4">
      <h1 className="font-bold text-darkAsh">{title}</h1>
      {productionCompanies ? (
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

export default MovieContentDetails;
