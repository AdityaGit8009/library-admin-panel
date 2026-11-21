export function normalizeIsbn(value: string) {
  return value.replace(/[\s-]/g, "").toUpperCase()
}

export function isbnProblem(value: string, books: readonly { isbn: string }[]): string {
  const isbn = normalizeIsbn(value)
  let valid = false
  if (/^(978|979)\d{10}$/.test(isbn)) {
    const sum = [...isbn].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0)
    valid = sum % 10 === 0
  } else if (/^\d{9}[\dX]$/.test(isbn)) {
    const sum = [...isbn].reduce((total, digit, index) => total + (digit === "X" ? 10 : Number(digit)) * (10 - index), 0)
    valid = sum % 11 === 0
  }
  if (!valid) return "Enter a valid ISBN-10 or ISBN-13, including its check digit."
  if (books.some((book) => normalizeIsbn(book.isbn) === isbn)) return "This ISBN is already in the catalog."
  return ""
}
