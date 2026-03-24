"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Mail,
  Save,
  Library,
} from "lucide-react"

export function Settings() {
  const [librarySettings, setLibrarySettings] = useState({
    name: "LibraryHub Central",
    address: "123 Library Street, Booktown, BK 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@libraryhub.com",
    openingHours: "9:00 AM - 8:00 PM",
  })

  const [loanSettings, setLoanSettings] = useState({
    defaultLoanDays: "14",
    maxRenewals: "2",
    maxBooksPerMember: "5",
    lateFeePerDay: "0.50",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    dueDateReminders: true,
    newBookAlerts: false,
    overdueNotifications: true,
    membershipExpiry: true,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your library system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Library Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Library className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-foreground">Library Information</CardTitle>
                  <CardDescription>Basic information about your library</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="library-name">Library Name</Label>
                <Input
                  id="library-name"
                  value={librarySettings.name}
                  onChange={(e) =>
                    setLibrarySettings({ ...librarySettings, name: e.target.value })
                  }
                  className="bg-input border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={librarySettings.address}
                  onChange={(e) =>
                    setLibrarySettings({ ...librarySettings, address: e.target.value })
                  }
                  className="bg-input border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={librarySettings.phone}
                    onChange={(e) =>
                      setLibrarySettings({ ...librarySettings, phone: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={librarySettings.email}
                    onChange={(e) =>
                      setLibrarySettings({ ...librarySettings, email: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hours">Opening Hours</Label>
                <Input
                  id="hours"
                  value={librarySettings.openingHours}
                  onChange={(e) =>
                    setLibrarySettings({ ...librarySettings, openingHours: e.target.value })
                  }
                  className="bg-input border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Loan Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-foreground">Loan Settings</CardTitle>
                  <CardDescription>Configure book loan policies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="loan-days">Default Loan Period (days)</Label>
                  <Select
                    value={loanSettings.defaultLoanDays}
                    onValueChange={(value) =>
                      setLoanSettings({ ...loanSettings, defaultLoanDays: value })
                    }
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="21">21 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-renewals">Maximum Renewals</Label>
                  <Select
                    value={loanSettings.maxRenewals}
                    onValueChange={(value) =>
                      setLoanSettings({ ...loanSettings, maxRenewals: value })
                    }
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 renewal</SelectItem>
                      <SelectItem value="2">2 renewals</SelectItem>
                      <SelectItem value="3">3 renewals</SelectItem>
                      <SelectItem value="0">No renewals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="max-books">Max Books per Member</Label>
                  <Input
                    id="max-books"
                    type="number"
                    value={loanSettings.maxBooksPerMember}
                    onChange={(e) =>
                      setLoanSettings({ ...loanSettings, maxBooksPerMember: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="late-fee">Late Fee per Day ($)</Label>
                  <Input
                    id="late-fee"
                    type="number"
                    step="0.01"
                    value={loanSettings.lateFeePerDay}
                    onChange={(e) =>
                      setLoanSettings({ ...loanSettings, lateFeePerDay: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-foreground">Notifications</CardTitle>
                  <CardDescription>Configure email and system notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailNotifications: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Due Date Reminders</p>
                  <p className="text-sm text-muted-foreground">Remind members before due dates</p>
                </div>
                <Switch
                  checked={notifications.dueDateReminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, dueDateReminders: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New Book Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify when new books are added</p>
                </div>
                <Switch
                  checked={notifications.newBookAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newBookAlerts: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Overdue Notifications</p>
                  <p className="text-sm text-muted-foreground">Alert for overdue books</p>
                </div>
                <Switch
                  checked={notifications.overdueNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, overdueNotifications: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Membership Expiry</p>
                  <p className="text-sm text-muted-foreground">Notify before membership expires</p>
                </div>
                <Switch
                  checked={notifications.membershipExpiry}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, membershipExpiry: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Active Sessions
              </Button>
            </CardContent>
          </Card>

          {/* Database */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">Data Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Import Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Clear Cache
              </Button>
            </CardContent>
          </Card>

          {/* Email Configuration */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">Email Server</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="smtp">SMTP Server</Label>
                <Input
                  id="smtp"
                  placeholder="smtp.example.com"
                  className="bg-input border-border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-port">Port</Label>
                <Input
                  id="smtp-port"
                  placeholder="587"
                  className="bg-input border-border"
                />
              </div>
              <Button variant="outline" className="w-full">
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
