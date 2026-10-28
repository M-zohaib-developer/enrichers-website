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
