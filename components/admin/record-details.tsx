import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RecordDetailsProps {
  title: string
  fields: Record<string, string | number>
  onClose: () => void
}

export function RecordDetails({ title, fields, onClose }: RecordDetailsProps) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {Object.entries(fields).map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="min-w-0 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
