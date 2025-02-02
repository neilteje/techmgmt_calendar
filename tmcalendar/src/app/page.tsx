import CalendarView from "@/components/CalendarView"
import SourceSelector from "@/components/SourceSelector"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">T&M Comprehensive Calendar</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <SourceSelector />
        </div>
        <div className="w-full md:w-3/4">
          <CalendarView />
        </div>
      </div>
    </main>
  )
}

