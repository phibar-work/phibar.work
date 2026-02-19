'use client'
import React, { useEffect } from 'react'
import { useHeaderTheme } from '@/components/frontend/providers/HeaderTheme'

const PageClient: React.FC<{ heroType?: string | null }> = ({ heroType }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    if (heroType !== 'blueprint') {
      setHeaderTheme('light')
    }
  }, [setHeaderTheme, heroType])
  return <React.Fragment />
}

export default PageClient
