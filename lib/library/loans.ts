export interface Loan {
  id: number
  member: {
    name: string
    avatar: string
    email: string
  }
  book: {
    title: string
    author: string
    isbn: string
  }
  loanDate: string
  dueDate: string
  returnDate: string | null
  status: "active" | "returned" | "overdue"
}

export const initialLoans: Loan[] = [
  {
    id: 1,
    member: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
    },
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
    },
    loanDate: "2026-03-10",
    dueDate: "2026-03-24",
    returnDate: null,
    status: "active",
  },
  {
    id: 2,
    member: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      email: "michael.chen@email.com",
    },
    book: {
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
    },
    loanDate: "2026-03-05",
    dueDate: "2026-03-19",
    returnDate: null,
    status: "overdue",
  },
  {
    id: 3,
    member: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      email: "emily.davis@email.com",
    },
    book: {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
    },
    loanDate: "2026-03-01",
    dueDate: "2026-03-15",
    returnDate: "2026-03-14",
    status: "returned",
  },
  {
    id: 4,
    member: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      email: "james.wilson@email.com",
    },
    book: {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
    },
    loanDate: "2026-03-15",
    dueDate: "2026-03-29",
    returnDate: null,
    status: "active",
  },
  {
    id: 5,
    member: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      email: "lisa.anderson@email.com",
    },
    book: {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0316769488",
    },
    loanDate: "2026-02-20",
    dueDate: "2026-03-05",
    returnDate: null,
    status: "overdue",
  },
  {
    id: 6,
    member: {
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      email: "david.brown@email.com",
    },
    book: {
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "978-0060850524",
    },
    loanDate: "2026-02-28",
    dueDate: "2026-03-14",
    returnDate: "2026-03-10",
    status: "returned",
  },
]
