import { cn } from '@/utilities/ui'

type Phase = 'architecture' | 'hold' | 'terraform' | 'react' | 'reveal' | 'settled'

interface BlueprintSvgProps {
  phase: Phase
}

export function BlueprintSvg({ phase }: BlueprintSvgProps) {
  const drawing = phase === 'architecture' || phase === 'hold'

  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full max-w-5xl h-auto"
      aria-hidden="true"
      role="presentation"
    >
      {/* ===== LEFT SIDE: Cloud Infrastructure ===== */}

      {/* VPC boundary — shape */}
      <rect
        x="40" y="40" width="420" height="520" rx="6"
        className={cn('blueprint-line', drawing && 'blueprint-draw-1')}
        fill="none" strokeWidth="2"
      />
      {/* VPC — label */}
      <text
        x="60" y="72"
        className={cn('blueprint-line', drawing && 'blueprint-draw-2')}
        fontSize="13" fontFamily="monospace" fill="currentColor" stroke="none"
      >
        VPC 10.0.0.0/16
      </text>

      {/* Public subnet — shape */}
      <rect
        x="60" y="90" width="380" height="120" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-3')}
        fill="none" strokeWidth="1" strokeDasharray="6 3"
      />
      {/* Public subnet — label */}
      <text
        x="75" y="112"
        className={cn('blueprint-line', drawing && 'blueprint-draw-4')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7"
      >
        Public Subnet 10.0.1.0/24
      </text>

      {/* ALB — shape */}
      <rect
        x="160" y="125" width="180" height="60" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-5')}
        fill="none" strokeWidth="1.5"
      />
      {/* ALB — label */}
      <text
        x="250" y="162"
        className={cn('blueprint-line', drawing && 'blueprint-draw-6')}
        fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        ALB
      </text>

      {/* Private subnet — shape */}
      <rect
        x="60" y="230" width="380" height="200" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-7')}
        fill="none" strokeWidth="1" strokeDasharray="6 3"
      />
      {/* Private subnet — label */}
      <text
        x="75" y="252"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7"
      >
        Private Subnet 10.0.2.0/24
      </text>

      {/* ECS Cluster — shape */}
      <rect
        x="80" y="265" width="340" height="100" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-9')}
        fill="none" strokeWidth="1" opacity="0.6"
      />
      {/* ECS Cluster — label */}
      <text
        x="95" y="282"
        className={cn('blueprint-line', drawing && 'blueprint-draw-10')}
        fontSize="9" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.6"
      >
        ECS Cluster
      </text>

      {/* ECS Task 1 — shape */}
      <rect
        x="95" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        fill="none" strokeWidth="1.5"
      />
      {/* ECS Task 2 — shape */}
      <rect
        x="205" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        fill="none" strokeWidth="1.5"
      />
      {/* ECS Task 3 — shape */}
      <rect
        x="315" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        fill="none" strokeWidth="1.5"
      />
      {/* ECS Task labels */}
      <text
        x="140" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-12')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: API
      </text>
      <text
        x="250" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-12')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: Web
      </text>
      <text
        x="360" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-12')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: Worker
      </text>

      {/* RDS Database — shapes (cylinder) */}
      <ellipse
        cx="250" cy="455" rx="70" ry="14"
        className={cn('blueprint-line', drawing && 'blueprint-draw-13')}
        fill="none" strokeWidth="1.5"
      />
      <line
        x1="180" y1="455" x2="180" y2="495"
        className={cn('blueprint-line', drawing && 'blueprint-draw-13')}
        strokeWidth="1.5"
      />
      <line
        x1="320" y1="455" x2="320" y2="495"
        className={cn('blueprint-line', drawing && 'blueprint-draw-13')}
        strokeWidth="1.5"
      />
      <ellipse
        cx="250" cy="495" rx="70" ry="14"
        className={cn('blueprint-line', drawing && 'blueprint-draw-13')}
        fill="none" strokeWidth="1.5"
      />
      {/* RDS — label */}
      <text
        x="250" y="480"
        className={cn('blueprint-line', drawing && 'blueprint-draw-14')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        RDS Postgres
      </text>

      {/* ===== RIGHT SIDE: Application Architecture ===== */}

      {/* API Gateway — shape */}
      <rect
        x="560" y="90" width="160" height="55" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-13')}
        fill="none" strokeWidth="1.5"
      />
      {/* API Gateway — label */}
      <text
        x="640" y="123"
        className={cn('blueprint-line', drawing && 'blueprint-draw-14')}
        fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        API Gateway
      </text>

      {/* Auth service — shape */}
      <rect
        x="540" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-15')}
        fill="none" strokeWidth="1.5"
      />
      {/* Core service — shape */}
      <rect
        x="660" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-15')}
        fill="none" strokeWidth="1.5"
      />
      {/* Search service — shape */}
      <rect
        x="780" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-15')}
        fill="none" strokeWidth="1.5"
      />
      {/* Service labels */}
      <text
        x="590" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-16')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Auth
      </text>
      <text
        x="710" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-16')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Core
      </text>
      <text
        x="830" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-16')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Search
      </text>

      {/* SQS / Event Bus — shape */}
      <rect
        x="600" y="310" width="200" height="45" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-15')}
        fill="none" strokeWidth="1" strokeDasharray="4 2"
      />
      {/* SQS — label */}
      <text
        x="700" y="338"
        className={cn('blueprint-line', drawing && 'blueprint-draw-16')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        SQS / EventBridge
      </text>

      {/* ===== CONNECTION ARROWS ===== */}

      {/* ALB → ECS */}
      <line
        x1="250" y1="185" x2="250" y2="265"
        className={cn('blueprint-line', drawing && 'blueprint-draw-17')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* ECS → RDS */}
      <line
        x1="250" y1="365" x2="250" y2="440"
        className={cn('blueprint-line', drawing && 'blueprint-draw-17')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* API Gateway → Auth */}
      <line
        x1="600" y1="145" x2="590" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-17')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* API Gateway → Core */}
      <line
        x1="640" y1="145" x2="710" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-17')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* API Gateway → Search */}
      <line
        x1="700" y1="145" x2="830" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-18')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* Services → SQS */}
      <line
        x1="590" y1="250" x2="650" y2="310"
        className={cn('blueprint-line', drawing && 'blueprint-draw-18')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      <line
        x1="710" y1="250" x2="700" y2="310"
        className={cn('blueprint-line', drawing && 'blueprint-draw-18')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      {/* ECS → API Gateway (cross-link) */}
      <line
        x1="460" y1="155" x2="560" y2="117"
        className={cn('blueprint-line', drawing && 'blueprint-draw-18')}
        strokeWidth="1.5" strokeDasharray="8 4" markerEnd="url(#arrowhead)"
      />

      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8" markerHeight="6"
          refX="8" refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="rgb(34, 211, 238)" />
        </marker>
      </defs>
    </svg>
  )
}
