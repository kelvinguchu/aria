import React from 'react'
import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.webp"
        alt="ARIA Capital Residency"
        width={120}
        height={48}
        className="h-12 w-auto"
      />
    </div>
  )
}

export default Logo
