import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { GenreType } from "@/types/genre";

const GenrePageBreadcrumbs = async ({ id }: { id: string }) => {
  let genre;

  let error;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.IMDB_API_KEY}&language=en`,
    );

    const data = await res.json();

    genre = data.genres.find((g: GenreType) => g.id === parseInt(id));
  } catch (error) {
    console.log(error);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-themeGray hover:text-white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">
            {genre && genre.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default GenrePageBreadcrumbs;
