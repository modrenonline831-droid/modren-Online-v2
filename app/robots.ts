export const dynamic = 'force-static'

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/static/media/', '/manifest.webmanifest'], // منع الزحف للملفات التقنية
    },
    sitemap: 'https://modrenonline.com/sitemap.xml',
  }
}