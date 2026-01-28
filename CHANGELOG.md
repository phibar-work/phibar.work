# phibar-work

## 1.7.0

### Minor Changes

- Add Storybook with design system primitives and colocated tests

  - Rename `shared/` to `design-system/primitives/` and update all imports
  - Add colocated `.stories.tsx` for all 8 primitives (Button, Card, Checkbox, Input, Label, Pagination, Select, Textarea)
  - Configure Storybook preview with Tailwind CSS and light/dark theme toggle
  - Add design system Introduction.mdx landing page
  - Remove template example stories and separate test directory
  - Add colocated unit tests for 7 utility modules (41 tests)
  - Restructure vitest into named `unit` and `storybook` projects
  - Update CI to run unit and storybook tests as parallel jobs

## 1.6.0

### Minor Changes

- Integrate Rybbit analytics with ad blocker bypass

  - Add Rybbit tracking script to frontend layout via Next.js Script component
  - Add Next.js rewrites to proxy script, tracking, and site config endpoints through own domain
  - Configure site ID and host via environment variables

## 1.5.0

### Minor Changes

- Add hero and sections system to Pages, replacing single content richText field with a configurable hero (none or banner) and an array of sections with scroll-anchored IDs

## 1.4.1

### Patch Changes

- Add Biome lint rules for `complexity/useDateNow` and `performance/noImgElement`

## 1.4.0

### Minor Changes

- Upgrade Tailwind CSS to v4

  - Upgrade tailwindcss to v4.1.18
  - Add @tailwindcss/postcss for PostCSS integration
  - Remove tailwind.config.mjs (config now in CSS)
  - Update globals.css with @custom-variant for dark mode
  - Migrate theme system from data-theme attribute to .dark class
  - Update all UI components to use Tailwind default oklch colors
  - Add @tailwindcss/typography plugin via CSS

## 1.3.1

### Patch Changes

- Fix theme auto mode to react to system preference changes at runtime

## 1.3.0

### Minor Changes

- Update dependencies to latest versions

  - @biomejs/biome: 1.9.4 → 2.3.12 (migrated config)
  - @aws-sdk/client-s3: 3.968.0 → 3.975.0
  - @playwright/test: 1.56.1 → 1.58.0
  - @types/node: 22.5.4 → 25.0.10
  - @vitejs/plugin-react: 4.5.2 → 5.1.2
  - cross-env: 7.0.3 → 10.1.0
  - dotenv: 16.4.7 → 17.2.3
  - jsdom: 26.1.0 → 27.4.0
  - lucide-react: 0.378.0 → 0.563.0
  - react-hook-form: 7.45.4 → 7.71.1
  - sharp: 0.34.2 → 0.34.5
  - tailwind-merge: 2.6.0 → 3.4.0
  - typescript: 5.7.3 → 5.9.3
  - vite-tsconfig-paths: 5.1.4 → 6.0.5
  - vitest: 3.2.3 → 4.0.18

## 1.2.0

### Minor Changes

- Update to Next.js 16

  - Fix revalidateTag for Next.js 16 compatibility
  - Fix linter warnings
  - Add GitHub Actions lint workflow for PRs

## 1.1.0

### Minor Changes

- baf0c40: - Replace ESLint and Prettier with Biome for faster linting and formatting
  - Add changesets for automated versioning and changelog generation
