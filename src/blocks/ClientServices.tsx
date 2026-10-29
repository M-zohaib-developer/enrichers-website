import {
  ChartIcon,
  CompassIcon,
  GlobeIcon,
  JunctionMark,
  LedgerIcon,
  PeopleIcon,
  ScaleIcon,
} from '@/components/Icon'
import { Buttons, type BlockData } from './shared'

type ServiceItem = {
  title?: string | null
  body?: string | null
  icon?: string | null
}

const icons = {
  people: PeopleIcon,
  chart: ChartIcon,
  scale: ScaleIcon,
  globe: GlobeIcon,
  compass: CompassIcon,
  ledger: LedgerIcon,
} as const

function ServiceIcon({ name, index }: { name?: string | null; index: number }) {
  const Icon = icons[name as keyof typeof icons] ?? Object.values(icons)[index % 6]
  return <Icon className="text-text" />
}

export function ClientServices({ data }: { data: BlockData }) {
  const items = (data.items ?? []) as ServiceItem[]

  return (
    <section className="theme-light py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase">
            <JunctionMark size={12} className="text-action" />
            {data.eyebrow}
          </p>
          <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
          <p className="text-body-lg text-text-secondary mt-5 max-w-measure">{data.body}</p>
        </div>

        <ul className={`mt-12 grid gap-4 gap-x-10 gap-y-12 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {items.map((item, index) => (
            <li key={`${item.title ?? 'service'}-${index}`}>
              <ServiceIcon name={item.icon} index={index} />
              <h3 className="font-display text-h5 mt-4 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ul>

        <Buttons buttons={data.buttons} fallback={[data.primaryButton, data.secondaryButton]} />
      </div>
    </section>
  )
}
