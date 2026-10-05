'use client'

import type React from 'react'

import { FrameBottomBar } from './FrameBottomBar'
import { FrameTopBar } from './FrameTopBar'

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Content: normal document flow, body scrolls → iOS Safari auto-hides chrome */}
      <div className="frame-content">{children}</div>

      {/* Fixed overlay: frame border + nav + CTA — pointer-events pass through */}
      <div className="frame-overlay">
        <FrameTopBar />
        <FrameBottomBar />
      </div>
    </>
  )
}
