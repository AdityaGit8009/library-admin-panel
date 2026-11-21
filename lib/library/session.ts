import { z } from "zod"

const id = z.number().int().positive()
const book = z.object({
  id, title: z.string(), author: z.string(), isbn: z.string(), category: z.string(),
  status: z.enum(["available", "borrowed", "reserved"]), copies: z.number().int().nonnegative(),
  publishedYear: z.number().int(),
})
const member = z.object({
  id, name: z.string(), email: z.string(), phone: z.string(), avatar: z.string(),
  membershipType: z.enum(["standard", "premium", "student"]), joinDate: z.string(),
  status: z.enum(["active", "inactive", "suspended"]),
})
const loan = z.object({
  id, memberId: id.optional(), bookId: id.optional(),
  member: member.pick({ name: true, email: true, avatar: true }),
  book: book.pick({ title: true, author: true, isbn: true }),
  loanDate: z.string(), dueDate: z.string(), returnDate: z.string().nullable(),
  status: z.enum(["active", "returned", "overdue"]),
})

const records = z.object({ books: z.array(book), members: z.array(member), loans: z.array(loan) })
const savedSession = z.object({ version: z.literal(1), records })
export type Book = z.infer<typeof book>
export type Member = z.infer<typeof member>
export type Loan = z.infer<typeof loan>
export type LibraryRecords = z.infer<typeof records>

export function readLibrarySession(value: string | null): LibraryRecords | undefined {
  if (!value) return
  try {
    const result = savedSession.safeParse(JSON.parse(value))
    return result.success ? result.data.records : undefined
  } catch {
    return undefined
  }
}
