"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLibraryRecords } from "@/hooks/use-library"
import { isOutstanding, loanStatus } from "@/lib/library/circulation"
import { localDate } from "@/lib/library/calendar"
import { MemberAvatar } from "@/components/admin/member-avatar"
import {
  BookOpen,
  Users,
  BookMarked,
  Clock,
  AlertCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const loanActivityData = [
  { name: "Jan", loans: 120, returns: 100 },
  { name: "Feb", loans: 150, returns: 130 },
  { name: "Mar", loans: 180, returns: 160 },
  { name: "Apr", loans: 220, returns: 190 },
  { name: "May", loans: 280, returns: 250 },
  { name: "Jun", loans: 320, returns: 290 },
  { name: "Jul", loans: 350, returns: 310 },
]

export function Dashboard({ onViewLoans }: { onViewLoans: () => void }) {
  const { books, members, loans } = useLibraryRecords()
  const today = localDate()
  const recentLoans = [...loans].sort((a, b) => b.loanDate.localeCompare(a.loanDate) || b.id - a.id).slice(0, 4)
  const overdue = loans.filter((loan) => loanStatus(loan, today) === "overdue")
  const overdueBooks = [...overdue].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3)
  const statsCards = [
    { title: "Catalog titles", value: books.length, icon: BookOpen, color: "text-chart-1", bgColor: "bg-chart-1/10" },
    { title: "Active members", value: members.filter((member) => member.status === "active").length, icon: Users, color: "text-chart-2", bgColor: "bg-chart-2/10" },
    { title: "Books on loan", value: loans.filter(isOutstanding).length, icon: BookMarked, color: "text-chart-3", bgColor: "bg-chart-3/10" },
    { title: "Overdue loans", value: overdue.length, icon: AlertCircle, color: "text-chart-4", bgColor: "bg-chart-4/10" },
  ]
  const categories = new Map<string, number>()
  for (const book of books) categories.set(book.category, (categories.get(book.category) ?? 0) + 1)
  const categoryData = Array.from(categories, ([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your library overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: Just now
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Activity Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Sample Loan Activity</CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">Loans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">Returns</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loanActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="loans"
                    stroke="oklch(0.65 0.15 165)"
                    fill="oklch(0.65 0.15 165 / 0.2)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="returns"
                    stroke="oklch(0.70 0.15 250)"
                    fill="oklch(0.70 0.15 250 / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Titles by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis type="number" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="oklch(0.65 0 0)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Bar dataKey="value" fill="oklch(0.65 0.15 165)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Loans */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Recent Loans</CardTitle>
              <button onClick={onViewLoans} className="text-sm text-primary hover:underline">View all loans</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoans.length === 0 && <p className="text-sm text-muted-foreground">No checkouts yet.</p>}
              {recentLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MemberAvatar name={loan.member.name} src={loan.member.avatar} />
                    <div>
                      <p className="font-medium text-foreground">{loan.member.name}</p>
                      <p className="text-sm text-muted-foreground">{loan.book.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={loanStatus(loan, today) === "overdue" ? "destructive" : "secondary"}>
                      {loanStatus(loan, today)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{loan.loanDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Books */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-foreground">Overdue Books</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueBooks.length === 0 && <p className="text-sm text-muted-foreground">No overdue loans.</p>}
              {overdueBooks.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <p className="font-medium text-foreground">{item.book.title}</p>
                  <p className="text-sm text-muted-foreground">{item.member.name}</p>
                  <Badge variant="destructive" className="mt-2">
                    Due {item.dueDate}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
