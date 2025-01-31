import { getWatchlist } from "@/actions/watchlist.actions";
import { verifyToken } from "@/lib/helpers/generateSession";
import { cookies } from "next/headers";
import WatchListCard from "../components/watchlist/WatchListCard";
import type { ObjectId } from "mongoose";
import WatchListBreadCrumbs from "../components/watchlist/WatchListBreadCrumbs";
import Image from "next/image";
import noResults from "../../public/images/empty.png";

type PayloadType = {
  email: string;
  timestamp: number;
  iat: number;
  exp: number;
};

interface IMovie {
  id: string;
  movieId: number;
  title: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  photo: string;
  comments: ObjectId[];
  type: string;
}

const page = async () => {
  let userEmail;

  let watchList;

  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session || session.value === "") {
    userEmail = undefined;

    return (
      <div className="flex flex-col gap-24 pb-32 text-white w-full pt-[160px] max-w-[1400px] mx-auto">
        <WatchListBreadCrumbs />
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <Image src={noResults} alt="No results" className="w-56" />
          <p className="text-themeGray text-center w-full">
            Please login to view your watchlist
          </p>
        </div>
      </div>
    );
  } else {
    const payload = (await verifyToken(session.value)) as PayloadType;

    if (payload) {
      userEmail = payload.email;
    }

    try {
      const res = await getWatchlist(payload.email);

      if (res.response === null && res.statusCode !== 200) {
        return (
          <div className="flex flex-col gap-24 pb-32 text-white w-full pt-[160px] max-w-[1400px] mx-auto">
            <WatchListBreadCrumbs />
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <Image src={noResults} alt="No results" className="w-56" />
              <p className="text-themeGray text-center w-full">
                There was an issue finding your watchlist
              </p>
            </div>
          </div>
        );
      }

      if (res.statusCode === 200) {
        watchList = res.response;
      }

      if (watchList.length === 0) {
        return (
          <div className="flex flex-col gap-24 pb-32 text-white w-full pt-[160px] max-w-[1400px] mx-auto">
            <WatchListBreadCrumbs />
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <Image src={noResults} alt="No results" className="w-56" />
              <p className="text-themeGray text-center w-full">
                No results. Start adding movies to your watchlist!
              </p>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error getting watchlist:", error);
    }
  }

  return (
    <div className="pt-24 pb-32 text-white flex flex-col gap-14 max-w-[1400px] mx-auto">
      <WatchListBreadCrumbs />
      <div className="grid grid-cols-4 gap-y-14 gap-x-6">
        {userEmail &&
          watchList &&
          watchList.map((movie: IMovie, i: number) => {
            return (
              <WatchListCard
                key={movie.id}
                id={movie.movieId}
                photo={movie.photo}
                title={movie.title}
                genres={movie.genres}
                type={movie.type}
              />
            );
          })}
      </div>
    </div>
  );
};

export default page;
