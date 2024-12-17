import Header from "./components/Header";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#111111] w-full">
      <NavBar />
      <div className="max-w-[1600px] mx-auto flex flex-col">
        <Header />
      </div>
    </div>
  );
}
