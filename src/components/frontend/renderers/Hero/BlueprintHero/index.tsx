'use client'

import { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import { BlueprintSvg } from './BlueprintSvg'
import { CodeReveal } from './CodeReveal'
import './blueprint-hero.css'

type Phase = 'draw' | 'dissolve' | 'code' | 'settled'

export function BlueprintHero({ hero, title }: { hero: Page['hero']; title: string }) {
  const { setHeaderTheme } = useHeaderTheme()
  const [phase, setPhase] = useState<Phase>('draw')

  const headline = hero?.headline || 'Software architect, married to AI.'
  const subline = hero?.subline || 'I design, build, and ship \u2014 without the overhead of ten people.'

  useEffect(() => {
    setHeaderTheme('dark')
    return () => setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    const dissolveTimer = setTimeout(() => setPhase('dissolve'), 2500)
    const codeTimer = setTimeout(() => setPhase('code'), 4000)
    const settleTimer = setTimeout(() => setPhase('settled'), 6000)

    return () => {
      clearTimeout(dissolveTimer)
      clearTimeout(codeTimer)
      clearTimeout(settleTimer)
    }
  }, [])

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-slate-950"
      aria-label={title}
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      {/* SVG architecture diagram layer */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          phase === 'dissolve' && 'blueprint-dissolve',
          (phase === 'code' || phase === 'settled') && 'opacity-0',
        )}
      >
        <BlueprintSvg phase={phase} />
      </div>

      {/* Code reveal layer */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
          phase === 'code' || phase === 'settled' ? 'opacity-100' : 'opacity-0',
        )}
      >
        <CodeReveal active={phase === 'code' || phase === 'settled'} />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1
          className={cn(
            'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold',
            'text-white max-w-4xl leading-tight',
            'hero-text-glow',
          )}
        >
          {headline}
        </h1>
        <p
          className={cn(
            'mt-6 text-lg sm:text-xl md:text-2xl',
            'text-cyan-100/80 max-w-2xl',
            'hero-fade-in',
          )}
        >
          {subline}
        </p>
      </div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
