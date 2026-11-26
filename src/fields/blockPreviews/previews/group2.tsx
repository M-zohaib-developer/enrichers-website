/**
 * Group 2: Cards, grids, tabs, and product blocks.
 * benefitsGrid · clientServices · serviceOfferings · businessGroupCards ·
 * groupBusinessExplorer · investmentPathCards · productRange · tabbedContent ·
 * platformDownloads · licensingCredentials · marketResearchCards ·
 * researchLibrary · articleList · articleDetail · destinationLocationShowcase
 */
import type { BlockPreviewContent } from '@/utilities/getBlockPreviewContent'
import type { PreviewProps } from '../index'

import React from 'react'

import { Bar, Btn, C, Col, Eyebrow, Frame, Heading, ItemImage, Row, TextLine, skyGradient } from '../primitives'

type Slot = { imageUrl?: string; subtitle?: string; title?: string } | null

const slots = (content: BlockPreviewContent | undefined, drawn: number, cap: number): Slot[] => {
  const items = content?.items ?? []
  return items.length ? items.slice(0, cap) : Array.from({ length: drawn }, () => null)
}

/* Navy card surface used by several blocks */
const NavyCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    background: C.navy, borderRadius: 4, padding: 5,
    display: 'flex', flexDirection: 'column', gap: 3,
    minWidth: 0, overflow: 'hidden', flex: 1,
  }}>
    {children}
  </div>
)

/* ── 16. benefitsGrid ────────────────────────────────────────────────────── */

export const BenefitsGridPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 6, 6)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 3, border: `1px solid ${C.border}`, padding: 4, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: C.bluePale, flexShrink: 0 }} />
            <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={80} />
            <Bar color={C.muted} height={2} width={90} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 17. clientServices ──────────────────────────────────────────────────── */

export const ClientServicesPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 4, 4)
  return (
    <Frame background={C.white}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={60} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: 3, padding: 5, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.bluePale, border: `1px solid ${C.blueLight}`, flexShrink: 0 }} />
            <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={82} />
            <Bar color={C.muted} height={2} width={90} />
            <Bar color={C.muted} height={2} width={70} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 18. serviceOfferings ────────────────────────────────────────────────── */

export const ServiceOfferingsPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={58} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, background: C.white, borderRadius: 4, border: `1px solid ${C.border}`, padding: 6, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <TextLine color={C.navy} size={7} text={item?.title} weight={700} width={80} />
            <Bar color={C.muted} height={2} width={96} />
            <Bar color={C.muted} height={2} width={78} />
            <Bar color={C.blue} height={2} width={40} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 19. businessGroupCards ──────────────────────────────────────────────── */

export const BusinessGroupCardsPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 3, 3)
  return (
    <Frame background={C.navy}>
      <Eyebrow color={C.blueLight} />
      <TextLine color="#ffffff" size={10} text={content?.heading} weight={700} width={62} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 4, border: `1px solid rgba(255,255,255,0.15)`, padding: 6, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(169,221,248,0.25)', border: `1px solid rgba(169,221,248,0.4)`, flexShrink: 0 }} />
            <TextLine color="#ffffff" size={7} text={item?.title} weight={600} width={80} />
            <Bar color="rgba(255,255,255,0.3)" height={2} width={90} />
            <Bar color="rgba(255,255,255,0.3)" height={2} width={68} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 20. groupBusinessExplorer ───────────────────────────────────────────── */

export const GroupBusinessExplorerPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 4, 4)
  return (
    <Frame background={C.white} padding={0}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* sidebar tabs */}
        <div style={{ width: '28%', background: C.surface, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              padding: '3px 5px', borderRadius: 3, background: i === 0 ? C.navy : 'transparent',
              border: `1px solid ${i === 0 ? C.navy : 'transparent'}`,
            }}>
              <Bar color={i === 0 ? '#ffffff' : C.navy} height={2} width={i === 0 ? 80 : 60} />
            </div>
          ))}
        </div>
        {/* content panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 8, minWidth: 0 }}>
          <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={72} />
          <Bar color={C.muted} height={2} width={94} />
          <Bar color={C.muted} height={2} width={78} />
          <Bar color={C.muted} height={2} width={62} />
          <Btn color={C.navy} width={30} />
        </div>
      </div>
    </Frame>
  )
}

/* ── 21. investmentPathCards ─────────────────────────────────────────────── */

export const InvestmentPathCardsPreview: React.FC<PreviewProps> = ({ content }) => {
  const cards = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={62} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {cards.map((card, i) => (
          <NavyCard key={i}>
            <Eyebrow color={C.blueLight} />
            <TextLine color="#ffffff" size={7} text={card?.title} weight={700} width={82} />
            <Bar color="rgba(255,255,255,0.3)" height={2} width={96} />
            <Bar color="rgba(255,255,255,0.3)" height={2} width={72} />
            <div style={{ marginTop: 2, height: 6, width: '30%', borderRadius: 2, background: C.blue, flexShrink: 0 }} />
          </NavyCard>
        ))}
      </div>
    </Frame>
  )
}

