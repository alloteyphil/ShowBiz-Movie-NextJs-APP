"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const PaginationMovieTV = ({ totalResults }: { totalResults: number }) => {
  const page = useSearchParams()?.get("page");

  const pathname = usePathname();

  const totalPages = Math.ceil(totalResults / 10);

  const checkPage = (paginationNumber: number): boolean => {
    return paginationNumber === Number(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/genre/${pathname?.split("/")[2]}/?page=${
              Number(page) === 1 ? 1 : Number(page) - 1
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={page === null || checkPage(1)}
            href={`/genre/${pathname?.split("/")[2]}/?page=1`}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={checkPage(2)}
              href={`/genre/${pathname?.split("/")[2]}/?page=2`}
            >
              2
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 2 && (
          <PaginationItem>
            <PaginationLink
              isActive={checkPage(3)}
              href={`/genre/${pathname?.split("/")[2]}/?page=3`}
            >
              3
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Number(page) > 3 && (
          <PaginationItem>
            <PaginationLink
              isActive={true}
              href={`/genre/${pathname?.split("/")[2]}/?page=${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={`/genre/${pathname?.split("/")[2]}/?page=${
              totalPages === Number(page)
                ? totalPages
                : page === null
                  ? 2
                  : Number(page) + 1
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMovieTV;
