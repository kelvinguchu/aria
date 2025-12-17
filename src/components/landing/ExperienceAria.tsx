'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const carouselImages = [
  '/COMMON AREAS/大堂1.jpg',
  '/COMMON AREAS/大堂2.jpg',
  '/COMMON AREAS/大堂3.jpg',
  '/COMMON AREAS/咖啡厅1.jpg',
  '/COMMON AREAS/游泳池1.jpg',
  '/COMMON AREAS/休闲室.jpg',
]

const sideImages = {
  left: '/INTERIORS/A TYPE 194SQM/1.jpg',
  right: '/INTERIORS/A TYPE 194SQM/2.jpg',
}

export function ExperienceAria() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [desktopApi, setDesktopApi] = React.useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = React.useState(0)
  const [tabletApi, setTabletApi] = React.useState<CarouselApi>()
  const [tabletCurrent, setTabletCurrent] = React.useState(0)
  const [mobileApi, setMobileApi] = React.useState<CarouselApi>()
  const [mobileCurrent, setMobileCurrent] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)

  // Intersection observer to trigger expansion on scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsExpanded(true)
          }
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Track current slides per viewport carousel
  React.useEffect(() => {
    if (!desktopApi) return
    setDesktopCurrent(desktopApi.selectedScrollSnap())
    const onSelect = () => setDesktopCurrent(desktopApi.selectedScrollSnap())
    desktopApi.on('select', onSelect)
    return () => {
      desktopApi.off('select', onSelect)
    }
  }, [desktopApi])

  React.useEffect(() => {
    if (!tabletApi) return
    setTabletCurrent(tabletApi.selectedScrollSnap())
    const onSelect = () => setTabletCurrent(tabletApi.selectedScrollSnap())
    tabletApi.on('select', onSelect)
    return () => {
      tabletApi.off('select', onSelect)
    }
  }, [tabletApi])

  React.useEffect(() => {
    if (!mobileApi) return
    setMobileCurrent(mobileApi.selectedScrollSnap())
    const onSelect = () => setMobileCurrent(mobileApi.selectedScrollSnap())
    mobileApi.on('select', onSelect)
    return () => {
      mobileApi.off('select', onSelect)
    }
  }, [mobileApi])

  const scrollPrev = React.useCallback((api?: CarouselApi) => {
    api?.scrollPrev()
  }, [])

  const scrollNext = React.useCallback((api?: CarouselApi) => {
    api?.scrollNext()
  }, [])

  return (
    <section className="bg-neutral-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-coral text-lg sm:text-xl lg:text-4xl font-semibold mb-4 sm:mb-8">
            Experience ARIA
          </h3>
          <h2 className="text-dark-blue text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Step inside a world of refined architecture, elegant interiors and elevated rooftop
            vistas. Our curated image gallery offers a glimpse into the lifestyle, luxury and
            craftsmanship that define ARIA Capital Residency.
          </h2>
        </div>

        {/* Gallery Section */}
        <div ref={sectionRef}>
          {/* Large Devices - 3 columns with expanding center */}
          <div className="hidden lg:block">
            <div className="flex gap-4 h-[500px]">
              {/* Left Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                animate={{
                  width: isExpanded ? '0%' : '33.333%',
                  opacity: isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <Image src={sideImages.left} alt="Interior view" fill className="object-cover" />
              </motion.div>

              {/* Center Carousel */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                animate={{
                  width: isExpanded ? '100%' : '33.333%',
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <Carousel
                  setApi={setDesktopApi}
                  plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                  className="w-full h-full"
                  opts={{ loop: true }}
                >
                  <CarouselContent className="h-[500px]">
                    {carouselImages.map((image, index) => (
                      <CarouselItem key={image} className="relative">
                        <div className="relative w-full h-[500px]">
                          <Image
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation Buttons */}
                  <button
                    onClick={() => scrollPrev(desktopApi)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 text-dark-blue" />
                  </button>
                  <button
                    onClick={() => scrollNext(desktopApi)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6 text-dark-blue" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 flex gap-1.5 items-center">
                      {carouselImages.map((image) => (
                        <button
                          key={`dot-${image}`}
                          onClick={() => desktopApi?.scrollTo(carouselImages.indexOf(image))}
                          className={cn(
                            'h-2 rounded-full transition-all duration-300 cursor-pointer',
                            desktopCurrent === carouselImages.indexOf(image)
                              ? 'bg-white w-8'
                              : 'bg-gray-400 w-2 hover:bg-gray-300',
                          )}
                          aria-label={`Go to slide ${carouselImages.indexOf(image) + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </Carousel>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                animate={{
                  width: isExpanded ? '0%' : '33.333%',
                  opacity: isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <Image src={sideImages.right} alt="Interior view" fill className="object-cover" />
              </motion.div>
            </div>
          </div>

          {/* Tablet - 2 images on top, carousel below */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src={sideImages.left} alt="Interior view" fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src={sideImages.right} alt="Interior view" fill className="object-cover" />
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Carousel
                setApi={setTabletApi}
                plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                className="w-full"
                opts={{ loop: true }}
              >
                <CarouselContent className="h-80">
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={image} className="relative">
                      <div className="relative w-full h-80">
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <button
                  onClick={() => scrollPrev(tabletApi)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-dark-blue" />
                </button>
                <button
                  onClick={() => scrollNext(tabletApi)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-dark-blue" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 flex gap-1.5 items-center">
                    {carouselImages.map((image) => (
                      <button
                        key={`dot-tablet-${image}`}
                        onClick={() => tabletApi?.scrollTo(carouselImages.indexOf(image))}
                        className={cn(
                          'h-2 rounded-full transition-all duration-300 cursor-pointer',
                          tabletCurrent === carouselImages.indexOf(image)
                            ? 'bg-white w-8'
                            : 'bg-gray-400 w-2 hover:bg-gray-300',
                        )}
                        aria-label={`Go to slide ${carouselImages.indexOf(image) + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </Carousel>
            </div>
          </div>

          {/* Mobile - Carousel only */}
          <div className="block md:hidden">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Carousel
                setApi={setMobileApi}
                plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                className="w-full"
                opts={{ loop: true }}
              >
                <CarouselContent className="h-85 sm:h-96">
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={image} className="relative">
                      <div className="relative w-full h-85 sm:h-96">
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <button
                  onClick={() => scrollPrev(mobileApi)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-dark-blue" />
                </button>
                <button
                  onClick={() => scrollNext(mobileApi)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-10 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-dark-blue" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 flex gap-1.5 items-center">
                    {carouselImages.map((image) => (
                      <button
                        key={`dot-mobile-${image}`}
                        onClick={() => mobileApi?.scrollTo(carouselImages.indexOf(image))}
                        className={cn(
                          'h-2 rounded-full transition-all duration-300 cursor-pointer',
                          mobileCurrent === carouselImages.indexOf(image)
                            ? 'bg-white w-8'
                            : 'bg-gray-400 w-2 hover:bg-gray-300',
                        )}
                        aria-label={`Go to slide ${carouselImages.indexOf(image) + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
