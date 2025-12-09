'use client'

import * as React from 'react'
import Image from 'next/image'
import { Grid3X3 } from 'lucide-react'

const amenities = [
  {
    title: 'Fully Equipped Gym',
    description:
      "Elevate your fitness experience in a state-of-the-art gym overlooking sweeping views of Nairobi's skyline. Designed for both beginners and dedicated fitness enthusiasts, the gym features premium equipment, generous training zones, and an inspiring ambiance that makes wellness a daily pleasure. With natural light and panoramic city vistas, every workout feels energizing and refreshing.",
    image: '/COMMON AREAS/健身房.jpg',
    size: '78 m2',
    location: 'Rooftop',
  },
  {
    title: 'Heated Swimming Pool',
    description:
      "Indulge in year-round relaxation in ARIA's elegantly designed heated rooftop pool. Whether you're taking a refreshing dip, enjoying a tranquil swim at sunset, or lounging by the deck, the pool delivers resort-style luxury with an unbeatable view of the cityscape.",
    image: '/COMMON AREAS/游泳池1.jpg',
    size: '156 m2',
    location: 'Rooftop',
  },
  {
    title: "Children's Play Area",
    description:
      'A safe and joyful space for young residents, the rooftop play area offers fresh air, soft landscapes and age-appropriate play installations. Designed for fun, creativity and exploration, this dedicated zone allows children to thrive while parents enjoy peace of mind in a secure, family-friendly environment.',
    image: '/COMMON AREAS/儿童区（室内）.jpg',
    size: '50 m2',
    location: 'Rooftop',
  },
  {
    title: 'Games & Party room',
    description:
      "Celebrate life's memorable moments in our stylish rooftop party room. Designed for intimate gatherings and private events, the space blends elegance with functionality; complete with premium finishes, flexible seating and stunning views that set the perfect tone for any occasion.",
    image: '/COMMON AREAS/休闲室.jpg',
    size: '30 m2',
    location: 'Rooftop',
  },
  {
    title: 'Cafeteria & Terrace',
    description:
      "Enjoy casual dining with breathtaking skyline views at ARIA's rooftop cafeteria—a relaxed social hub perfect for morning coffee, weekend brunches or evening conversations. With comfortable seating and an elevated atmosphere, it's a place where residents meet, unwind and savor everyday moments.",
    image: '/COMMON AREAS/咖啡厅1.jpg',
    size: '150 m2',
    location: 'Rooftop',
  },
  {
    title: 'Sauna & Spa',
    description:
      "Retreat to wellness in ARIA's luxurious sauna and steam suites—tranquil spaces created to soothe the body and awaken the senses. Whether you seek relaxation, detoxification, or quiet solitude after a long day, these indulgent facilities deliver a spa-level experience steps from your doorstep. A haven of calm high above the city.",
    image: '/COMMON AREAS/桑拿房.jpg',
    size: '50 m2',
    location: 'Rooftop',
  },
]

export function Amenities2() {
  return (
    <section className="bg-neutral-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Amenity Cards */}
        <div className="space-y-6 lg:space-y-0">
          {amenities.map((amenity, idx) => (
            <div
              key={amenity.title}
              className="lg:sticky lg:top-28 lg:mb-4"
              style={{
                // Each card gets a slightly higher z-index so it stacks on top
                zIndex: idx + 1,
                // Each card sticks at a progressively lower position to show a peek of previous cards
                top: `calc(7rem + ${idx * 2.5}rem)`,
              }}
            >
              <div className="bg-neutral-50 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm lg:shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 min-h-64 sm:min-h-80 lg:min-h-[336px]">
                  {/* Left - Text Content */}
                  <div className="bg-neutral-100 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-8 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-dark-blue text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-6">
                        {amenity.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-8">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-neutral-50 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 border border-gray-200">
                        <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4 text-dark-blue" />
                        <span className="text-dark-blue text-xs sm:text-sm font-medium">
                          {amenity.size}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-neutral-50 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 border border-gray-200">
                        <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4 text-dark-blue" />
                        <span className="text-dark-blue text-xs sm:text-sm font-medium">
                          {amenity.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Image */}
                  <div className="relative h-48 sm:h-64 lg:h-auto rounded-lg sm:rounded-xl overflow-hidden">
                    <Image src={amenity.image} alt={amenity.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
