"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  type?: string
  category?: string
  description?: string
}

interface EventModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-start p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm bg-blue-900" />
            <h3 className="text-lg font-semibold">{event.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 mb-2">
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{event.type}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <span>{event.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const EventBar = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-blue-900 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-orange-700 truncate"
    >
      {event.title}
    </div>
  )
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

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
      const countryCode = "US"
      const year = currentDate.getFullYear()
      const API_KEY = process.env.NEXT_PUBLIC_NINJA_API_KEY

      const response = await fetch(`https://api.api-ninjas.com/v1/holidays?country=${countryCode}&year=${year}&type=`, {
        headers: { "X-Api-Key": API_KEY as string }
      })

      const holidays = await response.json()
      const holidayEvents = holidays.map((holiday: any) => ({
        id: holiday.date + "-" + holiday.name,
        title: `${holiday.name}`,
        date: holiday.date,
        type: holiday.type,
        category: "Holidays in United States"
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
        <div key={day} className="min-h-32 border p-2">
          <div className="font-semibold mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <EventBar
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
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
      {selectedEvent && (
        <EventModal 
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}