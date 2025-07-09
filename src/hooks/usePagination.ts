import { useState, useMemo } from "react";
import { Pokemon } from "../types/Pokemon";

export function usePagination(data: Pokemon[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    paginatedData,
    currentPage,
    setCurrentPage,
    maxPage,
  };
}
