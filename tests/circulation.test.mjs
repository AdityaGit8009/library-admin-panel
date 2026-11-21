import assert from "node:assert/strict"
import test from "node:test"
import { availableCopies, borrowedCopies, loanStatus, memberLoans, returnLoan } from "../lib/library/circulation.ts"

const book = { id: 4, isbn: "978-0-306-40615-7", copies: 2 }
const open = { book: { isbn: "9780306406157" }, returnDate: null, status: "active" }

test("available stock counts outstanding copies and recognizes older ISBN snapshots", () => {
  const loans = [open, { ...open, bookId: 4 }, { ...open, bookId: 8 }, { ...open, status: "returned" }]
  assert.equal(borrowedCopies(book, loans), 2)
  assert.equal(availableCopies(book, loans), 0)
  assert.equal(availableCopies(book, [{ ...open, returnDate: "2026-09-10" }]), 2)
})

test("member balances follow current and legacy outstanding loans", () => {
  const member = { id: 2, email: "new@example.test" }
  const legacy = { ...open, member: { email: "NEW@example.test" } }
  const previousEmail = { ...legacy, memberId: 2, member: { email: "old@example.test" } }
  assert.equal(memberLoans(member, [legacy, previousEmail, { ...legacy, memberId: 8 }, { ...legacy, status: "returned" }]), 2)
})

test("a due date remains current through the day and returned loans stay closed", () => {
  const loan = { ...open, dueDate: "2026-10-20" }
  assert.equal(loanStatus(loan, "2026-10-20"), "active")
  assert.equal(loanStatus(loan, "2026-10-21"), "overdue")
  assert.equal(loanStatus({ ...loan, returnDate: "2026-10-19" }, "2026-10-21"), "returned")
})

test("repeating a return preserves the original return date and stock count", () => {
  const original = [{ ...open, id: 8, bookId: 4 }]
  const returned = returnLoan(original, 8, "2026-10-20")
  assert.equal(returned[0].returnDate, "2026-10-20")
  assert.equal(availableCopies(book, returned), 2)
  assert.equal(returnLoan(returned, 8, "2026-10-23"), returned)
  assert.equal(returnLoan(original, 99, "2026-10-23"), original)
  assert.equal(original[0].returnDate, null)
})
