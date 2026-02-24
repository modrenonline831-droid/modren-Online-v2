"use client"

import { useState } from "react"
import { CheckCircle, Clock, Info, ExternalLink } from "lucide-react"

const socialLinks = [
  {
    id: 1,
    name: "واتساب",
    url: "https://wa.me/201015262864",
    label: "كلمنا على واتساب",
    description: "للطلبات والاستفسارات السريعة",
    phoneNumber: "+20 101 526 2864",
    isActive: true,
    color: "#25D366",
    textColor: "text-white",
    borderColor: "border-green-400",
    hoverColor: "hover:bg-[#128C7E]",
    stats: "رد خلال 5 دقائق",
    badge: "الأكثر استخداماً",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
  },
  {
    id: 2,
    name: "فيسبوك",
    url: "https://www.facebook.com/share/1D8fRBtXbc/",
    label: "تابعنا على فيسبوك",
    description: "آخر العروض والأخبار",
    isActive: true,
    color: "#1877F2",
    textColor: "text-white",
    borderColor: "border-blue-400",
    hoverColor: "hover:bg-[#166FE5]",
    stats: "متواصلين يومياً",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
  },
  {
    id: 3,
    name: "تيك توك",
    url: "https://www.tiktok.com/@modren.online?_r=1&_t=ZS-938t0JlsY8z",
    label: "شوف فيديوهاتنا",
    description: "فيديوهات حصرية للأثاث",
    isActive: true,
    color: "#000000",
    textColor: "text-white",
    borderColor: "border-gray-700",
    hoverColor: "hover:bg-gray-800",
    stats: "فيديوهات يومية",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg"
  },
  {
    id: 4,
    name: "اتصال مباشر",
    url: "tel:+201015262864",
    label: "اتصل بنا مباشرة",
    description: "للأهم وللاستفسارات العاجلة",
    phoneNumber: "+20 101 526 2864",
    isActive: true,
    color: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)",
    textColor: "text-white",
    borderColor: "border-amber-400",
    hoverColor: "hover:opacity-90",
    stats: "متاحون 24/7",
    badge: "مباشر",
    icon: "https://cdn-icons-png.flaticon.com/512/724/724664.png"
  },
  {
    id: 5,
    name: "إنستجرام",
    url: "#",
    label: "تابعنا على إنستجرام",
    description: "صور ومقاطع حصرية",
    isActive: false,
    color: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
    textColor: "text-white",
    borderColor: "border-pink-300",
    hoverColor: "hover:opacity-90",
    stats: "قريباً",
    comingSoon: true,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
  },
  {
    id: 6,
    name: "ايميل",
    url: "mailto:modren.online@example.com",
    label: "راسلنا على الإيميل",
    description: "للطلبات الرسمية والمؤسسات",
    isActive: true,
    color: "#EA4335",
    textColor: "text-white",
    borderColor: "border-red-400",
    hoverColor: "hover:bg-[#D14836]",
    stats: "رد خلال 24 ساعة",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png"
  },
  {
    id: 7,
    name: "الموقع",
    url: "https://modren-online.vercel.app",
    label: "زيارة الموقع الرسمي",
    description: "جميع المنتجات والعروض",
    isActive: true,
    color: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    textColor: "text-white",
    borderColor: "border-indigo-400",
    hoverColor: "hover:opacity-90",
    stats: "محدث باستمرار",
    icon: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
  },
  {
    id: 8,
    name: "تيليجرام",
    url: "#",
    label: "تواصل معنا على تيليجرام",
    description: "للأخبار السريعة والعروض",
    isActive: false,
    color: "#0088CC",
    textColor: "text-white",
    borderColor: "border-sky-400",
    hoverColor: "hover:bg-[#0077B5]",
    stats: "قريباً",
    comingSoon: true,
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
  }
]

// SVG مخصص لأيقونة تيك توك إذا كانت الصورة لا تعمل
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

// SVG مخصص لأيقونة واتساب
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="currentColor">
    <path d="M16 2a14 14 0 0 1 11.9 21.3l1.9 4.7-4.8-1.9A14 14 0 1 1 16 2zm0 2a12 12 0 0 0-10.2 18.4L4.6 25l2.6-.7A12 12 0 1 0 16 4zm5.9 17.2c-.3-.5-1.1-.8-2.3-.4-1.2.4-2.6.5-4.1-.2-2.4-1.1-4-3.8-4.2-4-.2-.2-.5-.3-.8-.3s-1 .2-1.4.6c-.4.4-1.6 1.5-1.6 3.6s1.6 4.2 1.8 4.5.3.6.6 1c.3.4.6.8 1 1.2.4.4.8.8 1.3 1.1.5.3 1 .6 1.6.8.6.2 1.2.3 1.8.3h.1c1.3 0 2.6-.3 3.8-1 .5-.3.9-.6 1.3-1 .4-.4.7-.8 1-1.3s.5-1 .6-1.5c.1-.5.1-1 .1-1.5s-.2-1-.4-1.5z"/>
  </svg>
)

