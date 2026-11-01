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
          className="font-sans font-black text-[22px]"
          style={{ letterSpacing: '-0.03em' }}
        >
          KENDHOO
        </span>
        {showOnline && (
          <span
            className="mt-1 text-[9px] font-bold"
            style={{ letterSpacing: '0.2em' }}
          >
            ONLINE
          </span>
        )}
      </span>
    </span>
  )
}
