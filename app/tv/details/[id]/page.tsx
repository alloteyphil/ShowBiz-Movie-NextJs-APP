import RelatedTV from "@/app/components/RelatedTV";
import TVContentDetails from "@/app/components/TVContentDetails";
import TVHeaderDetails from "@/app/components/TVHeaderDetails";
import type { ITVShow } from "@/types/tv";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let data;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.IMDB_API_KEY}&language=en-US`
    );

    if (res.ok) {
      data = (await res.json()) as ITVShow;
    }
  } catch (error) {
    console.log(error);
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
