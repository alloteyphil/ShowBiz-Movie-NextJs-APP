import type { GenreType } from "@/types/genre";

export const movieGenreData: GenreType[] = [
  { id: 28, name: "Action", href: "/genre/movie/action?page=1" },
  { id: 12, name: "Adventure", href: "/genre/movie/adventure?page=1" },
  { id: 16, name: "Animation", href: "/genre/movie/animation?page=1" },
  { id: 35, name: "Comedy", href: "/genre/movie/comedy?page=1" },
  { id: 80, name: "Crime", href: "/genre/movie/crime?page=1" },
  { id: 99, name: "Documentary", href: "/genre/movie/documentary?page=1" },
  { id: 18, name: "Drama", href: "/genre/movie/drama?page=1" },
  { id: 10751, name: "Family", href: "/genre/movie/family?page=1" },
  { id: 14, name: "Fantasy", href: "/genre/movie/fantasy?page=1" },
  { id: 36, name: "History", href: "/genre/movie/history?page=1" },
  { id: 27, name: "Horror", href: "/genre/movie/horror?page=1" },
  { id: 10402, name: "Music", href: "/genre/movie/music?page=1" },
  { id: 9648, name: "Mystery", href: "/genre/movie/mystery?page=1" },
  { id: 10749, name: "Romance", href: "/genre/movie/romance?page=1" },
  {
    id: 878,
    name: "Science Fiction",
    href: "/genre/movie/science-fiction?page=1",
  },
  { id: 10770, name: "TV movie", href: "/genre/movie/tv-movie?page=1" },
  { id: 53, name: "Thriller", href: "/genre/movie/thriller?page=1" },
  { id: 10752, name: "War", href: "/genre/movie/war?page=1" },
  { id: 37, name: "Western", href: "/genre/movie/western?page=1" },
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
  href: `/genre/movie/${genre.id}?page=1`,
}));

export const updatedTvGenres = tvGenreData.map((genre) => ({
  ...genre,
  href: `/genre/tv/${genre.id}?page=1`,
}));
