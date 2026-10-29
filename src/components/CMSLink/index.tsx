import React from 'react'
import NextLink from 'next/link'

type UploadedFile = { url?: string | null; filename?: string | null; mimeType?: string | null }

type CMSLinkProps = {
  link?: {
    label?: string | null
    url?: string | null
    newTab?: boolean | null
    file?: UploadedFile | number | string | null
  } | null
  className?: string
  children?: React.ReactNode
}

/**
 * Renders a CMS-editable { label, url, newTab, file } link group from the
 * Header/Footer globals.
 *
 * An uploaded document wins over the typed URL — that is the point of the
 * `file` field: an editor swaps in a new licence PDF without editing the link.
 * Documents and off-site URLs render as a plain anchor, because next/link's
 * client routing and prefetch do nothing useful for a file or an external page.
 */
export function CMSLink({ link, className, children }: CMSLinkProps) {
  const file = link?.file && typeof link.file === 'object' ? (link.file as UploadedFile) : null
  const href = file?.url || link?.url
  if (!href) return null

  // A document opens in a new tab unless the editor explicitly said otherwise.
  const newTab = link?.newTab ?? Boolean(file)
  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const external = Boolean(file) || /^(https?:)?\/\//.test(href)
  const label = children ?? link?.label

  if (external) {
    return <a href={href} className={className} {...newTabProps}>{label}</a>
  }

  return (
    <NextLink href={href} className={className} {...newTabProps}>
      {label}
    </NextLink>
  )
}
