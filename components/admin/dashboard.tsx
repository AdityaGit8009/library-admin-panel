"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  BookMarked,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
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

const statsCards = [
  {
    title: "Total Books",
    value: "12,847",
    change: "+2.5%",
    trend: "up",
    icon: BookOpen,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Active Members",
    value: "3,426",
    change: "+12.3%",
    trend: "up",
    icon: Users,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Books on Loan",
    value: "1,234",
    change: "-3.1%",
    trend: "down",
    icon: BookMarked,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Monthly Growth",
    value: "23.5%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

const loanActivityData = [
  { name: "Jan", loans: 120, returns: 100 },
  { name: "Feb", loans: 150, returns: 130 },
  { name: "Mar", loans: 180, returns: 160 },
  { name: "Apr", loans: 220, returns: 190 },
  { name: "May", loans: 280, returns: 250 },
  { name: "Jun", loans: 320, returns: 290 },
  { name: "Jul", loans: 350, returns: 310 },
]

const categoryData = [
  { name: "Fiction", value: 3200 },
  { name: "Non-Fiction", value: 2800 },
  { name: "Science", value: 2100 },
  { name: "History", value: 1800 },
  { name: "Arts", value: 1500 },
]

const recentLoans = [
  {
    id: 1,
    member: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    book: "The Great Gatsby",
    date: "Mar 24, 2026",
    status: "active",
  },
  {
    id: 2,
    member: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    book: "1984",
    date: "Mar 23, 2026",
    status: "active",
  },
  {
    id: 3,
    member: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    book: "To Kill a Mockingbird",
    date: "Mar 22, 2026",
    status: "overdue",
  },
  {
    id: 4,
    member: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    book: "Pride and Prejudice",
    date: "Mar 21, 2026",
    status: "active",
  },
]

const overdueBooks = [
  { id: 1, book: "The Catcher in the Rye", member: "Alex Brown", days: 5 },
  { id: 2, book: "Brave New World", member: "Lisa Smith", days: 3 },
  { id: 3, book: "The Hobbit", member: "Tom Harris", days: 7 },
]

export function Dashboard() {
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
                  <Badge
                    variant="outline"
                    className={
                      stat.trend === "up"
                        ? "text-[oklch(0.65_0.15_145)] border-[oklch(0.65_0.15_145)]"
                        : "text-destructive border-destructive"
                    }
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
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
              <CardTitle className="text-foreground">Loan Activity</CardTitle>
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
            <CardTitle className="text-foreground">Books by Category</CardTitle>
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
              <button className="text-sm text-primary hover:underline">View all</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={loan.avatar} alt={loan.member} />
                      <AvatarFallback>{loan.member[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{loan.member}</p>
                      <p className="text-sm text-muted-foreground">{loan.book}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={loan.status === "active" ? "default" : "destructive"}
                      className={
                        loan.status === "active"
                          ? "bg-[oklch(0.65_0.15_145)] text-[oklch(0.12_0.01_260)]"
                          : ""
                      }
                    >
                      {loan.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{loan.date}</p>
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
              {overdueBooks.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <p className="font-medium text-foreground">{item.book}</p>
                  <p className="text-sm text-muted-foreground">{item.member}</p>
                  <Badge variant="destructive" className="mt-2">
                    {item.days} days overdue
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
