// "use client"

// import { useState } from "react"
// import Header from "./header"
// import Sidebar from "./sidebar"
// import CalendarView from "./calendar-view"

// export type CalendarViewType = "day" | "week" | "month" | "year" | "schedule"

// export default function CalendarApp() {
//   const [view, setView] = useState<CalendarViewType>("week")
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {isSidebarOpen && <Sidebar />}
//       <div className="flex flex-col flex-grow">
//         <Header
//           view={view}
//           setView={setView}
//           currentDate={currentDate}
//           setCurrentDate={setCurrentDate}
//           toggleSidebar={toggleSidebar}
//         />
//         <CalendarView view={view} currentDate={currentDate} />
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import CalendarView from "./calendar-view"

export type CalendarViewType = "day" | "week" | "month" | "year"

export default function CalendarApp() {
  const [view, setView] = useState<CalendarViewType>("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && <Sidebar />}
      <div className="flex flex-col flex-grow">
        <Header
          view={view}
          setView={setView}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          toggleSidebar={toggleSidebar}
        />
        <CalendarView view={view} currentDate={currentDate} />
      </div>
    </div>
  )
}

