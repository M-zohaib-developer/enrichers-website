'use client'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { useField } from '@payloadcms/ui'
import React from 'react'

export const ImageGuide: React.FC<{
  description?: unknown
  field?: { admin?: { description?: unknown } }
  hint?: string
  path?: string
  ratio?: number
  size: string
}> = ({ description, field, hint, path, ratio, size }) => {
  const { value } = useField<unknown>({ path })

  const note =
    typeof description === 'string'
      ? description
      : typeof field?.admin?.description === 'string'
        ? field.admin.description
        : undefined

  return (
    <div className="field-description" style={{ display: 'block' }}>
      {!value ? (
        <div style={{ display: 'block', marginBottom: 8 }}>
          <ImagePlaceholder hint={hint} ratio={ratio} size={size} />
        </div>
      ) : (
        <div style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 600, color: '#0B4E7D' }}>
          {size}{hint ? ` · ${hint}` : ''}
        </div>
      )}
      {note && <div style={{ display: 'block' }}>{note}</div>}
    </div>
  )
}
