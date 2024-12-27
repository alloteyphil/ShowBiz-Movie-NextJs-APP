"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import MovieCard from "./MovieCard";
import type { TrendingGenreType } from "@/types/genre";

const RelatedMovieCarousel = ({ data }: { data: TrendingGenreType[] }) => {
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
        {data.map((movie, i) => {
          if (
            movie.poster_path === null ||
            movie.poster_path === "" ||
            movie.backdrop_path === null ||
            movie.backdrop_path === ""
          ) {
            return;
          }
          return (
            <CarouselItem key={i} className="lg:basis-1/4">
              <MovieCard
                id={movie.id}
                image={movie.poster_path}
                title={movie.original_title || ""}
                genres={movie.genre_ids}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default RelatedMovieCarousel;
