import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const calendars = [
  { id: "personal", name: "Personal", color: "#4285F4" },
  { id: "work", name: "Work", color: "#0F9D58" },
  { id: "family", name: "Family", color: "#DB4437" },
  { id: "holidays", name: "Holidays", color: "#F4B400" },
]

export default function Sidebar() {
  return (
    <div className="w-64 border-r p-6 flex flex-col bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">My Calendars</h2>
      <div className="space-y-3">
        {calendars.map((calendar) => (
          <div key={calendar.id} className="flex items-center space-x-2">
            <Checkbox id={calendar.id} defaultChecked />
            <Label htmlFor={calendar.id} className="flex items-center cursor-pointer">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: calendar.color }}></div>
              {calendar.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

