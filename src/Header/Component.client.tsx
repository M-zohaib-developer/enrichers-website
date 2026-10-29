'use client'

import React, { useEffect, useRef, useState } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/Logo'
import { RiskNotice } from './RiskNotice'
import {
  ArrowRightIcon,
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  JunctionMark,
  MenuIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
} from '@/components/Icon'
import type { Header as HeaderType, Media } from '@/payload-types'
import {
  FALLBACK_NAV,
  FALLBACK_CONSULTATION,
  FALLBACK_CTA,
  FALLBACK_CONTACT,
  FALLBACK_RISK_NOTICE,
} from './defaults'
import type { LinkField, NavGroup, NavItem } from './defaults'

/* -----------------------------------------------------------------------------
 * Structure and measurements copied from the deployed reference
 * (https://enrichers-demo.innovidio.com/candidates/a), read out of its client
 * bundle rather than guessed:
 *
 *   bar        72px, sticky, z-40, 1px hairline underneath
 *   nav item   full-bar height, 12px side padding, 15px / 600, white 85%
 *   active     2px --chrome-active underline, inset 12px each side
 *   mega       FULL-WIDTH panel (absolute inset-x-0 top-full), light theme,
 *              container-wide grid, 40px gap, 40px vertical padding,
 *              one 1fr column per group plus an optional 300px promo card.
 *              Desktop only — below 1024px the drawer's accordion replaces it.
 *   drawer     full-screen theme-inverse panel with a 72px header row and a
 *              native <details> accordion, not a side sheet.
 *
 * No colour literals: every tone resolves through the chrome ladder.
 * -------------------------------------------------------------------------- */

/**
 * Grid templates are a fixed lookup rather than an interpolated class or an
 * inline style: Tailwind only emits classes it can see as literals at build
 * time, and inline style attributes are rejected by the colour lint.
 */
const MEGA_GRID: Record<string, string> = {
  '1': 'lg:grid-cols-[repeat(1,minmax(0,1fr))]',
  '2': 'lg:grid-cols-[repeat(2,minmax(0,1fr))]',
  '3': 'lg:grid-cols-[repeat(3,minmax(0,1fr))]',
  '4': 'lg:grid-cols-[repeat(4,minmax(0,1fr))]',
  '1f': 'lg:grid-cols-[repeat(1,minmax(0,1fr))_300px]',
  '2f': 'lg:grid-cols-[repeat(2,minmax(0,1fr))_300px]',
  '3f': 'lg:grid-cols-[repeat(3,minmax(0,1fr))_300px]',
  '4f': 'lg:grid-cols-[repeat(4,minmax(0,1fr))_300px]',
}

const megaGridClass = (groupCount: number, hasFeature: boolean) =>
  MEGA_GRID[`${Math.min(Math.max(groupCount, 1), 4)}${hasFeature ? 'f' : ''}`] ?? MEGA_GRID['2']

function isMedia(logo: HeaderType['logo']): logo is Media {
  return Boolean(logo && typeof logo === 'object')
}

const usable = (l?: LinkField | null): l is LinkField => Boolean(l?.url && l?.label)

/** Columns that actually have something to show, narrowed so callers lose the null. */
const groupsOf = (item: NavItem): NavGroup[] =>
  (item.groups ?? []).filter(
    (g): g is NavGroup => Boolean(g) && (g?.items ?? []).some((i) => i?.label && i?.href),
  )

const featureOf = (item: NavItem) =>
  item.feature?.enabled && item.feature.title ? item.feature : null

/* -------------------------------------------------------------------------- */

