'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#hero', label: 'Home.' },
  { href: '#about', label: 'About.' },
  {
    href: '#amenities',
    label: 'The Development.',
    hasDropdown: true,
    subLinks: [
      { href: '#amenities', label: 'Amenities.' },
      { href: '#floorplans', label: 'Unit Layouts.' },
    ],
  },
  { href: '/articles', label: 'Articles.' },
  { href: '#contact', label: 'Reserve your Unit.' },
]

interface HeaderProps {
  readonly forceScrolledStyle?: boolean
}

export function Header({ forceScrolledStyle = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(forceScrolledStyle)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [expandedMobileNav, setExpandedMobileNav] = React.useState<string | null>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (forceScrolledStyle) {
      setIsScrolled(true)
      return
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [forceScrolledStyle])

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsPopoverOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsPopoverOpen(false)
    }, 150)
  }

  const toggleMobileSubNav = (label: string) => {
    setExpandedMobileNav(expandedMobileNav === label ? null : label)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent',
      )}
    >
      <div className="w-full px-2 md:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/logo.webp"
            alt="ARIA"
            width={280}
            height={90}
            className={cn('h-20 w-auto transition-all duration-300', isScrolled && 'brightness-0')}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) =>
            link.hasDropdown && link.subLinks ? (
              <Popover key={link.href} open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      'text-sm font-medium transition-colors hover:opacity-80 flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none',
                      isScrolled ? 'text-dark-blue' : 'text-white',
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', isPopoverOpen && 'rotate-180')}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-48 p-2 bg-white border border-gray-200 shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  sideOffset={8}
                >
                  <div className="flex flex-col gap-1">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        onClick={() => setIsPopoverOpen(false)}
                        className="text-dark-blue text-sm font-medium hover:text-coral hover:bg-gray-50 transition-colors py-2 px-3 rounded-md cursor-pointer"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:opacity-80 flex items-center gap-1 cursor-pointer',
                  isScrolled ? 'text-dark-blue' : 'text-white',
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className={cn(
                'p-2 transition-colors hover:opacity-80 cursor-pointer',
                isScrolled ? 'text-dark-blue' : 'text-white',
              )}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-dark-blue border-0 px-3 [&>button]:hidden">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="py-2 flex items-center justify-between">
                <Image
                  src="/logo.webp"
                  alt="ARIA"
                  width={120}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
                <SheetClose className="text-white hover:text-coral transition-colors cursor-pointer">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.hasDropdown && link.subLinks ? (
                    <div key={link.href} className="flex flex-col">
                      <button
                        onClick={() => toggleMobileSubNav(link.label)}
                        className="text-white text-lg font-medium hover:text-coral transition-colors py-2 flex items-center justify-between cursor-pointer bg-transparent border-0 text-left"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 transition-transform',
                            expandedMobileNav === link.label && 'rotate-180',
                          )}
                        />
                      </button>
                      {expandedMobileNav === link.label && (
                        <div className="flex flex-col gap-1 pl-4 pb-2">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              onClick={() => setIsOpen(false)}
                              className="text-white/80 text-base font-medium hover:text-coral transition-colors py-2 cursor-pointer"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white text-lg font-medium hover:text-coral transition-colors py-2 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="mt-auto pb-8">
                <Button
                  className="w-full bg-coral hover:bg-coral/90 text-white cursor-pointer"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#contact">Reserve your Unit</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
