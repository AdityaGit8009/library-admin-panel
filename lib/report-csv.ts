export function encodeCsv(rows: ReadonlyArray<ReadonlyArray<string | number>>) {
  const lines = rows.map((row) => row.map((cell) => {
    const value = String(cell)
    return /[",\r\n]/.test(value) ? '"' + value.replaceAll('"', '""') + '"' : value
  }).join(","))
  return lines.join("\r\n") + "\r\n"
}
