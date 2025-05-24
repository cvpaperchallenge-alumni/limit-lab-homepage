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
    <div
      className="relative h-48 w-80 overflow-hidden rounded-2xl sm:h-56 md:h-64"
      onMouseMove={handleMouseMove}
    >
      <Image
        src={testImage}
        alt="paper ocean background"
        className="pointer-events-none absolute inset-0 size-full object-cover blur-[2px] contrast-75"
        priority
      />

      <Image
        src={testImage}
        alt="paper ocean focus"
        className={
          'pointer-events-none absolute inset-0 h-full w-full object-cover ' +
          (isIdle ? 'animate-scale-up-md' : '')
        }
        style={{
          clipPath:
            cursor.x === 0 && cursor.y === 0
              ? 'circle(30px at 50% 50%)'
              : isIdle
                ? `circle(50px at ${cursor.x}px ${cursor.y}px)`
                : `circle(30px at ${cursor.x}px ${cursor.y}px)`,
          transition: isIdle ? 'clip-path 0.5s, transform 0.5s' : 'none',
          transform: isIdle ? 'scale(1.2)' : 'scale(1)',
          transformOrigin:
            cursor.x === 0 && cursor.y === 0
              ? 'center center'
              : `${cursor.x}px ${cursor.y}px`,
        }}
        priority
      />
    </div>
  )
}
