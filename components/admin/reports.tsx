"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { encodeCsv } from "@/lib/report-csv"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Users,
  Calendar,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const monthlyTrendsData = [
  { month: "Oct", loans: 245, returns: 220, newMembers: 45 },
  { month: "Nov", loans: 280, returns: 260, newMembers: 52 },
  { month: "Dec", loans: 320, returns: 290, newMembers: 38 },
  { month: "Jan", loans: 290, returns: 310, newMembers: 65 },
  { month: "Feb", loans: 340, returns: 320, newMembers: 58 },
  { month: "Mar", loans: 380, returns: 350, newMembers: 72 },
]

const categoryDistribution = [
  { name: "Fiction", value: 3200, color: "oklch(0.65 0.15 165)" },
  { name: "Non-Fiction", value: 2800, color: "oklch(0.70 0.15 250)" },
  { name: "Science", value: 2100, color: "oklch(0.75 0.12 80)" },
  { name: "History", value: 1800, color: "oklch(0.60 0.18 320)" },
  { name: "Arts", value: 1500, color: "oklch(0.65 0.20 30)" },
]

const membershipData = [
  { type: "Standard", count: 1850, percentage: 54 },
  { type: "Premium", count: 1020, percentage: 30 },
  { type: "Student", count: 556, percentage: 16 },
]

const topBorrowedBooks = [
  { rank: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrows: 156 },
  { rank: 2, title: "1984", author: "George Orwell", borrows: 142 },
  { rank: 3, title: "To Kill a Mockingbird", author: "Harper Lee", borrows: 128 },
  { rank: 4, title: "Pride and Prejudice", author: "Jane Austen", borrows: 115 },
  { rank: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", borrows: 98 },
]

const weeklyActivity = [
  { day: "Mon", visits: 120, borrows: 45 },
  { day: "Tue", visits: 145, borrows: 52 },
  { day: "Wed", visits: 165, borrows: 61 },
  { day: "Thu", visits: 130, borrows: 48 },
  { day: "Fri", visits: 180, borrows: 72 },
  { day: "Sat", visits: 220, borrows: 95 },
  { day: "Sun", visits: 85, borrows: 28 },
]

const kpiData = [
  {
    title: "Total Revenue",
    value: "$24,580",
    change: "+12.5%",
    trend: "up",
    description: "From membership fees",
  },
  {
    title: "Avg. Loan Duration",
    value: "12.4 days",
    change: "-2.1%",
    trend: "down",
    description: "Books returned faster",
  },
  {
    title: "Member Retention",
    value: "94.2%",
    change: "+3.8%",
    trend: "up",
    description: "Monthly retention rate",
  },
  {
    title: "Late Returns",
    value: "8.3%",
    change: "-1.2%",
    trend: "down",
    description: "Overdue book rate",
  },
]

const reportCsv = encodeCsv([
  ["Section", "Item", "Metric", "Value"],
  ...kpiData.flatMap((kpi) => [
    ["Summary", kpi.title, "Value", kpi.value],
    ["Summary", kpi.title, "Change", kpi.change],
  ]),
  ...monthlyTrendsData.flatMap((month) => [
    ["Monthly trends", month.month, "Loans", month.loans],
    ["Monthly trends", month.month, "Returns", month.returns],
    ["Monthly trends", month.month, "New members", month.newMembers],
  ]),
  ...categoryDistribution.map((item) => ["Catalog", item.name, "Books", item.value]),
  ...membershipData.map((item) => ["Membership", item.type, "Members", item.count]),
  ...topBorrowedBooks.map((book) => ["Popular books", book.title, "Borrows", book.borrows]),
  ...weeklyActivity.flatMap((day) => [
    ["Weekly activity", day.day, "Visits", day.visits],
    ["Weekly activity", day.day, "Borrows", day.borrows],
  ]),
])
const reportUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(reportCsv)}`

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive library performance insights</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            October to March
          </span>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href={reportUrl} download="libraryhub-report.csv">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <Badge
                  variant="outline"
                  className={
                    kpi.trend === "up"
                      ? "text-[oklch(0.65_0.15_145)] border-[oklch(0.65_0.15_145)]"
                      : "text-chart-2 border-chart-2"
                  }
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Monthly Trends</CardTitle>
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="loans"
                    stroke="oklch(0.65 0.15 165)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.65 0.15 165)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="returns"
                    stroke="oklch(0.70 0.15 250)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.70 0.15 250)" }}
                  />
                </LineChart>
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
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 min-w-[140px]">
                {categoryDistribution.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis dataKey="day" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="visits" fill="oklch(0.65 0.15 165)" radius={[4, 4, 0, 0]} name="Visits" />
                  <Bar dataKey="borrows" fill="oklch(0.70 0.15 250)" radius={[4, 4, 0, 0]} name="Borrows" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Membership Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Membership Types</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membershipData.map((membership) => (
                <div key={membership.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{membership.type}</span>
                    <span className="text-sm font-medium text-foreground">{membership.count}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${membership.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{membership.percentage}% of total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Borrowed Books */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Top Borrowed Books</CardTitle>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              This Month
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Book</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Author</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Borrows</th>
                </tr>
              </thead>
              <tbody>
                {topBorrowedBooks.map((book) => (
                  <tr
                    key={book.rank}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <Badge
                        variant={book.rank <= 3 ? "default" : "outline"}
                        className={
                          book.rank === 1
                            ? "bg-[oklch(0.75_0.15_85)] text-[oklch(0.12_0.01_260)]"
                            : book.rank === 2
                            ? "bg-muted text-muted-foreground"
                            : book.rank === 3
                            ? "bg-[oklch(0.60_0.15_50)] text-[oklch(0.12_0.01_260)]"
                            : ""
                        }
                      >
                        #{book.rank}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">{book.title}</td>
                    <td className="py-3 px-4 text-muted-foreground">{book.author}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-primary">{book.borrows}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
