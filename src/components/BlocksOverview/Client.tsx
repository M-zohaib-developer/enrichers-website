'use client'

import React from 'react'

import { BlockPreview } from '@/fields/blockPreviews'

const baseClass = 'blocks-overview'

export const BlocksOverviewClient: React.FC<{
  items: { label: string; slug: string }[]
}> = ({ items }) => (
  <div className={baseClass}>
    <h2 className={`${baseClass}__title`}>Blocks</h2>
    <p className={`${baseClass}__intro`}>
      {items.length} blocks you can add to any page from the <strong>Add Layout</strong> button.
    </p>

    <ul className={`${baseClass}__grid`}>
      {items.map((item) => (
        <li className={`${baseClass}__card`} key={item.slug}>
          <div className={`${baseClass}__preview`}>
            <BlockPreview type={item.slug} />
          </div>
          <span className={`${baseClass}__label`}>{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
)
