import MovieContentDetails from "@/app/components/movie/MovieContentDetails";
import MovieHeaderDetails from "@/app/components/movie/MovieHeaderDetails";
import RelatedMovies from "@/app/components/movie/RelatedMovies";
import { verifyToken } from "@/lib/helpers/generateSession";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { IMovie } from "@/types/movie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CommentSection from "@/app/components/comment/CommentSection";

type PayloadType = {
  email: string;
  timestamp: number;
  iat: number;
  exp: number;
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  let userEmail: string | undefined;

  if (!session || session.value === "") {
    userEmail = undefined;
  } else {
    const payload = (await verifyToken(session.value)) as PayloadType;
    userEmail = payload?.email;
  }

  const { id } = await params;

  let data;

  let error;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`,
    );

    if (res.ok) {
      data = (await res.json()) as IMovie;
    } else {
      error = (await res.json()) as FailedDetailsPageResponse;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Movie details fetch error:", errorMessage);
    redirect("/not-found");
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
          <CommentSection
            id={data.id}
            email={userEmail ?? ""}
            type={"movie"}
            photo={data.poster_path || ""}
            title={data.title || data.original_title || ""}
          />
          <RelatedMovies id={data.id} />
        </>
      )}
    </div>
  );
};

export default page;
