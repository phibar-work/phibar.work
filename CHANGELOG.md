# phibar-work

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
