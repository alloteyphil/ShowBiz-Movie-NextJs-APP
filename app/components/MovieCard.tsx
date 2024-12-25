import { movieGenreData } from "@/data/genresData";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col gap-8 items-center group">
      <Link
        href={`/movie/details/${id}`}
        prefetch={true}
        className="w-full h-[400px] overflow-hidden cursor-pointer"
      >
        <Image
          width={270}
          height={400}
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={title}
          className="object-cover w-full object-center transition group-hover:scale-125 duration-700 ease-in-out"
        />
      </Link>
      <div className="flex flex-col gap-2 text-center max-w-[250px] text-wrap">
        <Link
          href={`/movie/details/${id}`}
          prefetch={true}
          className="text-xl font-semibold cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-base text-darkAsh">
          {genres
            .map((genre) => movieGenreData.find((g) => g.id === genre)?.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
