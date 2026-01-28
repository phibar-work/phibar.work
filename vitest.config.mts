import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',

      include: ['src/utilities/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],

      exclude: [
        // Test files
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/__snapshots__/**',
        'src/test/**',

        // Next.js app routes
        'src/app/**',

        // Payload CMS
        'src/payload/**',
        'src/migrations/**',
        'src/payload.config.ts',
        'src/payload-types.ts',
        'src/components/admin/**',

        // Generated files
        '**/*.d.ts',
        'src/cssVariables.js',
      ],

      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },

      all: true,
      clean: true,
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
