"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import FilterBar from "@/components/filter-bar"
import PropertyGrid from "@/components/property-grid"

// ✅ Load MapSection with SSR disabled (fixes Vercel error)
const MapSection = dynamic(
  () => import("@/components/map-section"),
  { ssr: false }
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState<any[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/properties", { cache: "no-store" })
        const data = await res.json()
        setProperties(data)
      } catch (e) {
        console.error("Failed to load properties", e)
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProperties =
    selectedFilter && selectedFilter !== "all"
      ? properties.filter((property) =>
          property.tags?.includes(selectedFilter)
        )
      : properties

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="flex flex-col md:flex-row">

        {/* Left - Map Section */}
        <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen">
          <MapSection
            isLoading={isLoading}
            properties={filteredProperties}
            selectedProperty={selectedProperty}
          />
        </div>

        {/* Right - Filters + Properties */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          <FilterBar
            isLoading={isLoading}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <PropertyGrid
            isLoading={isLoading}
            properties={filteredProperties}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        </div>

      </div>
    </main>
  )
}
