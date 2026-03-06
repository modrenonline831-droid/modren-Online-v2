"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Share2, Heart, Filter, Eye, ShoppingBag, Clock, Shield, Truck,
  Star, GitCompare as Compare, ChevronDown, ChevronUp, Search, X,
  MessageCircle, Phone, Tag, Award, Zap, Sparkles, Gift
} from "lucide-react"
import CountdownTimer from "./CountdownTimer"

interface PortfolioGridProps {
  viewMode: 'grid' | 'list';
  products: any[];
}

const sortOptions = [
  { value: "default", label: "الترتيب الافتراضي" },
  { value: "popular", label: "الأكثر طلباً" },
  { value: "rating", label: "أعلى تقييم" },
  { value: "newest", label: "الأحدث أولاً" },
  { value: "views", label: "الأكثر مشاهدة" }
]

export default function PortfolioGrid({ viewMode, products }: PortfolioGridProps) {
  const router = useRouter()

  // State management
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [activeImage, setActiveImage] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [sortBy, setSortBy] = useState("default")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState<number[]>([])
  const [copiedItemId, setCopiedItemId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [compareItems, setCompareItems] = useState<number[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const [quickViewItem, setQuickViewItem] = useState<any>(null)
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null)
  const [showCategoryCounts, setShowCategoryCounts] = useState(true)
  const [viewedItems, setViewedItems] = useState<number[]>([])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const itemsPerPage = 9

  // حساب العدد الفعلي لكل فئة
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "الكل": products.length,
      "أنترية مغلف": 0,
      "ركن": 0,
      "طرابيزات": 0,
      "جزمات": 0,
      "فوتية": 0,
      "كراسي": 0
    }

    products.forEach((item: any) => {
      if (counts.hasOwnProperty(item.category)) {
        counts[item.category]++
      }
    })

    return counts
  }, [products])

  // الفئات مع الأرقام الفعلية
  const categories = useMemo(() => [
    { id: "الكل", name: "الكل", icon: "📦", count: categoryCounts["الكل"] },
    { id: "أنترية مغلف", name: "أنترية مغلف", icon: "🛋️", count: categoryCounts["أنترية مغلف"] },
    { id: "ركن", name: "ركن", icon: "🪑", count: categoryCounts["ركن"] },
    { id: "طرابيزات", name: "طرابيزات", icon: "🪵", count: categoryCounts["طرابيزات"] },
    { id: "جزمات", name: "جزمات", icon: "👞", count: categoryCounts["جزمات"] },
    { id: "فوتية", name: "فوتية", icon: "🛋", count: categoryCounts["فوتية"] },
    { id: "كراسي", name: "كراسي", icon: "💺", count: categoryCounts["كراسي"] }
  ], [categoryCounts])

  // تحميل المفضلة والمقارنة من localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteItems')
    const savedCompare = localStorage.getItem('compareItems')
    const savedViewed = localStorage.getItem('viewedItems')
    
    if (savedFavorites) setFavoriteItems(JSON.parse(savedFavorites))
    if (savedCompare) setCompareItems(JSON.parse(savedCompare))
    if (savedViewed) setViewedItems(JSON.parse(savedViewed))
  }, [])

  // حفظ المفضلة والمقارنة في localStorage
  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    localStorage.setItem('compareItems', JSON.stringify(compareItems))
    localStorage.setItem('viewedItems', JSON.stringify(viewedItems))
  }, [favoriteItems, compareItems, viewedItems])

  // دالة نسخ رابط المنتج
  const copyProductLink = (id: number) => {
    const link = `${window.location.origin}/portfolio?product=${id}`
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedItemId(id)
        setTimeout(() => setCopiedItemId(null), 2000)
      })
      .catch(() => {
        alert("❌ فشل نسخ الرابط")
      })
  }

  // زر شغل العمولة
  const handleCommissionClick = () => {
    const whatsappLink = `https://wa.me/201015262864?text=${encodeURIComponent("مرحبا، أريد الاستفسار عن تصنيع قطعة خاصة (شغل عمولة)")}`
    window.open(whatsappLink, "_blank")
  }

  // تفعيل/إلغاء الإعجاب
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavoriteItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  // إضافة/إزالة من المقارنة
  const toggleCompare = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCompareItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id)
      } else {
        if (prev.length >= 3) {
          alert("يمكنك مقارنة 3 منتجات كحد أقصى")
          return prev
        }
        return [...prev, id]
      }
    })
  }

  // تفعيل عرض سريع
  const handleQuickView = (item: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuickViewItem(item)
  }

  // مشاركة المنتج
  const shareProduct = (item: any, platform: string) => {
    const productLink = `${window.location.origin}/portfolio?product=${item.id}`
    const message = `شاهد هذا المنتج الرائع: ${item.title}\n${productLink}`
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(productLink)
        alert('تم نسخ الرابط!')
        break
    }
    
    setShowShareMenu(null)
  }

  // قراءة الـ URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const productId = params.get("product")
    
    if (productId) {
      const item = products.find((p: any) => p.id === Number(productId))
      if (item) {
        setSelectedItem(item)
        setActiveImage(item.image)
        setViewedItems(prev => {
          if (!prev.includes(item.id)) {
            return [item.id, ...prev.slice(0, 9)]
          }
          return prev
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const categoryParam = params.get("category")
    if (categoryParam) {
      setActiveCategory(decodeURIComponent(categoryParam))
    }
  }, [products])

  // فلترة وترتيب المنتجات
  const filteredItems = useMemo(() => {
    return products
      .filter((item: any) => {
        const matchesCategory = activeCategory === "الكل" || item.category === activeCategory
        const matchesSearch = searchQuery === "" || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStock = !inStockOnly || item.inStock
        
        return matchesCategory && matchesSearch && matchesStock
      })
      .sort((a: any, b: any) => {
        switch (sortBy) {
          case "popular":
            return b.orders - a.orders
          case "rating":
            return b.rating - a.rating
          case "views":
            return b.views - a.views
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          default:
            return 0
        }
      })
  }, [products, activeCategory, searchQuery, sortBy, inStockOnly])

  // حساب الصفحات
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowToast(true)

    const productLink = `${window.location.origin}/portfolio?product=${selectedItem.id}`

    setTimeout(() => {
      setShowToast(false)

      if (selectedItem) {
        const whatsappLink = `https://wa.me/201015262864?text=${encodeURIComponent(
          `مرحبا، أريد الاستفسار عن المنتج التالي:\n\n` +
            `📌 اسم المنتج: ${selectedItem.title}\n` +
            `🏷️ الفئة: ${selectedItem.category}\n` +
            `🎨 اللون المختار: ${selectedColor || "لم يتم الاختيار"}\n` +
            `📐 المقاس: ${selectedItem.dimensions}\n` +
            `⭐ التقييم: ${selectedItem.rating} (${selectedItem.reviews} تقييم)\n` +
            `🔗 رابط المنتج: ${productLink}\n\n` +
            `يرجى إرسال السعر والتفاصيل المتعلقة بالمنتج.`
        )}`

        window.open(whatsappLink, "_blank")
      }
    }, 3000)
  }

  // تحديث URL عند تغيير الفلترة
  useEffect(() => {
    const params = new URLSearchParams()
    if (activeCategory !== "الكل") {
      params.set("category", activeCategory)
    }
    if (searchQuery) {
      params.set("search", searchQuery)
    }
    
    const newUrl = params.toString() 
      ? `/portfolio?${params.toString()}`
      : '/portfolio'
    
    router.push(newUrl, { scroll: false })
  }, [activeCategory, searchQuery, router])

  // المنتجات التي تم عرضها مؤخراً
  const recentlyViewed = useMemo(() => {
    return viewedItems
      .map(id => products.find((item: any) => item.id === id))
      .filter(item => item !== undefined)
  }, [viewedItems, products])

  // منتجات مشابهة
  const similarProducts = useMemo(() => {
    if (!selectedItem) return []
    return products
      .filter((item: any) => 
        item.id !== selectedItem.id && 
        (item.category === selectedItem.category || 
         item.tags?.some((tag: string) => selectedItem.tags?.includes(tag)))
      )
      .slice(0, 4)
  }, [selectedItem, products])

  return (
    <div className="space-y-8 px-3 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* شريط المقارنة */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
          <div className="bg-white rounded-xl shadow-2xl border p-4 animate-slideUp">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Compare className="w-5 h-5 text-primary" />
                <span className="hidden md:inline">قائمة المقارنة</span>
                <span className="md:hidden">مقارنة</span>
                ({compareItems.length}/3)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCompare(!showCompare)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {showCompare ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setCompareItems([])}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  مسح الكل
                </button>
              </div>
            </div>
            
            {showCompare && (
              <div className="space-y-3 mb-3">
                {compareItems.map(id => {
                  const item = products.find((p: any) => p.id === id)
                  if (!item) return null
                  
                  return (
                    <div key={id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            quality={60}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm line-clamp-1">{item.title}</div>
                          <div className="text-primary font-bold">{item.priceInfo}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setCompareItems(prev => prev.filter(i => i !== id))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCompare(true)}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition text-sm md:text-base"
              >
                عرض المقارنة
              </button>
              <button
                onClick={() => {
                  if (compareItems.length < 2) {
                    alert("يجب اختيار منتجين على الأقل للمقارنة")
                    return
                  }
                  const items = compareItems.map(id => products.find((p: any) => p.id === id))
                  console.log("مقارنة المنتجات:", items)
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm md:text-base"
              >
                مقارنة الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* عرض mode banner */}
      <div className={`p-3 rounded-lg text-center font-medium mb-4 ${
        viewMode === 'grid' 
          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
          : 'bg-green-50 text-green-700 border border-green-200'
      }`}>
        {viewMode === 'grid' 
          ? '📊 عرض الشبكة: عرض منتظم للمنتجات' 
          : '📋 عرض القائمة: تفاصيل أكثر للمنتجات'}
      </div>

      {/* زر شغل العمولة */}
      <div className="flex justify-center mb-4 sticky top-4 z-40">
        <button
          onClick={handleCommissionClick}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-yellow-900 font-bold py-3 px-4 md:px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base border-2 border-yellow-700 w-full max-w-md mx-2"
        >
          🛠️ شغل عمولة - اضغط للتواصل عبر واتساب
        </button>
      </div>

      {/* شريط الاتصال السريع */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-xl p-4 mb-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-3 rounded-full">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg">مستعدون للرد على استفساراتك</h3>
              <p className="text-gray-600">عروض وأسعار تنافسية - جودة عالية - ضمان طويل الأمد</p>
            </div>
          </div>
          <button
            onClick={handleCommissionClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
          >
            <MessageCircle className="w-5 h-5" />
            تواصل معنا للاستعلام
          </button>
        </div>
      </div>

      {/* المنتجات التي تم عرضها مؤخراً */}
      {recentlyViewed.length > 0 && (
        <div className="bg-secondary/20 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline">شاهدت مؤخراً</span>
              <span className="sm:hidden">المشاهدات</span>
            </h3>
            <button
              onClick={() => setViewedItems([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              مسح السجل
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {recentlyViewed.map((item: any) => (
              <div 
                key={item.id}
                onClick={() => {
                  setSelectedItem(item)
                  setActiveImage(item.image)
                }}
                className="cursor-pointer group"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    quality={60}
                    loading="lazy"
                  />
                </div>
                <div className="text-xs font-medium line-clamp-2 text-center">{item.title}</div>
                <div className="text-xs text-primary font-bold text-center">{item.priceInfo}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg bg-secondary"
          >
            ☰
          </button>
          <h1 className="font-bold text-lg">المعرض</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="p-2 rounded-lg bg-secondary"
          >
            <Filter className="w-5 h-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 px-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="bg-white w-64 h-full p-4 animate-slideInRight">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl">القائمة</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-3">الفئات</h3>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setCurrentPage(1)
                      setShowMobileMenu(false)
                    }}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg text-right ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs opacity-75">{category.count} منتج</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg mb-3">التصنيف</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="bg-white w-full h-3/4 mt-auto rounded-t-2xl p-4 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl">الفلاتر</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">عرض المتوفر فقط</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCategoryCounts}
                    onChange={(e) => setShowCategoryCounts(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">عرض أعداد المنتجات</span>
                </label>
              </div>
              
              <div className="pt-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary">{filteredItems.length}</div>
                  <div className="text-gray-600">منتج متوافق</div>
                </div>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-3 bg-primary text-white rounded-lg font-bold"
                >
                  تطبيق الفلاتر
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="hidden lg:block text-sm text-muted-foreground mb-6 bg-secondary/30 p-3 rounded-lg">
        <button 
          onClick={() => router.push("/")} 
          className="hover:text-primary transition-colors"
        >
          الرئيسية
        </button>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">المعرض</span>
        {activeCategory !== "الكل" && (
          <>
            <span className="mx-2">/</span>
            <span className="font-medium">
              {categories.find(c => c.id === activeCategory)?.name || activeCategory}
            </span>
          </>
        )}
      </div>

      {/* Search and Filters */}
      <div className="hidden lg:flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="ابحث عن منتج، فئة، أو وصف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowCategoryCounts(!showCategoryCounts)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              {showCategoryCounts ? "إخفاء الأعداد" : "عرض الأعداد"}
            </button>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
          >
            {showFilters ? "إخفاء الفلترة" : "عرض الفلترة"}
            <span>⚙️</span>
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-[180px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="hidden lg:block bg-secondary/20 p-4 rounded-lg mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">عرض المتوفر فقط</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">إظهار النتائج</label>
              <div className="text-lg font-bold text-primary">
                {filteredItems.length} منتج
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {filteredItems.filter((item: any) => item.inStock).length} متوفر
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-center hidden sm:block">تصفح مجموعاتنا</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentPage(1)
              }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 min-w-[80px] sm:min-w-[100px] ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105 border-2 border-primary"
                  : "bg-secondary hover:bg-secondary/80 hover:shadow-md border-2 border-transparent"
              }`}
            >
              <span className="text-3xl sm:text-4xl">{category.icon}</span>
              <div className="flex flex-col items-center">
                <span className="font-medium text-sm sm:text-base text-center">{category.name}</span>
                {showCategoryCounts && (
                  <span className={`text-xs mt-1 px-2 py-1 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {category.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* عرض المنتجات - Grid أو List */}
      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-xl font-semibold mb-2">لا توجد منتجات</h3>
          <p className="text-muted-foreground">جرب تغيير معايير البحث أو الفلترة</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            // ==================== GRID VIEW مع شارة العرض ====================
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentItems.map((item: any, index: number) => {
                const isFavorite = favoriteItems.includes(item.id)
                const inCompare = compareItems.includes(item.id)
                const isRecentlyViewed = viewedItems.includes(item.id)
                const isNew = new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                
                return (
                  <div 
                    key={item.id} 
                    className="group rounded-xl overflow-hidden bg-card border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                  >
                    {/* شارة العرض - تظهر فوق كل الشارات */}
                    {item.sale && (
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg animate-pulse">
                          <div className="flex items-center gap-1">
                            <span className="text-lg">🔥</span>
                            <span className="font-bold text-sm">خصم {item.sale.discount_percentage}%</span>
                          </div>
                          <div className="text-xs mt-1">
                            <CountdownTimer endDate={item.sale.end_date} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* باقي الشارات */}
                    {isNew && !item.sale && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        🆕 جديد
                      </div>
                    )}
                    {isRecentlyViewed && !item.sale && (
                      <div className="absolute top-12 right-3 z-10 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        👀 شاهدته
                      </div>
                    )}
                    
                    {/* صورة المنتج والأزرار العائمة */}
                    <div
                      onClick={() => {
                        setSelectedItem(item)
                        setActiveImage(item.image)
                        setSelectedColor("")
                        setViewedItems(prev => {
                          if (!prev.includes(item.id)) {
                            return [item.id, ...prev.slice(0, 9)]
                          }
                          return prev
                        })
                        router.push(`/portfolio?product=${item.id}`, { scroll: false })
                      }}
                      className="cursor-pointer relative"
                    >
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                          {item.tags.map((tag: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* أزرار (مفضلة، مقارنة، عرض سريع، مشاركة) */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className={`p-2 rounded-full transition-colors ${
                            isFavorite ? "bg-red-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"
                          }`}
                          title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                        >
                          <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        
                        <button
                          onClick={(e) => toggleCompare(item.id, e)}
                          className={`p-2 rounded-full transition-colors ${
                            inCompare ? "bg-blue-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"
                          }`}
                          title={inCompare ? "إزالة من المقارنة" : "إضافة للمقارنة"}
                        >
                          <Compare className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={(e) => handleQuickView(item, e)}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                          title="عرض سريع"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowShareMenu(showShareMenu === item.id ? null : item.id)
                            }}
                            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            title="مشاركة"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          
                          {showShareMenu === item.id && (
                            <div className="absolute left-full top-0 ml-1 bg-white rounded-lg shadow-xl border p-2 w-40">
                              <button
                                onClick={() => shareProduct(item, 'whatsapp')}
                                className="w-full text-right p-2 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                              >
                                واتساب
                                <span className="text-green-500">📱</span>
                              </button>
                              <button
                                onClick={() => shareProduct(item, 'facebook')}
                                className="w-full text-right p-2 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                              >
                                فيسبوك
                                <span className="text-blue-500">📘</span>
                              </button>
                              <button
                                onClick={() => shareProduct(item, 'copy')}
                                className="w-full text-right p-2 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                              >
                                نسخ الرابط
                                <span className="text-gray-500">🔗</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* غير متوفر */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <span className="bg-white text-black px-4 py-2 rounded-lg font-bold">
                            غير متوفر حالياً
                          </span>
                        </div>
                      )}
                      
                      {/* الصورة */}
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={400}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={75}
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{item.icon || "📦"}</span>
                            <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                              {item.category}
                            </p>
                          </div>
                          <h3 className="text-lg font-bold mt-1 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* عرض بعض المميزات */}
                      {item.features && item.features.length > 0 && (
                        <div className="space-y-1">
                          {item.features.slice(0, 2).map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <Sparkles className="w-3 h-3 text-yellow-500" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* التقييم وعدد المشاهدات والطلبات */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-gray-500">({item.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{item.views}</span>
                          <ShoppingBag className="w-4 h-4" />
                          <span>{item.orders}</span>
                        </div>
                      </div>

                      {/* السعر - مع عرض السعر القديم إذا كان هناك خصم */}
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag className="w-4 h-4 text-primary" />
                          {item.sale ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                {item.priceInfo} (بعد الخصم)
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                السعر الأصلي
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-primary">{item.priceInfo}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          اسعار تنافسية وجودة لا تضاهى - تواصل للاستعلام
                        </p>
                      </div>

                      {/* معلومات إضافية */}
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>التوصيل خلال {item.estimatedDelivery}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">المقاس:</span>
                          <span>{item.dimensions}</span>
                        </div>
                      </div>

                      {/* أزرار التفاعل */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyProductLink(item.id)
                          }}
                          className={`flex-1 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm ${
                            copiedItemId === item.id
                              ? "bg-green-500 text-white"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {copiedItemId === item.id ? "✅ تم النسخ" : "🔗 نسخ الرابط"}
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setActiveImage(item.image)
                            setSelectedColor("")
                          }}
                          className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition text-sm flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          استفسر الآن
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // ==================== LIST VIEW مع شارة العرض ====================
            <div className="space-y-4">
              {currentItems.map((item: any, index: number) => {
                const isFavorite = favoriteItems.includes(item.id)
                const inCompare = compareItems.includes(item.id)
                const isNew = new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                
                return (
                  <div 
                    key={item.id} 
                    className="group flex flex-col md:flex-row gap-4 rounded-xl overflow-hidden bg-card border hover:shadow-xl transition-all duration-300 p-4"
                  >
                    {/* صورة المنتج مع شارة العرض */}
                    <div className="cursor-pointer relative md:w-1/3">
                      {/* شارة العرض */}
                      {item.sale && (
                        <div className="absolute top-3 right-3 z-20">
                          <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg">
                            <div className="flex items-center gap-1">
                              <span className="text-lg">🔥</span>
                              <span className="font-bold text-sm">خصم {item.sale.discount_percentage}%</span>
                            </div>
                            <div className="text-xs mt-1">
                              <CountdownTimer endDate={item.sale.end_date} />
                            </div>
                          </div>
                        </div>
                      )}

                      {isNew && !item.sale && (
                        <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          🆕 جديد
                        </div>
                      )}
                      
                      <div
                        onClick={() => {
                          setSelectedItem(item)
                          setActiveImage(item.image)
                          setSelectedColor("")
                          setViewedItems(prev => {
                            if (!prev.includes(item.id)) {
                              return [item.id, ...prev.slice(0, 9)]
                            }
                            return prev
                          })
                          router.push(`/portfolio?product=${item.id}`, { scroll: false })
                        }}
                      >
                        {/* أزرار علوية */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                          <button
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className={`p-2 rounded-full transition-colors ${
                              isFavorite ? "bg-red-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"
                            }`}
                          >
                            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={(e) => toggleCompare(item.id, e)}
                            className={`p-2 rounded-full transition-colors ${
                              inCompare ? "bg-blue-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"
                            }`}
                          >
                            <Compare className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                            <span className="bg-white text-black px-4 py-2 rounded-lg font-bold">
                              غير متوفر حالياً
                            </span>
                          </div>
                        )}
                        
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={400}
                            height={400}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                            quality={75}
                            priority={index < 2}
                            loading={index < 2 ? "eager" : "lazy"}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* تفاصيل المنتج في وضع القائمة */}
                    <div className="flex-1 p-2 space-y-4">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{item.icon || "📦"}</span>
                              <div>
                                <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                                  {item.category}
                                </p>
                                {isNew && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    جديد
                                  </span>
                                )}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold">
                              {item.title}
                            </h3>
                          </div>
                          
                          {/* السعر بشكل بارز */}
                          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Tag className="w-5 h-5 text-primary" />
                              <div className="text-right">
                                {item.sale ? (
                                  <>
                                    <div className="font-bold text-primary text-lg">{item.priceInfo} (بعد الخصم)</div>
                                    <div className="text-sm text-gray-400 line-through">السعر الأصلي</div>
                                  </>
                                ) : (
                                  <div className="font-bold text-primary text-lg">{item.priceInfo}</div>
                                )}
                                <div className="text-sm text-gray-600">تواصل للاستعلام</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* التقييم والإحصائيات */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-gray-500">({item.reviews} تقييم)</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{item.views} مشاهدة</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <ShoppingBag className="w-4 h-4" />
                            <span>{item.orders} طلب</span>
                          </div>
                        </div>
                        
                        {/* الوصف */}
                        <p className="text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        
                        {/* المميزات */}
                        {item.features && item.features.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                            {item.features.map((feature: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-sm bg-secondary/50 p-2 rounded">
                                <Award className="w-3 h-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* معلومات إضافية */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-gray-500">التوصيل خلال</div>
                              <div className="font-medium">{item.estimatedDelivery}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">المقاس:</span>
                            <span className="font-medium">{item.dimensions}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">آخر طلب:</span>
                            <span className="font-medium">{item.lastOrder}</span>
                          </div>
                        </div>
                        
                        {/* التفاصيل الكاملة */}
                        {item.details && item.details[0] && (
                          <div className="space-y-1 mb-4">
                            <h4 className="font-semibold text-sm">المواصفات:</h4>
                            <ul className="text-sm space-y-1">
                              {item.details.map((detail: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* الألوان المتاحة */}
                        {item.colors && item.colors.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">الألوان المتاحة:</h4>
                            <div className="flex gap-2 flex-wrap">
                              {item.colors.map((color: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-secondary text-sm"
                                >
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* أزرار التفاعل في وضع القائمة */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyProductLink(item.id)
                          }}
                          className={`flex-1 md:flex-none py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm ${
                            copiedItemId === item.id
                              ? "bg-green-500 text-white"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {copiedItemId === item.id ? "✅ تم النسخ" : "🔗 نسخ الرابط"}
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setActiveImage(item.image)
                            setSelectedColor("")
                          }}
                          className="flex-1 md:flex-none py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition text-sm flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          استفسر الآن
                        </button>
                        
                        <button
                          onClick={(e) => toggleCompare(item.id, e)}
                          className={`flex-1 md:flex-none py-2 px-4 rounded-lg font-medium transition text-sm flex items-center justify-center gap-2 ${
                            inCompare ? "bg-blue-500 text-white" : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          <Compare className="w-4 h-4" />
                          {inCompare ? "تمت الإضافة" : "مقارنة"}
                        </button>
                        
                        <button
                          onClick={handleWhatsAppClick}
                          className="flex-1 md:flex-none py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition text-sm flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          واتساب مباشر
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
              <div className="text-sm text-gray-500">
                عرض {Math.min((currentPage - 1) * itemsPerPage + 1, filteredItems.length)} إلى {Math.min(currentPage * itemsPerPage, filteredItems.length)} من {filteredItems.length} منتج
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition"
                >
                  السابق
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition ${
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Quick View Modal */}
      {quickViewItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{quickViewItem.icon || "📦"}</span>
                  <h3 className="text-xl font-bold">{quickViewItem.title}</h3>
                </div>
                <button
                  onClick={() => setQuickViewItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={quickViewItem.image}
                    alt={quickViewItem.title}
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 400px"
                    quality={85}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-semibold">
                      {quickViewItem.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{quickViewItem.rating}</span>
                      <span className="text-gray-500">({quickViewItem.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">{quickViewItem.description}</p>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Tag className="w-6 h-6 text-primary" />
                      <div>
                        {quickViewItem.sale ? (
                          <>
                            <div className="font-bold text-primary text-xl">{quickViewItem.priceInfo} (بعد الخصم)</div>
                            <div className="text-sm text-gray-400 line-through">السعر الأصلي</div>
                            <div className="text-xs text-red-600 mt-1">
                              <CountdownTimer endDate={quickViewItem.sale.end_date} />
                            </div>
                          </>
                        ) : (
                          <div className="font-bold text-primary text-xl">{quickViewItem.priceInfo}</div>
                        )}
                        <p className="text-sm text-gray-600 mt-1">
                          اسعار تنافسية وجودة عالية - تواصل معنا للاستفسار عن السعر والتفاصيل
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {quickViewItem.features && quickViewItem.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">المميزات:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {quickViewItem.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSelectedItem(quickViewItem)
                        setActiveImage(quickViewItem.image)
                        setQuickViewItem(null)
                      }}
                      className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      استفسر عن السعر والتفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-auto">
          <button
            onClick={() => {
              setSelectedItem(null)
              router.push("/portfolio", { scroll: false })
            }}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-2xl z-10 p-2 hover:bg-secondary rounded-full transition"
          >
            ✕
          </button>

          <div className="bg-background w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[95vh] sm:rounded-2xl relative sm:my-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
              {/* Images */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src={activeImage}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={85}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                    alt={selectedItem.title}
                    priority
                  />
                  {!selectedItem.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-lg">
                        غير متوفر حالياً
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                  {selectedItem.images && selectedItem.images.map((img: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 ${
                        activeImage === img ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        width={60}
                        height={60}
                        sizes="60px"
                        quality={50}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover"
                        alt={`صورة ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl">{selectedItem.icon || "📦"}</span>
                      <span className="text-xs sm:text-sm text-primary font-semibold uppercase tracking-wider">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                      <span className="font-medium text-sm sm:text-base">{selectedItem.rating}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">({selectedItem.reviews} تقييم)</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2">{selectedItem.title}</h2>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">{selectedItem.description}</p>
                  
                  <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{selectedItem.views} مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{selectedItem.orders} طلب</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>آخر طلب: {selectedItem.lastOrder}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary text-white p-2 rounded-lg">
                      <Tag className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg sm:text-xl">معلومات السعر</h4>
                      {selectedItem.sale ? (
                        <>
                          <p className="font-bold text-lg sm:text-xl text-gray-800">{selectedItem.priceInfo} (بعد الخصم)</p>
                          <p className="text-sm text-gray-400 line-through">السعر الأصلي</p>
                          <div className="mt-2">
                            <CountdownTimer endDate={selectedItem.sale.end_date} />
                          </div>
                        </>
                      ) : (
                        <p className="font-bold text-lg sm:text-xl text-gray-800">{selectedItem.priceInfo}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">
                    نحن نقدم أفضل الأسعار مع أعلى مستويات الجودة. تواصل معنا للحصول على عرض سعر خاص والتفاصيل الكاملة.
                  </p>
                </div>

                {/* باقي التفاصيل كما هي */}
                {selectedItem.features && selectedItem.features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      مميزات المنتج:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedItem.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.details && selectedItem.details[0] && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base sm:text-lg">تفاصيل المنتج:</h4>
                    <ul className="space-y-1 text-sm sm:text-base">
                      {selectedItem.details.map((detail: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.colors && selectedItem.colors.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3">اختر اللون:</h4>
                    <div className="flex gap-2 sm:gap-3 flex-wrap">
                      {selectedItem.colors.map((color: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 sm:px-4 py-2 rounded-full border text-sm transition-all ${
                            selectedColor === color
                              ? "bg-primary text-primary-foreground border-primary scale-105"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    معلومات التوصيل
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">مدة التصنيع:</span>
                      <span className="font-medium">15-20 يوم عمل</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">مدة التوصيل:</span>
                      <span className="font-medium">3-7 أيام بعد التصنيع</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التوصيل:</span>
                      <span className="font-medium text-green-600">شحن لجميع المحافظات</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الضمان:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Shield className="w-4 h-4 text-green-600" />
                        5 سنوات
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">هل تريد سعر خاص؟</h4>
                      <p className="text-sm">تواصل معنا للحصول على أفضل عرض</p>
                    </div>
                    <Gift className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-xl transition text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    تواصل الآن للاستفسار عن السعر
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyProductLink(selectedItem.id)
                      }}
                      className={`py-2 sm:py-3 rounded-lg font-medium transition flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                        copiedItemId === selectedItem.id
                          ? "bg-green-500 text-white"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {copiedItemId === selectedItem.id ? "✅ تم النسخ" : "🔗 نسخ الرابط"}
                    </button>
                    
                    <button
                      onClick={(e) => toggleFavorite(selectedItem.id, e)}
                      className={`py-2 sm:py-3 rounded-lg font-medium transition flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                        favoriteItems.includes(selectedItem.id)
                          ? "bg-red-500 text-white"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={favoriteItems.includes(selectedItem.id) ? "currentColor" : "none"} />
                      {favoriteItems.includes(selectedItem.id) ? "في المفضلة" : "إضافة للمفضلة"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="border-t mt-6 pt-6 px-3 sm:px-4 md:px-6 pb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">منتجات مشابهة</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {similarProducts.map((product: any) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedItem(product)
                        setActiveImage(product.image)
                      }}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-2">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={200}
                          height={200}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                          quality={75}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-medium line-clamp-1">{product.title}</div>
                      <div className="text-primary font-bold text-sm sm:text-base">{product.priceInfo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-xl animate-fade-in-out z-50 flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <p className="font-bold">تنويه هام</p>
            <p className="text-sm">سيتم تحويلك للواتساب للاستفسار عن السعر والتفاصيل</p>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        @media (max-width: 640px) {
          .sm\:hidden {
            display: none !important;
          }
          
          input, select, button {
            font-size: 16px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .md\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}