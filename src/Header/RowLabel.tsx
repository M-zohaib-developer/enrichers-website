'use client'

import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

export function RowLabel() {
  const { data } = useRowLabel<{ link?: { label?: string } }>()
  return <span>{data?.link?.label || 'Link'}</span>
}
