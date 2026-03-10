"use client"

import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Phone, MessageCircle, ShoppingCart, Search, User, ChevronDown, Truck, Shield } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  // تتبع التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
// القوائم
const [navLinks, setNavLinks] = useState([
  { label: "الرئيسية", href: "/", icon: "🏠" },
  { label: "عنا", href: "/about", icon: "👥" },
  { label: "سياسة الشحن", href: "/Delivery Policy", icon: "🚚" },
  { label: "سياسة الأسترجاع", href: "/return-policy", icon: "↩️" },
  { label: "التقيمات", href: "/reviews", icon: "⭐" },
  { label: "فيديوهات الورشة", href: "/workshop", icon: "🎬" },
  { 
    label: "المنتجات", 
    href: "/portfolio",
    icon: "🛋️",
    submenu: [
      { label: "أنترية مغلف", href: "/portfolio?category=أنترية مغلف", count: 0 },
      { label: "ركن", href: "/portfolio?category=ركن", count: 0 },
      { label: "طرابيزات", href: "/portfolio?category=طرابيزات", count: 0 },
      { label: "جزمات", href: "/portfolio?category=جزمات", count: 0 },
      { label: "فوتية", href: "/portfolio?category=فوتية", count: 0 },
      { label: "كراسي", href: "/portfolio?category=كراسي", count: 0 }
    ]
  },
  { label: "صمم بنفسك", href: "/pricing", icon: "🎨" },
  { label: "اتصل بنا", href: "/contact", icon: "📞" }
])

