import MovieContentDetails from "@/app/components/MovieContentDetails";
import MovieHeaderDetails from "@/app/components/MovieHeaderDetails";
import type { Movie } from "@/types/movie";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`
    );

    if (res.ok) {
      data = (await res.json()) as Movie;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-white min-h-screen text-white">
      {data && (
        <>
          <MovieHeaderDetails data={data} />
          <MovieContentDetails data={data} />
        </>
      )}
    </div>
  );
};

export default page;
