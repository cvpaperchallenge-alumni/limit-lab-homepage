'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import testImage from '../../public/paper-ocean.png'

export function PaperOceanDesign() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [freezedCursor, setFreezedCursor] = useState({ x: 0, y: 0 })
  const [isIdle, setIsIdle] = useState(false)
  const [isStartMoving, setIsStartMoving] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isIdle) {
      setFreezedCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      setIsStartMoving(true)
      setTimeout(() => {
        setIsStartMoving(false)
      }, 500)
    }
    setIsIdle(false)
    setCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setIsIdle(true)
    }, 500)
  }

  return (
    <div className="relative h-64 min-w-80" onMouseMove={handleMouseMove}>
      <Image
        src={testImage}
        alt="paper ocean"
        className="pointer-events-none absolute h-64 w-80 rounded-2xl object-cover blur-[2px] contrast-75"
      />
      <Image
        src={testImage}
        alt="paper ocean"
        className={
          "pointer-events-none absolute h-64 w-80 rounded-2xl object-cover "
          + (
            isStartMoving ? 'animate-scale-down-md' : (
              isIdle ? 'animate-scale-up-md' : ''
            )
          )
        }
        style={{
          clipPath: isStartMoving
            ? `circle(30px at ${freezedCursor.x}px ${freezedCursor.y}px)`
            : (
              isIdle
              ? `circle(50px at ${cursor.x}px ${cursor.y}px)`
              : `circle(30px at ${cursor.x}px ${cursor.y}px)`
            ),
          transition: isStartMoving
            ? 'clip-path 0.5s'
            : (isIdle ? 'clip-path 0.5s' : 'none'),
          transformOrigin: isStartMoving
            ? `${freezedCursor.x}px ${freezedCursor.y}px`
            : `${cursor.x}px ${cursor.y}px`,
        }}
      />
    </div>
  )
}