/* ── 22. productRange ────────────────────────────────────────────────────── */

export const ProductRangePreview: React.FC<PreviewProps> = ({ content }) => {
  const tabs = slots(content, 4, 4)
  return (
    <Frame background={C.white}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      {/* tab strip */}
      <div style={{ display: 'flex', gap: 2, padding: '2px 0', borderBottom: `2px solid ${C.border}`, flexShrink: 0 }}>
        {tabs.map((tab, i) => (
          <div key={i} style={{
            padding: '2px 6px', borderRadius: '2px 2px 0 0',
            background: i === 0 ? C.navy : 'transparent',
            borderBottom: i === 0 ? `2px solid ${C.navy}` : 'none',
            marginBottom: i === 0 ? -2 : 0,
          }}>
            <Bar color={i === 0 ? '#ffffff' : C.navy} height={2} width={i === 0 ? 36 : 28} />
          </div>
        ))}
      </div>
      {/* feature table */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        {[88, 76, 68, 80, 60].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '1px 0', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: i % 2 === 0 ? '#07806a' : C.border, flexShrink: 0 }} />
            <Bar color={C.navy} height={2} width={w} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 23. tabbedContent ───────────────────────────────────────────────────── */

export const TabbedContentPreview: React.FC<PreviewProps> = ({ content }) => {
  const tabs = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={60} />
      {/* tab bar */}
      <div style={{ display: 'flex', gap: 3, borderBottom: `1px solid ${C.border}`, paddingBottom: 3, flexShrink: 0 }}>
        {tabs.map((tab, i) => (
          <div key={i} style={{ padding: '2px 6px', borderRadius: 3, background: i === 0 ? C.bluePale : 'transparent', border: `1px solid ${i === 0 ? C.blue : 'transparent'}` }}>
            <Bar color={i === 0 ? C.blue : C.muted} height={2} width={i === 0 ? 42 : 32} />
          </div>
        ))}
      </div>
      {/* tab body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minHeight: 0 }}>
        <Bar color={C.muted} height={2} width={96} />
        <Bar color={C.muted} height={2} width={84} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, flex: 1, minHeight: 0 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ background: C.white, borderRadius: 3, border: `1px solid ${C.border}`, padding: 4 }}>
              <Bar color={C.navy} height={3} width={72} />
              <div style={{ marginTop: 3 }}><Bar color={C.muted} height={2} width={90} /></div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ── 24. platformDownloads ───────────────────────────────────────────────── */

export const PlatformDownloadsPreview: React.FC<PreviewProps> = ({ content }) => {
  const platforms = slots(content, 3, 3)
  return (
    <Frame background={C.navy}>
      <Eyebrow color={C.blueLight} />
      <TextLine color="#ffffff" size={10} text={content?.heading} weight={700} width={60} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {platforms.map((p, i) => (
          <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 4, border: `1px solid rgba(255,255,255,0.15)`, padding: 5, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', minWidth: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
              {p?.imageUrl
                ? <img src={p.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                : <div style={{ width: '100%', height: '100%', background: C.blue }} />
              }
            </div>
            <Bar color="rgba(255,255,255,0.7)" height={2} width={80} />
            <div style={{ height: 6, width: '70%', borderRadius: 2, background: C.blue, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 25. licensingCredentials ────────────────────────────────────────────── */

export const LicensingCredentialsPreview: React.FC<PreviewProps> = ({ content }) => {
  const items = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={62} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, background: C.white, borderRadius: 4, border: `1px solid ${C.border}`, padding: 6, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            {/* credential badge */}
            <div style={{ height: 16, borderRadius: 3, background: C.bluePale, border: `1px solid ${C.blueLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bar color={C.blue} height={3} width={60} />
            </div>
            <TextLine color={C.navy} size={6} text={item?.title} weight={700} width={82} />
            <Bar color={C.muted} height={2} width={94} />
            <Bar color={C.muted} height={2} width={72} />
            <Bar color={C.blue} height={2} width={40} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 26. marketResearchCards ─────────────────────────────────────────────── */

export const MarketResearchCardsPreview: React.FC<PreviewProps> = ({ content }) => {
  const cards = slots(content, 3, 3)
  return (
    <Frame background={C.white}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      <div style={{ display: 'flex', gap: 4, flex: 1, minHeight: 0 }}>
        {cards.map((card, i) => (
          <div key={i} style={{ flex: 1, background: C.surface, borderRadius: 4, overflow: 'hidden', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ height: '45%', flexShrink: 0 }}>
              <ItemImage src={card?.imageUrl} fit="cover" radius={0} />
            </div>
            <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Bar color={C.blue} height={2} width={40} />
              <TextLine color={C.navy} size={6} text={card?.title} weight={600} width={86} />
              <Bar color={C.muted} height={2} width={72} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 27. researchLibrary ─────────────────────────────────────────────────── */

export const ResearchLibraryPreview: React.FC<PreviewProps> = ({ content }) => {
  const notes = slots(content, 3, 3)
  return (
    <Frame background={skyGradient}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minHeight: 0 }}>
        {notes.map((note, i) => (
          <div key={i} style={{ display: 'flex', gap: 5, background: C.white, borderRadius: 3, padding: 4, border: `1px solid ${C.border}`, alignItems: 'center', flex: 1, minHeight: 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: 2, flexShrink: 0, overflow: 'hidden' }}>
              <ItemImage src={note?.imageUrl} fit="cover" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <Bar color={C.blue} height={2} width={32} />
              <TextLine color={C.navy} size={6} text={note?.title} weight={600} width={82} />
              <Bar color={C.muted} height={2} width={68} />
            </div>
            <div style={{ width: 14, height: 14, borderRadius: 2, background: C.bluePale, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 5, height: 6, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `5px solid ${C.blue}`, marginLeft: 1 }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 28. articleList ─────────────────────────────────────────────────────── */

export const ArticleListPreview: React.FC<PreviewProps> = ({ content }) => {
  const articles = slots(content, 3, 3)
  return (
    <Frame background={C.white}>
      <Row>
        <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={56} />
        <div style={{ marginLeft: 'auto', height: 5, width: 24, borderRadius: 2, background: C.blue, flexShrink: 0 }} />
      </Row>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minHeight: 0 }}>
        {articles.map((article, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, padding: '3px 0', borderBottom: `1px solid ${C.borderSubtle}`, alignItems: 'center', flex: 1, minHeight: 0 }}>
            <div style={{ width: '28%', borderRadius: 2, overflow: 'hidden', flexShrink: 0, aspectRatio: '16/9' }}>
              <ItemImage src={article?.imageUrl} fit="cover" radius={2} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <Bar color={C.blue} height={2} width={28} />
              <TextLine color={C.navy} size={6} text={article?.title} weight={600} width={86} />
              <Bar color={C.muted} height={2} width={72} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── 29. articleDetail ───────────────────────────────────────────────────── */

export const ArticleDetailPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient} padding={0}>
    {/* body: article text left (8/12 cols), image+meta sidebar right (4/12) */}
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3, padding: 10 }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', flexShrink: 0 }}>
          <Bar color={C.blue} height={2} width={20} />
          <Bar color={C.muted} height={2} width={3} />
          <Bar color={C.muted} height={2} width={18} />
        </div>
        <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={80} />
        <Bar color={C.muted} height={2} width={96} />
        <Bar color={C.muted} height={2} width={88} />
        <Bar color={C.muted} height={2} width={72} />
        <Bar color={C.muted} height={2} width={84} />
        <Bar color={C.muted} height={2} width={68} />
      </div>
      {/* sidebar: image + metadata */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 8px 10px 4px', minWidth: 0 }}>
        <div style={{ borderRadius: 3, overflow: 'hidden', flexShrink: 0, aspectRatio: '4/3' }}>
          <ItemImage src={content?.imageUrl} label="800×600" fit="cover" radius={3} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 4, padding: '2px 0', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <Bar color={C.muted} height={2} width={40} />
            <Bar color={C.navy} height={2} width={40} />
          </div>
        ))}
      </div>
    </div>
  </Frame>
)

/* ── 30. destinationLocationShowcase ─────────────────────────────────────── */

export const DestinationLocationShowcasePreview: React.FC<PreviewProps> = ({ content }) => {
  const attractions = slots(content, 3, 3)
  return (
    <Frame background={skyGradient} padding={0}>
      <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
        {/* hero image side */}
        <div style={{ flex: 1.2, minWidth: 0, position: 'relative' }}>
          <ItemImage src={content?.imageUrl} fit="cover" label="960×1200" />
          <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6 }}>
            <div style={{ background: 'rgba(10,31,61,0.75)', borderRadius: 3, padding: 4 }}>
              <Bar color="#ffffff" height={3} width={72} />
              <div style={{ marginTop: 2 }}><Bar color="rgba(255,255,255,0.5)" height={2} width={56} /></div>
            </div>
          </div>
        </div>
        {/* attractions panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, padding: 8, minWidth: 0 }}>
          <TextLine color={C.navy} size={8} text={content?.heading} weight={700} width={82} />
          {attractions.map((att, i) => (
            <div key={i} style={{ display: 'flex', gap: 3, background: C.white, borderRadius: 3, padding: 3, border: `1px solid ${C.border}` }}>
              <div style={{ width: 20, height: 20, borderRadius: 2, flexShrink: 0, overflow: 'hidden' }}>
                <ItemImage src={att?.imageUrl} fit="cover" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextLine color={C.navy} size={6} text={att?.title} weight={600} width={80} />
                <Bar color={C.muted} height={2} width={68} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}
