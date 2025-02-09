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
      <div className="sm:px-6 md:px-8 lg:pt-28 pb-28 md:pb-20 lg:pb-32 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
        <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
          <WatchListBreadCrumbs />
          <Image
            src={noResults}
            alt="No results"
            className="w-40 sm:w-48 md:w-52 lg:w-56"
          />
          <p className="text-themeGray text-center w-full max-w-md sm:max-w-lg md:max-w-xl">
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
          <div className="sm:px-6 md:px-8 lg:pt-28 pb-28 md:pb-20 lg:pb-32 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
            <WatchListBreadCrumbs />
            <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
              <Image
                src={noResults}
                alt="No results"
                className="w-40 sm:w-48 md:w-52 lg:w-56"
              />
              <p className="text-themeGray text-center w-full max-w-md sm:max-w-lg md:max-w-xl">
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
          <div className="sm:px-6 md:px-8 lg:pt-28 pb-28 md:pb-20 lg:pb-32 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
            <WatchListBreadCrumbs />
            <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
              <Image
                src={noResults}
                alt="No results"
                className="w-40 sm:w-48 md:w-52 lg:w-56"
              />
              <p className="text-themeGray text-center w-full max-w-md sm:max-w-lg md:max-w-xl">
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
    <div className="sm:px-6 md:px-8 lg:pt-28 pb-28 md:pb-20 lg:pb-32 text-white flex flex-col gap-14 max-md:gap-8 md:gap-10 lg:gap-14 max-w-[1400px] mx-auto max-md:px-8">
      <WatchListBreadCrumbs />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-14 gap-x-6 max-md:gap-y-10 max-md:gap-x-4 md:gap-y-12 md:gap-x-5 lg:gap-y-14 lg:gap-x-6">
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
