'use client'

import { Pause, Play, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { BlueprintSvg } from './BlueprintSvg'
import { TypeWriter } from './TypeWriter'
import './blueprint-hero.css'

type Phase = 'architecture' | 'hold' | 'terraform' | 'console' | 'react' | 'reveal' | 'settled'

const PHASE_TIMELINE: [number, Phase][] = [
  [5000, 'hold'],
  [6000, 'terraform'],
  [13500, 'console'],
  [20500, 'react'],
  [26500, 'reveal'],
  [28000, 'settled'],
]

const terraformCode = `resource "aws_ecs_service" "api" {
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 3
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.ecs.id]
  }
}`

const consoleCode = `$ npx create-next-app@latest phibar.work
\u2713 Would you like to use TypeScript? Yes
\u2713 Would you like to use Tailwind CSS? Yes
\u2713 Would you like to use App Router? Yes

Creating a new Next.js app in ./phibar.work...

Installing dependencies...
\u2713 Done in 12.3s`

const reactCode = `export default function Hero() {
  return (
    <section>
      <h1>Software architect, married to AI.</h1>
      <p>I design, build, and ship
        \u2014 without the overhead of ten people.</p>
    </section>
  )
}`

export function BlueprintHero({ hero, title }: { hero: Page['hero']; title: string }) {
  const { setHeaderTheme } = useHeaderTheme()
  const [phase, setPhase] = useState<Phase>('architecture')
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const headline = hero?.headline || 'Software architect, married to AI.'
  const subline =
    hero?.subline || 'I design, build, and ship \u2014 without the overhead of ten people.'

  const elapsedRef = useRef(0)
  const resumedAtRef = useRef(Date.now())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    setHeaderTheme('dark')
    return () => setHeaderTheme(null)
  }, [setHeaderTheme])

  const schedulePhases = useCallback((fromElapsed: number) => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    resumedAtRef.current = Date.now()

    for (const [time, p] of PHASE_TIMELINE) {
      const remaining = time - fromElapsed
      if (remaining > 0) {
        timersRef.current.push(setTimeout(() => setPhase(p), remaining))
      }
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: animKey triggers replay reset
  useEffect(() => {
    elapsedRef.current = 0
    setPhase('architecture')
    schedulePhases(0)
    return () => timersRef.current.forEach(clearTimeout)
  }, [animKey, schedulePhases])

  const handlePause = useCallback(() => {
    elapsedRef.current += Date.now() - resumedAtRef.current
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPaused(true)
  }, [])

  const handlePlay = useCallback(() => {
    setPaused(false)
    schedulePhases(elapsedRef.current)
  }, [schedulePhases])

  const handleReplay = useCallback(() => {
    setPaused(false)
    setAnimKey((k) => k + 1)
  }, [])

  const archVisible = phase === 'architecture' || phase === 'hold'
  const archFading = phase === 'terraform'

  const tfActive = phase === 'terraform'
  const tfFading = phase === 'console'

  const consoleActive = phase === 'console'
  const consoleFading = phase === 'react'

  const reactActive = phase === 'react'
  const reactFading = phase === 'reveal'

  const textVisible = phase === 'reveal' || phase === 'settled'
  const isSettled = phase === 'settled'

  return (
    <section
      className={cn(
        'relative w-full h-screen overflow-hidden bg-slate-950',
        paused && 'hero-paused',
      )}
      aria-label={title}
    >
      {/* Animated content — key forces remount on replay */}
      <div key={animKey} className="absolute inset-0">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 blueprint-grid opacity-20" />

        {/* SVG architecture diagram */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            archFading && 'blueprint-fadeout',
            !archVisible && !archFading && 'opacity-0',
          )}
        >
          <BlueprintSvg phase={phase} />
        </div>

        {/* Terraform code — typing */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            !tfActive && !tfFading && 'opacity-0',
          )}
        >
          <TypeWriter text={terraformCode} active={tfActive} fading={tfFading} paused={paused} />
        </div>

        {/* Console bootstrap — typing */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            !consoleActive && !consoleFading && 'opacity-0',
          )}
        >
          <TypeWriter
            text={consoleCode}
            active={consoleActive}
            fading={consoleFading}
            paused={paused}
          />
        </div>

        {/* React component — typing */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            !reactActive && !reactFading && 'opacity-0',
          )}
        >
          <TypeWriter text={reactCode} active={reactActive} fading={reactFading} paused={paused} />
        </div>

        {/* Real headline + subline — appears at reveal */}
        <div
          className={cn(
            'relative z-10 flex flex-col items-center justify-center h-full text-center px-6',
            !textVisible && 'opacity-0',
          )}
        >
          <h1
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold',
              'text-white max-w-4xl leading-tight',
              textVisible && 'hero-fade-in hero-text-glow',
            )}
          >
            {headline}
          </h1>
          <p
            className={cn(
              'mt-6 text-lg sm:text-xl md:text-2xl',
              'text-cyan-100/80 max-w-2xl',
              textVisible && 'hero-fade-in-sub',
            )}
          >
            {subline}
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Playback controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {!isSettled && (
          <button
            type="button"
            onClick={paused ? handlePlay : handlePause}
            className="hero-control-btn"
            aria-label={paused ? 'Play animation' : 'Pause animation'}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
        <button
          type="button"
          onClick={handleReplay}
          className="hero-control-btn"
          aria-label="Replay animation"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </section>
  )
}
