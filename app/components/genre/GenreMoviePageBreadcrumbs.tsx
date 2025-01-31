import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { GenreType } from "@/types/genre";

const GenreMoviePageBreadcrumbs = async ({ id }: { id: string }) => {
  let genre;

  let error: string | null = null;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.IMDB_API_KEY}&language=en`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch genre data: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    genre = data.genres.find((g: GenreType) => g.id === parseInt(id));

    if (!genre) {
      error = `Genre with ID ${id} not found`;
    }
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load genre information";
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
            {error ? "Unknown Genre" : genre?.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default GenreMoviePageBreadcrumbs;
