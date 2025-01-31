"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { TVGenreType } from "@/types/genre";
import TVShowCard from "./TVShowCard";

const RelatedTVCarousel = ({ data }: { data: TVGenreType[] }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="justify-between">
        {data.map((tv, i) => {
          if (
            tv.poster_path === null ||
            tv.poster_path === "" ||
            tv.backdrop_path === null ||
            tv.backdrop_path === ""
          ) {
            return;
          }
          return (
            <CarouselItem key={i} className="lg:basis-1/4">
              <TVShowCard
                id={tv.id}
                image={tv.poster_path}
                title={tv.name || tv.original_name || "N/A"}
                genres={tv.genre_ids}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default RelatedTVCarousel;
