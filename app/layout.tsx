import type { Metadata, Viewport } from "next"
import { Cairo, Tajawal } from "next/font/google"
import "./globals.css"

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
    // كل الكلمات المفتاحية
    "مودرن أونلاين", "modren online", "مودرين", "مودرين اونلاين",
    "أثاث مودرن اونلاين", "modern online", "modrenonline", "modrenonline.com",
    "مودرين اونلاين كوم", "مودرن اونلاين كوم", "مودرن انلاين", "مودرين انلاين",
    "مودرن اون لاين", "مودرين اون لاين", "موديرن اونلاين", "موديرين اونلاين",
    
    // أثاث دمياطي
    "أثاث دمياطي", "أثاث دمياط", "اثاث دمياطي", "اثاث دمياط",
    "أثاث منزلي دمياطي", "اثاث منزلي دمياطي", "أثاث منزلي دمياط",
    "أثاث دمياطي مودرن", "اثاث دمياطي مودرن", "أثاث دمياط مودرن",
    "أثاث دمياطي حديث", "اثاث دمياطي حديث", "أثاث دمياطي عصري",
    
    // أثاث مصري
    "أثاث مصري", "اثاث مصري", "أثاث مصر", "اثاث مصر",
    "أثاث مصري دمياطي", "اثاث مصري دمياطي", "أثاث مصري مودرن",
    
    // منتجات محددة
    "مجموعات ركن دمياطي", "مجموعات ركن", "طقم ركن", "مجلس عربي",
    "كنب مودرن دمياطي", "كنب دمياطي", "كنب مودرن", "كنب حديث",
    "غرف نوم دمياطي", "غرف نوم", "غرف نوم مودرن", "غرف نوم حديثة",
    "طاولات طعام", "طاولات طعام دمياطي", "طاولات طعام مودرن",
    "خزانات ملابس", "خزانات ملابس دمياطي", "خزانات ملابس مودرن",
    
    // طقم روسكي
    "طقم روسكي", "طقم روسكي دمياطي", "طقم روسكي مودرن",
    "طقم روسكي حديث", "طقم ركن روسكي", "مجموعة روسكي",
    
    // ضمان وتوصيل
    "ضمان 5 سنوات أثاث", "ضمان أثاث", "ضمان 5 سنوات",
    "توصيل أثاث دمياطي", "توصيل أثاث", "توصيل لجميع المحافظات",
  ],
  
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | أثاث منزلي دمياطي مودرن`,
    description: "متجر أثاث دمياطي مودرن | مودرن أونلاين (مودرين اونلاين، أثاث مودرن اونلاين، modern online، modren online)",
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
    description: "متجر أثاث دمياطي مودرن | مودرن أونلاين (مودرين اونلاين، أثاث مودرن اونلاين)",
    images: ["/og-image.jpg"],
  },
  
  // ⭐ **صور الموقع اللي لسه في public** ⭐
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
    other: [
      {
        rel: "logo",
        url: "/logo.png",
      },
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
  "alternateName": ["مودرين اونلاين", "أثاث مودرن اونلاين", "مودرين", "Modern Online", "Modren Online"],
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
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Essential SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* ⭐ **صور الموقع اللي لسه في public** ⭐ */}
        
        {/* Favicon - جميع الأحجام */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        
        {/* Android/Chrome Icons - PWA */}
        <link rel="icon" href="/logo-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/logo-512x512.png" type="image/png" sizes="512x512" />
        
        {/* Logo */}
        <link rel="logo" href="/logo.png" type="image/png" />
        
        {/* OG Image للمشاركة */}
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${SITE_NAME} - أثاث منزلي مودرن`} />
        
        {/* WhatsApp Button Animation */}
        <style>{`
          @keyframes whatsapp-pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
        `}</style>
      </head>
      
      <body className={`${cairo.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        {children}
        
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