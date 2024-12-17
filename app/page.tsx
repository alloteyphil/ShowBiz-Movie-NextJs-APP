import FeaturedShows from "./components/FeaturedShows";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#111111] w-full">
      <NavBar />
      <div className="max-w-[1600px] mx-auto flex flex-col">
        <Header />
        <FeaturedShows />
      </div>
    </div>
  );
}
