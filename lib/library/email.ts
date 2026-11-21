export function memberEmailInUse(email: string, members: readonly { id: number; email: string }[], editingId?: number) {
  const address = email.trim().toLowerCase()
  return members.some((member) => member.id !== editingId && member.email.trim().toLowerCase() === address)
}
