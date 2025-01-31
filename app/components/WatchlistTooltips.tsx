"use client";

import {
  addToWatchlist,
  checkWatchlist,
  removeFromWatchlist,
} from "@/actions/watchlist.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useDrawerStore } from "@/store";
import type { UserResponseType } from "@/types/user";
import { MinusIcon, PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type isInWatchlistType = "loading" | true | false;

const WatchlistTooltip = ({
  title,
  genres,
  photo,
  type,
}: {
  title: string;
  genres: { id: number; name: string }[];
  photo: string;
  type: string;
}) => {
  const [user, setUser] = useState<UserResponseType | null>(null);

  const storeState = useDrawerStore((state) => state);

  const setOpen = useDrawerStore((state) => state.setAuthDrawerOpen);

  const pathname = usePathname();

  const movieId = parseInt(pathname!.split("/")[3]);

  const { toast } = useToast();

  const [isInWatchlist, setIsInWatchlist] =
    useState<isInWatchlistType>("loading");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      const handleCheckWatchlist = async () => {
        const response = await checkWatchlist(user?.email, movieId);

        if (response.response) {
          setIsInWatchlist(true);
        } else {
          setIsInWatchlist(false);
        }
      };

      handleCheckWatchlist();
    }
  }, [user, movieId]);

  const handleClick = async () => {
    if (user === null || user === undefined) {
      setOpen(storeState);
      return;
    }
    if (isInWatchlist === true) {
      const res = await removeFromWatchlist(user?.email, movieId);
      if (res.statusCode === 200) {
        toast({
          title: "Removed from watchlist",
          description: "Movie has been removed from your watchlist",
          className:
            "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });
        setIsInWatchlist(false);
        return;
      }
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    if (isInWatchlist === false) {
      const res = await addToWatchlist(
        user.email,
        movieId,
        title,
        genres,
        photo,
        type,
      );
      if (res.statusCode === 200) {
        toast({
          title: "Added to watchlist",
          description: "Movie has been added to your watchlist",
          className:
            "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
        });
        setIsInWatchlist(true);
        return;
      }
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        className:
          "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
      });
      return;
    }

    return;
  };

  if (user === null || user === undefined) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => setOpen(storeState)}>
            <div className="relative w-16 h-12 p-6 my-auto bg-[#111111] text-white">
              <PlusIcon
                size={20}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in to add to watchlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        {isInWatchlist === "loading" ? (
          <TooltipTrigger className="cursor-default">
            <div className="relative w-16 h-12 p-6 my-auto bg-white"></div>
          </TooltipTrigger>
        ) : isInWatchlist === true ? (
          <TooltipTrigger onClick={handleClick}>
            <div className="relative w-16 h-12 p-6 my-auto bg-[#111111] text-white">
              <MinusIcon
                size={20}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </TooltipTrigger>
        ) : (
          <TooltipTrigger onClick={handleClick}>
            <div className="relative w-16 h-12 p-6 my-auto bg-[#111111] text-white">
              <PlusIcon
                size={20}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </TooltipTrigger>
        )}
        <>
          {isInWatchlist === "loading" ? (
            <></>
          ) : isInWatchlist === true ? (
            <TooltipContent>
              <p>Remove from watchlist</p>
            </TooltipContent>
          ) : (
            <TooltipContent>
              <p>Add to watchlist</p>
            </TooltipContent>
          )}
        </>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WatchlistTooltip;