// SVG مخصص لأيقونة فيسبوك
const FacebookIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="currentColor">
    <path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm3.2 9h-2.1c-.2 0-.4.2-.4.4v2.1h2.5l-.4 2.5h-2.1v6.7h-2.5v-6.7h-2.1v-2.5h2.1v-1.9c0-1.3.6-2.1 2.1-2.1h2.5v2.5z"/>
  </svg>
)

// SVG مخصص لأيقونة إنستجرام
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.8.6.8.3 1.5.7 2.2 1.4.7.7 1.1 1.4 1.4 2.2.3.8.5 1.6.6 2.8.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.6 2.8-.3.8-.7 1.5-1.4 2.2-.7.7-1.4 1.1-2.2 1.4-.8.3-1.6.5-2.8.6-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.8-.6-.8-.3-1.5-.7-2.2-1.4-.7-.7-1.1-1.4-1.4-2.2-.3-.8-.5-1.6-.6-2.8-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-2 .6-2.8.3-.8.7-1.5 1.4-2.2.7-.7 1.4-1.1 2.2-1.4.8-.3 1.6-.5 2.8-.6 1.2-.1 1.6-.1 4.8-.1zm0-2.2c-3.3 0-3.7 0-5 .1-1.3.1-2.2.3-3 .6-.9.3-1.6.7-2.3 1.4-.7.7-1.1 1.4-1.4 2.3-.3.8-.5 1.7-.6 3-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.9-.7-1.6-1.4-2.3-.7-.7-1.4-1.1-2.3-1.4-.8-.3-1.7-.5-3-.6-1.3-.1-1.7-.1-5-.1zm0 5.8c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.2-10.8c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4.6-1.4 1.4-1.4 1.4.6 1.4 1.4z"/>
  </svg>
)

