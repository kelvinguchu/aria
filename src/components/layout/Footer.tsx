'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function Footer() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = React.useState(false)

  return (
    <>
      <footer className="bg-coral text-white">
        <div className="container mx-auto px-2 lg:px-4 py-12 lg:py-16">
          {/* Main Content - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Logo, Description, Contact, Social */}
            <div className="space-y-8">
              {/* Logo */}
              <Image
                src="/logo.webp"
                alt="ARIA Capital Residency"
                width={280}
                height={90}
                className="h-20 w-auto brightness-0 invert"
              />

              {/* Description */}
              <p className="text-white text-2xl lg:text-3xl font-bold leading-relaxed">
                ARIA Capital Residency redefines contemporary urban luxury. Set at the heart of
                Nairobi&apos;s premier business district, Upperhill, ARIA offers a rare blend of
                serenity and city convenience.
              </p>

              <div className="w-full h-px bg-white/30" />

              {/* Phone */}
              <a
                href="tel:+254759012345"
                className="block text-white text-4xl lg:text-5xl font-light hover:opacity-80 transition-opacity"
              >
                (+254) 759 012 345
              </a>

              <div className="w-full h-px bg-white/30" />

              {/* Email */}
              <a
                href="mailto:sales@aria.ke"
                className="block text-white text-3xl lg:text-4xl font-light hover:opacity-80 transition-opacity"
              >
                sales@aria.ke
              </a>

              <div className="w-full h-px bg-white/30" />

              {/* Social Media */}
              <div className="flex items-center gap-4">
                <span className="text-white text-xl lg:text-2xl font-semibold">Follow Us.</span>
                <a
                  href="https://www.facebook.com/ariacapitalresidency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-blue rounded-full flex items-center justify-center hover:bg-dark-blue/80 transition-colors"
                >
                  <FaFacebookF className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/ariacapitalresidency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-blue rounded-full flex items-center justify-center hover:bg-dark-blue/80 transition-colors"
                >
                  <FaInstagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Right Column - Exterior Image */}
            <div className="relative h-[400px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/EXTERIORS/ARIA-Exterior.webp"
                alt="ARIA Capital Residency Exterior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              All rights reserved &copy; {new Date().getFullYear()} Elemental Terra Developers Ltd.
            </p>
            <div className="flex gap-8">
              <Link
                href="/#about"
                className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Discover ARIA
              </Link>
              <Link
                href="/#amenities"
                className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Amenities.
              </Link>
              <Link
                href="/#floorplans"
                className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Our Units.
              </Link>
              <button
                onClick={() => setIsDisclaimerOpen(true)}
                className="text-white text-sm font-medium underline cursor-pointer hover:opacity-80 transition-opacity"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimer Dialog */}
      <Dialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-dark-blue text-2xl font-bold">Disclaimer</DialogTitle>
          </DialogHeader>
          <div
            className="flex-1 overflow-y-auto overscroll-contain p-6 pt-4"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="text-dark-blue/80 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                All rights reserved. No part of this website may be reproduced or transmitted in any
                form or by any means without prior written consent of Elemental Terra Developers
                Ltd. It is based on material that we believe to be reliable. Whilst every effort has
                been made to ensure its accuracy, we cannot offer any warranty that it contains no
                factual errors. No liability for negligence or otherwise is assumed by Elemental
                Terra Developers Ltd for any loss or damage suffered by any party resulting from
                their use of this website.
              </p>
              <p>
                All photography and illustrations are representative only. Images and floor plans
                are indicative of the current design intent. Actual, detailed design may be subject
                to change as the construction process advances. The dimensions indicated are
                approximate. The particulars are set out as a general guideline only for the
                guidance of intended purchasers and do not form part of any offer or contract. The
                Developer reserves the right to alter any part of the development, specification or
                floor layout at any time and without notice.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
