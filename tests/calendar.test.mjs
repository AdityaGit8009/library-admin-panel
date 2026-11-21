import assert from "node:assert/strict"
import test from "node:test"
import { localDate } from "../lib/library/calendar.ts"

test("circulation dates use the local calendar day at both ends of the day", () => {
  assert.equal(localDate(new Date(2026, 0, 2, 0, 1)), "2026-01-02")
  assert.equal(localDate(new Date(2026, 10, 21, 23, 59)), "2026-11-21")
})
