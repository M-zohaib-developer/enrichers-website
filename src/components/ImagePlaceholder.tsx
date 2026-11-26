import React from 'react'

const BLUE_BG = '#DFF3FD'
const BLUE_EDGE = '#8ECBEE'
const BLUE_INK = '#0B4E7D'

export const ImagePlaceholder: React.FC<{
  compact?: boolean
  hint?: string
  maxHeight?: number
  maxWidth?: number
  ratio?: number
  size?: string
}> = ({ compact, hint, maxHeight = 220, maxWidth = 340, ratio = 1.5, size }) => (
  <div
    style={{
      alignItems: 'center',
      aspectRatio: ratio,
      background: BLUE_BG,
      border: `1px dashed ${BLUE_EDGE}`,
      borderRadius: 6,
      color: BLUE_INK,
      containerType: 'inline-size',
      display: 'flex',
      flexDirection: 'column',
      gap: '4%',
      justifyContent: 'center',
      maxHeight,
      maxWidth,
      padding: '4%',
      textAlign: 'center',
      width: '100%',
    }}
  >
    {!compact && size && (
      <div
        style={{
          fontSize: 'clamp(13px, 5cqw, 22px)',
          fontWeight: 700,
          letterSpacing: '0.01em',
          lineHeight: 1.1,
        }}
      >
        {size}
      </div>
    )}
    {!compact && hint && (
      <div style={{ fontSize: 'clamp(10px, 3cqw, 14px)', lineHeight: 1.35, opacity: 0.8 }}>
        {hint}
      </div>
    )}
  </div>
)
