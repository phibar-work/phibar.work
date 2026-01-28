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

        // CMS integrations (better tested via E2E)
        'src/components/frontend/LivePreviewListener/**',
        'src/components/frontend/PayloadRedirects/**',
        'src/components/frontend/layout/AdminBar/**',

        // Server components (data fetching, better tested via E2E)
        'src/components/frontend/layout/Header/index.tsx',
        'src/components/frontend/layout/Footer/index.tsx',

        // Script injection (theme init, better tested via E2E)
        'src/components/frontend/providers/Theme/InitTheme/**',

        // Server-side utilities (Payload CMS data fetching, better tested via E2E)
        'src/utilities/getDocument.ts',
        'src/utilities/getGlobals.ts',
        'src/utilities/getMeUser.ts',
        'src/utilities/getRedirects.ts',
        'src/utilities/generateMeta.ts',

        // Complex hooks with router/DOM dependencies
        'src/utilities/useClickableCard.ts',
        'src/utilities/useDebounce.ts',

        // Browser detection (trivial, no logic to test)
        'src/utilities/canUseDOM.ts',

        // Generated files
        '**/*.d.ts',
        'src/cssVariables.js',
      ],

      thresholds: {
        lines: 80,
        functions: 80,
        branches: 65,
        statements: 80,
      },

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
