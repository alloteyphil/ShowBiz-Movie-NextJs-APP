"use client";

import type { Movie } from "@/types/movie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MovieContentDetails = ({ data }: { data: Movie }) => {
  return (
    <Tabs
      defaultValue="account"
      className="w-full max-w-[1400px] mt-20 mx-auto"
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default MovieContentDetails;

// {
//   adult: false,
//   backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
//   belongs_to_collection: {
//     id: 720879,
//     name: 'Sonic the Hedgehog Collection',
//     poster_path: '/fwFWhYXj8wY6gFACtecJbg229FI.jpg',
//     backdrop_path: '/l5CIAdxVhhaUD3DaS4lP4AR2so9.jpg'
//   },
//   budget: 122000000,
//   genres: [
//     { id: 878, name: 'Science Fiction' },
//     { id: 12, name: 'Adventure' },
//     { id: 35, name: 'Comedy' },
//     { id: 10751, name: 'Family' }
//   ],
//   homepage: 'https://www.sonicthehedgehogmovie.com',
//   id: 939243,
//   imdb_id: 'tt18259086',
//   origin_country: [ 'US' ],
//   original_language: 'en',
//   original_title: 'Sonic the Hedgehog 3',
//   overview: 'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.',
//   popularity: 2230.916,
//   poster_path: '/nyEr1VqvKx1YiesMC3oTB2fZvpY.jpg',
//   production_companies: [
//     {
//       id: 4,
//       logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
//       name: 'Paramount Pictures',
//       origin_country: 'US'
//     },
//     {
//       id: 333,
//       logo_path: '/5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png',
//       name: 'Original Film',
//       origin_country: 'US'
//     },
//     {
//       id: 77884,
//       logo_path: '/dP2lxVNctD5Cried0IWVqgrO2o9.png',
//       name: 'Marza Animation Planet',
//       origin_country: 'JP'
//     },
//     {
//       id: 113750,
//       logo_path: '/A3QVZ9Ah0yI2d2GiXUFpdlbTgyr.png',
//       name: 'SEGA',
//       origin_country: 'JP'
//     },
//     {
//       id: 10644,
//       logo_path: '/ocLZIdYJBppuCt1rhYEb2jbpt5F.png',
//       name: 'Blur Studio',
//       origin_country: 'US'
//     }
//   ],
//   production_countries: [
//     { iso_3166_1: 'JP', name: 'Japan' },
//     { iso_3166_1: 'US', name: 'United States of America' }
//   ],
//   release_date: '2024-12-19',
//   revenue: 63400000,
//   runtime: 110,
//   spoken_languages: [
//     { english_name: 'English', iso_639_1: 'en', name: 'English' },
//     { english_name: 'Georgian', iso_639_1: 'ka', name: 'ქართული' },
//     { english_name: 'Spanish', iso_639_1: 'es', name: 'Español' }
//   ],
//   status: 'Released',
//   tagline: 'New adventure. New rival.',
//   title: 'Sonic the Hedgehog 3',
//   video: false,
//   vote_average: 7.8,
//   vote_count: 49
// }
