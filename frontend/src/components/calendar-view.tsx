// import type { CalendarViewType } from "./calendar-app"
// import { cn } from "@/lib/utils"

// interface CalendarViewProps {
//   view: CalendarViewType
//   currentDate: Date
// }

// export default function CalendarView({ view, currentDate }: CalendarViewProps) {
//   const renderCalendar = () => {
//     switch (view) {
//       case "day":
//         return <DayView currentDate={currentDate} />
//       case "week":
//         return <WeekView currentDate={currentDate} />
//       case "month":
//         return <MonthView currentDate={currentDate} />
//       case "year":
//         return <YearView currentDate={currentDate} />
//       case "schedule":
//         return <ScheduleView currentDate={currentDate} />
//       default:
//         return null
//     }
//   }

//   return <div className="flex-grow overflow-auto">{renderCalendar()}</div>
// }

// function DayView({ currentDate }: { currentDate: Date }) {
//   return <div>Day View for {currentDate.toDateString()}</div>
// }

// function WeekView({ currentDate }: { currentDate: Date }) {
//   const startOfWeek = new Date(currentDate)
//   startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
//   const hours = Array.from({ length: 24 }, (_, i) => i)

//   return (
//     <div className="grid grid-cols-8 h-full overflow-auto">
//       <div className="col-span-1 border-r border-gray-200">
//         {hours.map((hour) => (
//           <div key={hour} className="h-12 text-xs text-gray-500 text-right pr-2">
//             {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
//           </div>
//         ))}
//       </div>
//       {Array.from({ length: 7 }).map((_, index) => {
//         const date = new Date(startOfWeek)
//         date.setDate(startOfWeek.getDate() + index)
//         const isToday = date.toDateString() === new Date().toDateString()

//         return (
//           <div key={index} className="col-span-1 border-r border-gray-200 relative">
//             <div className={cn("sticky top-0 z-10 text-center py-2 border-b", isToday ? "bg-blue-100" : "bg-white")}>
//               <div className="text-sm font-medium">{date.toLocaleDateString(undefined, { weekday: "short" })}</div>
//               <div
//                 className={cn(
//                   "text-2xl font-bold w-8 h-8 rounded-full mx-auto flex items-center justify-center",
//                   isToday ? "bg-blue-500 text-white" : "",
//                 )}
//               >
//                 {date.getDate()}
//               </div>
//             </div>
//             {hours.map((hour) => (
//               <div key={hour} className="h-12 border-b border-gray-100"></div>
//             ))}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// function MonthView({ currentDate }: { currentDate: Date }) {
//   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
//   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
//   const startDate = new Date(startOfMonth)
//   startDate.setDate(startDate.getDate() - startDate.getDay())
//   const endDate = new Date(endOfMonth)
//   endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

//   const weeks = []
//   let currentWeek = []
//   const currentDay = new Date(startDate)

//   while (currentDay <= endDate) {
//     if (currentWeek.length === 7) {
//       weeks.push(currentWeek)
//       currentWeek = []
//     }
//     currentWeek.push(new Date(currentDay))
//     currentDay.setDate(currentDay.getDate() + 1)
//   }
//   if (currentWeek.length > 0) {
//     weeks.push(currentWeek)
//   }

//   return (
//     <div className="grid grid-cols-7 gap-px bg-gray-200">
//       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//         <div key={day} className="bg-white text-center py-2 font-medium text-sm">
//           {day}
//         </div>
//       ))}
//       {weeks.map((week, weekIndex) =>
//         week.map((date, dateIndex) => {
//           const isCurrentMonth = date.getMonth() === currentDate.getMonth()
//           const isToday = date.toDateString() === new Date().toDateString()
//           return (
//             <div
//               key={`${weekIndex}-${dateIndex}`}
//               className={cn(
//                 "bg-white p-2 h-24 overflow-hidden",
//                 !isCurrentMonth && "text-gray-400",
//                 isToday && "bg-blue-50",
//               )}
//             >
//               <div className={cn("text-right font-medium", isToday && "text-blue-500")}>{date.getDate()}</div>
//             </div>
//           )
//         }),
//       )}
//     </div>
//   )
// }

// function YearView({ currentDate }: { currentDate: Date }) {
//   return <div>Year View for {currentDate.getFullYear()}</div>
// }

