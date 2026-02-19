import { cn } from '@/utilities/ui'

interface BlueprintSvgProps {
  phase: 'draw' | 'dissolve' | 'code' | 'settled'
}

export function BlueprintSvg({ phase }: BlueprintSvgProps) {
  const drawing = phase === 'draw'

  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full max-w-5xl h-auto"
      aria-hidden="true"
      role="presentation"
    >
      {/* ===== LEFT SIDE: Cloud Infrastructure ===== */}

      {/* VPC boundary */}
      <rect
        x="40" y="40" width="420" height="520" rx="6"
        className={cn('blueprint-line', drawing && 'blueprint-draw-1')}
        fill="none" strokeWidth="2"
      />
      <text
        x="60" y="72"
        className={cn('blueprint-line', drawing && 'blueprint-draw-1')}
        fontSize="13" fontFamily="monospace" fill="currentColor" stroke="none"
      >
        VPC 10.0.0.0/16
      </text>

      {/* Public subnet */}
      <rect
        x="60" y="90" width="380" height="120" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-2')}
        fill="none" strokeWidth="1" strokeDasharray="6 3"
      />
      <text
        x="75" y="112"
        className={cn('blueprint-line', drawing && 'blueprint-draw-2')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7"
      >
        Public Subnet 10.0.1.0/24
      </text>

      {/* ALB box */}
      <rect
        x="160" y="125" width="180" height="60" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-3')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="250" y="162"
        className={cn('blueprint-line', drawing && 'blueprint-draw-3')}
        fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        ALB
      </text>

      {/* Private subnet */}
      <rect
        x="60" y="230" width="380" height="200" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-4')}
        fill="none" strokeWidth="1" strokeDasharray="6 3"
      />
      <text
        x="75" y="252"
        className={cn('blueprint-line', drawing && 'blueprint-draw-4')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7"
      >
        Private Subnet 10.0.2.0/24
      </text>

      {/* ECS Cluster boundary */}
      <rect
        x="80" y="265" width="340" height="100" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-5')}
        fill="none" strokeWidth="1" opacity="0.6"
      />
      <text
        x="95" y="282"
        className={cn('blueprint-line', drawing && 'blueprint-draw-5')}
        fontSize="9" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.6"
      >
        ECS Cluster
      </text>

      {/* ECS Task 1 */}
      <rect
        x="95" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-6')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="140" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-6')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: API
      </text>

      {/* ECS Task 2 */}
      <rect
        x="205" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-7')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="250" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-7')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: Web
      </text>

      {/* ECS Task 3 */}
      <rect
        x="315" y="290" width="90" height="55" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-7')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="360" y="322"
        className={cn('blueprint-line', drawing && 'blueprint-draw-7')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Task: Worker
      </text>

      {/* RDS Database (cylinder approximation) */}
      <ellipse
        cx="250" cy="455" rx="70" ry="14"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fill="none" strokeWidth="1.5"
      />
      <rect
        x="180" y="455" width="140" height="40"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fill="none" strokeWidth="1.5"
        stroke="none"
      />
      <line
        x1="180" y1="455" x2="180" y2="495"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        strokeWidth="1.5"
      />
      <line
        x1="320" y1="455" x2="320" y2="495"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        strokeWidth="1.5"
      />
      <ellipse
        cx="250" cy="495" rx="70" ry="14"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="250" y="480"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        RDS Postgres
      </text>

      {/* Arrow: ALB → ECS */}
      <line
        x1="250" y1="185" x2="250" y2="265"
        className={cn('blueprint-line', drawing && 'blueprint-draw-9')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />

      {/* Arrow: ECS → RDS */}
      <line
        x1="250" y1="365" x2="250" y2="440"
        className={cn('blueprint-line', drawing && 'blueprint-draw-9')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />

      {/* ===== RIGHT SIDE: Application Architecture ===== */}

      {/* API Gateway */}
      <rect
        x="560" y="90" width="160" height="55" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-5')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="640" y="123"
        className={cn('blueprint-line', drawing && 'blueprint-draw-5')}
        fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        API Gateway
      </text>

      {/* Auth service */}
      <rect
        x="540" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="590" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Auth
      </text>

      {/* Core service */}
      <rect
        x="660" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="710" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-8')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Core
      </text>

      {/* Search service */}
      <rect
        x="780" y="200" width="100" height="50" rx="3"
        className={cn('blueprint-line', drawing && 'blueprint-draw-10')}
        fill="none" strokeWidth="1.5"
      />
      <text
        x="830" y="230"
        className={cn('blueprint-line', drawing && 'blueprint-draw-10')}
        fontSize="11" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        Search
      </text>

      {/* SQS / Event Bus */}
      <rect
        x="600" y="310" width="200" height="45" rx="4"
        className={cn('blueprint-line', drawing && 'blueprint-draw-10')}
        fill="none" strokeWidth="1" strokeDasharray="4 2"
      />
      <text
        x="700" y="338"
        className={cn('blueprint-line', drawing && 'blueprint-draw-10')}
        fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle"
      >
        SQS / EventBridge
      </text>

      {/* Arrows: API Gateway → services */}
      <line
        x1="600" y1="145" x2="590" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-9')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      <line
        x1="640" y1="145" x2="710" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-9')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      <line
        x1="700" y1="145" x2="830" y2="200"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />

      {/* Arrows: services → SQS */}
      <line
        x1="590" y1="250" x2="650" y2="310"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />
      <line
        x1="710" y1="250" x2="700" y2="310"
        className={cn('blueprint-line', drawing && 'blueprint-draw-11')}
        strokeWidth="1" markerEnd="url(#arrowhead)"
      />

      {/* ===== CONNECTING: ECS → API Gateway ===== */}
      <line
        x1="460" y1="155" x2="560" y2="117"
        className={cn('blueprint-line', drawing && 'blueprint-draw-12')}
        strokeWidth="1.5" strokeDasharray="8 4" markerEnd="url(#arrowhead)"
      />

      {/* Arrowhead marker definition */}
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
