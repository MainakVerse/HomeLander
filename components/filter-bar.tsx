"use client"

import { useRef } from "react"
import { Waves, Home, TrendingUp, Trees, Star, Grid3x3 } from "lucide-react"

const filters = [
  { id: "all", label: "All", icon: Grid3x3 },
  { id: "River Facing", label: "River Facing", icon: Waves },
  { id: "Ready Home", label: "Ready Home", icon: Home },
  { id: "7% ROI", label: "7% ROI", icon: TrendingUp },
  { id: "Forest Homes", label: "Forest Homes", icon: Trees },
  { id: "Top Choice", label: "Top Choice", icon: Star },
]

export default function FilterBar({
  isLoading,
  selectedFilter,
  onFilterChange,
}: {
  isLoading: boolean
  selectedFilter: string | null
  onFilterChange: (filter: string | null) => void
}) {
  const scrollContainer = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div ref={scrollContainer} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 md:px-6 py-4 scroll-smooth min-w-max md:justify-center">
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = selectedFilter === filter.id

            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(isActive ? null : filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 flex-shrink-0 text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon size={16} />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
