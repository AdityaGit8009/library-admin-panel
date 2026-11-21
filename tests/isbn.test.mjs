import assert from "node:assert/strict"
import test from "node:test"
import { isbnProblem, normalizeIsbn } from "../lib/library/isbn.ts"

test("ISBN-10 and ISBN-13 honor their check digits", () => {
  for (const value of ["0-8044-2957-x", "978-0-306-40615-7"]) assert.equal(isbnProblem(value, []), "")
  for (const value of ["9780306406158", "123", "0X04429571"]) assert.match(isbnProblem(value, []), /valid ISBN/)
})

test("search and duplicate checks ignore human formatting", () => {
  assert.equal(normalizeIsbn("978 0-306-40615-7"), "9780306406157")
  assert.match(isbnProblem("9780306406157", [{ isbn: "978-0-306-40615-7" }]), /already/)
})
