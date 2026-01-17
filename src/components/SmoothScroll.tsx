'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  readonly children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Watch for dialog state changes to stop/start Lenis
    const observer = new MutationObserver(() => {
      const dialogOpen = document.querySelector('[data-state="open"][data-slot="dialog-overlay"]')
      if (dialogOpen) {
        lenis.stop()
      } else {
        lenis.start()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    })

    return () => {
      observer.disconnect()
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
