import Comment from "@/app/components/PostComment";
import RelatedTV from "@/app/components/RelatedTV";
import TVContentDetails from "@/app/components/TVContentDetails";
import TVHeaderDetails from "@/app/components/TVHeaderDetails";
import { verifyToken } from "@/lib/helpers/generateSession";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { ITVShow } from "@/types/tv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`,
    );

    if (res.ok) {
      data = (await res.json()) as ITVShow;
    } else {
      error = (await res.json()) as FailedDetailsPageResponse;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("TV show details fetch error:", errorMessage);
    redirect("/not-found");
  }

  if (error) {
    redirect("/not-found");
  }

  return (
    <div className="bg-white min-h-screen">
      {data && (
        <>
          <TVHeaderDetails data={data} />
          <TVContentDetails data={data} />
          <Comment id={data.id} email={userEmail ?? ""} />
          <RelatedTV id={data.id} />
        </>
      )}
    </div>
  );
};

export default page;
