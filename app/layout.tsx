import type { Metadata, Viewport } from "next"
import { Cairo, Tajawal } from "next/font/google"
import "./globals.css"
import Script from "next/script"

// خطوط عربية متوافقة
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
})

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
})

// الإعدادات الأساسية
const SITE_URL = "https://modrenonline.com"
const SITE_NAME = "مودرن أونلاين"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a365d",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  title: {
    default: `${SITE_NAME} | أثاث منزلي دمياطي مودرن - ضمان 5 سنوات`,
    template: `%s | ${SITE_NAME}`,
  },
  
  description: `متجر ${SITE_NAME} للأثاث الدمياطي المودرن. نتعامل أيضاً بـ (مودرين، مودرين اونلاين، أثاث مودرن اونلاين، مودرن أونلاين). مجموعات ركن فاخرة، كنب، غرف نوم، طاولات طعام، خزانات ملابس. خشب زان طبيعي، ضمان 5 سنوات، توصيل لجميع المحافظات.`,
  
  keywords: [
    "مودرن أونلاين", "modren online", "مودرين", "مودرين اونلاين",
    "أثاث مودرن اونلاين", "modern online", "modrenonline", "modrenonline.com",
    "أثاث دمياطي", "أثاث دمياط", "مجموعات ركن دمياطي", "كنب مودرن دمياطي",
    "ضمان 5 سنوات أثاث", "توصيل أثاث دمياطي",
  ],
  
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | أثاث منزلي دمياطي مودرن`,
    description: "متجر أثاث دمياطي مودرن | مودرن أونلاين",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - أثاث منزلي مودرن`,
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | أثاث منزلي دمياطي مودرن`,
    description: "متجر أثاث دمياطي مودرن | مودرن أونلاين",
    images: ["/og-image.jpg"],
  },
  
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD لتحسين SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${SITE_URL}/#store`,
  "name": SITE_NAME,
  "alternateName": ["مودرين اونلاين", "أثاث مودرن اونلاين", "Modern Online", "Modren Online"],
  "description": "متجر أثاث منزلي دمياطي متخصص في الأثاث المودرن ومجموعات الركن بضمان 5 سنوات",
  "url": SITE_URL,
  "telephone": "+201015262864",
  "email": "modrenonline831@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "دمياط",
    "addressRegion": "دمياط",
    "addressCountry": "EG"
  },
  "openingHours": "Mo-Su 09:00-22:00",
  "priceRange": "$$",
  "image": `${SITE_URL}/og-image.jpg`,
  "logo": `${SITE_URL}/logo.png`,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/logo-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/logo-512x512.png" type="image/png" sizes="512x512" />
        
        {/* OG Image */}
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      
      <body className={`${cairo.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        {children}
        
        {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(function(OneSignal) {
              OneSignal.init({
                appId: "YOUR_ONESIGNAL_APP_ID", // استبدل بـ App ID الخاص بك
                safari_web_id: "YOUR_SAFARI_WEB_ID", // اختياري
                notifyButton: {
                  enable: true,
                },
                allowLocalhostAsSecureOrigin: true,
              });
            });
          `}
        </Script>
        
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/201015262864?text=مرحباً%20أريد%20استفسار%20عن%20الأثاث%20الدمياطي"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معنا على واتساب"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform duration-300 hover:shadow-3xl"
          style={{
            animation: "whatsapp-pulse 2s infinite"
          }}
        >
          <span className="text-2xl">💬</span>
          <span className="hidden sm:inline font-bold text-sm">واتساب</span>
        </a>
      </body>
    </html>
  )
}