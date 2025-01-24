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

const SearchPagination = ({ totalResults }: { totalResults: number }) => {
  const page = useSearchParams()?.get("page");

  const pathname = usePathname();

  const search = useSearchParams()?.get("query");

  const totalPages = Math.ceil(totalResults / 10);

  const checkPage = (paginationNumber: number): boolean => {
    return paginationNumber === Number(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/search/${pathname?.split("/")[2]}?query=${search}&page=${
              Number(page) === 1 ? 1 : Number(page) - 1
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={checkPage(1)}
            href={`/search/${pathname?.split("/")[2]}?query=${search}&page=1`}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={checkPage(2)}
              href={`/search/${pathname?.split("/")[2]}?query=${search}&page=2`}
            >
              2
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 2 && (
          <PaginationItem>
            <PaginationLink
              isActive={checkPage(3)}
              href={`/search/${pathname?.split("/")[2]}?query=${search}&page=3`}
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
              href={`/search/${
                pathname?.split("/")[2]
              }?query=${search}&page=${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={`/search/${pathname?.split("/")[2]}?query=${search}&page=${
              totalPages === Number(page) ? totalPages : Number(page) + 1
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SearchPagination;
