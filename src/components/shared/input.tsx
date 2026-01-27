import type * as React from 'react'
import { cn } from '@/utilities/ui'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded border border-zinc-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
