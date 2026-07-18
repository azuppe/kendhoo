import React from 'react'

export const TORN_VIEWBOX_W = 400
export const TORN_VIEWBOX_H = 300

export const TornImageDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <filter id="tornImageFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={3} seed={12} result="noise" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={3} result="blurredSource" />
        <feDisplacementMap
          in="blurredSource"
          in2="noise"
          scale={35}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
        <feGaussianBlur in="displaced" stdDeviation={1.5} />
      </filter>
      <mask id="tornImageMask" maskContentUnits="userSpaceOnUse">
        <rect
          x={24}
          y={18}
          width={TORN_VIEWBOX_W - 48}
          height={TORN_VIEWBOX_H - 36}
          fill="white"
          filter="url(#tornImageFilter)"
        />
      </mask>
    </defs>
  </svg>
)

export const TornImage: React.FC<{ src: string; alt?: string; className?: string }> = ({
  src,
  alt,
  className,
}) => (
  <svg
    viewBox={`0 0 ${TORN_VIEWBOX_W} ${TORN_VIEWBOX_H}`}
    className={className || 'w-full h-full'}
    preserveAspectRatio="xMidYMid slice"
  >
    <image
      href={src}
      x={0}
      y={0}
      width={TORN_VIEWBOX_W}
      height={TORN_VIEWBOX_H}
      preserveAspectRatio="xMidYMid slice"
      mask="url(#tornImageMask)"
    >
      {alt ? <title>{alt}</title> : null}
    </image>
  </svg>
)
