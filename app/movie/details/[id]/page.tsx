import MovieContentDetails from "@/app/components/MovieContentDetails";
import MovieHeaderDetails from "@/app/components/MovieHeaderDetails";
import RelatedMovies from "@/app/components/RelatedMovies";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { IMovie } from "@/types/movie";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let data;

  let error;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`
    );

    if (res.ok) {
      data = (await res.json()) as IMovie;
    } else {
      error = (await res.json()) as FailedDetailsPageResponse;
    }
  } catch (error) {
    console.log(error);
  }

  if (error) {
    redirect("/not-found");
  }

  return (
    <div className="bg-white min-h-screen text-white">
      {data && (
        <>
          <MovieHeaderDetails data={data} />
          <MovieContentDetails data={data} />
          <RelatedMovies id={data.id} />
        </>
      )}
    </div>
  );
};

export default page;
