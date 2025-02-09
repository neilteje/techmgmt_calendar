"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const calendars = [
    { id: "campus", label: "Campus Events", color: "blue" },
    { id: "athletics", label: "Campus Athletics", color: "yellow" },
    { id: "gies", label: "Gies Events", color: "pink" },
    { id: "grainger", label: "Grainger Events", color: "purple" },
    { id: "tm", label: "T&M Classes", color: "blue" },
    { id: "holidays", label: "Multi-ethnic Holidays", color: "yellow" },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-background transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="p-4">
        <Button className="w-full justify-start" variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4">
          <div className="mb-4 rounded-md border">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md"
              classNames={{
                head_cell: "text-muted-foreground font-normal",
                cell: "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                day_range_end: "day-range-end",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "day-outside text-muted-foreground opacity-50",
              }}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">My calendars</h2>
            {calendars.map((calendar) => (
              <div key={calendar.id} className="flex items-center space-x-2">
                <Checkbox id={calendar.id} />
                <label
                  htmlFor={calendar.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {calendar.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

