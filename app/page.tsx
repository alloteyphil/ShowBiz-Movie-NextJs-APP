import AuthDrawer from "./components/AuthDrawer";
import FeaturedShows from "./components/FeaturedShows";
import Footer from "./components/Footer";
import Header from "./components/Header";

const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="relative min-h-screen bg-[#111111] w-full">
      <AuthDrawer />

      <div className="max-w-[1600px] mx-auto flex flex-col">
        <Header />
        <FeaturedShows />
      </div>
      <Footer />
    </div>
  );
}
