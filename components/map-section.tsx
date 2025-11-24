"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import type { LatLngExpression } from "leaflet"
import L from "leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// Auto-fit bounds component
function FitToMarkers({ properties }: { properties: any[] }) {
  const map = useMap()

  useEffect(() => {
    if (!properties.length) return

    const bounds = L.latLngBounds(
      properties.map((p) => [
        Number(p.latitude),
        Number(p.longitude),
      ])
    )

    map.fitBounds(bounds, { padding: [40, 40] })
  }, [properties, map])

  return null
}

// Focus on a single selected property
function FocusOnSelected({ selectedProperty }: { selectedProperty: any | null }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedProperty) return

    const lat = Number(selectedProperty.latitude)
    const lng = Number(selectedProperty.longitude)
    if (!lat || !lng) return

    map.flyTo([lat, lng], 15, { duration: 0.8 })
  }, [selectedProperty, map])

  return null
}

export default function MapSection({
  isLoading,
  properties = [],
  selectedProperty,
}: {
  isLoading: boolean
  properties: any[]
  selectedProperty: any | null
}) {
  if (isLoading) {
    return (
      <section className="relative w-full h-64 md:h-screen bg-slate-200 animate-pulse" />
    )
  }

  // Kolkata base center (used only as fallback)
  const defaultCenter: LatLngExpression = [22.5726, 88.3639]

  return (
    <section className="relative w-full h-64 md:h-screen overflow-hidden border-b border-slate-200">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto-fit all pins initially */}
        <FitToMarkers properties={properties} />

        {/* Zoom in when a property is selected */}
        <FocusOnSelected selectedProperty={selectedProperty} />

        {/* Render property markers */}
        {properties.map((property) => {
          const lat = Number(property.latitude)
          const lng = Number(property.longitude)

          if (!lat || !lng) return null

          return (
            <Marker
              key={property.id}
              position={[lat, lng] as LatLngExpression}
              icon={markerIcon}
            >
              <Popup>
                <strong>{property.title}</strong>
                <br />
                {property.location}
                <br />
                ₹{property.price.toLocaleString()}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Small rectangular modal overlay for selected property */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur shadow-xl p-4 rounded-lg border border-slate-200 w-72 max-w-[90%] animate-in fade-in duration-200">
          <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">
            {selectedProperty.title}
          </h4>
          <p className="text-slate-600 text-sm mb-2 line-clamp-1">
            {selectedProperty.location}
          </p>
          <p className="font-semibold text-green-600 mb-3">
            ₹ {selectedProperty.price.toLocaleString()}
          </p>

          <p className="text-xs text-slate-500 mb-1 font-semibold uppercase">
            Coordinates
          </p>
          <p className="text-xs text-slate-700 mb-3">
            {selectedProperty.latitude}, {selectedProperty.longitude}
          </p>

          <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
            Open Full Details
          </button>
        </div>
      )}
    </section>
  )
}
