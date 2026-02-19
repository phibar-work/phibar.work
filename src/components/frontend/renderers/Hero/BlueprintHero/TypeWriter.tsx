'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

interface TypeWriterProps {
  text: string
  active: boolean
  fading?: boolean
  speed?: number
}

export function TypeWriter({ text, active, fading, speed = 12 }: TypeWriterProps) {
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active || fading) return

    setCharIndex(0)
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
  }, [active, fading, text, speed])

  const displayedText = active ? text.substring(0, charIndex) : ''
  const showCursor = active && !fading

  return (
    <div
      className={cn(
        'font-mono text-sm sm:text-base md:text-lg text-cyan-300/70 select-none pointer-events-none max-w-2xl w-full px-8',
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
