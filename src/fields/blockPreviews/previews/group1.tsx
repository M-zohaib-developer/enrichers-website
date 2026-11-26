/**
 * Group 1: Heroes, navigation, text-first, and media-feature blocks.
 * serviceHero · marketHero · knowledgeHero · sectionNavigation · richIntro ·
 * richTextBlock · businessIntro · founderStatement · statsBand · readyWhenYouAre ·
 * splitContentList · imageTextFeature · agricultureFeature · videoTextFeature ·
 * immersiveMediaGallery
 */
import type { BlockPreviewContent } from '@/utilities/getBlockPreviewContent'
import type { PreviewProps } from '../index'

import React from 'react'

import { Bar, Btn, C, Col, Eyebrow, Frame, Heading, ImageBox, ItemImage, Row, TextLine, navyGradient, skyGradient } from '../primitives'

/* ── helpers ──────────────────────────────────────────────────────────────── */

type Slot = { imageUrl?: string; subtitle?: string; title?: string } | null

const slots = (content: BlockPreviewContent | undefined, drawn: number, cap: number): Slot[] => {
  const items = content?.items ?? []
  return items.length ? items.slice(0, cap) : Array.from({ length: drawn }, () => null)
}

/* ── 1. serviceHero ───────────────────────────────────────────────────────── */

export const ServiceHeroPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={navyGradient} padding={0}>
    {/* top nav strip */}
    <div style={{ height: 8, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6, flexShrink: 0 }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ height: 2, width: i === 0 ? 20 : 14, borderRadius: 1, background: 'rgba(255,255,255,0.4)' }} />)}
    </div>
    {/* body: text left, image right — matches the actual 2-col grid layout */}
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 10px', justifyContent: 'center' }}>
        <Eyebrow text={content?.heading ? undefined : 'Trade & Invest'} color="rgba(169,221,248,0.9)" />
        <TextLine color="#ffffff" size={11} text={content?.heading} weight={700} width={72} />
        <Bar color="rgba(255,255,255,0.5)" height={2} width={56} />
        <Bar color="rgba(255,255,255,0.4)" height={2} width={42} />
        <div style={{ marginTop: 2, display: 'flex', gap: 5 }}>
          <Btn color="#ffffff" width={30} />
          <Btn color="rgba(255,255,255,0.15)" width={28} />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: 6 }}>
        <ItemImage src={content?.imageUrl} label="1200×1110" fit="contain" />
      </div>
    </div>
  </Frame>
)

/* ── 2. marketHero ───────────────────────────────────────────────────────── */

export const MarketHeroPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient} padding={0}>
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      {/* left text panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 8, justifyContent: 'center', minWidth: 0 }}>
        <Eyebrow text="Markets" color={C.blue} />
        <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={82} />
        <Bar color={C.muted} height={2} width={78} />
        <Bar color={C.muted} height={2} width={58} />
        <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
          <Btn color={C.navy} width={36} />
          <Btn color="transparent" width={28} />
        </div>
        {/* market badges */}
        <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
          {['Stocks', 'FX', 'ETFs'].map((label) => (
            <div key={label} style={{ padding: '1px 4px', borderRadius: 2, background: C.bluePale, border: `1px solid ${C.blueLight}`, fontSize: 5, color: C.navy, fontWeight: 700 }}>{label}</div>
          ))}
        </div>
      </div>
      {/* right image */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <ItemImage src={content?.imageUrl} label="960×720" />
      </div>
    </div>
  </Frame>
)

/* ── 3. knowledgeHero ────────────────────────────────────────────────────── */

export const KnowledgeHeroPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={navyGradient} padding={0}>
    {/* body: text left (0.9fr), square image right (1.1fr) — matches the actual grid */}
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 10px', justifyContent: 'center' }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', flexShrink: 0 }}>
          {[24, 8, 20].map((w, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 2, height: 2, background: 'rgba(169,221,248,0.5)', borderRadius: '50%' }} />}
              <Bar color="rgba(169,221,248,0.7)" height={2} width={w} />
            </React.Fragment>
          ))}
        </div>
        <TextLine color="#ffffff" size={12} text={content?.heading} weight={700} width={68} />
        <Bar color="rgba(255,255,255,0.4)" height={2} width={84} />
        <Bar color="rgba(255,255,255,0.3)" height={2} width={62} />
      </div>
      <div style={{ flex: 1.1, minWidth: 0, padding: 8 }}>
        <ItemImage src={content?.imageUrl} label="1000×1000" fit="contain" />
      </div>
    </div>
  </Frame>
)

