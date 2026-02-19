'use client'

import { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import { BlueprintSvg } from './BlueprintSvg'
import { CodeReveal } from './CodeReveal'
import './blueprint-hero.css'

type Phase = 'architecture' | 'hold' | 'terraform' | 'react' | 'reveal' | 'settled'

const terraformLines = [
  'resource "aws_ecs_service" "api" {',
  '  cluster         = aws_ecs_cluster.main.id',
  '  task_definition = aws_ecs_task_definition.api.arn',
  '  desired_count   = 3',
  '  launch_type     = "FARGATE"',
  '',
  '  network_configuration {',
  '    subnets         = aws_subnet.private[*].id',
  '    security_groups = [aws_security_group.ecs.id]',
  '  }',
  '}',
]

const reactLines = [
  'export default function Hero() {',
  '  return (',
  '    <section>',
  '      <h1>Software architect, married to AI.</h1>',
  '      <p>I design, build, and ship',
  '        \u2014 without the overhead of ten people.</p>',
  '    </section>',
  '  )',
  '}',
]

export function BlueprintHero({ hero, title }: { hero: Page['hero']; title: string }) {
  const { setHeaderTheme } = useHeaderTheme()
  const [phase, setPhase] = useState<Phase>('architecture')

  const headline = hero?.headline || 'Software architect, married to AI.'
  const subline = hero?.subline || 'I design, build, and ship \u2014 without the overhead of ten people.'

  useEffect(() => {
    setHeaderTheme('dark')
    return () => setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('hold'), 5000),
      setTimeout(() => setPhase('terraform'), 6000),
      setTimeout(() => setPhase('react'), 8500),
      setTimeout(() => setPhase('reveal'), 12000),
      setTimeout(() => setPhase('settled'), 13500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const archVisible = phase === 'architecture' || phase === 'hold'
  const archFading = phase === 'terraform'
  const tfActive = phase === 'terraform'
  const tfFading = phase === 'react'
  const reactActive = phase === 'react'
  const reactFading = phase === 'reveal'
  const textVisible = phase === 'reveal' || phase === 'settled'

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-slate-950"
      aria-label={title}
    >
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

      {/* Terraform code */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          !tfActive && !tfFading && 'opacity-0',
        )}
      >
        <CodeReveal lines={terraformLines} active={tfActive} fading={tfFading} />
      </div>

      {/* React component code */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          !reactActive && !reactFading && 'opacity-0',
        )}
      >
        <CodeReveal lines={reactLines} active={reactActive} fading={reactFading} />
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
    </section>
  )
}
