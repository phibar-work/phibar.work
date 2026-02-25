'use client'

import type React from 'react'

import { FrameBottomBar } from './FrameBottomBar'
import { FrameTopBar } from './FrameTopBar'

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="frame">
      <FrameTopBar />

      <div className="frame-scroll" data-frame-scroll>
        {children}
      </div>

      <FrameBottomBar />
    </div>
  )
}
