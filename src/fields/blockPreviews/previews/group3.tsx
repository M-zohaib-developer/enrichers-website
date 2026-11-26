/**
 * Group 3: Steps, accordions, teams, contact, and hospitality blocks.
 * processSteps · accountOpeningSteps · requirementsChecklist · guideAccordion ·
 * faqAccordion · accountFaq · consultationQualifier · consultationShowcase ·
 * contactDetails · teamGrid · teamMemberProfile · focusAreasGrid ·
 * hospitalityExperienceGrid · skarduHotelFeature
 */
import type { BlockPreviewContent } from '@/utilities/getBlockPreviewContent'
import type { PreviewProps } from '../index'

import React from 'react'

import { Bar, Btn, C, Eyebrow, Frame, ItemImage, Row, TextLine, navyGradient, skyGradient } from '../primitives'

type Slot = { imageUrl?: string; subtitle?: string; title?: string } | null

const slots = (content: BlockPreviewContent | undefined, drawn: number, cap: number): Slot[] => {
  const items = content?.items ?? []
  return items.length ? items.slice(0, cap) : Array.from({ length: drawn }, () => null)
}

/* Numbered step circle */
const NumCircle: React.FC<{ n: number; active?: boolean }> = ({ n, active }) => (
  <div style={{
    width: 14, height: 14, borderRadius: '50%',
    background: active ? C.navy : C.bluePale,
    border: `1.5px solid ${active ? C.navy : C.blueLight}`,
    color: active ? '#ffffff' : C.navy,
    fontSize: 7, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    {n}
  </div>
)

/* Accordion-style row */
const AccordionRow: React.FC<{ title?: string; open?: boolean }> = ({ title, open }) => (
  <div style={{
    background: open ? C.blueFaint : C.white,
    border: `1px solid ${open ? C.blueLight : C.border}`,
    borderRadius: 3, padding: '4px 6px',
    display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <TextLine color={C.navy} size={6} text={title} weight={600} width={80} />
    </div>
    <div style={{ width: 7, height: 7, borderRadius: 1, background: open ? C.navy : C.border, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 0, height: 0, borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderTop: open ? `3px solid #fff` : `3px solid ${C.muted}` }} />
    </div>
  </div>
)

/* ── 31. processSteps ────────────────────────────────────────────────────── */

export const ProcessStepsPreview: React.FC<PreviewProps> = ({ content }) => {
  const steps = slots(content, 4, 4)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={60} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 4, flex: 1, minHeight: 0, paddingTop: 2 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <NumCircle n={i + 1} active={i === 0} />
            <TextLine color={C.navy} size={6} text={step?.title} weight={600} width={80} />
            <Bar color={C.muted} height={2} width={90} />
            <Bar color={C.muted} height={2} width={72} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 32. accountOpeningSteps ─────────────────────────────────────────────── */

export const AccountOpeningStepsPreview: React.FC<PreviewProps> = ({ content }) => {
  const steps = slots(content, 4, 4)
  return (
    <Frame background={C.navy}>
      <Eyebrow color={C.blueLight} />
      <TextLine color="#ffffff" size={10} text={content?.heading} weight={700} width={68} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 4, flex: 1, minHeight: 0, alignItems: 'start', paddingTop: 4 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative' }}>
            {/* connector line */}
            {i < steps.length - 1 && (
              <div style={{ position: 'absolute', top: 7, left: '50%', width: '100%', height: 1, background: 'rgba(169,221,248,0.3)', zIndex: 0 }} />
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <NumCircle n={i + 1} />
            </div>
            <TextLine color="#ffffff" size={6} text={step?.title} weight={600} width={82} />
            <Bar color="rgba(255,255,255,0.3)" height={2} width={90} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 33. requirementsChecklist ───────────────────────────────────────────── */

export const RequirementsChecklistPreview: React.FC<PreviewProps> = ({ content }) => {
  const groups = slots(content, 2, 2)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={60} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1, minHeight: 0 }}>
        {groups.map((group, g) => (
          <div key={g} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextLine color={C.navy} size={7} text={group?.title} weight={700} width={72} />
            {[80, 68, 76, 60].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: 1, background: C.bluePale, border: `1px solid ${C.blueLight}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 3, height: 2, borderLeft: `1.5px solid ${C.blue}`, borderBottom: `1.5px solid ${C.blue}`, transform: 'rotate(-45deg)', marginTop: -1 }} />
                </div>
                <Bar color={C.navy} height={2} width={w} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 34. guideAccordion ──────────────────────────────────────────────────── */

export const GuideAccordionPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 4, 4)
  return (
    <Frame background={C.white}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={62} />
      <Bar color={C.muted} height={2} width={80} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        {items.map((item, i) => (
          <AccordionRow key={i} title={item?.title} open={i === 0} />
        ))}
      </div>
    </Frame>
  )
}

/* ── 35. faqAccordion ────────────────────────────────────────────────────── */

export const FaqAccordionPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 4, 4)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        {items.map((item, i) => (
          <AccordionRow key={i} title={item?.title} open={i === 1} />
        ))}
      </div>
    </Frame>
  )
}

/* ── 36. accountFaq ──────────────────────────────────────────────────────── */

export const AccountFaqPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={C.white} padding={0}>
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* category sidebar */}
      <div style={{ width: '30%', background: C.surface, borderRight: `1px solid ${C.border}`, padding: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextLine color={C.navy} size={6} text={content?.heading} weight={700} width={82} />
        {['Accounts', 'Trading', 'Docs', 'Fees'].map((cat, i) => (
          <div key={i} style={{ padding: '2px 4px', borderRadius: 2, background: i === 0 ? C.navy : 'transparent' }}>
            <Bar color={i === 0 ? '#ffffff' : C.navy} height={2} width={i === 0 ? 86 : 70} />
          </div>
        ))}
      </div>
      {/* faq items */}
      <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <AccordionRow key={i} open={i === 0} />
        ))}
      </div>
    </div>
  </Frame>
)

/* ── 37. consultationQualifier ───────────────────────────────────────────── */

export const ConsultationQualifierPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient}>
    <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
      {/* left form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <Eyebrow color={C.blue} />
        <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={82} />
        <Bar color={C.muted} height={2} width={70} />
        {/* form fields */}
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Bar color={C.navy} height={2} width={i ? 42 : 28} />
            <div style={{ height: 8, borderRadius: 2, background: C.white, border: `1px solid ${C.border}` }} />
          </div>
        ))}
        <div style={{ height: 8, width: '45%', borderRadius: 2, background: C.navy, flexShrink: 0 }} />
      </div>
      {/* right contact */}
      <div style={{ width: '36%', background: C.navy, borderRadius: 4, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', flexShrink: 0 }}>
        <Bar color="rgba(255,255,255,0.7)" height={2} width={80} />
        {[['📞', 44], ['💬', 52], ['🕐', 36]].map(([icon, w], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(169,221,248,0.2)', flexShrink: 0 }} />
            <Bar color="rgba(255,255,255,0.6)" height={2} width={w as number} />
          </div>
        ))}
      </div>
    </div>
  </Frame>
)

/* ── 38. consultationShowcase ────────────────────────────────────────────── */

export const ConsultationShowcasePreview: React.FC<PreviewProps> = ({ content }) => {
  const images = slots(content, 2, 2)
  return (
    <Frame background={skyGradient} padding={0}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* form side */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 10, minWidth: 0 }}>
          <Eyebrow color={C.blue} />
          <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={82} />
          <Bar color={C.muted} height={2} width={72} />
          {[0, 1].map((i) => (
            <div key={i} style={{ height: 8, borderRadius: 2, background: C.white, border: `1px solid ${C.border}` }} />
          ))}
          <div style={{ height: 8, width: '50%', borderRadius: 2, background: C.navy, flexShrink: 0 }} />
        </div>
        {/* image stack */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {images.map((img, i) => (
            <div key={i} style={{ flex: 1, minHeight: 0 }}>
              <ItemImage src={img?.imageUrl} fit="cover" radius={0} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ── 39. contactDetails ──────────────────────────────────────────────────── */

export const ContactDetailsPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      {/* channels */}
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, background: C.white, borderRadius: 3, border: `1px solid ${C.border}`, padding: 5, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.bluePale, border: `1px solid ${C.blueLight}`, flexShrink: 0 }} />
            <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={80} />
            <Bar color={C.muted} height={2} width={72} />
          </div>
        ))}
      </div>
      {/* office map stub */}
      <div style={{ flex: 1, background: C.bluePale, borderRadius: 3, border: `1px solid ${C.blueLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 10, height: 12, background: C.blue, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }} />
          <Bar color={C.navy} height={2} width={40} />
        </div>
      </div>
    </Frame>
  )
}

/* ── 40. teamGrid ────────────────────────────────────────────────────────── */

export const TeamGridPreview: React.FC<PreviewProps> = ({ content }) => {
  const members = slots(content, 6, 6)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={54} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, flex: 1, minHeight: 0 }}>
        {members.map((member, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <ItemImage src={member?.imageUrl} fit="cover" />
            </div>
            <TextLine color={C.navy} size={5} text={member?.title} weight={700} width={82} />
            <Bar color={C.muted} height={2} width={68} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 41. teamMemberProfile ───────────────────────────────────────────────── */

export const TeamMemberProfilePreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient}>
    <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
      {/* profile photo */}
      <div style={{ width: '36%', borderRadius: 4, overflow: 'hidden', flexShrink: 0, aspectRatio: '3/4' }}>
        <ItemImage src={content?.imageUrl} fit="cover" />
      </div>
      {/* details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <Eyebrow color={C.blue} />
        <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={82} />
        <Bar color={C.muted} height={2} width={56} />
        <Bar color={C.border} height={1} width={100} />
        {[96, 84, 90, 72, 80].map((w, i) => (
          <Bar key={i} color={C.muted} height={2} width={w} />
        ))}
        <Btn color={C.navy} width={42} />
      </div>
    </div>
  </Frame>
)

/* ── 42. focusAreasGrid ──────────────────────────────────────────────────── */

export const FocusAreasGridPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 4, 4)
  return (
    <Frame background={C.white}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderRadius: 4, overflow: 'hidden', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ height: '55%', flexShrink: 0 }}>
              <ItemImage src={item?.imageUrl} fit="cover" radius={0} />
            </div>
            <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={80} />
              <Bar color={C.muted} height={2} width={90} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 43. hospitalityExperienceGrid ───────────────────────────────────────── */

export const HospitalityExperienceGridPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 3, 3)
  return (
    <Frame background={`linear-gradient(to bottom, #fdf6ee 0%, ${C.white} 100%)`}>
      <Eyebrow color="#9a5b00" />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={62} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 4, overflow: 'hidden', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ flex: 1.4, minHeight: 0 }}>
              <ItemImage src={item?.imageUrl} fit="cover" radius={0} />
            </div>
            <div style={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={80} />
              <Bar color={C.muted} height={2} width={90} />
              <Bar color={C.muted} height={2} width={68} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 44. skarduHotelFeature ──────────────────────────────────────────────── */

export const SkarduHotelFeaturePreview: React.FC<PreviewProps> = ({ content }) => {
  const facts = slots(content, 4, 4)
  return (
    <Frame background="linear-gradient(to bottom, #e8f4f0 0%, #ffffff 100%)" padding={0}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* image */}
        <div style={{ flex: 1.2, minWidth: 0 }}>
          <ItemImage src={content?.imageUrl} fit="cover" label="1200×900" radius={0} />
        </div>
        {/* facts panel */}
        <div style={{ flex: 1, background: C.navy, display: 'flex', flexDirection: 'column', gap: 4, padding: 10, justifyContent: 'center', minWidth: 0 }}>
          <Eyebrow color={C.blueLight} />
          <TextLine color="#ffffff" size={9} text={content?.heading} weight={700} width={82} />
          <Bar color="rgba(255,255,255,0.3)" height={2} width={96} />
          <Bar color="rgba(255,255,255,0.3)" height={2} width={78} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 2 }}>
            {facts.map((fact, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextLine color={C.blueLight} size={9} text={fact?.title} weight={700} width={80} />
                <Bar color="rgba(255,255,255,0.4)" height={2} width={72} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
