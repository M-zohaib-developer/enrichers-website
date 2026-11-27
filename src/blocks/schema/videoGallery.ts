import type { Block } from 'payload'

export const DEFAULT_CATEGORY_RULES = [
  { category: 'PSX', keywords: 'psx, pakistan stock, kse, kse-100, kse100, stock exchange, equity, equities, stocks' },
  { category: 'PMEX', keywords: 'pmex, commodity, commodities, gold, silver, crude, oil, futures, currency, forex, fx' },
  { category: 'Market Updates', keywords: 'market update, market analysis, daily analytics, weekly, closing, pre-market, today market, market review' },
  { category: 'Educational Videos', keywords: 'learn, basics, how to, beginner, tutorial, explain, explained, guide, lesson, education, understanding' },
  { category: 'Company Updates', keywords: 'enrichers, ceo, chairman, founder, interview, milestone, anniversary, announcement, decade of enrichers' },
]

const CATEGORY_OPTIONS = [
  { label: 'PSX', value: 'PSX' },
  { label: 'PMEX', value: 'PMEX' },
  { label: 'Market Updates', value: 'Market Updates' },
  { label: 'Educational Videos', value: 'Educational Videos' },
  { label: 'Company Updates', value: 'Company Updates' },
]

/**
 * Video gallery with two source modes:
 *  - API: fetches the whole channel via the YouTube Data API (key in Settings → YouTube)
 *  - Manual: admin pastes YouTube video URLs and assigns categories
 * The frontend always renders the same tabs: All Videos · Playlists · PSX · PMEX ·
 * Market Updates · Educational Videos · Company Updates. Empty categories hide.
 */
export const videoGallery: Block = {
  slug: 'videoGallery',
  labels: { singular: 'Video Gallery', plural: 'Video Galleries' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID (optional)' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Knowledge Hub' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Enrichers Video Library' },
    { name: 'body', type: 'textarea', label: 'Intro (optional)' },
    {
      type: 'collapsible',
      label: 'Channel header',
      fields: [
        { name: 'channelName', type: 'text', defaultValue: 'Enrichers Investment Group' },
        { name: 'channelUrl', type: 'text', label: 'Channel URL', defaultValue: 'https://www.youtube.com/@enrichersinvestmentgroup' },
        { name: 'channelStats', type: 'text', label: 'Stats line (optional)', admin: { description: 'e.g. 484 videos · 5M views' } },
        {
          name: 'channelLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Channel logo (optional)',
          admin: { description: 'Leave blank to use the Enrichers logo.' },
        },
      ],
    },
    {
      name: 'sourceMode',
      type: 'radio',
      label: 'Video source',
      defaultValue: 'api',
      required: true,
      options: [
        { label: 'Using YouTube API Key (auto-fetch entire channel)', value: 'api' },
        { label: 'Manually add videos', value: 'manual' },
      ],
      admin: {
        description:
          'API mode needs a key in Settings → YouTube. Manual mode uses only the videos you paste below — no key required. Switching modes does not delete the other mode\'s data.',
      },
    },
    {
      name: 'apiModeHelp',
      type: 'ui',
      admin: {
        condition: (_data, sibling) => sibling?.sourceMode === 'api',
        components: {
          Field: '@/components/admin/YouTubeApiModeHelp#YouTubeApiModeHelp',
        },
      },
    },
    {
      name: 'manualVideos',
      type: 'array',
      label: 'Manual videos',
      labels: { singular: 'Video', plural: 'Videos' },
      admin: {
        description: 'Paste any YouTube video URL — watch, youtu.be, shorts or embed shapes all work. Thumbnails are pulled from YouTube automatically.',
        condition: (_data, sibling) => sibling?.sourceMode === 'manual',
      },
      fields: [
        { name: 'youtubeUrl', type: 'text', required: true, label: 'YouTube video URL' },
        { name: 'customTitle', type: 'text', label: 'Title override (optional)' },
        {
          name: 'categories',
          type: 'select',
          hasMany: true,
          options: CATEGORY_OPTIONS,
          label: 'Categories (optional)',
          admin: { description: 'A video can belong to multiple categories.' },
        },
        {
          name: 'customThumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail override (optional)',
          admin: { description: 'Leave blank to use the YouTube thumbnail.' },
        },
      ],
    },
    {
      name: 'manualPlaylists',
      type: 'array',
      label: 'Manual playlists (optional, shown in both modes)',
      labels: { singular: 'Playlist', plural: 'Playlists' },
      admin: {
        description:
          'Pinned playlists appear on the Playlists tab. Leave empty in API mode to show all channel playlists automatically.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'playlistUrl', type: 'text', required: true, label: 'YouTube playlist URL or ID' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Category rules (API mode)',
      admin: { initCollapsed: true, condition: (_data, sibling) => sibling?.sourceMode === 'api' },
      fields: [
        {
          name: 'categoryRules',
          type: 'array',
          label: 'Rules',
          defaultValue: DEFAULT_CATEGORY_RULES,
          admin: {
            description:
              'A video is assigned to a category when its title or description contains any of the keywords. Edit to tune auto-categorisation — no redeploy needed.',
          },
          fields: [
            { name: 'category', type: 'select', required: true, options: CATEGORY_OPTIONS },
            { name: 'keywords', type: 'text', required: true, label: 'Keywords (comma-separated)' },
          ],
        },
      ],
    },
    {
      name: 'playlists',
      type: 'array',
      label: 'Legacy playlists (fallback only)',
      labels: { singular: 'Playlist', plural: 'Playlists' },
      admin: {
        initCollapsed: true,
        description:
          'Kept for installs seeded with the earlier gallery shape. Used only when API mode is off AND no manual videos are set.',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Playlist title' },
        { name: 'playlistId', type: 'text', label: 'YouTube playlist ID' },
        {
          name: 'videos',
          type: 'array',
          label: 'Videos',
          admin: { condition: (_data, sibling) => !sibling?.playlistId },
          fields: [
            { name: 'title', type: 'text' },
            { name: 'videoUrl', type: 'text' },
            { name: 'duration', type: 'text' },
            { name: 'thumbnail', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
