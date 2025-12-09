import React from 'react'
import Image from 'next/image'

export function Icon() {
  return (
    <div className="flex items-center justify-center">
      <Image src="/favicon.webp" alt="ARIA" width={32} height={32} className="h-8 w-8" />
    </div>
  )
}

export default Icon
