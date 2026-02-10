import { runSnapshotTests } from './storybook-snapshots'

// Test the fallback component name when meta.title is undefined
const mockModule = {
  default: {
    // No title property
    component: () => <div>test</div>,
  },
  Default: () => <div>Default story</div>,
}

runSnapshotTests(mockModule as any)

// Also test with explicit name override
runSnapshotTests(mockModule as any, 'CustomName')