export function SocialLinks() {
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const handleCopyNumber = (phoneNumber: string, id: number) => {
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        setCopiedNumber(id)
        setTimeout(() => setCopiedNumber(null), 2000)
      })
      .catch(() => {
        alert("حدث خطأ في نسخ الرقم")
      })
  }

  const handleLinkClick = (url: string, isActive: boolean) => {
    if (isActive && url && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // دالة للحصول على الأيقونة المناسبة
  const getIconComponent = (linkName: string, iconUrl: string) => {
    return (
      <div className="w-14 h-14 flex items-center justify-center">
        <img 
          src={iconUrl} 
          alt={linkName}
          className="w-full h-full object-contain"
          onError={(e) => {
            // إذا فشل تحميل الصورة، استخدم SVG مخصص
            const target = e.currentTarget
            target.style.display = 'none'
            
            const parent = target.parentElement
            if (parent) {
              const svgContainer = document.createElement('div')
              svgContainer.className = 'w-full h-full flex items-center justify-center'
              
              if (linkName === "تيك توك") {
                svgContainer.innerHTML = `
                  <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                `
              } else if (linkName === "واتساب") {
                svgContainer.innerHTML = `
                  <svg viewBox="0 0 32 32" class="w-full h-full" fill="currentColor">
                    <path d="M16 2a14 14 0 0 1 11.9 21.3l1.9 4.7-4.8-1.9A14 14 0 1 1 16 2zm0 2a12 12 0 0 0-10.2 18.4L4.6 25l2.6-.7A12 12 0 1 0 16 4zm5.9 17.2c-.3-.5-1.1-.8-2.3-.4-1.2.4-2.6.5-4.1-.2-2.4-1.1-4-3.8-4.2-4-.2-.2-.5-.3-.8-.3s-1 .2-1.4.6c-.4.4-1.6 1.5-1.6 3.6s1.6 4.2 1.8 4.5.3.6.6 1c.3.4.6.8 1 1.2.4.4.8.8 1.3 1.1.5.3 1 .6 1.6.8.6.2 1.2.3 1.8.3h.1c1.3 0 2.6-.3 3.8-1 .5-.3.9-.6 1.3-1 .4-.4.7-.8 1-1.3s.5-1 .6-1.5c.1-.5.1-1 .1-1.5s-.2-1-.4-1.5z"/>
                  </svg>
                `
              } else if (linkName === "فيسبوك") {
                svgContainer.innerHTML = `
                  <svg viewBox="0 0 32 32" class="w-full h-full" fill="currentColor">
                    <path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm3.2 9h-2.1c-.2 0-.4.2-.4.4v2.1h2.5l-.4 2.5h-2.1v6.7h-2.5v-6.7h-2.1v-2.5h2.1v-1.9c0-1.3.6-2.1 2.1-2.1h2.5v2.5z"/>
                  </svg>
                `
              } else if (linkName === "إنستجرام") {
                svgContainer.innerHTML = `
                  <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
                    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.8.6.8.3 1.5.7 2.2 1.4.7.7 1.1 1.4 1.4 2.2.3.8.5 1.6.6 2.8.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.6 2.8-.3.8-.7 1.5-1.4 2.2-.7.7-1.4 1.1-2.2 1.4-.8.3-1.6.5-2.8.6-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.8-.6-.8-.3-1.5-.7-2.2-1.4-.7-.7-1.1-1.4-1.4-2.2-.3-.8-.5-1.6-.6-2.8-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-2 .6-2.8.3-.8.7-1.5 1.4-2.2.7-.7 1.4-1.1 2.2-1.4.8-.3 1.6-.5 2.8-.6 1.2-.1 1.6-.1 4.8-.1zm0-2.2c-3.3 0-3.7 0-5 .1-1.3.1-2.2.3-3 .6-.9.3-1.6.7-2.3 1.4-.7.7-1.1 1.4-1.4 2.3-.3.8-.5 1.7-.6 3-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.9-.7-1.6-1.4-2.3-.7-.7-1.4-1.1-2.3-1.4-.8-.3-1.7-.5-3-.6-1.3-.1-1.7-.1-5-.1zm0 5.8c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.2-10.8c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4.6-1.4 1.4-1.4 1.4.6 1.4 1.4z"/>
                  </svg>
                `
              } else {
                // أيقونة افتراضية
                svgContainer.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white text-lg font-bold">
                    ${linkName.charAt(0)}
                  </div>
                `
              }
              
              parent.appendChild(svgContainer)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* عنوان القسم */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-70"></div>
            <div className="relative p-3 bg-white rounded-2xl shadow-2xl border border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              تواصل معنا من أي مكان
            </h2>
            <p className="text-gray-600 text-lg">
              اختر المنصة التي تناسبك وابدأ المحادثة
            </p>
          </div>
        </div>
      </div>

      {/* شبكة التطبيقات */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {socialLinks.map((link) => {
          const isHovered = hoveredCard === link.id
          const hasGradient = link.color.includes("gradient")

          return (
            <div
              key={link.id}
              className={`group relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                link.borderColor
              } ${
                link.isActive && link.url !== "#"
                  ? `cursor-pointer active:scale-[0.98] shadow-lg hover:shadow-2xl`
                  : 'cursor-not-allowed shadow-md'
              } ${isHovered ? 'scale-[1.02]' : ''}`}
              onMouseEnter={() => setHoveredCard(link.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleLinkClick(link.url, link.isActive)}
            >
              {/* الخلفية */}
              <div 
                className="h-full p-5 relative overflow-hidden"
                style={hasGradient ? { 
                  background: link.color 
                } : { 
                  backgroundColor: link.color 
                }}
              >
                {/* تأثير الخلفية */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"></div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                  {link.badge && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm whitespace-nowrap">
                      {link.badge}
                    </span>
                  )}
                  {!link.isActive && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm">
                      قريباً
                    </span>
                  )}
                </div>

                {/* المحتوى */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
                  {/* الأيقونة */}
                  <div className="relative">
                    {/* ظل الأيقونة */}
                    <div className="absolute inset-0 bg-black/20 blur-xl rounded-full scale-150"></div>
                    
                    {/* الأيقونة الرئيسية */}
                    <div className={`relative bg-white p-4 rounded-2xl shadow-2xl border border-white/30 ${
                      isHovered ? 'scale-110' : ''
                    } transition-transform duration-300`}>
                      {getIconComponent(link.name, link.icon)}
                    </div>
                  </div>

                  {/* النص */}
                  <div className="text-center space-y-3">
                    <h3 className={`text-xl font-bold ${link.textColor} drop-shadow-lg`}>
                      {link.name}
                    </h3>
                    
                    <p className={`text-sm ${link.textColor} opacity-90 px-2`}>
                      {link.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-2">
                      <span className={`px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm ${link.textColor} text-sm font-bold`}>
                        {link.stats}
                      </span>
                    </div>
                  </div>
                </div>

                {/* رقم الهاتف */}
                {link.phoneNumber && link.isActive && (
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/30">
                    <div className="flex items-center justify-center gap-3">
                      <span className={`text-sm font-medium ${link.textColor}`}>
                        {link.phoneNumber}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyNumber(link.phoneNumber!, link.id)
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          copiedNumber === link.id 
                            ? 'bg-white text-green-600' 
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                        title="نسخ الرقم"
                      >
                        {copiedNumber === link.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-sm">📋</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* مؤشر النشاط */}
              {link.isActive && link.url !== "#" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50"></div>
              )}

              {/* زر الزيارة */}
              {link.isActive && link.url !== "#" && (
                <div className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2.5 bg-white rounded-full shadow-2xl border border-gray-200">
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              )}

              {/* Overlay للمنصات غير النشطة */}
              {!link.isActive && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-2xl"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* باقي الكود كما هو ... */}
      
    </div>
  )
}