import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useMemo } from 'react'

interface IPagination {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: IPagination) {
  const pagesPerGroup = 5
  const currentGroup = Math.ceil(currentPage / pagesPerGroup)

  const { startPage, endPage } = useMemo(() => {
    const start = (currentGroup - 1) * pagesPerGroup + 1
    return {
      startPage: start,
      endPage: Math.min(start + pagesPerGroup - 1, totalPages),
    }
  }, [currentGroup, totalPages])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    setCurrentPage(page)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PaginationUI>
      <PaginationContent>
        {currentGroup > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(startPage - 1)}
            />
          </PaginationItem>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(endPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  )
}
