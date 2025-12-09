'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const locationBadges = [
  {
    id: 'nairobi-club',
    label: 'Nairobi Club',
    time: '10 Min',
    position: { top: '18%', left: '32%' },
  },
  {
    id: 'embassies',
    label: 'Embassies District',
    time: '7 Min',
    position: { top: '15%', left: '70%' },
  },
  {
    id: 'hospitals',
    label: 'Nairobi Hospitals District',
    time: '5 Min',
    position: { top: '42%', left: '15%' },
  },
  {
    id: 'financial',
    label: 'Upperhill Financial District',
    time: '5 Min',
    position: { top: '38%', left: '48%' },
  },
  {
    id: 'commercial',
    label: 'Upperhill Commercial District',
    time: '2 Min',
    position: { top: '52%', left: '75%' },
  },
  {
    id: 'strathmore',
    label: 'Strathmore University',
    time: '7 Min',
    position: { top: '82%', left: '38%' },
  },
]

// ARIA Capital marker position
const ariaMarker = {
  id: 'aria',
  label: 'ARIA Capital',
  position: { top: '58%', left: '55%' },
}

export function Location() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = React.useState(false)

  // Start animation when section comes into view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  // Cycle through badges every 1.5 seconds
  React.useEffect(() => {
    if (!hasStarted) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % locationBadges.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [hasStarted])

  return (
    <section id="location" className="bg-neutral-100 py-8 sm:py-12 lg:py-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h3 className="text-coral text-lg sm:text-xl lg:text-4xl font-semibold mb-3 sm:mb-4 lg:mb-8">
            Prime Address!
          </h3>
          <h2 className="text-dark-blue text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Nairobi business district at your doorstep
          </h2>
          <div className="space-y-3 sm:space-y-4 text-dark-blue/80 text-sm sm:text-base lg:text-lg">
            <p>
              Positioned in Upperhill, Nairobi&apos;s most prestigious commercial district, ARIA
              provides unrivaled proximity to the city&apos;s leading corporate headquarters,
              hospitals, hotels and lifestyle amenities. This prime address ensures unmatched
              convenience and connectivity, making everyday life seamless.
            </p>
            <p>
              With the district&apos;s continuous growth and demand for premium residences, ARIA not
              only offers exceptional living; it guarantees compelling rental returns and robust
              long-term capital appreciation. A smart investment today, and a legacy address for
              years to come.
            </p>
          </div>
        </div>
      </div>

      {/* Map Section - Full width outside container */}
      <div className="relative w-full">
        {/* Large Devices - Full map with all badges */}
        <div className="hidden lg:block">
          <div className="relative w-full h-[95vh]">
            <Image
              src="/MAP/ARIA Map Isometric.png"
              alt="ARIA Location Map - Upperhill District"
              fill
              className="object-cover object-center px-4"
              priority
            />

            {/* Location Badges */}
            {locationBadges.map((badge, index) => (
              <div
                key={badge.id}
                className="absolute z-10"
                style={{
                  top: badge.position.top,
                  left: badge.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className={cn(
                    'rounded-full px-4 py-2 shadow-lg transition-all duration-500 whitespace-nowrap',
                    activeIndex === index
                      ? 'bg-dark-blue text-white scale-105'
                      : 'bg-white text-dark-blue',
                  )}
                >
                  <span className="font-semibold text-sm">
                    {badge.label} ({badge.time})
                  </span>
                </div>
              </div>
            ))}

            {/* ARIA Capital marker with pin */}
            <div
              className="absolute z-20"
              style={{
                top: ariaMarker.position.top,
                left: ariaMarker.position.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <span className="text-dark-blue font-semibold text-sm">{ariaMarker.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile - Smaller map with only ARIA marker */}
        <div className="block lg:hidden px-3 sm:px-4">
          <div className="relative w-full aspect-4/3 sm:aspect-square max-h-[350px] sm:max-h-[400px]">
            <Image
              src="/MAP/ARIA Map Isometric.png"
              alt="ARIA Location Map - Upperhill District"
              fill
              className="object-contain object-center"
            />

            {/* Only ARIA Capital marker on mobile */}
            <div
              className="absolute z-10"
              style={{
                top: '50%',
                left: '55%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg flex items-center gap-2">
                  <span className="text-dark-blue font-semibold text-[10px] sm:text-xs">
                    ARIA Capital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
