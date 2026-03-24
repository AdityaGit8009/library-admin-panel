"use client"

import { useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Dashboard } from "@/components/admin/dashboard"
import { BooksManagement } from "@/components/admin/books-management"
import { MembersManagement } from "@/components/admin/members-management"
import { LoansManagement } from "@/components/admin/loans-management"
import { Reports } from "@/components/admin/reports"
import { Settings } from "@/components/admin/settings"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
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
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card border-border"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab)
            setSidebarOpen(false)
          }}
        />
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{renderContent()}</div>
      </main>
    </div>
  )
}
