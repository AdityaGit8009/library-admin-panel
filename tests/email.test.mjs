import assert from "node:assert/strict"
import test from "node:test"
import { memberEmailInUse } from "../lib/library/email.ts"

test("member addresses are unique regardless of spacing and case", () => {
  const members = [{ id: 2, email: "Ada@Example.test" }]
  assert.equal(memberEmailInUse(" ada@example.test ", members), true)
  assert.equal(memberEmailInUse("ada@example.test", members, 2), false)
  assert.equal(memberEmailInUse("other@example.test", members), false)
})
