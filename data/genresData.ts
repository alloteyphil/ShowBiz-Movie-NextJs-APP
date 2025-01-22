import type { GenreType } from "@/types/genre";

export const movieGenreData: GenreType[] = [
  { id: 28, name: "Action", href: "/genre/movies/action?page=1" },
  { id: 12, name: "Adventure", href: "/genre/movies/adventure?page=1" },
  { id: 16, name: "Animation", href: "/genre/movies/animation?page=1" },
  { id: 35, name: "Comedy", href: "/genre/movies/comedy?page=1" },
  { id: 80, name: "Crime", href: "/genre/movies/crime?page=1" },
  { id: 99, name: "Documentary", href: "/genre/movies/documentary?page=1" },
  { id: 18, name: "Drama", href: "/genre/movies/drama?page=1" },
  { id: 10751, name: "Family", href: "/genre/movies/family?page=1" },
  { id: 14, name: "Fantasy", href: "/genre/movies/fantasy?page=1" },
  { id: 36, name: "History", href: "/genre/movies/history?page=1" },
  { id: 27, name: "Horror", href: "/genre/movies/horror?page=1" },
  { id: 10402, name: "Music", href: "/genre/movies/music?page=1" },
  { id: 9648, name: "Mystery", href: "/genre/movies/mystery?page=1" },
  { id: 10749, name: "Romance", href: "/genre/movies/romance?page=1" },
  {
    id: 878,
    name: "Science Fiction",
    href: "/genre/movies/science-fiction?page=1",
  },
  { id: 10770, name: "TV movie", href: "/genre/movies/tv-movies?page=1" },
  { id: 53, name: "Thriller", href: "/genre/movies/thriller?page=1" },
  { id: 10752, name: "War", href: "/genre/movies/war?page=1" },
  { id: 37, name: "Western", href: "/genre/movies/western?page=1" },
];

export const tvGenreData: GenreType[] = [
  {
    id: 10759,
    name: "Action & Adventure",
    href: "/genre/tv/action-adventure?page=1",
  },
  { id: 16, name: "Animation", href: "/genre/tv/animation?page=1" },
  { id: 35, name: "Comedy", href: "/genre/tv/comedy?page=1" },
  { id: 80, name: "Crime", href: "/genre/tv/crime?page=1" },
  { id: 99, name: "Documentary", href: "/genre/tv/documentary?page=1" },
  { id: 18, name: "Drama", href: "/genre/tv/drama?page=1" },
  { id: 10751, name: "Family", href: "/genre/tv/family?page=1" },
  { id: 10762, name: "Kids", href: "/genre/tv/kids?page=1" },
  { id: 9648, name: "Mystery", href: "/genre/tv/mystery?page=1" },
  { id: 10763, name: "News", href: "/genre/tv/news?page=1" },
  { id: 10764, name: "Reality", href: "/genre/tv/reality?page=1" },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
    href: "/genre/tv/sci-fi-fantasy?page=1",
  },
  { id: 10766, name: "Soap", href: "/genre/tv/soap?page=1" },
  { id: 10767, name: "Talk", href: "/genre/tv/talk?page=1" },
  { id: 10768, name: "War & Politics", href: "/genre/tv/war-politics?page=1" },
  { id: 37, name: "Western", href: "/genre/tv/western?page=1" },
];

export const updatedMovieGenres = movieGenreData.map((genre) => ({
  ...genre,
  href: `/genre/movies/${genre.id}?page=1`,
}));

export const updatedTvGenres = tvGenreData.map((genre) => ({
  ...genre,
  href: `/genre/tv/${genre.id}?page=1`,
}));
