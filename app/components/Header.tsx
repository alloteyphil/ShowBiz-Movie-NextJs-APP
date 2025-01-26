import Image from "next/image";
import _ from "lodash";
import Link from "next/link";
import { movieGenreData } from "@/data/genresData";
import { LoaderIcon } from "lucide-react";
import type { TrendingGenreType } from "@/types/genre";
import { getPlaiceholder } from "plaiceholder";

const Header = async () => {
  let data;

  let shuffleData;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`,
    { cache: "no-store" },
  );

  let src1;

  let src2;

  let blurData1 = "";

  let blurData2 = "";

  if (response.ok) {
    data = await response.json();
    shuffleData = _.shuffle(data.results).slice(0, 2);
    try {
      src1 = `https://image.tmdb.org/t/p/original${shuffleData[0].backdrop_path}`;

      src2 = `https://image.tmdb.org/t/p/original${shuffleData[1].backdrop_path}`;

      const buffer1 = await fetch(src1).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const buffer2 = await fetch(src2).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const placeholder1 = await getPlaiceholder(buffer1);

      blurData1 = placeholder1.base64;

      const placeholder2 = await getPlaiceholder(buffer2);

      blurData2 = placeholder2.base64;
    } catch (err) {
      err;
    }
  }

  return (
    <div className="grid grid-cols-2 pt-[88.5px] h-[700px]">
      {data ? (
        shuffleData?.map((movie: TrendingGenreType) => (
          <div
            key={movie.id}
            className="relative w-full overflow-hidden group cursor-pointer"
          >
            <Image
              placeholder="blur"
              blurDataURL={
                movie.id === shuffleData[0].id ? blurData1 : blurData2
              }
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={
                movie.title ||
                movie.name ||
                movie.original_title ||
                movie.original_name ||
                ""
              }
            />
            <div className="absolute top-16 left-16 flex flex-col gap-3 z-20">
              <h3 className="text-white text-3xl font-bold">
                {movie.title || movie.original_title || "N/A"}
              </h3>
              <p className="text-lg text-themeGray ">
                {movie.genre_ids
                  .map(
                    (genre) => movieGenreData.find((g) => g.id === genre)?.name,
                  )
                  .join(", ")}
              </p>
            </div>
            <Link
              href={`/movie/details/${movie.id}`}
              className="text-sm text-white absolute -bottom-10 right-16 transition group-hover:-translate-y-[100px] duration-700 z-20 ease-in-out hover:underline"
            >
              See More
            </Link>
            <div className="absolute inset-0 w-full h-full bg-black/40 z-10 transition group-hover:opacity-100 opacity-0 ease-in-out duration-700" />
          </div>
        ))
      ) : (
        <>
          <div className="w-full grid place-items-center h-full">
            <LoaderIcon size={36} className="text-white animate-spin" />
          </div>
          <div className="w-full grid place-items-center h-full">
            <LoaderIcon size={36} className="text-white animate-spin" />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
