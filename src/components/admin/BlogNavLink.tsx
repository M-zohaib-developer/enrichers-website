'use client'

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Adds a "Blog Articles" entry to the admin sidebar that looks and behaves
 * exactly like a built-in collection link.
 *
 * Registered under `afterNavLinks` so it appears directly below the Pages
 * row, not above it.
 *
 * Uses Payload's own `nav__link` / `nav__link-label` / `nav__link-indicator`
 * classes — no custom CSS required.
 */
export const BlogNavLink: React.FC = () => {
  const pathname = usePathname() ?? ''
  const searchParams = useSearchParams()

  const isActive =
    pathname.includes('/collections/pages') &&
    (searchParams?.get('where[slug][like]') === 'blogs/' ||
      searchParams?.toString().includes('blogs'))

  const href =
    '/admin/collections/pages?where%5Bslug%5D%5Blike%5D=blogs%2F&limit=20'

  return (
    <a
      className={`nav__link${isActive ? ' nav__link--active' : ''}`}
      href={href}
    >
      {isActive && <div className="nav__link-indicator" />}
      <span className="nav__link-label">Blog Articles</span>
    </a>
  )
}
