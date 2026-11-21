import assert from "node:assert/strict"
import test from "node:test"
import { availableCopies, borrowedCopies, memberLoans } from "../lib/library/circulation.ts"

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
