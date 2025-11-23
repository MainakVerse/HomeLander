"use client"

import { ChevronDown } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  price: number
  tags: string[]
  latitude: number
  longitude: number
}

interface PropertyCardProps {
  property?: Property
  isExpanded: boolean
  onToggleExpand: () => void
}

export default function PropertyCard({ property, isExpanded, onToggleExpand }: PropertyCardProps) {

  if (!property) return null

  return (
    <div
      onClick={onToggleExpand}
      className={`transition-all duration-300 cursor-pointer ${
        isExpanded ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/20" : "hover:shadow-lg"
      }`}
    >
      <div
        className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? "shadow-xl" : "shadow-md"
        }`}
      >
        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1">
            {property.title}
          </h3>

          <p className="text-slate-600 text-sm mb-3 line-clamp-1">
            {property.location}
          </p>

          <p className="font-semibold text-green-600 mb-2">
            ₹ {property.price.toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {property.tags.slice(0, isExpanded ? 999 : 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}

            {property.tags.length > 2 && !isExpanded && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{property.tags.length - 2}
              </span>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in duration-300">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  Latitude / Longitude
                </p>
                <p className="text-sm text-slate-900">
                  {property.latitude}, {property.longitude}
                </p>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                View Details
              </button>
            </div>
          )}

          <div
            className={`flex justify-center mt-2 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          >
            <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
