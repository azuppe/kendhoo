import React from 'react'

/** The Kendhoo mark: gabled shelter with a rising diagonal, drawn as one fine line. */
export const Icon: React.FC<{ className?: string; strokeWidth?: number }> = ({
  className = 'h-8 w-8',
  strokeWidth = 1.5,
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Kendhoo Online"
  >
    <path d="M6 22 24 8l18 14" />
    <path d="M13 22v16M35 22v16M9 38h30" />
    <path d="M4 43 44 13" />
  </svg>
)
