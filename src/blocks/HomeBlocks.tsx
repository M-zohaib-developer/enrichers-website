import { AccountFaq } from './AccountFaq'
import { AccountOpeningSteps } from './AccountOpeningSteps'
import { ClientServices } from './ClientServices'
import { ConsultationQualifier } from './ConsultationQualifier'
import { GroupBusinessExplorer } from './GroupBusinessExplorer'
import { InvestmentPathCards } from './InvestmentPathCards'
import { LicensingCredentials } from './LicensingCredentials'
import { MarketHero } from './MarketHero'
import { MarketResearchCards } from './MarketResearchCards'
import { ProductRange } from './ProductRange'
import { ServiceHero } from './ServiceHero'
import { SectionNavigation } from './SectionNavigation'
import { TabbedContent } from './TabbedContent'
import { ProcessSteps } from './ProcessSteps'
import { RequirementsChecklist } from './RequirementsChecklist'
import { GuideAccordion } from './GuideAccordion'
import { FaqAccordion } from './FaqAccordion'
import { ReadyWhenYouAre } from './ReadyWhenYouAre'
import { SkarduHotelFeature } from './SkarduHotelFeature'
import { ContactDetails } from './ContactDetails'
import { PlatformDownloads } from './PlatformDownloads'
import { KnowledgeHero } from './KnowledgeHero'
import { ConsultationShowcase } from './ConsultationShowcase'
import { BusinessIntro } from './BusinessIntro'
import { ServiceOfferings } from './ServiceOfferings'
import { BenefitsGrid } from './BenefitsGrid'
import { RichTextSection } from './RichTextSection'
import { ImageTextFeature } from './ImageTextFeature'
import { SplitContentList } from './SplitContentList'
import { AgricultureFeature } from './AgricultureFeature'
import { RichIntro } from './RichIntro'
import { FocusAreasGrid } from './FocusAreasGrid'
import type { BlockData } from './shared'

const components = {
  productRange: ProductRange,
  serviceHero: ServiceHero,
  sectionNavigation: SectionNavigation,
  tabbedContent: TabbedContent,
  processSteps: ProcessSteps,
  requirementsChecklist: RequirementsChecklist,
  guideAccordion: GuideAccordion,
  faqAccordion: FaqAccordion,
  marketHero: MarketHero,
  licensingCredentials: LicensingCredentials,
  investmentPathCards: InvestmentPathCards,
  clientServices: ClientServices,
  accountOpeningSteps: AccountOpeningSteps,
  consultationQualifier: ConsultationQualifier,
  marketResearchCards: MarketResearchCards,
  groupBusinessExplorer: GroupBusinessExplorer,
  skarduHotelFeature: SkarduHotelFeature,
  accountFaq: AccountFaq,
  readyWhenYouAre: ReadyWhenYouAre,
  contactDetails: ContactDetails,
  platformDownloads: PlatformDownloads,
  knowledgeHero: KnowledgeHero,
  consultationShowcase: ConsultationShowcase,
  businessIntro: BusinessIntro,
  serviceOfferings: ServiceOfferings,
  benefitsGrid: BenefitsGrid,
  richTextBlock: RichTextSection,
  imageTextFeature: ImageTextFeature,
  splitContentList: SplitContentList,
  agricultureFeature: AgricultureFeature,
  richIntro: RichIntro,
  focusAreasGrid: FocusAreasGrid,
} as const

export function RenderHomeBlocks({ blocks }: { blocks: BlockData[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = components[block.blockType as keyof typeof components]
        return Component ? <Component key={`${block.blockType}-${index}`} data={block} /> : null
      })}
    </>
  )
}
