import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/EXTERIORS/ARIA Building Shot - Exp.webp"
          alt="ARIA Residences Exterior"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Content Card */}
      <div className="relative z-10 container mx-auto px-4 flex justify-center pt-16 sm:pt-20 mt-8 sm:mt-12">
        <div className="bg-white/60 backdrop-blur-xs rounded-2xl sm:rounded-3xl px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 text-center shadow-lg w-full max-w-4xl md:max-w-5xl  lg:max-w-7xl">
          {/* Location */}
          <p className="text-coral text-xs sm:text-sm md:text-base font-medium tracking-wide mb-3 sm:mb-4">
            Mawensi Road, Upperhill, Nairobi - Kenya
          </p>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-dark-blue mb-6 sm:mb-8">
            City Living Redefined!
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="bg-dark-blue hover:bg-dark-blue/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-md font-medium"
              asChild
            >
              <Link href="#about">Discover ARIA</Link>
            </Button>
            <Button
              size="lg"
              className="bg-coral hover:bg-coral/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-md font-medium"
              asChild
            >
              <Link href="tel:+254759012345">Call Us Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
