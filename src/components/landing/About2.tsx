'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const interiorImages = [
  '/INTERIORS/A TYPE 194SQM/1.jpg',
  '/INTERIORS/A TYPE 194SQM/2.jpg',
  '/INTERIORS/A TYPE 194SQM/3.jpg',
  '/INTERIORS/A TYPE 194SQM/4.jpg',
  '/INTERIORS/A TYPE 194SQM/5.jpg',
  '/INTERIORS/A TYPE 194SQM/6.jpg',
]

export function About2() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <section className="bg-[#fdf5f3] py-6 lg:py-8 overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Grid - 2 columns */}
        <div className="grid lg:grid-cols-2 gap-x-6 lg:gap-x-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            {/* Top Left - Text Content */}
            <div className="lg:pr-4 mb-8 lg:mb-16">
              <h2 className="text-coral text-lg sm:text-xl lg:text-2xl font-medium mb-3 sm:mb-4">
                Refined living - where it matters!
              </h2>
              <p className="text-dark-blue text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed">
                ARIA Capital Residency redefines contemporary urban luxury. Set at the heart of
                Nairobi&apos;s premier business district, Upperhill, ARIA offers a rare blend of
                serenity and city convenience. Here, refined living meets exceptional accessibility,
                placing you within minutes of Nairobi&apos;s most important corporate, social and
                lifestyle destinations.
              </p>
            </div>

            {/* Bottom Left - Exterior Image (starts overlapping into carousel area) */}
            <div className="relative lg:mt-2">
              <div className="h-[280px] sm:h-[350px] lg:h-[620px] relative rounded-xl sm:rounded-2xl overflow-hidden">
                <Image
                  src="/EXTERIORS/ARIA-Exterior.webp"
                  alt="ARIA Exterior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col mt-6 lg:mt-0">
            {/* Top Right - Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl" ref={emblaRef}>
                <div className="flex">
                  {interiorImages.map((src, index) => (
                    <div key={src} className="flex-[0_0_100%] min-w-0">
                      <div className="relative h-56 sm:h-72 lg:h-[440px]">
                        <Image
                          src={src}
                          alt={`ARIA Interior ${index + 1}`}
                          fill
                          className="object-cover rounded-xl sm:rounded-2xl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Navigation Arrows - Inside image */}
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
              >
                <HiChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
              >
                <HiChevronRight className="w-6 h-6 text-white" />
              </button>
              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {interiorImages.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Right - Text Content */}
            <div className="mt-6 lg:mt-12">
              <p className="text-dark-blue text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed mb-4 sm:mb-6">
                At ARIA, generous spaces are not a luxury—they are a signature. Each residence is
                meticulously planned to deliver expansive layouts, natural flow and thoughtful
                detailing that reflect the lifestyle expectations of today&apos;s discerning
                investor and homeowner.
              </p>
              <Button
                size="lg"
                className="bg-dark-blue hover:bg-dark-blue/90 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm rounded-md font-medium"
                asChild
              >
                <Link href="#experience-aria">Gallery Overview</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
