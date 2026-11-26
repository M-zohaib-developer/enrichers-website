import type { BlockPreviewContent } from '@/utilities/getBlockPreviewContent'

import React from 'react'

export type PreviewProps = { content?: BlockPreviewContent }

import {
  AgricultureFeaturePreview,
  BusinessIntroPreview,
  FounderStatementPreview,
  ImmersiveMediaGalleryPreview,
  ImageTextFeaturePreview,
  KnowledgeHeroPreview,
  MarketHeroPreview,
  ReadyWhenYouArePreview,
  RichIntroPreview,
  RichTextBlockPreview,
  SectionNavigationPreview,
  ServiceHeroPreview,
  SplitContentListPreview,
  StatsBandPreview,
  VideoTextFeaturePreview,
} from './previews/group1'

import {
  ArticleDetailPreview,
  ArticleListPreview,
  BenefitsGridPreview,
  BusinessGroupCardsPreview,
  ClientServicesPreview,
  DestinationLocationShowcasePreview,
  GroupBusinessExplorerPreview,
  InvestmentPathCardsPreview,
  LicensingCredentialsPreview,
  MarketResearchCardsPreview,
  PlatformDownloadsPreview,
  ProductRangePreview,
  ResearchLibraryPreview,
  ServiceOfferingsPreview,
  TabbedContentPreview,
} from './previews/group2'

import {
  AccountFaqPreview,
  AccountOpeningStepsPreview,
  ConsultationQualifierPreview,
  ConsultationShowcasePreview,
  ContactDetailsPreview,
  FaqAccordionPreview,
  FocusAreasGridPreview,
  GuideAccordionPreview,
  HospitalityExperienceGridPreview,
  ProcessStepsPreview,
  RequirementsChecklistPreview,
  SkarduHotelFeaturePreview,
  TeamGridPreview,
  TeamMemberProfilePreview,
} from './previews/group3'

export type BlockShape = {
  hasArray?: boolean
  hasImage?: boolean
  hasRichText?: boolean
}

/**
 * Slug → preview component, one per block.
 * Keys match the real `slug` from each block's config.ts.
 * A slug with no entry falls back to StructuralPreview.
 */
const previewMap: Record<string, React.ComponentType<PreviewProps>> = {
  serviceHero: ServiceHeroPreview,
  marketHero: MarketHeroPreview,
  knowledgeHero: KnowledgeHeroPreview,
  sectionNavigation: SectionNavigationPreview,
  richIntro: RichIntroPreview,
  richTextBlock: RichTextBlockPreview,
  businessIntro: BusinessIntroPreview,
  founderStatement: FounderStatementPreview,
  statsBand: StatsBandPreview,
  readyWhenYouAre: ReadyWhenYouArePreview,
  splitContentList: SplitContentListPreview,
  imageTextFeature: ImageTextFeaturePreview,
  agricultureFeature: AgricultureFeaturePreview,
  videoTextFeature: VideoTextFeaturePreview,
  immersiveMediaGallery: ImmersiveMediaGalleryPreview,
  benefitsGrid: BenefitsGridPreview,
  clientServices: ClientServicesPreview,
  serviceOfferings: ServiceOfferingsPreview,
  businessGroupCards: BusinessGroupCardsPreview,
  groupBusinessExplorer: GroupBusinessExplorerPreview,
  investmentPathCards: InvestmentPathCardsPreview,
  productRange: ProductRangePreview,
  tabbedContent: TabbedContentPreview,
  platformDownloads: PlatformDownloadsPreview,
  licensingCredentials: LicensingCredentialsPreview,
  marketResearchCards: MarketResearchCardsPreview,
  researchLibrary: ResearchLibraryPreview,
  articleList: ArticleListPreview,
  articleDetail: ArticleDetailPreview,
  destinationLocationShowcase: DestinationLocationShowcasePreview,
  processSteps: ProcessStepsPreview,
  accountOpeningSteps: AccountOpeningStepsPreview,
  requirementsChecklist: RequirementsChecklistPreview,
  guideAccordion: GuideAccordionPreview,
  faqAccordion: FaqAccordionPreview,
  accountFaq: AccountFaqPreview,
  consultationQualifier: ConsultationQualifierPreview,
  consultationShowcase: ConsultationShowcasePreview,
  contactDetails: ContactDetailsPreview,
  teamGrid: TeamGridPreview,
  teamMemberProfile: TeamMemberProfilePreview,
  focusAreasGrid: FocusAreasGridPreview,
  hospitalityExperienceGrid: HospitalityExperienceGridPreview,
  skarduHotelFeature: SkarduHotelFeaturePreview,
}

/** Fallback for any block added after this map was written. */
const StructuralPreview: React.FC<BlockShape> = () => (
  <div
    style={{
      aspectRatio: '3 / 2',
      width: '100%',
      background: '#f5f7fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8a94a6',
      fontSize: 11,
      borderRadius: 4,
    }}
  >
    No preview yet
  </div>
)

export const BlockPreview: React.FC<{
  content?: BlockPreviewContent
  shape?: BlockShape
  type: string
}> = ({ content, shape, type }) => {
  const Specific = previewMap[type]
  if (Specific) return <Specific content={content} />
  return <StructuralPreview {...shape} />
}

export const previewedSlugs = Object.keys(previewMap)
