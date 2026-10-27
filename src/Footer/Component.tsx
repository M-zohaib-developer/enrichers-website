import React from 'react'
import NextLink from 'next/link'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/CMSLink'
import { Logo } from '@/components/Logo'
import { DocumentIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/Icon'
import type { Footer as FooterType, Media } from '@/payload-types'

/* -----------------------------------------------------------------------------
 * Three stacked bands, each separated by a 1px rule, matching the reference:
 *
 *   band 1  brand + contact (1fr) | four link groups (2.2fr)
 *   band 2  licence PDFs   (1fr) | regulated-entity statements (2.2fr)
 *   band 3  copyright <-> policy links
 *
 * Type: 15px links, 13px legal at 1.625 leading, 12px uppercase group headings
 * tracked to 0.14em. The 1fr/2.2fr split applies at 1024px; the link grid goes
 * two-up below 768px and four-up at and above.
 * -------------------------------------------------------------------------- */

import type { LinkField } from './defaults'
import {
  FALLBACK_BOTTOM,
  FALLBACK_CONTACT,
  FALLBACK_DESCRIPTION,
  FALLBACK_LEGAL,
  FALLBACK_OFFICES_LINE,
  FALLBACK_REGULATION,
  FALLBACK_REGULATION_TITLE,
  fallbackCopyright,
} from './defaults'

type LinkGroup = { label?: string | null; links?: ({ link: LinkField } | null)[] | null }

function isMedia(logo: FooterType['logo']): logo is Media {
  return Boolean(logo && typeof logo === 'object')
}

/**
 * A CMS link needs both a label and a url before it is worth rendering. The
 * shared link field defaults `url` to '/' and leaves `label` optional, so a
 * half-filled group yields { url: '/', label: null } — which passes a url-only
 * check and paints an empty link pointing at the homepage.
 */
const usable = (l?: LinkField | null): boolean => Boolean(l?.url && l?.label)

const OVERLINE =
  'text-overline font-semibold tracking-overline text-chrome-overline uppercase'
const FOOT_LINK =
  'text-body-sm text-chrome-muted transition-colors hover:text-chrome-strong hover:underline underline-offset-4'

function FooterLinkGroup({ group }: { group?: LinkGroup | null }) {
  const links = (group?.links ?? []).filter((l): l is { link: LinkField } =>
    usable(l?.link),
  )
  if (!group?.label) return null

  return (
    <div>
      <p className={OVERLINE}>{group.label}</p>
      <ul className="mt-4 space-y-2">
        {links.map((item, i) => (
          <li key={i}>
            <CMSLink link={item.link} className={FOOT_LINK} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactRow({
  href,
  icon,
  children,
  external,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  external?: boolean
}) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <li>
      <a
        href={href}
        {...externalProps}
        className="inline-flex min-h-10 items-center gap-2 text-chrome transition-colors hover:text-chrome-strong"
      >
        {icon}
        {children}
      </a>
    </li>
  )
}

export async function Footer() {
  const data = (await getCachedGlobal('footer', 1)()) as FooterType
  const logo = isMedia(data.logo) ? data.logo : null

  // The global predates these fields; fall back so an un-migrated document
  // still renders the full footer rather than empty bands.
  const d = data as unknown as {
    phone?: string | null
    phoneHref?: string | null
    email?: string | null
    whatsappUrl?: string | null
    regulationTitle?: string | null
    regulationLinks?: ({ link: LinkField } | null)[] | null
    legalParagraphs?: ({ lead?: string | null; body?: string | null } | null)[] | null
    officesLine?: string | null
    bottomLinks?: ({ link: LinkField } | null)[] | null
  }

  const description = data.description ?? FALLBACK_DESCRIPTION
  const phone = d.phone ?? FALLBACK_CONTACT.phone
  const phoneHref = d.phoneHref ?? FALLBACK_CONTACT.phoneHref
  const email = d.email ?? FALLBACK_CONTACT.email
  const whatsappUrl = d.whatsappUrl ?? FALLBACK_CONTACT.whatsappUrl
  const regulationTitle = d.regulationTitle ?? FALLBACK_REGULATION_TITLE

  const cmsRegulation = (d.regulationLinks ?? []).filter((l): l is { link: LinkField } =>
    usable(l?.link),
  )
  const regulationLinks = cmsRegulation.length ? cmsRegulation : FALLBACK_REGULATION

  const cmsLegal = (d.legalParagraphs ?? []).filter(
    (p): p is { lead?: string | null; body?: string | null } => Boolean(p?.body),
  )
  const legalParagraphs = cmsLegal.length ? cmsLegal : FALLBACK_LEGAL

  const cmsBottom = (d.bottomLinks ?? []).filter((l): l is { link: LinkField } =>
    usable(l?.link),
  )
  const bottomLinks = cmsBottom.length ? cmsBottom : FALLBACK_BOTTOM

  const officesLine = d.officesLine ?? FALLBACK_OFFICES_LINE
  const copyrightText = data.copyrightText ?? fallbackCopyright()

  return (
    <footer className="theme-inverse relative overflow-hidden">
      <div className="container-wide relative pt-16 pb-10 md:pt-20">
        {/* ── Band 1 — brand + links ───────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr]">
          <div>
            {/* 184px wide in the reference, against the header's 160px. */}
            <Logo
              className="w-46"
              src={logo?.url}
              alt={logo?.alt}
              width={logo?.width}
              height={logo?.height}
            />

            {description && (
              <p className="mt-6 max-w-[34ch] text-body-sm text-chrome-soft">{description}</p>
            )}

            <ul className="mt-6 space-y-1 text-body-sm">
              {phone && (
                <ContactRow href={phoneHref} icon={<PhoneIcon />}>
                  {phone}
                </ContactRow>
              )}
              {email && (
                <ContactRow href={`mailto:${email}`} icon={<MailIcon />}>
                  {email}
                </ContactRow>
              )}
              {whatsappUrl && (
                <ContactRow href={whatsappUrl} icon={<WhatsAppIcon />} external>
                  WhatsApp
                </ContactRow>
              )}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FooterLinkGroup group={data.tradeInvest} />
            <FooterLinkGroup group={data.theGroup} />
            <FooterLinkGroup group={data.insightsLearning} />
            <FooterLinkGroup group={data.company} />
          </nav>
        </div>

        {/* ── Band 2 — regulation + legal ──────────────────────────────── */}
        {(regulationLinks.length > 0 || legalParagraphs.length > 0) && (
          <div className="mt-14 grid gap-8 border-t border-chrome-rule pt-10 lg:grid-cols-[1fr_2.2fr]">
            <div>
              <p className={OVERLINE}>{regulationTitle}</p>
              <ul className="mt-4 space-y-2">
                {regulationLinks.map((item, i) => (
                  <li key={i}>
                    <CMSLink
                      link={item.link}
                      className={`inline-flex items-center gap-2 ${FOOT_LINK}`}
                    >
                      <DocumentIcon />
                      {item.link.label}
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-caption leading-relaxed text-chrome-legal">
              {legalParagraphs.map((p, i) => (
                <p key={i}>
                  {p?.lead && <span className="font-semibold text-chrome">{p.lead}</span>}{' '}
                  {p?.body}
                </p>
              ))}
              {officesLine && <p>{officesLine}</p>}
            </div>
          </div>
        )}

        {/* ── Band 3 — copyright ───────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-3 border-t border-chrome-rule pt-6 text-caption text-chrome-faint md:flex-row md:items-center md:justify-between">
          <p>{copyrightText}</p>
          {bottomLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {bottomLinks.map((item, i) => (
                <li key={i}>
                  <NextLink
                    href={item.link.url!}
                    className="transition-colors hover:text-chrome-strong"
                  >
                    {item.link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
