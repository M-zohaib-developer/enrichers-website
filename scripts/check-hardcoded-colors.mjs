#!/usr/bin/env node
// Source-scan gate for doc section 3.3: no hardcoded hex colours and no inline
// styles in block/component JSX. An ESLint no-restricted-syntax rule alone was
// found not to cover every case, so this script is the authoritative check —
// run it in CI, not just locally.
import { readFileSync, readdirSync, statSync } from 'fs'
import { extname, join } from 'path'

const SRC_DIR = join(process.cwd(), 'src')
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx'])
const EXCLUDE_FILES = new Set(['payload-types.ts'])
const EXCLUDE_DIR_NAMES = new Set(['node_modules', '.next'])

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/g
const ARBITRARY_HEX_UTILITY = /\b[a-z-]+-\[#[0-9a-fA-F]{3,8}\]/g
const INLINE_STYLE_PROP = /\bstyle=\{\{/g

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIR_NAMES.has(entry)) continue
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      walk(fullPath, files)
    } else if (SCAN_EXTENSIONS.has(extname(entry)) && !EXCLUDE_FILES.has(entry)) {
      files.push(fullPath)
    }
  }
  return files
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const violations = []

  for (const match of content.matchAll(HEX_LITERAL)) {
    violations.push({ type: 'hardcoded-hex-colour', snippet: match[0] })
  }
  for (const match of content.matchAll(ARBITRARY_HEX_UTILITY)) {
    violations.push({ type: 'tailwind-arbitrary-hex-utility', snippet: match[0] })
  }
  for (const match of content.matchAll(INLINE_STYLE_PROP)) {
    violations.push({ type: 'inline-style', snippet: match[0] })
  }

  return violations
}

const files = walk(SRC_DIR)
let totalViolations = 0

for (const file of files) {
  const violations = scanFile(file)
  if (violations.length === 0) continue
  totalViolations += violations.length
  console.error(`\n${file.replace(process.cwd() + '/', '')}`)
  for (const v of violations) {
    console.error(`  [${v.type}] ${v.snippet}`)
  }
}

if (totalViolations > 0) {
  console.error(
    `\n${totalViolations} violation(s) found. Use theme tokens from globals.css (@theme block) instead of hardcoded hex colours or inline styles.`,
  )
  process.exit(1)
}

console.log(`Checked ${files.length} file(s) — no hardcoded colours or inline styles found.`)
