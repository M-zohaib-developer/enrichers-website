import NextLink from 'next/link'
import { linkOk, type BlockData } from './shared'

export function SectionNavigation({ data }: { data: BlockData }) {
  const links = Array.isArray(data.links) ? data.links : []

  return (
    <div className="sticky top-(--header-h) z-30 border-b border-border bg-surface/95 backdrop-blur">
      <div className="container-wide flex items-center gap-4">
        <nav aria-label={data.ariaLabel || 'On this page'} className="min-w-0 flex-1">
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {links.map((link: any, index: number) => {
              const href = link?.anchor ? `#${String(link.anchor).replace(/^#/, '')}` : link?.url
              if (!href || !link?.label) return null
              const active = link.active ?? index === 0

              return (
                <li key={`${link.label}-${index}`}>
                  <NextLink
                    href={href}
                    aria-current={active ? 'location' : undefined}
                    className={`relative flex h-13 items-center whitespace-nowrap px-3 text-body-sm font-semibold after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 ${active ? 'text-text after:bg-accent' : 'text-text-muted hover:text-text after:bg-transparent'}`}
                  >
                    {link.label}
                  </NextLink>
                </li>
              )
            })}
          </ul>
        </nav>
        {linkOk(data.cta) && (
          <NextLink
            href={data.cta.url}
            className="group hidden h-8 shrink-0 items-center justify-center rounded-sm bg-action px-3 text-body-sm font-semibold text-on-action transition-colors hover:bg-action-hover md:inline-flex"
          >
            <span>{data.cta.label}</span>
          </NextLink>
        )}
      </div>
    </div>
  )
}
