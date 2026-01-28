// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

// Mock window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Setup Storybook project annotations for portable stories (snapshot tests)
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react'
import * as projectAnnotations from './.storybook/preview'

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
