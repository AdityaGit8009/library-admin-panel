import assert from "node:assert/strict"
import test from "node:test"
import { encodeCsv } from "../lib/report-csv.ts"

test("CSV exports preserve quoted names, commas, newlines and numeric values", () => {
  assert.equal(encodeCsv([["Title", "Loans"], ['A, "B"', 3], ["Two\nlines", 0]]),
    'Title,Loans\r\n"A, ""B""",3\r\n"Two\nlines",0\r\n')
})