// function ScheduleView({ currentDate }: { currentDate: Date }) {
//   return <div>Schedule View starting from {currentDate.toDateString()}</div>
// }


import type { CalendarViewType } from "./calendar-app"
import { cn } from "@/lib/utils"

interface CalendarViewProps {
  view: CalendarViewType
  currentDate: Date
}

export default function CalendarView({ view, currentDate }: CalendarViewProps) {
  const renderCalendar = () => {
    switch (view) {
      case "day":
        return <DayView currentDate={currentDate} />
      case "week":
        return <WeekView currentDate={currentDate} />
      case "month":
        return <MonthView currentDate={currentDate} />
      case "year":
        return <YearView currentDate={currentDate} />
      default:
        return null
    }
  }

  return <div className="flex-grow overflow-auto">{renderCalendar()}</div>
}

function DayView({ currentDate }: { currentDate: Date }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex flex-col h-full">
      <div className="text-2xl font-bold p-4 text-center border-b">
        {currentDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
      </div>
      <div className="flex-grow overflow-auto">
        {hours.map((hour) => (
          <div key={hour} className="flex border-b">
            <div className="w-20 p-2 text-right text-sm text-gray-500">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            <div className="flex-grow p-2 hover:bg-gray-100"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeekView({ currentDate }: { currentDate: Date }) {
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="grid grid-cols-8 h-full overflow-auto">
      <div className="col-span-1 border-r border-gray-200">
        {hours.map((hour) => (
          <div key={hour} className="h-12 text-xs text-gray-500 text-right pr-2">
            {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
          </div>
        ))}
      </div>
      {Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + index)
        const isToday = date.toDateString() === new Date().toDateString()

        return (
          <div key={index} className="col-span-1 border-r border-gray-200 relative">
            <div className={cn("sticky top-0 z-10 text-center py-2 border-b", isToday ? "bg-blue-100" : "bg-white")}>
              <div className="text-sm font-medium">{date.toLocaleDateString(undefined, { weekday: "short" })}</div>
              <div
                className={cn(
                  "text-2xl font-bold w-8 h-8 rounded-full mx-auto flex items-center justify-center",
                  isToday ? "bg-blue-500 text-white" : "",
                )}
              >
                {date.getDate()}
              </div>
            </div>
            {hours.map((hour) => (
              <div key={hour} className="h-12 border-b border-gray-100"></div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function MonthView({ currentDate }: { currentDate: Date }) {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startDate = new Date(startOfMonth)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  const endDate = new Date(endOfMonth)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

  const weeks = []
  let currentWeek = []
  const currentDay = new Date(startDate)

  while (currentDay <= endDate) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(new Date(currentDay))
    currentDay.setDate(currentDay.getDate() + 1)
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="text-2xl font-bold p-4 text-center border-b">
        {currentDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
      </div>
      <div className="flex-grow grid grid-cols-7 grid-rows-6 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-white text-center py-2 font-medium text-sm">
            {day}
          </div>
        ))}
        {weeks.flat().map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth()
          const isToday = date.toDateString() === new Date().toDateString()
          return (
            <div
              key={index}
              className={cn("bg-white p-2 flex flex-col", !isCurrentMonth && "text-gray-400", isToday && "bg-blue-50")}
            >
              <span className={cn("text-right font-medium text-sm", isToday && "text-blue-500")}>{date.getDate()}</span>
              <div className="flex-grow"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function YearView({ currentDate }: { currentDate: Date }) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1))

  return (
    <div className="h-full flex flex-col">
      <div className="text-3xl font-bold p-4 text-center border-b">{currentDate.getFullYear()}</div>
      <div className="flex-grow grid grid-cols-4 gap-4 p-4 overflow-auto">
        {months.map((month, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <div className="text-lg font-semibold p-2 text-center border-b">
              {month.toLocaleDateString(undefined, { month: "long" })}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-100 p-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 42 }, (_, i) => {
                const date = new Date(month.getFullYear(), month.getMonth(), i - month.getDay() + 1)
                const isCurrentMonth = date.getMonth() === month.getMonth()
                return (
                  <div
                    key={i}
                    className={cn("text-center text-xs p-1", isCurrentMonth ? "text-gray-900" : "text-gray-400")}
                  >
                    {date.getDate()}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

