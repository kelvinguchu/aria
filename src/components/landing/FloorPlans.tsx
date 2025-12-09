'use client'

import * as React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const units = [
  {
    id: 'a01',
    name: 'Unit A01',
    type: '1 Bedroom',
    size: '65.42 SQM',
    image: '/FLOORPLANS/A-01.webp',
    description:
      'This elegant 1BR unit features a spacious living area with abundant natural light. The open kitchen is tastefully finished with modern, high-quality materials.',
    features: [
      'Private balcony for outdoor relaxation',
      'Ensuite bathroom for privacy',
      'Contemporary open kitchen with high-end finishes',
      'Bright, airy interior layout',
    ],
  },
  {
    id: 'a02',
    name: 'Unit A02',
    type: '3 Bed + SQ',
    size: '194.50 SQM',
    image: '/FLOORPLANS/A-02.webp',
    description:
      'A luxurious 3BR unit with staff quarters, featuring expansive living spaces and premium finishes throughout. Perfect for families seeking space and comfort.',
    features: [
      'Three spacious bedrooms with ensuite bathrooms',
      'Dedicated staff quarters',
      'Large open-plan living and dining area',
      'Premium kitchen with modern appliances',
      'Multiple balconies for outdoor living',
    ],
  },
  {
    id: 'a03',
    name: 'Unit A03',
    type: '2 Bedroom',
    size: '113.36 SQM',
    image: '/FLOORPLANS/A-03.webp',
    description:
      'This elegant 2BR unit features a spacious living area complemented by two private balconies that enhance the home with abundant natural light and outdoor serenity.',
    features: [
      'Two private balconies for versatile outdoor use',
      'Both bedrooms ensuite for elevated privacy',
      'Contemporary open kitchen with high-end finishes',
      'Guest cloakroom ideal for hosting',
      'Bright, airy interior layout',
    ],
  },
  {
    id: 'a04',
    name: 'Unit A04',
    type: '1 Bedroom',
    size: '72.18 SQM',
    image: '/FLOORPLANS/A-04.webp',
    description:
      'A well-designed 1BR unit offering efficient use of space with modern amenities and stylish finishes throughout.',
    features: [
      'Generous bedroom with ensuite bathroom',
      'Open-plan living and dining',
      'Modern fitted kitchen',
      'Private balcony with views',
    ],
  },
  {
    id: 'a05',
    name: 'Unit A05',
    type: '1 Bed + Study',
    size: '85.24 SQM',
    image: '/FLOORPLANS/A-05.webp',
    description:
      'Perfect for professionals, this 1BR unit includes a dedicated study space, ideal for working from home while maintaining separation from living areas.',
    features: [
      'Dedicated study/home office space',
      'Spacious bedroom with ensuite',
      'Open-plan kitchen and living area',
      'Private balcony for relaxation',
    ],
  },
  {
    id: 'b01',
    name: 'Unit B01',
    type: '1 Bedroom',
    size: '68.50 SQM',
    image: '/FLOORPLANS/B-01.webp',
    description:
      'A compact yet elegant 1BR unit featuring smart design and quality finishes, perfect for singles or couples.',
    features: [
      'Comfortable bedroom with built-in storage',
      'Modern ensuite bathroom',
      'Efficient open-plan layout',
      'Balcony access from living area',
    ],
  },
  {
    id: 'b02',
    name: 'Unit B02',
    type: '2 Bedroom',
    size: '105.80 SQM',
    image: '/FLOORPLANS/B-02.webp',
    description:
      'A thoughtfully designed 2BR unit with generous living spaces and premium finishes, ideal for small families.',
    features: [
      'Two well-proportioned bedrooms',
      'Master bedroom with ensuite',
      'Spacious living and dining area',
      'Modern kitchen with quality appliances',
    ],
  },
  {
    id: 'b03',
    name: 'Unit B03',
    type: '3 Bedroom',
    size: '174.20 SQM',
    image: '/FLOORPLANS/B-03.webp',
    description:
      'An expansive 3BR unit offering luxury family living with premium finishes and generous proportions throughout.',
    features: [
      'Three spacious bedrooms with ensuites',
      'Large open-plan living area',
      'Premium kitchen with island',
      'Multiple outdoor balconies',
      'Ample storage throughout',
    ],
  },
  {
    id: 'b04',
    name: 'Unit B04',
    type: '2 Bedroom',
    size: '113.36 SQM',
    image: '/FLOORPLANS/B-04.webp',
    description:
      'This elegant 2BR unit features a spacious living area complemented by two private balconies that enhance the home with abundant natural light and outdoor serenity. The open kitchen is tastefully finished with modern, high-quality materials.',
    features: [
      'Two private balconies for versatile outdoor use',
      'Both bedrooms ensuite for elevated privacy',
      'Contemporary open kitchen with high-end finishes',
      'Guest cloakroom ideal for hosting',
      'Bright, airy interior layout',
    ],
  },
  {
    id: 'b05',
    name: 'Unit B05',
    type: '2 Bedroom',
    size: '108.45 SQM',
    image: '/FLOORPLANS/B-05.webp',
    description:
      'A beautifully appointed 2BR unit with efficient layout and premium finishes, perfect for modern urban living.',
    features: [
      'Two comfortable bedrooms',
      'Master with ensuite bathroom',
      'Open-plan kitchen and living',
      'Private balcony with city views',
    ],
  },
]

