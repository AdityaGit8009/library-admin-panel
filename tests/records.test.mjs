import assert from "node:assert/strict"
import test from "node:test"
import { nextRecordId } from "../lib/record-id.ts"
import { getTablePage } from "../lib/table-page.ts"

test("deleting a record in the middle does not reuse a surviving ID", () => {
  const remaining = [{ id: 4 }, { id: 1 }, { id: 3 }]
  assert.equal(nextRecordId(remaining), 5)
  assert.equal(nextRecordId([]), 1)
})

test("the last page reports the range of remaining rows", () => {
  const rows = [1, 2, 3, 4, 5, 6]
  assert.deepEqual(getTablePage(rows, 2), {
    rows: [6], page: 2, pageCount: 2, start: 6, end: 6, total: 6,
  })
})

test("filtering or deleting the last row on page two shows the surviving rows", () => {
  const result = getTablePage(["The Great Gatsby"], 2)
  assert.deepEqual(result, {
    rows: ["The Great Gatsby"], page: 1, pageCount: 1, start: 1, end: 1, total: 1,
  })
})

test("an empty search has an empty range", () => {
  assert.deepEqual(getTablePage([], 2), {
    rows: [], page: 1, pageCount: 0, start: 0, end: 0, total: 0,
  })
})
