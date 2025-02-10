import { movieGenreData } from "@/data/genresData";
import Image from "next/image";
import Link from "next/link";
import noImage from "../../../public/images/no-image.png";

const MovieCard = ({
  image,
  title,
  genres,
  id,
}: {
  image: string;
  title: string;
  genres: number[];
  id: number;
}) => {
  return (
    <div className="flex flex-col gap-8 max-md:gap-2 items-center group">
      <Link
        href={`/movie/details/${id}`}
        prefetch={true}
        className="w-full h-[400px] max-md:h-[250px] overflow-hidden cursor-pointer"
      >
        <Image
          width={270}
          height={400}
          src={
            image !== null
              ? `https://image.tmdb.org/t/p/original${image}`
              : noImage
          }
          alt={title}
          className="object-contain object-center w-full h-full transition group-hover:scale-125 duration-700 ease-in-out"
        />
      </Link>
      <div className="flex flex-col gap-2 text-center max-w-[250px] text-wrap">
        <Link
          href={`/movie/details/${id}`}
          prefetch={true}
          className="text-lg max-md:text-base font-semibold max-md:font-normal cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-sm text-themeGray max-md:hidden">
          {genres
            .map((genre) => movieGenreData.find((g) => g.id === genre)?.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
