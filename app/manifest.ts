export const dynamic = 'force-static'

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'مودرن أونلاين - أثاث دمياطي مودرن',
    short_name: 'مودرن أونلاين',
    description: 'متجر أثاث دمياطي مودرن، أثاث منزلي، مجموعات ركن، طقم روسكي، ضمان 5 سنوات',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a365d',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['shopping', 'furniture', 'home'],
    lang: 'ar',
    dir: 'rtl',
    orientation: 'portrait',
  }
}