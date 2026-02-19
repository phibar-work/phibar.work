import type React from 'react'
import { cn } from '@/utilities/ui'

interface CodeRevealProps {
  lines: string[]
  active: boolean
  fading?: boolean
}

export function CodeReveal({ lines, active, fading }: CodeRevealProps) {
  return (
    <div
      className={cn(
        'font-mono text-sm sm:text-base md:text-lg text-cyan-300/60 select-none pointer-events-none max-w-2xl w-full px-8',
        active && 'code-block-fade-in',
        fading && 'code-block-fade-out',
      )}
      aria-hidden="true"
    >
      <pre className="leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn('code-line-reveal', active && !fading && 'code-line-visible')}
            style={{ '--line-delay': `${i * 0.15}s` } as React.CSSProperties}
          >
            {line || '\u00A0'}
          </div>
        ))}
      </pre>
    </div>
  )
}
