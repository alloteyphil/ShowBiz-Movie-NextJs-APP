"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import TVShowCard from "./TVShowCard";
import type { TVType } from "@/types/genre";

const RelatedTVCarousel = ({ data }: { data: TVType[] }) => {
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
        {data.map((movie, i) => (
          <CarouselItem key={i} className="lg:basis-1/4">
            <TVShowCard
              id={movie.id}
              image={movie.poster_path}
              title={movie.name || ""}
              genres={movie.genre_ids}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RelatedTVCarousel;
