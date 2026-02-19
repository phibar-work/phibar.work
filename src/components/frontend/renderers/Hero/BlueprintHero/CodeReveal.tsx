import type React from 'react'
import { cn } from '@/utilities/ui'

interface CodeRevealProps {
  active: boolean
}

const codeLines = [
  { text: 'resource "aws_ecs_service" "api" {' },
  { text: '  cluster         = aws_ecs_cluster.main.id' },
  { text: '  task_definition = aws_ecs_task_definition.api.arn' },
  { text: '  desired_count   = 3' },
  { text: '  launch_type     = "FARGATE"' },
  { text: '' },
  { text: '  network_configuration {' },
  { text: '    subnets         = aws_subnet.private[*].id' },
  { text: '    security_groups = [aws_security_group.ecs.id]' },
  { text: '  }' },
  { text: '}' },
]

export function CodeReveal({ active }: CodeRevealProps) {
  return (
    <div
      className="font-mono text-sm sm:text-base md:text-lg text-cyan-300/40 select-none pointer-events-none max-w-2xl w-full px-8"
      aria-hidden="true"
    >
      <pre className="leading-relaxed">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className={cn('code-line-reveal', active && 'code-line-visible')}
            style={{ '--line-delay': `${i * 0.15}s` } as React.CSSProperties}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
      </pre>
    </div>
  )
}
