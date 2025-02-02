"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const sources = [
  { id: "campus", label: "Campus Events" },
  { id: "athletics", label: "Campus Athletics" },
  { id: "gies", label: "Gies Events" },
  { id: "grainger", label: "Grainger Events" },
  { id: "tm", label: "T&M Classes" },
  { id: "holidays", label: "Multi-ethnic Holidays" },
]

export default function SourceSelector() {
  const [selectedSources, setSelectedSources] = useState(sources.map((s) => s.id))

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Calendar Sources</h2>
      {sources.map((source) => (
        <div key={source.id} className="flex items-center space-x-2">
          <Checkbox
            id={source.id}
            checked={selectedSources.includes(source.id)}
            onCheckedChange={() => handleSourceChange(source.id)}
          />
          <label
            htmlFor={source.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {source.label}
          </label>
        </div>
      ))}
    </div>
  )
}

