import Image from 'next/image'
import NextLink from 'next/link'
import type React from 'react'
import { Eyebrow, imageSrc, type BlockData, type MediaValue } from './shared'

type Person = {
  name?: string | null
  role?: string | null
  bio?: string | null
  profileUrl?: string | null
  photo?: MediaValue
}

/** Initials stand in when a member has no photo, so the grid keeps its rhythm. */
function Initials({ name }: { name?: string | null }) {
  const initials = (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
  return (
    <div className="grid h-full w-full place-items-center bg-surface-sunken">
      <span className="font-display text-h2 font-light text-text-muted">{initials}</span>
    </div>
  )
}

function Portrait({ person, priority }: { person: Person; priority?: boolean }) {
  const src = imageSrc(person.photo)
  if (!src) return <Initials name={person.name} />
  return (
    <Image
      src={src}
      alt={person.name || 'Team member'}
      fill
      priority={priority}
      className="object-cover object-top"
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
    />
  )
}

function CardLink({ url, label, children, className = '' }: { url?: string | null; label: string; children: React.ReactNode; className?: string }) {
  if (url) return <NextLink href={url} className={className} aria-label={label}>{children}</NextLink>
  return <div className={className}>{children}</div>
}

export function TeamGrid({ data }: { data: BlockData }) {
  const leaders = (Array.isArray(data.leaders) ? data.leaders : []) as Person[]
  const members = (Array.isArray(data.members) ? data.members : []) as Person[]
  if (leaders.length === 0 && members.length === 0) return null

  if (data.displayVariant === 'candidate') {
    const portraitCards = (people: Person[]) => people.map((person, index) => (
      <li key={`${person.name || 'member'}-${index}`} className="group">
        <CardLink url={person.profileUrl} label={`View ${person.name || 'team member'} profile`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-sunken">
            <Portrait person={person} priority={index === 0} />
          </div>
          <p className="mt-4 font-semibold text-text">{person.name}</p>
          <p className="text-body-sm mt-1 text-text-muted">{person.role}</p>
        </CardLink>
      </li>
    ))
    const group = (id: string, eyebrow: string, heading: string, body: string, people: Person[], surface = false, ctaLabel?: string, ctaUrl?: string) => people.length === 0 ? null : (
      <section id={id} className={`relative py-(--section-y) ${surface ? 'theme-surface' : ''}`}>
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2 className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{heading}</h2></div>
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                {ctaLabel && ctaUrl && <NextLink href={ctaUrl} className="inline-flex h-11 items-center justify-center rounded-sm border border-border-strong px-5 text-button font-semibold text-action transition-colors hover:bg-surface-sunken">{ctaLabel}</NextLink>}
                {body && <p className="text-body-lg text-text-secondary">{body}</p>}
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{portraitCards(people)}</ul>
        </div>
      </section>
    )
    return <div id={data.sectionId || undefined}>{group('leadership', data.leadershipEyebrow || data.eyebrow || 'Leadership', data.leadershipHeading || data.heading, data.leadershipBody || data.body || '', leaders, false, data.leadershipCtaLabel, data.leadershipCtaUrl)}{group('management', data.managementEyebrow || 'Management', data.managementHeading || 'Management team', data.managementBody || '', members, true)}</div>
  }

  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-measure">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 className="font-display text-h2 mt-3 tracking-heading text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-4 text-text-secondary">{data.body}</p>}
        </div>

        {leaders.length > 0 && (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {leaders.map((person, index) => (
              <li
                key={`${person.name || 'leader'}-${index}`}
              >
                <CardLink url={person.profileUrl} label={`View ${person.name || 'team member'} profile`} className="group block overflow-hidden rounded-lg border border-border bg-surface shadow-md sm:grid sm:grid-cols-5">
                  <div className="relative aspect-[4/5] sm:col-span-2 sm:aspect-auto sm:min-h-[320px]">
                    <Portrait person={person} priority={index === 0} />
                  </div>
                  <div className="p-6 sm:col-span-3 sm:p-7">
                    <h3 className="font-display text-h4 font-semibold text-text">{person.name}</h3>
                    <p className="text-body-sm mt-1.5 font-semibold text-text-link">{person.role}</p>
                    {person.bio && (
                      <p className="text-body-sm mt-4 text-text-secondary">{person.bio}</p>
                    )}
                  </div>
                </CardLink>
              </li>
            ))}
          </ul>
        )}

        {members.length > 0 && (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((person, index) => (
              <li
                key={`${person.name || 'member'}-${index}`}
                className="group overflow-hidden rounded-lg border border-border bg-surface transition-shadow duration-(--duration-normal) hover:shadow-md"
              >
                <CardLink url={person.profileUrl} label={`View ${person.name || 'team member'} profile`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Portrait person={person} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-h5 font-semibold text-text">{person.name}</h3>
                    <p className="text-caption mt-1 text-text-secondary">{person.role}</p>
                  </div>
                </CardLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
