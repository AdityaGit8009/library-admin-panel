"use client"

import { useState } from "react"
import type { Loan } from "@/lib/library/loans"
import { useLibraryCollection, useLibraryRecords } from "@/hooks/use-library"
import { RecordDetails } from "@/components/admin/record-details"
import { TablePagination, useTablePagination } from "@/components/admin/table-pagination"
import { nextRecordId } from "@/lib/record-id"
import { localDate } from "@/lib/library/calendar"
import { availableCopies } from "@/lib/library/circulation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  MoreHorizontal,
  BookMarked,
  ArrowRightLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LoansManagement() {
  const [loans, setLoans] = useLibraryCollection("loans")
  const { members, books } = useLibraryRecords()
  const borrowingMembers = members.filter((member) => member.status === "active")
  const availableBooks = books.filter((book) => book.status !== "reserved" && availableCopies(book, loans) > 0)
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newLoan, setNewLoan] = useState({
    memberId: "",
    bookId: "",
    dueDate: "",
  })

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const { rows: paginatedLoans, pagination } = useTablePagination(filteredLoans)

  const handleAddLoan = () => {
    const member = borrowingMembers.find((item) => item.id === Number(newLoan.memberId))
    const book = availableBooks.find((item) => item.id === Number(newLoan.bookId))
    const issued = localDate()
    if (!member || !book || !newLoan.dueDate || newLoan.dueDate < issued) return

    const loan: Omit<Loan, "id"> = {
      memberId: member.id,
      bookId: book.id,
      member: { name: member.name, email: member.email, avatar: member.avatar },
      book: { title: book.title, author: book.author, isbn: book.isbn },
      loanDate: issued,
      dueDate: newLoan.dueDate,
      returnDate: null,
      status: "active",
    }
    setLoans((current) => [{ ...loan, id: nextRecordId(current) }, ...current])
    setIsAddDialogOpen(false)
    setNewLoan({ memberId: "", bookId: "", dueDate: "" })
  }

  const handleReturnBook = (loanId: number) => {
    setLoans(
      loans.map((l) =>
        l.id === loanId
          ? { ...l, returnDate: localDate(), status: "returned" as const }
          : l
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2 text-[oklch(0.12_0.01_260)]"
      case "returned":
        return "bg-[oklch(0.65_0.15_145)] text-[oklch(0.12_0.01_260)]"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-3 w-3" />
      case "returned":
        return <CheckCircle className="h-3 w-3" />
      case "overdue":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return null
    }
  }

  const activeLoans = loans.filter((l) => l.status === "active").length
  const overdueLoans = loans.filter((l) => l.status === "overdue").length
  const returnedLoans = loans.filter((l) => l.status === "returned").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Loans Management</h1>
          <p className="text-muted-foreground">Track book loans and returns</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Loan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookMarked className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{loans.length}</p>
                <p className="text-sm text-muted-foreground">Total Loans</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <Clock className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeLoans}</p>
                <p className="text-sm text-muted-foreground">Active Loans</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{overdueLoans}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[oklch(0.65_0.15_145)]/10">
                <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.15_145)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{returnedLoans}</p>
                <p className="text-sm text-muted-foreground">Returned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by member or book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-input border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ArrowRightLeft className="h-5 w-5" />
            Loan Records ({filteredLoans.length} loans)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Member</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Book</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Loan Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={loan.member.avatar} alt={loan.member.name} />
                          <AvatarFallback>{loan.member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{loan.member.name}</p>
                          <p className="text-xs text-muted-foreground">{loan.member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{loan.book.title}</p>
                      <p className="text-xs text-muted-foreground">{loan.book.author}</p>
                    </td>
                    <td className="py-3 px-4 text-foreground">{loan.loanDate}</td>
                    <td className="py-3 px-4">
                      <p className="text-foreground">{loan.dueDate}</p>
                      {loan.returnDate && (
                        <p className="text-xs text-muted-foreground">Returned: {loan.returnDate}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(loan.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(loan.status)}
                        {loan.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${loan.book.title}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {loan.status !== "returned" && (
                            <DropdownMenuItem onClick={() => handleReturnBook(loan.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Returned
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => setSelectedLoan(loan)}>
                            <BookMarked className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination {...pagination} itemLabel="loans" />
        </CardContent>
      </Card>

      {selectedLoan && (
        <RecordDetails
          title={selectedLoan.book.title}
          fields={{
              Author: selectedLoan.book.author, ISBN: selectedLoan.book.isbn,
              Borrower: selectedLoan.member.name, Email: selectedLoan.member.email,
              Issued: selectedLoan.loanDate, Due: selectedLoan.dueDate,
              Returned: selectedLoan.returnDate ?? "Outstanding", Status: selectedLoan.status,
          }}
          onClose={() => setSelectedLoan(null)}
        />
      )}

      {/* Add Loan Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create New Loan</DialogTitle>
          </DialogHeader>
          <form
            id="add-loan"
            className="grid gap-4 py-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleAddLoan()
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="loan-member">Member</Label>
              <Select
                name="member"
                required
                value={newLoan.memberId}
                onValueChange={(value) => setNewLoan({ ...newLoan, memberId: value })}
              >
                <SelectTrigger id="loan-member" className="bg-input border-border">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {borrowingMembers.map((member) => (
                    <SelectItem key={member.id} value={String(member.id)}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="loan-book">Book</Label>
              <Select
                name="book"
                required
                value={newLoan.bookId}
                onValueChange={(value) => setNewLoan({ ...newLoan, bookId: value })}
              >
                <SelectTrigger id="loan-book" className="bg-input border-border">
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  {availableBooks.map((book) => (
                    <SelectItem key={book.id} value={String(book.id)}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                min={localDate()}
                required
                value={newLoan.dueDate}
                onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="add-loan" className="bg-primary hover:bg-primary/90">
              Create Loan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