// جلب الأعداد الفعلية من Supabase
useEffect(() => {
  async function fetchCategoryCounts() {
    const { data, error } = await supabase
      .from('products')
      .select('category')
    
    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    // حساب عدد المنتجات في كل فئة
    const counts: Record<string, number> = {
      "أنترية مغلف": 0,
      "ركن": 0,
      "طرابيزات": 0,
      "جزمات": 0,
      "فوتية": 0,
      "كراسي": 0
    }

    data?.forEach(item => {
      if (counts.hasOwnProperty(item.category)) {
        counts[item.category]++
      }
    })

    // تحديث القوائم بالأعداد الفعلية
    setNavLinks(prevLinks => prevLinks.map(link => {
      if (link.label === "المنتجات" && link.submenu) {
        return {
          ...link,
          submenu: link.submenu.map(subItem => ({
            ...subItem,
            count: counts[subItem.label] || 0
          }))
        }
      }
      return link
    }))
  }

  fetchCategoryCounts()
}, [])

  const handleContactClick = (method: string) => {
    if (method === 'whatsapp') {
      window.open('https://wa.me/201015262864', '_blank')
    } else if (method === 'phone') {
      window.open('tel:+201015262864', '_blank')
    }
  }

  return (
    <>
      {/* شريط العلوي - محسن للجوال */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-1.5 md:py-2 px-3 md:px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm">متصلون الآن</span>
            </div>
            <div className="md:hidden flex items-center gap-1.5 text-xs">
              <Truck className="w-3 h-3 md:w-4 md:h-4" />
              <span>شحن سريع</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 w-full md:w-auto justify-between md:justify-start mt-1 md:mt-0">
            <button 
              onClick={() => handleContactClick('phone')}
              className="flex items-center gap-1 md:gap-2 hover:text-yellow-200 transition-colors text-xs md:text-sm"
            >
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-bold whitespace-nowrap">+20 101 526 2864</span>
            </button>
            <div className="h-3 md:h-4 w-px bg-white/30"></div>
            <button 
              onClick={() => handleContactClick('whatsapp')}
              className="flex items-center gap-1 md:gap-2 bg-green-500 hover:bg-green-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full transition-colors text-xs md:text-sm whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span>واتساب سريع</span>
            </button>
          </div>
        </div>
      </div>

      {/* الهيدر الرئيسي */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md md:shadow-lg' 
          : 'bg-white'
      }`}>
        <nav className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3">
          <div className="flex items-center justify-between">
            {/* اليسار: اللوجو */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                {/* لوجو الكنبة */}
                <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  {/* صورة الكنبة */}
                  <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src="/handcrafted-wood-furniture-showcase.jpg"
                      alt="Modern Online Logo - Handcrafted Wood Furniture"
                      fill
                      className="object-cover rounded md:rounded-lg"
                      sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
                      priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded md:rounded-lg"></div>
                  </div>
                  
                  {/* تأثير تألق */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg md:rounded-xl"></div>
                  
                  {/* مؤشر الكنبة الصغير */}
                  <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                </div>
                
                {/* تأثير خارجي */}
                <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-primary/10 to-transparent rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent whitespace-nowrap">
                  Modern Online
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">أثاث دمياطي منذ 1990</span>
              </div>
            </Link>

            {/* الوسط: القائمة الرئيسية */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium text-sm md:text-base"
                  >
                    <span className="text-base md:text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* القائمة الفرعية */}
                  {item.submenu && activeMenu === item.label && (
                    <div className="absolute top-full right-0 w-56 md:w-64 bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-200 mt-0.5 md:mt-1 overflow-hidden">
                      <div className="p-3 md:p-4">
                        <div className="mb-2 md:mb-3">
                          <div className="font-bold text-gray-900 text-sm md:text-base">{item.label}</div>
                          <div className="text-xs md:text-sm text-gray-500">تصفح جميع الفئات</div>
                        </div>
                        <div className="space-y-1 md:space-y-2">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.label}
                              href={subitem.href}
                              className="flex items-center justify-between p-2 md:p-3 rounded-md md:rounded-lg hover:bg-gray-50 transition-colors group text-sm md:text-base"
                              onClick={() => setActiveMenu(null)}
                            >
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"></div>
                                <span className="text-gray-700 group-hover:text-primary">
                                  {subitem.label}
                                </span>
                              </div>
                              <span className="text-xs md:text-sm bg-gray-100 text-gray-600 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                                {subitem.count}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={item.href}
                          className="mt-2 md:mt-3 block w-full text-center bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-bold py-1.5 md:py-2 rounded-md md:rounded-lg hover:from-primary/20 hover:to-primary/10 transition-all text-sm md:text-base"
                          onClick={() => setActiveMenu(null)}
                        >
                          عرض جميع المنتجات
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* اليمين: أزرار الإجراءات */}
            <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
              {/* زر البحث */}
              <button className="hidden md:flex items-center justify-center w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Search className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-gray-600" />
              </button>

              {/* زر التواصل الرئيسي */}
              <button
                onClick={() => handleContactClick('whatsapp')}
                className="hidden lg:flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-md lg:hover:shadow-lg text-sm md:text-base whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
                <span>طلب سريع</span>
              </button>

              {/* زر القائمة للجوال */}
              <button 
                className="lg:hidden flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md md:rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="القائمة"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* القائمة للجوال */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl md:shadow-2xl max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-4">
              {/* بحث سريع */}
              <div className="mb-4 md:mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    className="w-full bg-gray-100 border-0 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 pl-10 md:pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  />
                  <Search className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>

              {/* الروابط */}
              <div className="space-y-0.5">
                {navLinks.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors text-gray-700 text-sm md:text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-lg md:text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.submenu && (
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      )}
                    </Link>

                    {/* القائمة الفرعية للجوال */}
                    {item.submenu && (
                      <div className="pr-6 md:pr-8 space-y-0.5">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            href={subitem.href}
                            className="flex items-center justify-between py-1.5 md:py-2 px-6 md:px-8 rounded-md md:rounded-lg hover:bg-gray-50 transition-colors text-gray-600 text-sm md:text-base"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-primary rounded-full"></div>
                              <span>{subitem.label}</span>
                            </div>
                            <span className="text-xs md:text-sm bg-gray-100 text-gray-500 px-1.5 md:px-2 py-0.5 rounded-full">
                              {subitem.count}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* أزرار إضافية للجوال */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <button
                    onClick={() => {
                      handleContactClick('whatsapp')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    واتساب
                  </button>
                  <button
                    onClick={() => {
                      handleContactClick('phone')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-primary to-primary/80 text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    اتصل بنا
                  </button>
                </div>
              </div>

              {/* معلومات سريعة */}
              <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <div className="font-bold text-blue-700 text-sm md:text-base">ضمان 5 سنوات</div>
                  </div>
                  <div className="text-xs md:text-sm text-blue-600">جودة مضمونة</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <div className="font-bold text-green-700 text-sm md:text-base">شحن سريع</div>
                  </div>
                  <div className="text-xs md:text-sm text-green-600">خلال 3-7 أيام</div>
                </div>
              </div>
              
              {/* معلومات التواصل الإضافية */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm md:text-base">+20 101 526 2864</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-sm md:text-base">شحن لجميع المحافظات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}