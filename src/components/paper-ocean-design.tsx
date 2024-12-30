'use client'

import { useState, useRef, use, useEffect } from 'react'
import Image from 'next/image'
import testImage from '../../public/paper-ocean.png'

export function PaperOceanDesign() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [freezedCursor, setFreezedCursor] = useState({ x: 0, y: 0 })
  const [targetCursor, setTargetCursor] = useState({ x: 0, y: 0 })
  const [isIdle, setIsIdle] = useState(false)
  const [isStartMoving, setIsStartMoving] = useState(false)
  const [isTracing, setIsTracing] = useState(false)
  const [isDuringTracing, setIsDuringTracing] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  const [numTracing, setNumTracing] = useState(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isIdle && !isStartMoving) {
      setFreezedCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      setIsStartMoving(true)
      setTimeout(() => {
        setIsStartMoving(false)
        setIsTracing(true)
      }, 200)
    }
    if (isStartMoving || !isDuringTracing) {
      console.log('set')
      setTargetCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    }
    setIsIdle(false)
    setCursor({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setIsIdle(true)
    }, 500)
  }

  useEffect(() => {
    if (isTracing && !isDuringTracing) {
      setIsDuringTracing(true)
      setTimeout(() => {
        setNumTracing(numTracing + 1)
        if (numTracing === 3) {
          setIsTracing(false)
          setNumTracing(0)
        }
        setIsDuringTracing(false)
      }, 500)
    }
  }, [cursor, isTracing])

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
            : ( isTracing
              ? `circle(30px at ${targetCursor.x}px ${targetCursor.y}px)`
              : (
                isIdle
                ? `circle(50px at ${cursor.x}px ${cursor.y}px)`
                : `circle(30px at ${cursor.x}px ${cursor.y}px)`
              )
            ),
          transition: isStartMoving
            ? 'clip-path 0.2s'
            : (isTracing
              ? 'clip-path 0.5s'
              : (isIdle ? 'clip-path 0.5s' : 'none')
            ),
          transformOrigin: isStartMoving
            ? `${freezedCursor.x}px ${freezedCursor.y}px`
            : `${cursor.x}px ${cursor.y}px`,
        }}
      />
    </div>
  )
}
