import React from 'react'

import { cn } from '@/utilities/ui'
import { Icon } from './Icon'

/** Mark plus wordmark. Inherits colour from `currentColor`. */
export const Logo: React.FC<{
  className?: string
  variant?: 'horizontal' | 'stacked'
  showOnline?: boolean
}> = ({ className, variant = 'horizontal', showOnline = true }) => {
  const stacked = variant === 'stacked'

  return (
    <span
      className={cn(
        'inline-flex items-center',
        stacked ? 'flex-col gap-3 text-center' : 'gap-3',
        className,
      )}
    >
      <Icon className={stacked ? 'h-12 w-12' : 'h-9 w-9'} />
      <span className="flex flex-col leading-none">
        <span
          className="font-serif font-medium text-[22px]"
          style={{ letterSpacing: '0.32em', paddingInlineStart: stacked ? '0.32em' : 0 }}
        >
          KENDHOO
        </span>
        {showOnline && (
          <span
            className="mt-1.5 text-[9px] font-medium opacity-70"
            style={{ letterSpacing: '0.55em', paddingInlineStart: stacked ? '0.55em' : 0 }}
          >
            ONLINE
          </span>
        )}
      </span>
    </span>
  )
}
