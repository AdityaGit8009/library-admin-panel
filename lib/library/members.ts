export interface Member {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  membershipType: "standard" | "premium" | "student"
  joinDate: string
  booksLoaned: number
  status: "active" | "inactive" | "suspended"
}

export const initialMembers: Member[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    membershipType: "premium",
    joinDate: "2024-01-15",
    booksLoaned: 3,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    membershipType: "standard",
    joinDate: "2024-02-20",
    booksLoaned: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    membershipType: "student",
    joinDate: "2024-03-10",
    booksLoaned: 2,
    status: "active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    membershipType: "premium",
    joinDate: "2023-11-05",
    booksLoaned: 8,
    status: "active",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    membershipType: "standard",
    joinDate: "2024-01-28",
    booksLoaned: 0,
    status: "inactive",
  },
  {
    id: 6,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    membershipType: "student",
    joinDate: "2024-02-15",
    booksLoaned: 4,
    status: "suspended",
  },
]