/* ── 4. sectionNavigation ────────────────────────────────────────────────── */

export const SectionNavigationPreview: React.FC<PreviewProps> = ({ content }) => {
  const links = content?.items?.slice(0, 4) ?? []
  const drawn = links.length ? links.length : 4

  return (
    <Frame background={C.white}>
      {/* sticky nav bar */}
      <div style={{ background: C.navy, borderRadius: 3, padding: '5px 8px', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        {Array.from({ length: drawn }, (_, i) => (
          <div
            key={i}
            style={{
              height: 5,
              width: i === 0 ? 28 : 22,
              borderRadius: 1,
              background: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.35)',
              flexShrink: 0,
            }}
          />
        ))}
        <div style={{ marginLeft: 'auto', height: 7, width: 20, borderRadius: 2, background: C.blue, flexShrink: 0 }} />
      </div>
      {/* page content below nav */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '6px 2px', minHeight: 0 }}>
        <Heading width={52} />
        <Bar color={C.muted} height={2} width={84} />
        <Bar color={C.muted} height={2} width={68} />
        <Bar color={C.muted} height={2} width={72} />
      </div>
    </Frame>
  )
}

/* ── 5. richIntro ────────────────────────────────────────────────────────── */

export const RichIntroPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', padding: '4px 10%' }}>
      <Eyebrow color={C.blue} />
      <TextLine color={C.navy} size={13} text={content?.heading} weight={700} width={68} />
      <Bar color={C.muted} height={2} width={90} />
      <Bar color={C.muted} height={2} width={76} />
      <Bar color={C.muted} height={2} width={58} />
      <Btn color={C.navy} width={30} />
    </div>
  </Frame>
)

/* ── 6. richTextBlock ────────────────────────────────────────────────────── */

export const RichTextBlockPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={C.white}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '75%', margin: '0 auto', justifyContent: 'center', width: '75%' }}>
      <TextLine color={C.navy} size={10} text={content?.heading} weight={700} width={72} />
      {[100, 96, 88, 76, 100, 92, 68].map((w, i) => (
        <Bar key={i} color={C.muted} height={2} width={w} />
      ))}
    </div>
  </Frame>
)

/* ── 7. businessIntro ────────────────────────────────────────────────────── */

export const BusinessIntroPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, padding: '4px 8%', justifyContent: 'center' }}>
      <TextLine color={C.navy} size={12} text={content?.heading} weight={700} width={62} />
      <Bar color={C.muted} height={2} width={96} />
      <Bar color={C.muted} height={2} width={88} />
      <Bar color={C.muted} height={2} width={72} />
      <Bar color={C.muted} height={2} width={80} />
    </div>
  </Frame>
)

/* ── 8. founderStatement ─────────────────────────────────────────────────── */

export const FounderStatementPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={C.navy} padding={0}>
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      {/* text panel */}
      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 5, padding: 10, justifyContent: 'center' }}>
        {/* large quote mark */}
        <div style={{ color: C.blue, fontSize: 20, lineHeight: 1, fontWeight: 700, opacity: 0.6 }}>"</div>
        <TextLine color="#ffffff" size={8} text={content?.heading} weight={400} width={94} />
        <Bar color="rgba(255,255,255,0.3)" height={2} width={80} />
        <Bar color="rgba(255,255,255,0.3)" height={2} width={60} />
        <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Bar color={C.blueLight} height={3} width={40} />
          <Bar color="rgba(255,255,255,0.4)" height={2} width={30} />
        </div>
      </div>
      {/* portrait */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <ItemImage src={content?.imageUrl} fit="cover" />
      </div>
    </div>
  </Frame>
)

/* ── 9. statsBand ────────────────────────────────────────────────────────── */

