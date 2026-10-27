import React from 'react'

import { Section } from '@/components/Section'

/**
 * Candidate A token reference page — doc section 3.3 / Phase 2 exit gate.
 * Not a repaint of the real Home block (that is Phase 3). This page exists
 * only so a reviewer can compare typography, colour, container width, and
 * section rhythm against the live demo before bulk repainting begins:
 * https://enrichers-demo.innovidio.com/candidates/a
 */
export default function HomePage() {
  return (
    <>
      <Section tone="light" first>
        <h1 className="font-display text-h1">H1 — Albert Sans, clamp(34–48px) / 300</h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Body copy in Source Sans 3, 17px / 400, line-height 1.6. This paragraph uses the
          muted tone reserved for secondary copy.
        </p>
        <div className="bg-border-subtle mt-10 h-px w-full" />
        <p className="text-caption text-text-muted mt-2">
          Container: --wide-max 1440px plus a responsive gutter (16 → 48px), matching the
          reference. First band = 64px vertical padding.
        </p>
      </Section>

      <Section tone="surface">
        <h2 className="font-display text-h2">H2 — Albert Sans, clamp(28–36px) / 400</h2>
        <p className="text-text-muted mt-2">
          Surface band — the default page background tone.
        </p>
      </Section>

      <Section tone="sunken">
        <h2 className="font-display text-h2">Sunken band</h2>
        <p className="text-text-muted mt-2">Soft band / card tone.</p>
      </Section>

      <Section tone="inverse">
        <h2 className="font-display text-h2">Inverse band</h2>
        <p className="text-text-secondary mt-2">
          Header / footer / dark band tone. The chrome ladder flips automatically here.
        </p>
      </Section>

      <Section tone="light">
        <h2 className="font-display text-h2">Links &amp; accent</h2>
        <p className="mt-2">
          <a href="/admin" className="text-text-link underline underline-offset-4">
            Link colour sample — open admin panel
          </a>
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="bg-accent inline-block h-6 w-6 rounded-sm" />
          <span className="text-body-sm text-text-muted">
            Accent swatch — token --ds-accent, radius-sm 4px
          </span>
        </div>
      </Section>
    </>
  )
}
