"use client"

import { useState, useEffect } from "react"
import MapSection from "@/components/map-section"
import FilterBar from "@/components/filter-bar"
import PropertyGrid from "@/components/property-grid"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState<any[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

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
      <MapSection isLoading={isLoading} />
      <FilterBar
        isLoading={isLoading}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <PropertyGrid
        isLoading={isLoading}
        properties={filteredProperties}
      />
    </main>
  )
}
