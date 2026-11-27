'use client'

import type { BlocksFieldClientComponent, ClientBlock } from 'payload'

import type { BlockInstance, BlockPreviewContent } from '@/utilities/getBlockPreviewContent'

import { BlocksField, Drawer, useForm, useFormFields, useModal } from '@payloadcms/ui'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import type { BlockShape } from './blockPreviews'

import { BlockPreview } from './blockPreviews'
import { FullscreenPreviewModal } from './blockPreviews/FullscreenPreviewModal'

/**
 * The `layout` blocks field with a visual block picker.
 *
 * Payload's default picker shows one generic icon per block — with 44 blocks
 * every card looks identical. This replaces the "Add Layout" control with a
 * visual drawer that shows bespoke miniatures per block, filled with real
 * content from published pages when available.
 *
 * The eye icon on each card opens a fullscreen iframe preview. Clicking the
 * card body (or the + icon) still inserts the block as before.
 *
 * Everything else is untouched: rows, drag-and-drop, validation, collapsibles,
 * row labels, duplication — all still Payload's own <BlocksField>. Blocks are
 * inserted via `addFieldRow`, the same call Payload's picker uses.
 */

const DRAWER_SLUG = 'layout-block-picker'

const getShape = (block: ClientBlock): BlockShape => {
  const fields = block.fields ?? []
  const shape: BlockShape = {}
  for (const f of fields) {
    const type = (f as { type?: string }).type
    if (type === 'upload') shape.hasImage = true
    if (type === 'array' || type === 'blocks') shape.hasArray = true
    if (type === 'richText' || type === 'textarea') shape.hasRichText = true
    if (type === 'array') {
      const sub = (f as { fields?: { type?: string }[] }).fields ?? []
      if (sub.some((s) => s.type === 'upload')) shape.hasImage = true
    }
  }
  return shape
}

const getLabel = (block: ClientBlock): string => {
  const singular = block.labels?.singular
  if (typeof singular === 'string') return singular
  if (singular && typeof singular === 'object') {
    return String(Object.values(singular)[0] ?? block.slug)
  }
  return block.slug
}

export const LayoutBlocksField: BlocksFieldClientComponent = (props) => {
  const { field, path, schemaPath } = props
  const { addFieldRow } = useForm()
  const { closeModal, openModal } = useModal()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [content, setContent] = useState<Record<string, BlockPreviewContent>>({})
  const [instances, setInstances] = useState<Record<string, BlockInstance[]>>({})
  const [openCount, setOpenCount] = useState(0)
  const [previewBlock, setPreviewBlock] = useState<{ slug: string; label: string } | null>(null)
  const autoAdded = useRef(false)

  // Row state of THIS blocks field. Tells us (a) when the form is actually ready
  // — `rows` becomes an array once the field registers — and (b) whether the
  // layout is still empty, so we never add on top of existing content.
  const layoutRows = useFormFields(([fields]) => {
    const state = fields?.[path] as { rows?: unknown[] } | undefined
    return state?.rows
  })

  // When opened from "New Blog Article" (?blog=1) on a fresh document, pre-add
  // the articleDetail block so the editor never has to hunt for it in the
  // picker. We wait for the field to register (rather than a fragile fixed
  // timeout that often fired before the form was ready) and only add when the
  // layout is still empty.
  useEffect(() => {
    if (autoAdded.current) return
    if (searchParams?.get('blog') !== '1') return
    if (!Array.isArray(layoutRows)) return // form not ready yet — wait for the next render
    autoAdded.current = true
    if (layoutRows.length === 0) {
      addFieldRow({ blockType: 'articleDetail', path, schemaPath: schemaPath as string })
    }
  }, [layoutRows, addFieldRow, path, schemaPath, searchParams])

  useEffect(() => {
    if (openCount === 0) return
    let cancelled = false

    fetch('/block-preview-content', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : { content: {}, instances: {} }))
      .then((data) => {
        if (!cancelled) {
          setContent(data?.content ?? {})
          setInstances(data?.instances ?? {})
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [openCount])

  const openPicker = useCallback(() => {
    setOpenCount((n) => n + 1)
    openModal(DRAWER_SLUG)
  }, [openModal])

  const blocks = useMemo(
    () =>
      ((field?.blocks ?? []) as (ClientBlock | string)[]).filter(
        (b): b is ClientBlock => typeof b === 'object' && b !== null,
      ),
    [field],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return blocks
    return blocks.filter(
      (b) => getLabel(b).toLowerCase().includes(q) || b.slug.toLowerCase().includes(q),
    )
  }, [blocks, search])

  const onSelect = useCallback(
    (blockType: string) => {
      addFieldRow({ blockType, path, schemaPath: schemaPath as string })
      closeModal(DRAWER_SLUG)
      setSearch('')
    },
    [addFieldRow, closeModal, path, schemaPath],
  )

  const openPreview = useCallback((e: React.MouseEvent, slug: string, label: string) => {
    e.stopPropagation()
    setPreviewBlock({ slug, label })
  }, [])

  return (
    <div className="layout-blocks-field">
      <BlocksField {...props} />

      <button
        aria-label="Add a block"
        className="layout-blocks-field__add"
        onClick={openPicker}
        title="Add a block"
        type="button"
      >
        <svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" viewBox="0 0 24 24" width="20">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <Drawer slug={DRAWER_SLUG} title="Add Layout">
        <input
          aria-label="Search blocks"
          className="layout-blocks-field__search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blocks…"
          type="search"
          value={search}
        />

        {filtered.length === 0 ? (
          <p className="layout-blocks-field__empty">No blocks match "{search}".</p>
        ) : (
          <ul className="layout-blocks-field__grid">
            {filtered.map((block) => {
              const label = getLabel(block)
              const blockInstances = instances[block.slug] ?? []
              return (
                <li key={block.slug}>
                  <div className="layout-blocks-field__card-wrap">
                    <button
                      className="layout-blocks-field__card"
                      onClick={() => onSelect(block.slug)}
                      title={`Add ${label}`}
                      type="button"
                    >
                      <span className="layout-blocks-field__preview">
                        <BlockPreview
                          content={content[block.slug]}
                          shape={getShape(block)}
                          type={block.slug}
                        />
                      </span>
                      <span className="layout-blocks-field__label">{label}</span>
                    </button>

                    {/* Eye icon — opens fullscreen preview without inserting */}
                    <button
                      aria-label={`Preview ${label}`}
                      className="layout-blocks-field__eye"
                      onClick={(e) => openPreview(e, block.slug, label)}
                      title={`Preview ${label}`}
                      type="button"
                    >
                      <svg aria-hidden="true" fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" viewBox="0 0 24 24" width="14">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>

                    {/* Used/unused badge */}
                    <span
                      className={`layout-blocks-field__badge${blockInstances.length > 0 ? ' layout-blocks-field__badge--used' : ''}`}
                      title={blockInstances.length > 0 ? `Used on ${blockInstances.length} page(s)` : 'Not yet used'}
                    >
                      {blockInstances.length > 0 ? blockInstances.length : '·'}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Drawer>

      {/* Fullscreen preview modal */}
      {previewBlock && (
        <FullscreenPreviewModal
          instances={instances[previewBlock.slug] ?? []}
          label={previewBlock.label}
          onClose={() => setPreviewBlock(null)}
          type={previewBlock.slug}
        />
      )}
    </div>
  )
}