export function HeaderClient({ data }: { data: HeaderType }) {
  const [openMega, setOpenMega] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  const logo = isMedia(data.logo) ? data.logo : null

  const d = data as unknown as {
    navItems?: NavItem[] | null
    consultationLink?: { link?: LinkField }
    riskNotice?: { enabled?: boolean | null; lead?: string | null; body?: string | null }
    contact?: {
      phone?: string | null
      phoneHref?: string | null
      whatsappUrl?: string | null
      whatsappLabel?: string | null
    }
  }

  const navItems = d.navItems?.length ? d.navItems : FALLBACK_NAV
  const consultation = usable(d.consultationLink?.link)
    ? d.consultationLink!.link!
    : FALLBACK_CONSULTATION
  const cta = usable(data.ctaButton?.link) ? data.ctaButton!.link! : FALLBACK_CTA
  const contact = { ...FALLBACK_CONTACT, ...(d.contact ?? {}) }

  // A saved-but-empty group has enabled:null and no body — treat that as "not
  // configured yet" and fall back, rather than hiding the strip by accident.
  const cmsRisk = d.riskNotice
  const risk = cmsRisk && cmsRisk.body ? cmsRisk : FALLBACK_RISK_NOTICE
  const showRisk = risk.enabled !== false

  // Close everything on navigation.
  useEffect(() => {
    setOpenMega(null)
    setDrawerOpen(false)
  }, [pathname])

  // Escape closes either layer; a click outside the header closes the mega only
  // (the drawer covers the viewport, so "outside" is meaningless for it).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMega(null)
      setDrawerOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMega(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [])

  // Lock the page behind the open drawer. Restores the previous value rather
  // than assuming '', so it cannot clobber a lock set by something else.
  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [drawerOpen])

  /** Active when the current path matches the item or any of its children. */
  const isActive = (item: NavItem) => {
    const hrefs = [
      item.href,
      ...groupsOf(item).flatMap((g) => (g.items ?? []).map((i) => i?.href)),
    ].filter((h): h is string => Boolean(h) && h !== '#' && h !== '/')
    return hrefs.some((h) => pathname?.startsWith(h.replace(/\/$/, '')))
  }

  const navEntryBase =
    'relative flex h-(--header-h) items-center px-3 text-button font-semibold transition-colors hover:text-chrome-strong'

  const ctaClass =
    'inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-chrome-cta px-5 text-button font-semibold text-chrome-on-cta transition-colors hover:bg-chrome-cta-hover'

  return (
    <>
      {showRisk && risk.body ? <RiskNotice lead={risk.lead} body={risk.body} /> : null}
      <header
        ref={headerRef}
        className="theme-inverse sticky top-0 z-40 border-b border-chrome-hairline"
      >
        <div className="container-wide flex h-(--header-h) items-center gap-6">
          <NextLink href="/" aria-label="Enrichers — home" className="shrink-0">
            <Logo
              className="w-40"
              src={logo?.url}
              alt={logo?.alt}
              width={logo?.width}
              height={logo?.height}
              priority
            />
          </NextLink>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, i) => {
                const groups = groupsOf(item)
                const active = isActive(item)
                const tone = active || openMega === i ? 'text-chrome-strong' : 'text-chrome'
                const underline = active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-0 h-0.5 bg-chrome-active"
                  />
                ) : null

                return (
                  <li key={item.label ?? i} className="relative">
                    {groups.length > 0 ? (
                      <button
                        type="button"
                        aria-expanded={openMega === i}
                        aria-controls={`mega-${i}`}
                        aria-haspopup="true"
                        onClick={() => setOpenMega(openMega === i ? null : i)}
                        className={`${navEntryBase} gap-1 ${tone}`}
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] ${
                            openMega === i ? 'rotate-180' : ''
                          }`}
                        />
                        {underline}
                      </button>
                    ) : (
                      <NextLink
                        href={item.href || '#'}
                        aria-current={active ? 'page' : undefined}
                        className={`${navEntryBase} ${tone}`}
                      >
                        {item.label}
                        {underline}
                      </NextLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ml-auto also sits here so the cluster stays right-aligned once the
            nav is hidden; at lg the nav owns the push and this drops to 8px. */}
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <NextLink
              href={consultation.url!}
              className="hidden h-11 items-center px-3 text-button font-semibold text-chrome transition-colors hover:text-chrome-strong xl:inline-flex"
            >
              {consultation.label}
            </NextLink>

            <span className="hidden sm:inline-flex">
              <NextLink href={cta.url!} className={ctaClass}>
                {cta.label}
              </NextLink>
            </span>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-chrome-strong transition-colors hover:bg-chrome-ghost lg:hidden"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>

        {/* ── Mega panels ──────────────────────────────────────────────────
          Siblings of the bar and absolutely positioned against the sticky
          <header>, so each panel spans the full viewport width rather than
          hanging off its trigger. Desktop only. */}
        {navItems.map((item, i) => {
          const groups = groupsOf(item)
          if (groups.length === 0 || openMega !== i) return null
          const feature = featureOf(item)

          return (
            <div
              key={item.label ?? i}
              id={`mega-${i}`}
              className="theme-light absolute inset-x-0 top-full hidden border-b border-border shadow-lg lg:block"
            >
              <div
                className={`container-wide grid gap-10 py-10 ${megaGridClass(
                  groups.length,
                  Boolean(feature),
                )}`}
              >
                {groups.map((group, gi) => (
                  <div key={group?.heading || gi}>
                    {group?.heading?.trim() ? (
                      <p className="text-overline mb-4 font-semibold tracking-overline text-text-muted uppercase">
                        {group.heading}
                      </p>
                    ) : null}
                    <ul className="space-y-4">
                      {(group?.items ?? []).map((entry, ii) =>
                        entry?.label && entry?.href ? (
                          <li key={entry.href ?? ii}>
                            <NextLink href={entry.href} className="group block">
                              <span className="inline-flex items-center gap-2.5 font-semibold text-action underline-offset-4 group-hover:underline">
                                {entry.label}
                              </span>
                              {entry.description ? (
                                <span className="text-body-sm mt-0.5 block text-text-muted">
                                  {entry.description}
                                </span>
                              ) : null}
                            </NextLink>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </div>
                ))}

                {feature ? (
                  <NextLink
                    href={feature.href || '#'}
                    className="theme-inverse group relative flex flex-col justify-end overflow-hidden rounded-sm p-6"
                  >
                    <JunctionMark size={20} className="absolute top-5 right-5 text-chrome-mark" />
                    <span className="text-overline font-semibold tracking-overline text-chrome-eyebrow uppercase">
                      {feature.eyebrow}
                    </span>
                    <span className="font-display text-h4 mt-2">{feature.title}</span>
                    <span className="text-body-sm mt-4 inline-flex items-center gap-1.5 font-semibold text-accent">
                      {feature.linkLabel || 'Read more'}
                      <ArrowRightIcon className="transition-transform group-hover:translate-x-[3px]" />
                    </span>
                  </NextLink>
                ) : null}
              </div>
            </div>
          )
        })}

        {/* ── Mobile drawer ────────────────────────────────────────────────
          Full-screen panel, not a side sheet. Uses native <details> so the
          accordion keeps working without JS and stays keyboard-operable. */}
        {drawerOpen && (
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="theme-inverse fixed inset-0 z-50 flex flex-col lg:hidden"
          >
            <div className="flex h-(--header-h) items-center justify-between border-b border-chrome-hairline px-(--gutter)">
              <Logo className="w-40" src={logo?.url} alt={logo?.alt} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors hover:bg-chrome-ghost"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-(--gutter) py-4">
              <ul className="divide-y divide-chrome-hairline">
                {navItems.map((item, i) => {
                  const groups = groupsOf(item)

                  return (
                    <li key={item.label ?? i}>
                      {groups.length > 0 ? (
                        <details className="group">
                          <summary className="text-h5 flex h-14 cursor-pointer list-none items-center justify-between font-semibold">
                            {item.label}
                            <PlusIcon className="group-open:hidden" />
                            <MinusIcon className="hidden group-open:block" />
                          </summary>
                          <div className="pb-4">
                            {groups.map((group, gi) => (
                              <div key={group?.heading || gi} className="mb-3">
                                {group?.heading?.trim() ? (
                                  <p className="text-overline mb-1 font-semibold tracking-overline text-chrome-overline uppercase">
                                    {group.heading}
                                  </p>
                                ) : null}
                                <ul>
                                  {(group?.items ?? []).map((entry, ii) =>
                                    entry?.label && entry?.href ? (
                                      <li key={entry.href ?? ii}>
                                        <NextLink
                                          href={entry.href}
                                          className="text-body flex min-h-11 items-center gap-3 text-chrome"
                                        >
                                          {entry.label}
                                        </NextLink>
                                      </li>
                                    ) : null,
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <NextLink
                          href={item.href || '#'}
                          className="text-h5 flex h-14 items-center font-semibold"
                        >
                          {item.label}
                        </NextLink>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="text-body-sm mt-6 space-y-2 text-chrome-soft">
                {contact.phoneHref && (
                  <a className="flex min-h-11 items-center gap-2" href={contact.phoneHref}>
                    <PhoneIcon />
                    {contact.phone}
                  </a>
                )}
                {contact.whatsappUrl && (
                  <a
                    className="flex min-h-11 items-center gap-2"
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChatIcon />
                    {contact.whatsappLabel}
                  </a>
                )}
              </div>
            </nav>

            <div className="grid gap-2 border-t border-chrome-hairline p-(--gutter)">
              <NextLink href={cta.url!} className={`${ctaClass} w-full`}>
                {cta.label}
              </NextLink>
              <NextLink
                href={consultation.url!}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-chrome-rule px-5 text-button font-semibold text-chrome-strong transition-colors hover:bg-chrome-ghost"
              >
                {consultation.label}
              </NextLink>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
