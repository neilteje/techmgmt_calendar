import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CalendarViewType } from "./calendar-app"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

interface HeaderProps {
  view: CalendarViewType
  setView: (view: CalendarViewType) => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
  toggleSidebar: () => void
}

export default function Header({ view, setView, currentDate, setCurrentDate, toggleSidebar }: HeaderProps) {
  const formatDateRange = () => {
    switch (view) {
      case "day":
        return currentDate.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })
      case "week":
        const endOfWeek = new Date(currentDate)
        endOfWeek.setDate(currentDate.getDate() + 6)
        return `${currentDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
      case "month":
        return currentDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })
      case "year":
        return currentDate.getFullYear().toString()
    }
  }

  const navigateDate = (direction: "forward" | "backward") => {
    const newDate = new Date(currentDate)
    switch (view) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "forward" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "forward" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "forward" ? 1 : -1))
        break
      case "year":
        newDate.setFullYear(newDate.getFullYear() + (direction === "forward" ? 1 : -1))
        break
    }
    setCurrentDate(newDate)
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigateDate("backward")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("forward")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xl font-semibold">{formatDateRange()}</div>
      </div>
      <Select value={view} onValueChange={(value) => setView(value as CalendarViewType)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectContent>
      </Select>
    </header>
  )
}

