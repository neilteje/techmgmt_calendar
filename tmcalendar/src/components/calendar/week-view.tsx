"use client"

import { theme } from "@/lib/theme"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  start: string // HH:mm format
  end: string // HH:mm format
  color: keyof typeof theme.calendar.event
  location?: string
}

interface WeekViewProps {
  events: Event[]
}

export function WeekView({ events }: WeekViewProps) {
  const hours = Array.from({ length: 17 }, (_, i) => i + 7) // 7 AM to 11 PM
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const dates = [26, 27, 28, 29, 30, 31, 1]

  const getEventStyle = (event: Event) => {
    const startHour = Number.parseInt(event.start.split(":")[0])
    const startMinute = Number.parseInt(event.start.split(":")[1])
    const endHour = Number.parseInt(event.end.split(":")[0])
    const endMinute = Number.parseInt(event.end.split(":")[1])

    const top = (startHour - 7) * 60 + startMinute
    const height = (endHour - startHour) * 60 + (endMinute - startMinute)

    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-8 border-b">
        <div className="w-16" /> {/* Time column */}
        {days.map((day, i) => (
          <div key={day} className="text-center p-2 border-l">
            <div className="text-sm font-medium">{day}</div>
            <div className="text-2xl">{dates[i]}</div>
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-8">
        <div className="w-16">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b text-xs text-right pr-2">
              {hour}:00
            </div>
          ))}
        </div>
        {days.map((day, dayIndex) => (
          <div key={day} className="relative border-l">
            {hours.map((hour) => (
              <div key={hour} className="h-[60px] border-b border-gray-800" />
            ))}
            {events
              .filter((event) => Number.parseInt(event.start.split(":")[0]) >= 7)
              .map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "absolute left-0 right-2 mx-1 p-2 rounded border text-xs",
                    theme.calendar.event[event.color],
                  )}
                  style={getEventStyle(event)}
                >
                  <div className="font-medium">{event.title}</div>
                  {event.location && <div className="text-xs opacity-75">{event.location}</div>}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

