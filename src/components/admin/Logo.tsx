import React from 'react'

const FALLBACK = 'Enrichers Investment Group'

export const AdminLogo = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={FALLBACK}
      className="admin-brand__logo"
      src="/brand/enrichers-logo-enhanced.webp"
    />
  )
}

export const AdminIcon = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Enrichers"
      className="admin-brand__icon"
      src="/brand/enrichers-icon.png"
    />
  )
}
