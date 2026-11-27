import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    // localPatterns is an allowlist: once it exists, any local path missing
    // from it is a hard 500 from next/image, not a silent fallback.
    localPatterns: [
      {
        // Payload uploads.
        pathname: '/api/media/file/**',
      },
      {
        // Bundled brand artwork (the logo shipped in public/brand).
        pathname: '/brand/**',
      },
    ],
    // Serve AVIF first (≈20–30% smaller than WebP) with WebP as the fallback for
    // browsers that don't accept AVIF, and the original for the rest. Additive:
    // the optimiser reads the stored WebP variants and only changes its OUTPUT
    // format; stored files, variants and Cache-Control headers are untouched.
    formats: ['image/avif', 'image/webp'],
    // The only quality we pass to next/image (its default is 75). Anything not
    // listed here returns a 400 from the optimiser.
    qualities: [75],
    // Capped at 1920 (Next's default runs to 3840). Nothing is art-directed for
    // 4K, and each extra size is another variant the server has to encode/store.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Cache the optimised image for a year (default is 4h). The /_next/image URL
    // carries the source path + width + quality, so the key changes when the
    // source changes — a replaced image gets a fresh key.
    minimumCacheTTL: 31536000,
  },
  // Payload serves uploads from /api/media/file/... with no Cache-Control, so the
  // browser re-requests them every visit. A short, self-correcting window makes
  // repeat visits instant while still letting a *replaced* image (filenames are
  // not content-hashed) work its way out of the cache within ~1 hour.
  async headers() {
    const mediaCache = [
      { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
    ]
    return [
      { headers: mediaCache, source: '/api/media/file/:path*' },
      { headers: mediaCache, source: '/brand/:path*' },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
