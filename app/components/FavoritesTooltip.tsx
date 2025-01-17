"use client";

import {
  addToFavorites,
  checkFavorites,
  removeFromFavorites,
} from "@/actions/favorites.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store";
import type { UserResponseType } from "@/types/user";
import { HeartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type isInFavoritesType = "loading" | true | false;

const FavoritesTooltip = () => {
  const [user, setUser] = useState<UserResponseType | null>(null);

  const storeState = useStore((state) => state);

  const setOpen = useStore((state) => state.setAuthDrawerOpen);

  const pathname = usePathname();

  const movieId = parseInt(pathname.split("/")[3]);

  const { toast } = useToast();

  const [isInFavorites, setIsInFavorites] =
    useState<isInFavoritesType>("loading");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      const handleCheckFavorites = async () => {
        const response = await checkFavorites(user?.email, movieId);

        if (response.response) {
          setIsInFavorites(true);
        } else {
          setIsInFavorites(false);
        }
      };
      handleCheckFavorites();
    }
  }, [user, movieId]);

  const handleClick = async () => {
    if (user === null || user === undefined) {
      setOpen(storeState);
      return;
    }
    if (isInFavorites === true) {
      const response = await removeFromFavorites(user?.email, movieId);

      if (response.statusCode === 200) {
        toast({
          title: "Removed from favorites",
          description: "Movie has been removed from your favorites",
          className: "bg-white border-[0.5px] border-[#111111] text-[#111111]",
        });
        setIsInFavorites(false);
        return;
      }
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        className: "bg-red-400 text-white",
      });

      return;
    }
    if (isInFavorites === false) {
      const response = await addToFavorites(user?.email, movieId);

      if (response.statusCode === 200) {
        setIsInFavorites(true);
        toast({
          title: "Added to favorites",
          description: "Movie has been added to your favorites",
          className: "bg-white border-[0.5px] border-[#111111] text-[#111111]",
        });
        return;
      }
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        className: "bg-red-400 text-white",
      });
      return;
    }
  };

  if (user === null || user === undefined) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => setOpen(storeState)}>
            <div className="relative w-16 h-12 p-6 my-auto text-[#111111] bg-white border-[0.5px] border-themeGray">
              <HeartIcon
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
        {isInFavorites === "loading" ? (
          <TooltipTrigger className="cursor-default">
            <div className="relative w-16 h-12 p-6 my-auto bg-white"></div>
          </TooltipTrigger>
        ) : (
          <TooltipTrigger onClick={handleClick}>
            <div className="relative w-16 h-12 p-6 my-auto bg-white text-[#111111] border-[0.5px] border-themeGray">
              <HeartIcon
                size={20}
                fill={isInFavorites ? "#111111" : "#ffffff"}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </TooltipTrigger>
        )}
        <>
          {isInFavorites === "loading" ? (
            <></>
          ) : isInFavorites === true ? (
            <TooltipContent>
              <p>Remove from favourites</p>
            </TooltipContent>
          ) : (
            <TooltipContent>
              <p>Add to favourites</p>
            </TooltipContent>
          )}
        </>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavoritesTooltip;
