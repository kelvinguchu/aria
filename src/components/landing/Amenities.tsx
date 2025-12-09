'use client'

import * as React from 'react'
import { motion } from 'motion/react'

const marqueePills = ['Strategic Location', 'Next-Gen Living', 'Harmonious Living Spaces']

export function Amenities() {
  return (
    <section
      id="amenities"
      className="bg-gray-100 flex flex-col justify-center overflow-hidden py-8 md:py-12 md:min-h-screen"
    >
      {/* Marquee Pills with Vignette */}
      <div className="w-full overflow-hidden mb-8 sm:mb-16 lg:mb-24 relative">
        {/* Left Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-linear-to-r from-gray-100 to-transparent z-10 pointer-events-none" />

        {/* Right Vignette */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-linear-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <motion.div
          className="flex gap-4 sm:gap-6 lg:gap-10 py-2 md:py-4"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            },
          }}
        >
          {/* Duplicate pills for seamless loop */}
          {[...marqueePills, ...marqueePills].map((pill, index) => (
            <div
              key={`${pill}-${index}`}
              className="shrink-0 bg-white rounded-full px-5 py-3 sm:px-10 sm:py-5 lg:px-16 lg:py-7 shadow-sm"
            >
              <span className="text-dark-blue text-sm sm:text-xl lg:text-3xl xl:text-4xl font-medium whitespace-nowrap">
                {pill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center">
        {/* Subtitle */}
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base tracking-wide mb-4 sm:mb-6 lg:mb-8">
          Thoughtfully Integrated Amenities
        </p>

        {/* Main Headline */}
        <h2 className="text-coral text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
          Amenities to
          <br />
          live for!
        </h2>
      </div>
    </section>
  )
}
