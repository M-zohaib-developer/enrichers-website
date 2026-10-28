import { AccountFaq } from './AccountFaq'
import { AccountOpeningSteps } from './AccountOpeningSteps'
import { ClientServices } from './ClientServices'
import { ConsultationQualifier } from './ConsultationQualifier'
import { GroupBusinessExplorer } from './GroupBusinessExplorer'
import { InvestmentPathCards } from './InvestmentPathCards'
import { LicensingCredentials } from './LicensingCredentials'
import { MarketHero } from './MarketHero'
import { MarketResearchCards } from './MarketResearchCards'
import { ReadyWhenYouAre } from './ReadyWhenYouAre'
import { SkarduHotelFeature } from './SkarduHotelFeature'
import type { BlockData } from './shared'

const components = {
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
