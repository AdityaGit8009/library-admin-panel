import { normalizeIsbn } from "./isbn.ts"
import type { Book, Loan, Member } from "./session"

export function isOutstanding(loan: Loan) {
  return loan.returnDate === null && loan.status !== "returned"
}

export function borrowedCopies(book: Book, loans: readonly Loan[]) {
  return loans.filter((loan) => isOutstanding(loan) && (
    loan.bookId !== undefined ? loan.bookId === book.id : normalizeIsbn(loan.book.isbn) === normalizeIsbn(book.isbn)
  )).length
}

export function availableCopies(book: Book, loans: readonly Loan[]) {
  return Math.max(0, book.copies - borrowedCopies(book, loans))
}

export function memberLoans(member: Member, loans: readonly Loan[]) {
  return loans.filter((loan) => isOutstanding(loan) && (
    loan.memberId !== undefined ? loan.memberId === member.id : loan.member.email.toLowerCase() === member.email.toLowerCase()
  )).length
}
