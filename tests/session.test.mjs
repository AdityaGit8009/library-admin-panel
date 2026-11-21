import assert from "node:assert/strict"
import test from "node:test"
import { readLibrarySession } from "../lib/library/session.ts"

test("a saved empty collection stays empty across reloads", () => {
  const records = { books: [], members: [], loans: [] }
  assert.deepEqual(readLibrarySession(JSON.stringify({ version: 1, records })), records)
})

test("malformed records and unknown versions fall back to sample data", () => {
  for (const value of [null, "{", '{"version":2}', '{"version":1,"records":{"books":[{}],"members":[],"loans":[]}}']) {
    assert.equal(readLibrarySession(value), undefined)
  }
})
