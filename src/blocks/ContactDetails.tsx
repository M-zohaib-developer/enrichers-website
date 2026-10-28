import { Building2, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import type { BlockData } from './shared'

const icons = { phone: Phone, message: MessageSquare, mail: Mail, mapPin: MapPin, building: Building2 }

function Icon({ name, size }: { name?: string; size: number }) {
  const Component = icons[name as keyof typeof icons] || MapPin
  return <Component size={size} strokeWidth={1.5} aria-hidden="true" />
}

function external(url: string) {
  return /^https?:\/\//i.test(url)
}

export function ContactDetails({ data }: { data: BlockData }) {
  const channels = Array.isArray(data.channels) ? data.channels : []
  const offices = Array.isArray(data.offices) ? data.offices : []
  const sectionId = data.sectionId || 'contact'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          <h2 id={headingId} className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
        </div>
        <div className="mt-10">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel: any, index: number) => {
              const isExternal = external(channel.url)
              const card = (
                <>
                  <Icon name={channel.icon} size={24} />
                  <span className="mt-5 font-semibold">{channel.label}</span>
                  <span className="mt-1 text-body-sm text-text-secondary">{channel.description}</span>
                  <span className="mt-auto pt-3 text-caption text-text-muted">{channel.meta}</span>
                </>
              )
              return (
                <li key={index}>
                  {isExternal ? <a href={channel.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-sm border border-border bg-surface p-5 hover:shadow-md">{card}</a> : <a href={channel.url} className="group flex h-full flex-col rounded-sm border border-border bg-surface p-5 hover:shadow-md">{card}</a>}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-10">
          <ul id="offices" className="grid gap-4 md:grid-cols-3">
            {offices.map((office: any, index: number) => (
              <li key={index} className="rounded-sm border border-border bg-surface p-6">
                <Icon name="building" size={20} />
                <h3 className="mt-4 font-display text-h5 font-semibold text-text">{office.name}</h3>
                <p className="mt-2 text-body-sm text-text-secondary">{office.address}</p>
                {office.phone && <p className="mt-3 text-body-sm font-semibold tabular text-text">{office.phone}</p>}
                {office.hours && <p className="mt-1 text-caption text-text-muted">{office.hours}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