export function FloorPlans() {
  const [selectedUnit, setSelectedUnit] = React.useState(units[0])
  const detailRef = React.useRef<HTMLDivElement>(null)

  const handleUnitSelect = (unit: (typeof units)[0]) => {
    setSelectedUnit(unit)
    // Scroll to detail section on large devices
    if (window.innerWidth >= 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="floorplans" className="bg-neutral-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h3 className="text-coral text-lg sm:text-xl lg:text-4xl font-semibold mb-3 sm:mb-4 lg:mb-8">
            Our Units
          </h3>
          <h2 className="text-dark-blue text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Designed for Comfort. Crafted for Luxury.
          </h2>
          <p className="text-dark-blue/80 text-sm sm:text-base lg:text-lg max-w-5xl">
            ARIA&apos;s residences are generous, modern and exceptionally finished; crafted for
            homeowners who value both luxury and functionality. Every unit features spacious layouts
            with natural flow, high ceilings, abundant lighting and contemporary styling.
          </p>
        </div>

        {/* Unit Selector Grid */}
        <div className="bg-neutral-50 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg mb-4 sm:mb-6">
          {/* Mobile - Horizontal Scroll */}
          <div className="flex lg:hidden gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => handleUnitSelect(unit)}
                className={cn(
                  'shrink-0 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all min-w-40 sm:min-w-[200px]',
                  selectedUnit.id === unit.id
                    ? 'bg-dark-blue text-white'
                    : 'bg-neutral-100 text-dark-blue hover:bg-neutral-200',
                )}
              >
                <span className="font-medium text-xs sm:text-sm whitespace-nowrap">
                  {unit.name} - {unit.type}
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              </button>
            ))}
          </div>

          {/* Large Devices - 2 Column Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => handleUnitSelect(unit)}
                className={cn(
                  'flex items-center justify-between px-6 py-4 rounded-xl transition-all cursor-pointer',
                  selectedUnit.id === unit.id
                    ? 'bg-dark-blue text-white'
                    : 'bg-neutral-100 text-dark-blue hover:bg-neutral-200',
                )}
              >
                <span className="font-medium">
                  {unit.name} - {unit.type}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Unit Detail */}
        <div
          ref={detailRef}
          className="bg-neutral-50 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg scroll-mt-20"
        >
          <div className="bg-neutral-100 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Left - Floor Plan Image */}
              <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
                <Image
                  src={selectedUnit.image}
                  alt={`${selectedUnit.name} Floor Plan`}
                  fill
                  className="object-contain p-2 sm:p-4"
                />
              </div>

              {/* Right - Unit Details */}
              <div className="flex flex-col justify-center">
                {/* Title */}
                <h3 className="text-coral text-lg sm:text-xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
                  {selectedUnit.name} — {selectedUnit.type} | {selectedUnit.size}
                </h3>

                {/* Description */}
                <p className="text-dark-blue/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                  {selectedUnit.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 lg:mb-10">
                  {selectedUnit.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-3">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-dark-blue rounded-full mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-dark-blue/80 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <button className="bg-dark-blue text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-dark-blue/90 transition-colors cursor-pointer">
                    Email To Book
                  </button>
                  <button className="bg-coral text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-coral/90 transition-colors cursor-pointer">
                    Call To Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
