import type { Block } from 'payload'
import { accountFaq } from './schema/accountFaq'
import { accountOpeningSteps } from './schema/accountOpeningSteps'
import { clientServices } from './schema/clientServices'
import { consultationQualifier } from './schema/consultationQualifier'
import { groupBusinessExplorer } from './schema/groupBusinessExplorer'
import { investmentPathCards } from './schema/investmentPathCards'
import { licensingCredentials } from './schema/licensingCredentials'
import { marketHero } from './schema/marketHero'
import { marketResearchCards } from './schema/marketResearchCards'
import { readyWhenYouAre } from './schema/readyWhenYouAre'
import { skarduHotelFeature } from './schema/skarduHotelFeature'

/** Payload registry for the editable homepage. Each block schema lives beside its own definition. */
export const HomeBlocks: Block[] = [
  marketHero,
  licensingCredentials,
  investmentPathCards,
  clientServices,
  accountOpeningSteps,
  consultationQualifier,
  marketResearchCards,
  groupBusinessExplorer,
  skarduHotelFeature,
  accountFaq,
  readyWhenYouAre,
]
