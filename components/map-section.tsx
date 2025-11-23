"use client"

export default function MapSection({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <section className="relative w-full h-64 md:h-80 bg-slate-200 animate-pulse" />
  }

  return (
    <section className="relative w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-teal-50 border-b border-slate-200 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Map placeholder with subtle pattern */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,200 Q250,100 400,200 T700,200" stroke="currentColor" strokeWidth="40" />
          <circle cx="200" cy="150" r="30" fill="currentColor" />
          <circle cx="500" cy="250" r="25" fill="currentColor" />
          <circle cx="800" cy="180" r="35" fill="currentColor" />
        </svg>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/5 to-teal-500/5">
          <div className="text-center">
            <p className="text-slate-600 font-medium text-sm md:text-base">Map View • Drag to explore properties</p>
          </div>
        </div>
      </div>
    </section>
  )
}
