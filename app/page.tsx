"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Dashboard } from "@/components/admin/dashboard"
import { BooksManagement } from "@/components/admin/books-management"
import { MembersManagement } from "@/components/admin/members-management"
import { LoansManagement } from "@/components/admin/loans-management"
import { Reports } from "@/components/admin/reports"
import { Settings } from "@/components/admin/settings"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)")
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setSidebarOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onViewLoans={() => setActiveTab("loans")} />
      case "books":
        return <BooksManagement />
      case "members":
        return <MembersManagement />
      case "loans":
        return <LoansManagement />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      default:
        return <Dashboard onViewLoans={() => setActiveTab("loans")} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open navigation"
            className="fixed top-4 left-4 z-30 bg-card border-border lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 max-w-full gap-0" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Library navigation</SheetTitle>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab)
              setSidebarOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      <div className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{renderContent()}</div>
      </main>
    </div>
  )
}
