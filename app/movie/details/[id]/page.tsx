import { movieGenreData } from "@/data/genresData";
import { convertMinutes } from "@/lib/helpers/convertMinutes";
import { formatDate } from "@/lib/helpers/formatDate";
import type { GenreType } from "@/types/genre";
import { DotIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-white min-h-screen text-white">
      {data && (
        <div className="grid grid-cols-3 h-[70vh] w-full relative">
          <div className="absolute inset-0 w-full h-full bg-black/60 z-[3]" />
          <Image
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt={data.original_title || data.original_name || ""}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0 z-[2]"
          />
          <div className="col-span-1 z-20 relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
              alt={data.original_title || data.original_name || ""}
              width={400}
              height={600}
              className="object-cover object-center absolute -bottom-36 h-[650px] w-[420px] right-0"
            />
          </div>
          <div className="col-span-2 z-20 pl-28 pb-28 flex flex-col gap-8 justify-end">
            <h4 className="font-semibold text-3xl">
              {data.release_date.split("-")[0]}
            </h4>
            <h1 className="text-6xl font-bold text-white">
              {data.original_title}
            </h1>
            <p className="max-w-[900px]">{data.overview}</p>
            <div className="flex mt-8">
              <div className="flex items-center gap-4 border-r border-white pr-10">
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
              <div className="flex pl-16 text-white/80 items-center gap-2">
                <p>{convertMinutes(parseInt(data.runtime))}</p>
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
      )}
    </div>
  );
};

export default page;

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
