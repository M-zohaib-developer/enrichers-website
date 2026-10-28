'use client'

import React, { useState } from 'react'

import { ShieldIcon } from '@/components/Icon'

/**
 * Regulatory strip above the header, as on the reference. It scrolls away with
 * the page (it sits outside the sticky <header>). On mobile the message is
 * clamped to one line with a "More" toggle; from 768px it shows in full.
 */
export function RiskNotice({ lead, body }: { lead?: string | null; body: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-border-subtle bg-surface-sunken text-caption text-text-secondary">
      <div className="container-wide flex items-start gap-3 py-2">
        <ShieldIcon className="mt-0.5 shrink-0 text-text-muted" />
        <p className={`flex-1 md:line-clamp-none ${expanded ? '' : 'line-clamp-1'}`}>
          {lead ? <span className="font-semibold text-text">{lead}</span> : null} {body}
        </p>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 font-semibold text-text-link md:hidden"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>
    </div>
  )
}
