const pageSize = 5

export function getTablePage<T>(items: readonly T[], requestedPage: number) {
  const total = items.length
  const pageCount = Math.ceil(total / pageSize)
  const page = Math.max(1, Math.min(requestedPage, pageCount))
  const offset = (page - 1) * pageSize
  const end = Math.min(offset + pageSize, total)

  return {
    rows: items.slice(offset, end),
    page,
    pageCount,
    start: total > 0 ? offset + 1 : 0,
    end,
    total,
  }
}
