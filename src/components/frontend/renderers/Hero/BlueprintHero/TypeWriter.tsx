'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

interface TypeWriterProps {
  text: string
  active: boolean
  fading?: boolean
  paused?: boolean
  speed?: number
}

export function TypeWriter({ text, active, fading, paused, speed = 25 }: TypeWriterProps) {
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset to 0 when becoming freshly active
  useEffect(() => {
    if (active && !fading) {
      setCharIndex(0)
    }
  }, [active, fading])

  // Manage typing interval — stops on pause, resumes from current position
  useEffect(() => {
    if (!active || fading || paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [active, fading, paused, text, speed])

  const displayedText = active ? text.substring(0, charIndex) : ''
  const showCursor = active && !fading && !paused

  return (
    <div
      className={cn(
        'font-mono text-sm sm:text-base md:text-lg text-cyan-300/70 max-w-2xl w-full px-8',
        fading && 'code-block-fade-out',
      )}
      aria-hidden="true"
    >
      <pre className="leading-relaxed whitespace-pre-wrap">
        {displayedText}
        {showCursor && <span className="typing-cursor">|</span>}
      </pre>
    </div>
  )
}
