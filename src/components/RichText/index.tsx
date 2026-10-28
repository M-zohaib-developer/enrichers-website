import type { ReactNode } from 'react'

type NodeData = {
  type?: string
  tag?: string
  listType?: string
  text?: string
  format?: number
  url?: string
  fields?: { url?: string; newTab?: boolean }
  children?: NodeData[]
}

function renderText(node: NodeData, key: string): ReactNode {
  let content: ReactNode = node.text || ''
  if ((node.format || 0) & 1) content = <strong>{content}</strong>
  if ((node.format || 0) & 2) content = <em>{content}</em>
  if ((node.format || 0) & 8) content = <u>{content}</u>
  return <span key={key}>{content}</span>
}

function renderNodes(nodes: NodeData[] = [], prefix = 'node'): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${prefix}-${index}`
    const children = renderNodes(node.children, key)
    switch (node.type) {
      case 'text': return renderText(node, key)
      case 'heading': {
        const Tag = (node.tag || 'h3') as 'h2' | 'h3' | 'h4'
        return <Tag key={key}>{children}</Tag>
      }
      case 'list': return node.listType === 'number' || node.listType === 'ordered' ? <ol key={key}>{children}</ol> : <ul key={key}>{children}</ul>
      case 'listitem': return <li key={key}>{children}</li>
      case 'link': {
        const url = node.fields?.url || node.url || '#'
        return <a key={key} href={url} target={node.fields?.newTab ? '_blank' : undefined} rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}>{children}</a>
      }
      case 'blockquote': return <blockquote key={key}>{children}</blockquote>
      case 'linebreak': return <br key={key} />
      case 'paragraph': return <p key={key}>{children}</p>
      default: return <span key={key}>{children}</span>
    }
  })
}

export function RichText({ data, className = '' }: { data?: unknown; className?: string }) {
  if (!data) return null

  return (
    <div className={`rich-text ${className}`}>
      {renderNodes((data as { root?: { children?: NodeData[] } })?.root?.children)}
    </div>
  )
}
