import RelatedTV from "@/app/components/RelatedTV";
import TVContentDetails from "@/app/components/TVContentDetails";
import TVHeaderDetails from "@/app/components/TVHeaderDetails";
import type { FailedDetailsPageResponse } from "@/types/general";
import type { ITVShow } from "@/types/tv";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
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
          <RelatedTV id={data.id} />
        </>
      )}
    </div>
  );
};

export default page;
