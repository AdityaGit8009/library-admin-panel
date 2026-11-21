"use client"

import { useState } from "react"
import { TablePagination, useTablePagination } from "@/components/admin/table-pagination"
import { nextRecordId } from "@/lib/record-id"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  BookOpen,
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

interface Book {
  id: number
  title: string
  author: string
  isbn: string
  category: string
  status: "available" | "borrowed" | "reserved"
  copies: number
  publishedYear: number
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    status: "available",
    copies: 5,
    publishedYear: 1925,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Fiction",
    status: "borrowed",
    copies: 3,
    publishedYear: 1949,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    category: "Fiction",
    status: "available",
    copies: 7,
    publishedYear: 1960,
  },
  {
    id: 4,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "978-0553380163",
    category: "Science",
    status: "reserved",
    copies: 2,
    publishedYear: 1988,
  },
  {
    id: 5,
    title: "The Art of War",
    author: "Sun Tzu",
    isbn: "978-1599869773",
    category: "History",
    status: "available",
    copies: 4,
    publishedYear: -500,
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    category: "Fiction",
    status: "borrowed",
    copies: 6,
    publishedYear: 1813,
  },
  {
    id: 7,
    title: "The Origin of Species",
    author: "Charles Darwin",
    isbn: "978-0451529060",
    category: "Science",
    status: "available",
    copies: 3,
    publishedYear: 1859,
  },
  {
    id: 8,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    isbn: "978-0143107637",
    category: "Fiction",
    status: "available",
    copies: 4,
    publishedYear: 1866,
  },
]

export function BooksManagement() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Fiction",
    copies: 1,
    publishedYear: new Date().getFullYear(),
  })

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
    const matchesStatus = statusFilter === "all" || book.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const { rows: paginatedBooks, pagination } = useTablePagination(filteredBooks)

  const handleAddBook = () => {
    const book: Omit<Book, "id"> = {
      ...newBook,
      title: newBook.title.trim(),
      author: newBook.author.trim(),
      isbn: newBook.isbn.trim(),
      status: "available",
    }
    setBooks((current) => [...current, { ...book, id: nextRecordId(current) }])
    setIsAddDialogOpen(false)
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      category: "Fiction",
      copies: 1,
      publishedYear: new Date().getFullYear(),
    })
  }

  const handleEditBook = () => {
    if (editingBook) {
      const book = { ...editingBook, title: editingBook.title.trim(), author: editingBook.author.trim() }
      setBooks((current) => current.map((existing) => (existing.id === book.id ? book : existing)))
      setEditingBook(null)
    }
  }

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[oklch(0.65_0.15_145)] text-[oklch(0.12_0.01_260)]"
      case "borrowed":
        return "bg-[oklch(0.75_0.15_85)] text-[oklch(0.12_0.01_260)]"
      case "reserved":
        return "bg-chart-2 text-[oklch(0.12_0.01_260)]"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Books Management</h1>
          <p className="text-muted-foreground">Manage your library&apos;s book collection</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] bg-input border-border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5" />
            Book Inventory ({filteredBooks.length} books)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Author</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ISBN</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Copies</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.publishedYear}</p>
                    </td>
                    <td className="py-3 px-4 text-foreground">{book.author}</td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-sm">{book.isbn}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="border-border">
                        {book.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(book.status)}>{book.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-foreground">{book.copies}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingBook(book)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Book
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination {...pagination} itemLabel="books" />
        </CardContent>
      </Card>

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add New Book</DialogTitle>
          </DialogHeader>
          <form
            id="add-book"
            className="grid gap-4 py-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleAddBook()
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                pattern={".*\\S.*"}
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                required
                pattern={".*\\S.*"}
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  required
                  pattern={".*\\S.*"}
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newBook.category}
                  onValueChange={(value) => setNewBook({ ...newBook, category: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="copies">Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  required
                  min={0}
                  value={Number.isNaN(newBook.copies) ? "" : newBook.copies}
                  onChange={(e) => setNewBook({ ...newBook, copies: e.currentTarget.valueAsNumber })}
                  className="bg-input border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Published Year</Label>
                <Input
                  id="year"
                  type="number"
                  required
                  value={Number.isNaN(newBook.publishedYear) ? "" : newBook.publishedYear}
                  onChange={(e) => setNewBook({ ...newBook, publishedYear: e.currentTarget.valueAsNumber })}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="add-book" className="bg-primary hover:bg-primary/90">
              Add Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Book</DialogTitle>
          </DialogHeader>
          {editingBook && (
            <form
              id="edit-book"
              className="grid gap-4 py-4"
              onSubmit={(event) => {
                event.preventDefault()
                handleEditBook()
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  required
                  pattern={".*\\S.*"}
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  required
                  pattern={".*\\S.*"}
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingBook.status}
                    onValueChange={(value: "available" | "borrowed" | "reserved") =>
                      setEditingBook({ ...editingBook, status: value })
                    }
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="borrowed">Borrowed</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-copies">Copies</Label>
                  <Input
                    id="edit-copies"
                    type="number"
                    required
                    min={0}
                    value={Number.isNaN(editingBook.copies) ? "" : editingBook.copies}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, copies: e.currentTarget.valueAsNumber })
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
            </form>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBook(null)}>
              Cancel
            </Button>
            <Button type="submit" form="edit-book" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
