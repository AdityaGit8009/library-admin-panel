export function nextRecordId(records: ReadonlyArray<{ id: number }>) {
  const highestId = records.reduce((highest, record) => Math.max(highest, record.id), 0)
  return highestId + 1
}
