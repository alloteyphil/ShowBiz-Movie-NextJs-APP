import { tvGenreData } from "@/data/genresData";
import Image from "next/image";
import Link from "next/link";
import noImage from "../../public/images/no-image.png";
import { getPlaiceholder } from "plaiceholder";

const TVShowCard = async ({
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
  let blurData = "";

  if (image || image !== "") {
    try {
      const src = `https://image.tmdb.org/t/p/original${image}`;

      const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const placeholder = await getPlaiceholder(buffer);

      blurData = placeholder.base64;
    } catch (err) {
      err;
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center group">
      <Link
        href={`/tv/details/${id}`}
        prefetch={true}
        className="w-full h-[400px] overflow-hidden cursor-pointer"
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
          className="object-cover w-full h-full object-center transition group-hover:scale-125 duration-700 ease-in-out"
        />
      </Link>
      <div className="flex flex-col gap-2 text-center max-w-[250px] text-wrap">
        <Link
          href={`/tv/details/${id}`}
          prefetch={true}
          className="text-xl font-semibold cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-base text-themeGray">
          {genres
            .map((genre) => tvGenreData.find((g) => g.id === genre)?.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;
