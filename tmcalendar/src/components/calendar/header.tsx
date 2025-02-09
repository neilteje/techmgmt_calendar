"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [currentView, setCurrentView] = useState("week")

  return (
    <header className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <Calendar className="h-6 w-6" />
        <h1 className="text-xl font-semibold">Calendar</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost">Today</Button>
        <div className="flex">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm font-medium">Jan – Feb 2025</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant={currentView === "week" ? "secondary" : "ghost"} onClick={() => setCurrentView("week")}>
          Week
        </Button>
        <Button variant={currentView === "month" ? "secondary" : "ghost"} onClick={() => setCurrentView("month")}>
          Month
        </Button>
      </div>
    </header>
  )
}

