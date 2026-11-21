"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { getTablePage } from "@/lib/table-page"

export function useTablePagination<T>(items: T[]) {
  const [requestedPage, setPage] = useState(1)
  const { rows, ...range } = getTablePage(items, requestedPage)

  return {
    rows,
    pagination: { ...range, onPageChange: setPage },
  }
}

interface TablePaginationProps {
  itemLabel: string
  page: number
  pageCount: number
  start: number
  end: number
  total: number
  onPageChange: (page: number) => void
}

export function TablePagination({
  itemLabel, page, pageCount, start, end, total, onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
      <p role="status" className="text-sm text-muted-foreground">
        {total === 0
          ? `No matching ${itemLabel}.`
          : `Showing ${start} to ${end} of ${total} ${itemLabel}`}
      </p>
      {total > 0 && (
        <Pagination aria-label={`${itemLabel} pagination`} className="mx-0 w-auto items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            aria-label="Previous page"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-foreground">
            Page {page} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            aria-label="Next page"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageCount}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Pagination>
      )}
    </div>
  )
}
