import FeaturedShows from "./components/FeaturedShows";
import Header from "./components/layout/Header";

const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  return (
    <div className="relative min-h-screen bg-[#111111] w-full">
      <div className="max-w-[1600px] mx-auto flex flex-col">
        <Header />
        <FeaturedShows />
      </div>
    </div>
  );
}
