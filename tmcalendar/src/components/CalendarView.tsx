"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents()
    fetchHolidays()
  }, []) 

  const fetchEvents = async () => {
    const response = await fetch(`/api/events?sources=campus,athletics,gies,grainger,tm,holidays`)
    const data = await response.json()
    setEvents(data.events)
  }

  const fetchHolidays = async () => {
    try {
      const countryCode = "US" // Change this to any desired country
      const year = currentDate.getFullYear()
      const API_KEY = process.env.NEXT_PUBLIC_NINJA_API_KEY

      const response = await fetch(`https://api.api-ninjas.com/v1/holidays?country=${countryCode}&year=${year}&type=`, {
        headers: { "X-Api-Key": API_KEY as string}
      })

      const holidays = await response.json()
      console.log("Holiday API Response:", holidays) 

      const holidayEvents = holidays.map((holiday: any) => ({
        id: holiday.date + "-" + holiday.name,
        title: `${holiday.name}`,
        date: holiday.date
      }))

      setEvents((prevEvents) => [...prevEvents, ...holidayEvents])
    } catch (error) {
      console.error("Failed to fetch holidays:", error)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + (direction === "next" ? 1 : -1))
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square border p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateString = date.toISOString().split("T")[0]
      const dayEvents = events.filter((event) => event.date === dateString)

      days.push(
        <div key={day} className="aspect-square border p-2 text-center">
          <div className="font-semibold">{day}</div>
          {dayEvents.map((event) => (
            <div key={event.id} className="text-xs">
              {event.title}
            </div>
          ))}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  )
}