export const StatsBandPreview: React.FC<PreviewProps> = ({ content }) => {
  const stats = slots(content, 4, 4)

  return (
    <Frame background={C.navy}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
        <Eyebrow text={content?.heading ? undefined : 'By the numbers'} color={C.blueLight} />
        <TextLine color="#ffffff" size={10} text={content?.heading} weight={700} width={56} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: 4, marginTop: 4 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <div style={{ color: C.blueLight, fontSize: 13, fontWeight: 800, lineHeight: 1 }}>
                {stat?.title ?? '—'}
              </div>
              <Bar color="rgba(169,221,248,0.5)" height={2} width={70} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ── 10. readyWhenYouAre ─────────────────────────────────────────────────── */

export const ReadyWhenYouArePreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={`linear-gradient(135deg, ${C.navy} 0%, #0b3060 100%)`}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
      <TextLine color="#ffffff" size={12} text={content?.heading} weight={700} width={68} />
      <Bar color="rgba(255,255,255,0.4)" height={2} width={80} />
      <Bar color="rgba(255,255,255,0.4)" height={2} width={60} />
      <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
        <Btn color={C.blue} width={30} />
        <Btn color="rgba(255,255,255,0.15)" width={28} />
      </div>
    </div>
  </Frame>
)

/* ── 11. splitContentList ─────────────────────────────────────────────────── */

export const SplitContentListPreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={C.white}>
    <Row align="flex-start" gap={8} grow>
      {[0, 1].map((col) => (
        <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <TextLine color={C.navy} size={8} text={col === 0 ? content?.heading : content?.subheading} width={72} />
          <Bar color={C.muted} height={2} width={96} />
          <Bar color={C.muted} height={2} width={84} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 6px', marginTop: 3 }}>
            {[86, 68, 92, 74, 78, 60].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                <Bar color={C.navy} height={2} width={w} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Row>
  </Frame>
)

/* ── 12. imageTextFeature ────────────────────────────────────────────────── */

export const ImageTextFeaturePreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={C.white} padding={0}>
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <ItemImage src={content?.imageUrl} label="960×720" fit="cover" />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 10, justifyContent: 'center' }}>
        <Eyebrow color={C.blue} />
        <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={82} />
        <Bar color={C.muted} height={2} width={96} />
        <Bar color={C.muted} height={2} width={80} />
        <Bar color={C.muted} height={2} width={68} />
        {/* highlights */}
        {[72, 64, 58].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: 1, background: C.blue, flexShrink: 0 }} />
            <Bar color={C.navy} height={2} width={w} />
          </div>
        ))}
      </div>
    </div>
  </Frame>
)

/* ── 13. agricultureFeature ──────────────────────────────────────────────── */

export const AgricultureFeaturePreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={`linear-gradient(to bottom, #f0faf4 0%, ${C.white} 100%)`} padding={0}>
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 10, justifyContent: 'center' }}>
        <Eyebrow color="#0e8a7b" />
        <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={80} />
        <Bar color={C.muted} height={2} width={96} />
        <Bar color={C.muted} height={2} width={84} />
        <Bar color={C.muted} height={2} width={70} />
        {/* arrow list */}
        {[68, 60, 52].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ color: '#0e8a7b', fontSize: 6, lineHeight: 1, fontWeight: 700 }}>→</div>
            <Bar color={C.navy} height={2} width={w} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <ItemImage src={content?.imageUrl} label="960×720" fit="cover" />
      </div>
    </div>
  </Frame>
)

/* ── 14. videoTextFeature ────────────────────────────────────────────────── */

export const VideoTextFeaturePreview: React.FC<PreviewProps> = ({ content }) => (
  <Frame background={skyGradient} padding={0}>
    <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 10, justifyContent: 'center' }}>
        <Eyebrow color={C.blue} />
        <TextLine color={C.navy} size={9} text={content?.heading} weight={700} width={80} />
        <Bar color={C.muted} height={2} width={94} />
        <Bar color={C.muted} height={2} width={76} />
      </div>
      {/* video thumbnail with play button */}
      <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
        <ItemImage src={content?.imageUrl} label="1280×720" fit="cover" />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,31,61,0.3)',
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${C.navy}`, marginLeft: 2 }} />
          </div>
        </div>
      </div>
    </div>
  </Frame>
)

/* ── 15. immersiveMediaGallery ───────────────────────────────────────────── */

export const ImmersiveMediaGalleryPreview: React.FC<PreviewProps> = ({ content }) => {
  const images = slots(content, 3, 3)
  return (
    <Frame background={C.navy} padding={0}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {/* header */}
        <div style={{ padding: '8px 10px 4px', flexShrink: 0 }}>
          <TextLine color="#ffffff" size={9} text={content?.heading} weight={700} width={56} />
        </div>
        {/* image strip */}
        <div style={{ flex: 1, display: 'flex', gap: 2, padding: '0 6px 6px', minHeight: 0 }}>
          {images.map((img, i) => (
            <div key={i} style={{ flex: 1, minWidth: 0, borderRadius: 3, overflow: 'hidden' }}>
              <ItemImage src={img?.imageUrl} fit="cover" />
            </div>
          ))}
        </div>
        {/* dots */}
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center', padding: '0 0 6px', flexShrink: 0 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: i === 1 ? 10 : 4, height: 4, borderRadius: 2, background: i === 1 ? C.blueLight : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>
    </Frame>
  )
}
