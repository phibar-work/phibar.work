import clsx from 'clsx'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'eager'
  const priority = priorityFromProps || 'high'

  return (
    /* eslint-disable @next/next/no-img-element */
    // biome-ignore lint/performance/noImgElement: SVG element, Next.js Image not suitable
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src="/payload-logo-light.svg"
    />
  )
}
