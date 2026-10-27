import React from 'react'
import NextLink from 'next/link'

type CMSLinkProps = {
  link?: { label?: string | null; url?: string | null; newTab?: boolean | null } | null
  className?: string
  children?: React.ReactNode
}

/** Renders a CMS-editable { label, url, newTab } link group from the Header/Footer globals. */
export function CMSLink({ link, className, children }: CMSLinkProps) {
  if (!link?.url) return null

  const newTabProps = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <NextLink href={link.url} className={className} {...newTabProps}>
      {children ?? link.label}
    </NextLink>
  )
}
