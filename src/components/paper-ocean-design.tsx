'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import testImage from '../../public/paper-ocean.png'

export function PaperOceanDesign() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [isIdle, setIsIdle] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    if (idleTimer.current) clearTimeout(idleTimer.current)
    setIsIdle(false)
    idleTimer.current = setTimeout(() => setIsIdle(true), 500)
  }

  return (
    <div className='relative min-w-64 h-64' onMouseMove={handleMouseMove}>
      <Image
        src={testImage}
        alt="paper ocean"
        width={256}
        height={256}
        className='absolute filter blur-[2px] contrast-75 object-cover h-64 w-64 rounded-2xl pointer-events-none'
      />
      <Image
        src={testImage}
        alt="paper ocean"
        width={256}
        height={256}
        className='absolute object-cover h-64 w-64 rounded-2xl pointer-events-none'
        style={{
          clipPath: isIdle
            ? `circle(50px at ${cursor.x}px ${cursor.y}px)`
            : `circle(30px at ${cursor.x}px ${cursor.y}px)`,
          transition: isIdle ? 'clip-path 0.5s' : 'none',
          transform: isIdle ? 'scale(1.2)' : 'scale(1)',
          transformOrigin: `${cursor.x}px ${cursor.y}px`,
        }}
      />
    </div>
  )
}