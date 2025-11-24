"use client"

import { useState } from "react"
import PropertyCard from "./property-card"

interface Property {
  id: string
  title: string
  location: string
  price: number
  tags: string[]
  latitude: number
  longitude: number
}

export default function PropertyGrid({
  isLoading = false,
  properties = [],
  onSelectProperty,
}: {
  isLoading?: boolean
  properties?: Property[]
  onSelectProperty: (property: Property) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="w-full px-4 py-12 text-center text-gray-500">
        Loading properties…
      </div>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="w-full px-4 py-12 text-center text-gray-500">
        No properties found
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {properties.map((property) => {
          if (!property) return null
          return (
            <PropertyCard
              key={property.id}
              property={property}
              isExpanded={expandedId === property.id}
              onToggleExpand={() =>
                setExpandedId(expandedId === property.id ? null : property.id)
              }
              onSelectProperty={onSelectProperty}
            />
          )
        })}
      </div>
    </div>
  )
}
