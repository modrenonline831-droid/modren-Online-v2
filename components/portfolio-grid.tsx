"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Share2, Heart, Filter, Eye, ShoppingBag, Clock, Shield, Truck,
  Star, GitCompare as Compare, ChevronDown, ChevronUp, Search, X,
  MessageCircle, Phone, Tag, Award, Zap, Sparkles, Gift, CreditCard
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
  
  // State للدفع والعربون
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [depositForm, setDepositForm] = useState({ 
    name: '', 
    phone: '',
    amount: '',
    paymentMethod: '',
    selectedAccount: '',
    transferFrom: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<any>(null)
  
  const itemsPerPage = 9

  // بيانات الدفع - أرقام حقيقية مع أسماء
  const paymentAccounts = {
    vodafone: [
      { name: "ziad elkhamesyy", number: "01034909863", bank: "فودافون كاش" },
      { name: "gihan a elshamy", number: "01015262864", bank: "فودافون كاش" },
      { name: "ziad elkhamesyy", number: "01034869376", bank: "فودافون كاش" },
    ],
    instapay: [],
    binance: []
  }

  // حسابات الفئات
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

  // الفئات مع الأرقام
  const categories = useMemo(() => [
    { id: "الكل", name: "الكل", icon: "📦", count: categoryCounts["الكل"] },
    { id: "أنترية مغلف", name: "أنترية مغلف", icon: "🛋️", count: categoryCounts["أنترية مغلف"] },
    { id: "ركن", name: "ركن", icon: "🪑", count: categoryCounts["ركن"] },
    { id: "طرابيزات", name: "طرابيزات", icon: "🪵", count: categoryCounts["طرابيزات"] },
    { id: "جزمات", name: "جزمات", icon: "👞", count: categoryCounts["جزمات"] },
    { id: "فوتية", name: "فوتية", icon: "🛋", count: categoryCounts["فوتية"] },
    { id: "كراسي", name: "كراسي", icon: "💺", count: categoryCounts["كراسي"] }
  ], [categoryCounts])

  // تحميل المفضلة والمقارنة
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteItems')
    const savedCompare = localStorage.getItem('compareItems')
    const savedViewed = localStorage.getItem('viewedItems')
    
    if (savedFavorites) setFavoriteItems(JSON.parse(savedFavorites))
    if (savedCompare) setCompareItems(JSON.parse(savedCompare))
    if (savedViewed) setViewedItems(JSON.parse(savedViewed))
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    localStorage.setItem('compareItems', JSON.stringify(compareItems))
    localStorage.setItem('viewedItems', JSON.stringify(viewedItems))
  }, [favoriteItems, compareItems, viewedItems])

  // دوال مساعدة
  const copyProductLink = (id: number) => {
    const link = `${window.location.origin}/portfolio?product=${id}`
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedItemId(id)
        setTimeout(() => setCopiedItemId(null), 2000)
      })
      .catch(() => alert("❌ فشل نسخ الرابط"))
  }

  const handleCommissionClick = () => {
    const whatsappLink = `https://wa.me/201015262864?text=${encodeURIComponent("مرحبا، أريد الاستفسار عن تصنيع قطعة خاصة (شغل عمولة)")}`
    window.open(whatsappLink, "_blank")
  }

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavoriteItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const toggleCompare = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCompareItems(prev => {
      if (prev.includes(id)) return prev.filter(itemId => itemId !== id)
      if (prev.length >= 3) {
        alert("يمكنك مقارنة 3 منتجات كحد أقصى")
        return prev
      }
      return [...prev, id]
    })
  }

  const handleQuickView = (item: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuickViewItem(item)
  }

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

  // قراءة URL parameters
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
          case "popular": return b.orders - a.orders
          case "rating": return b.rating - a.rating
          case "views": return b.views - a.views
          case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          default: return 0
        }
      })
  }, [products, activeCategory, searchQuery, sortBy, inStockOnly])

  // حساب الصفحات
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // دالة التواصل عبر واتساب
  const handleWhatsAppClick = (e: React.MouseEvent, item?: any) => {
    e.preventDefault()
    setShowToast(true)

    const product = item || selectedItem
    const productLink = `${window.location.origin}/portfolio?product=${product.id}`

    setTimeout(() => {
      setShowToast(false)
      
      const whatsappLink = `https://wa.me/201015262864?text=${encodeURIComponent(
        `مرحبا، أريد الاستفسار عن المنتج التالي:\n\n` +
        `📌 اسم المنتج: ${product.title}\n` +
        `🏷️ الفئة: ${product.category}\n` +
        `🎨 اللون المختار: ${selectedColor || "لم يتم الاختيار"}\n` +
        `📐 المقاس: ${product.dimensions}\n` +
        `⭐ التقييم: ${product.rating} (${product.reviews} تقييم)\n` +
        `🔗 رابط المنتج: ${productLink}\n\n` +
        `يرجى إرسال السعر والتفاصيل المتعلقة بالمنتج.`
      )}`

      window.open(whatsappLink, "_blank")
    }, 3000)
  }

  // دالة إرسال واتساب عبر UltraMsg
  const sendUltraMsg = async (to: string, message: string) => {
    try {
      console.log('📤 Sending to API:', { to, messageLength: message.length })
      
      const response = await fetch('/api/ultramsg', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          to, 
          message 
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API response not OK:', response.status, errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📥 API response:', data)
      return data
    } catch (error) {
      console.error('❌ sendUltraMsg error:', error)
      return null
    }
  }

  // دالة دفع العربون
  const submitDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // التحقق من اكتمال البيانات
      if (!depositForm.name || !depositForm.phone || !depositForm.amount || !depositForm.paymentMethod || !depositForm.selectedAccount) {
        alert('يرجى إكمال جميع البيانات')
        setSubmitting(false)
        return
      }

      // اختيار الحساب المحدد
      const selectedAccountData = paymentAccounts[depositForm.paymentMethod as keyof typeof paymentAccounts]
        .find(acc => acc.number === depositForm.selectedAccount)
      
      if (!selectedAccountData) {
        alert('حدث خطأ في اختيار الحساب')
        setSubmitting(false)
        return
      }

      // إنشاء رقم طلب فريد
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`
      
      // حفظ الطلب في Supabase
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: orderNumber,
          product_id: selectedItem.id,
          product_title: selectedItem.title,
          product_price: selectedItem.priceInfo,
          customer_name: depositForm.name,
          customer_phone: depositForm.phone,
          deposit_amount: parseInt(depositForm.amount),
          payment_method: depositForm.paymentMethod,
          payment_account: selectedAccountData.number,
          account_owner: selectedAccountData.name,
          transfer_from: depositForm.transferFrom,
          status: 'قيد المراجعة'
        })
      })
      
      if (!response.ok) {
        throw new Error('فشل في حفظ الطلب')
      }
      
      const order = await response.json()
      
      // إرسال إشعار واتساب للأدمن عبر UltraMsg
      const adminMessage = 
        `🛑 *طلب عربون جديد* 🛑\n` +
        `-------------------\n` +
        `👤 *العميل:* ${depositForm.name}\n` +
        `📱 *رقم العميل:* ${depositForm.phone}\n` +
        `🆔 *رقم الطلب:* ${orderNumber}\n` +
        `📦 *المنتج:* ${selectedItem.title}\n` +
        `💰 *المبلغ:* ${depositForm.amount} جنيه\n` +
        `💳 *الطريقة:* ${depositForm.paymentMethod === 'vodafone' ? 'فودافون كاش' : depositForm.paymentMethod === 'instapay' ? 'إنستاباي' : 'بينانس'}\n` +
        `📱 *رقم الحساب:* ${selectedAccountData.number}\n` +
        `👤 *صاحب الحساب:* ${selectedAccountData.name}\n` +
        `📱 *محول منه:* ${depositForm.transferFrom || 'لم يذكر'}\n` +
        `-------------------\n` +
        `⏰ *التاريخ:* ${new Date().toLocaleString('ar-EG')}\n` +
        `🔗 *الرابط:* ${window.location.origin}/portfolio?product=${selectedItem.id}`
      
      await sendUltraMsg('201034909863', adminMessage) // رقمك
	  await sendUltraMsg('201015262864', adminMessage) 
      
      // إرسال إيصال للعميل عبر UltraMsg
      const customerMessage = 
        `✅ *تم استلام طلب العربون بنجاح* ✅\n` +
        `-------------------\n` +
        `🆔 *رقم الطلب:* ${orderNumber}\n` +
        `📦 *المنتج:* ${selectedItem.title}\n` +
        `💰 *المبلغ:* ${depositForm.amount} جنيه\n` +
        `📱 *محول منه:* ${depositForm.transferFrom}\n` +
        `-------------------\n` +
        `📱 *بيانات الدفع:*\n` +
        `الطريقة: ${depositForm.paymentMethod === 'vodafone' ? 'فودافون كاش' : depositForm.paymentMethod === 'instapay' ? 'إنستاباي' : 'بينانس'}\n` +
        `الحساب: ${selectedAccountData.number}\n` +
        `صاحب الحساب: ${selectedAccountData.name}\n` +
        `-------------------\n` +
        `📸 *هام:* من فضلك صور الشاشة دي كإثبات للدفع\n` +
        `📞 *للتواصل:* واتساب 01015262864\n` +
        `-------------------\n` +
        `🙏 شكراً لثقتك في منتجاتنا`
      
      await sendUltraMsg(depositForm.phone, customerMessage)
      
      // عرض النتيجة للعميل
      setOrderResult({
        order_number: orderNumber,
        product_title: selectedItem.title,
        amount: depositForm.amount,
        transfer_from: depositForm.transferFrom,
        payment_account: selectedAccountData.number,
        account_owner: selectedAccountData.name,
        method: depositForm.paymentMethod
      })
      
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ: ' + (error instanceof Error ? error.message : 'حاول مرة أخرى'))
    } finally {
      setSubmitting(false)
    }
  }

  // تحديث URL عند تغيير الفلترة
  useEffect(() => {
    const params = new URLSearchParams()
    if (activeCategory !== "الكل") params.set("category", activeCategory)
    if (searchQuery) params.set("search", searchQuery)
    
    const newUrl = params.toString() ? `/portfolio?${params.toString()}` : '/portfolio'
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
                مقارنة ({compareItems.length}/3)
              </h3>
              <button onClick={() => setCompareItems([])} className="text-red-500 text-sm">
                مسح الكل
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCompare(true)}
                className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
              >
                عرض المقارنة
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-xl p-4 mb-6">
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
            onClick={() => window.open('https://wa.me/201015262864', '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
          >
            <MessageCircle className="w-5 h-5" />
            تواصل معنا
          </button>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow sticky top-0 z-30">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 rounded-lg bg-secondary">
          ☰
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="p-2 rounded-lg bg-secondary">
            <Filter className="w-5 h-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 px-4 py-2 rounded-lg border text-sm"
            />
            <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Desktop Search and Filters */}
      <div className="hidden lg:flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="ابحث عن منتج، فئة، أو وصف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-primary shadow-sm"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border min-w-[180px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setCurrentPage(1) }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 min-w-[80px] ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="font-medium text-sm text-center">{category.name}</span>
              {showCategoryCounts && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id ? "bg-white/20" : "bg-primary/10 text-primary"
                }`}>
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* عرض المنتجات */}
      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-xl font-semibold mb-2">لا توجد منتجات</h3>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            // GRID VIEW
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentItems.map((item: any, index: number) => {
                const isFavorite = favoriteItems.includes(item.id)
                const inCompare = compareItems.includes(item.id)
                const isNew = new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                
                return (
                  <div key={item.id} className="group rounded-xl overflow-hidden bg-card border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
                    
                    {/* شارة العرض */}
                    {item.sale && (
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg animate-pulse">
                          <div className="flex items-center gap-1">
                            <span className="text-lg">🔥</span>
                            <span className="font-bold text-sm">خصم {item.sale.discount_percentage}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* أزرار علوية */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      <button onClick={(e) => toggleFavorite(item.id, e)} 
                        className={`p-2 rounded-full ${isFavorite ? "bg-red-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"}`}>
                        <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                      <button onClick={(e) => toggleCompare(item.id, e)} 
                        className={`p-2 rounded-full ${inCompare ? "bg-blue-500 text-white" : "bg-black/50 hover:bg-black/70 text-white"}`}>
                        <Compare className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => handleQuickView(item, e)} 
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* صورة المنتج */}
                    <div onClick={() => {
                      setSelectedItem(item)
                      setActiveImage(item.image)
                      setViewedItems(prev => !prev.includes(item.id) ? [item.id, ...prev.slice(0, 9)] : prev)
                      router.push(`/portfolio?product=${item.id}`, { scroll: false })
                    }} className="cursor-pointer">
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <span className="bg-white text-black px-4 py-2 rounded-lg font-bold">غير متوفر</span>
                        </div>
                      )}
                      <div className="aspect-square overflow-hidden">
                        <Image src={item.image} alt={item.title} width={400} height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      </div>
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.icon || "📦"}</span>
                        <p className="text-xs text-primary font-semibold">{item.category}</p>
                      </div>
                      <h3 className="text-lg font-bold line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                      {/* التقييم */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{item.rating}</span>
                          <span className="text-gray-500">({item.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{item.views}</span>
                        </div>
                      </div>

                      {/* السعر */}
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          <span className="font-bold text-primary">{item.priceInfo}</span>
                        </div>
                      </div>

                      {/* أزرار التفاعل - كل منتج له أزراره الخاصة */}
                      <div className="flex flex-col gap-2 pt-2">
                        {/* زر التواصل عبر واتساب */}
                        <button
                          onClick={(e) => handleWhatsAppClick(e, item)}
                          className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          تواصل عبر واتساب
                        </button>

                        {/* زر دفع العربون */}
                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setShowDepositModal(true)
                          }}
                          className="w-full py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2 text-sm"
                        >
                          <CreditCard className="w-4 h-4" />
                          ادفع عربون واحجز المنتج
                        </button>

                        {/* زر نسخ الرابط */}
                        <button
                          onClick={() => copyProductLink(item.id)}
                          className={`w-full py-2 rounded-lg font-medium transition text-sm ${
                            copiedItemId === item.id ? "bg-green-500 text-white" : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {copiedItemId === item.id ? "✅ تم النسخ" : "🔗 نسخ الرابط"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // LIST VIEW
            <div className="space-y-4">
              {currentItems.map((item: any) => (
                <div key={item.id} className="group flex flex-col md:flex-row gap-4 rounded-xl bg-card border hover:shadow-xl p-4">
                  
                  {/* صورة المنتج */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.title} width={400} height={400}
                        className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{item.rating} ({item.reviews})</span>
                      </div>
                      <div className="text-primary font-bold">{item.priceInfo}</div>
                    </div>

                    {/* أزرار التفاعل في وضع القائمة */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button onClick={(e) => handleWhatsAppClick(e, item)}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm">
                        <MessageCircle className="w-4 h-4" /> واتساب
                      </button>
                      <button onClick={() => { setSelectedItem(item); setShowDepositModal(true); }}
                        className="flex-1 py-2 bg-amber-500 text-white rounded-lg flex items-center justify-center gap-2 text-sm">
                        <CreditCard className="w-4 h-4" /> عربون
                      </button>
                      <button onClick={() => copyProductLink(item.id)}
                        className="flex-1 py-2 bg-secondary rounded-lg text-sm">
                        نسخ الرابط
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition ${
                    currentPage === page ? "bg-primary text-white" : "bg-secondary hover:bg-secondary/80"
                  }`}>
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ========== مودال دفع العربون ========== */}
      {showDepositModal && selectedItem && !orderResult && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            
            {/* الهيدر */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-amber-500" />
                دفع عربون الحجز
              </h3>
              <button onClick={() => setShowDepositModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            
            {/* معلومات المنتج */}
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-lg">{selectedItem.title}</p>
              <p className="text-amber-700 mt-1">المنتج: <span className="font-medium">{selectedItem.category}</span></p>
            </div>
            
            <form onSubmit={submitDeposit} className="space-y-4">
              
              {/* بيانات العميل */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم كاملاً <span className="text-red-500">*</span></label>
                  <input type="text" required value={depositForm.name}
                    onChange={(e) => setDepositForm({...depositForm, name: e.target.value})}
                    className="w-full border p-3 rounded-lg" placeholder="محمد أحمد" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">رقم الواتساب <span className="text-red-500">*</span></label>
                  <input type="tel" required value={depositForm.phone}
                    onChange={(e) => setDepositForm({...depositForm, phone: e.target.value})}
                    className="w-full border p-3 rounded-lg" placeholder="01012345678" dir="ltr" />
                </div>
              </div>
              
              {/* مبلغ التحويل */}
              <div>
                <label className="block text-sm font-medium mb-1">المبلغ المحول (عربون) <span className="text-red-500">*</span></label>
                <input type="number" required min="100" value={depositForm.amount}
                  onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                  className="w-full border p-3 rounded-lg" placeholder="2000" />
                <p className="text-xs text-gray-500 mt-1">يمكنك تحويل 2000 جنيه أو أكثر حسب رغبتك</p>
              </div>
              
              {/* رقم المحول منه */}
              <div>
                <label className="block text-sm font-medium mb-1">رقم المحول منه (الرقم اللي حولت منه) <span className="text-red-500">*</span></label>
                <input type="text" required value={depositForm.transferFrom}
                  onChange={(e) => setDepositForm({...depositForm, transferFrom: e.target.value})}
                  className="w-full border p-3 rounded-lg" placeholder="01012345678" dir="ltr" />
                <p className="text-xs text-gray-500 mt-1">الرقم اللي استخدمته في التحويل</p>
              </div>
              
              {/* اختيار طريقة الدفع */}
              <div>
                <label className="block text-sm font-medium mb-3">اختر طريقة الدفع <span className="text-red-500">*</span></label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* فودافون كاش */}
                  <div 
                    onClick={() => setDepositForm({...depositForm, paymentMethod: 'vodafone', selectedAccount: ''})}
                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                      depositForm.paymentMethod === 'vodafone' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg">
                        V
                      </div>
                      <span className="font-bold">فودافون كاش</span>
                    </div>
                    <p className="text-xs text-gray-600">تحويل من محفظة فودافون</p>
                  </div>
                  
                  {/* إنستاباي */}
                  <div 
                    onClick={() => setDepositForm({...depositForm, paymentMethod: 'instapay', selectedAccount: ''})}
                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                      depositForm.paymentMethod === 'instapay' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                        I
                      </div>
                      <span className="font-bold">إنستاباي</span>
                    </div>
                    <p className="text-xs text-gray-600">تحويل عبر إنستاباي</p>
                  </div>
                  
                  {/* بينانس */}
                  <div 
                    onClick={() => setDepositForm({...depositForm, paymentMethod: 'binance', selectedAccount: ''})}
                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                      depositForm.paymentMethod === 'binance' 
                        ? 'border-yellow-500 bg-yellow-50' 
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-lg">
                        B
                      </div>
                      <span className="font-bold">بينانس</span>
                    </div>
                    <p className="text-xs text-gray-600">تحويل USDT أو عملات رقمية</p>
                  </div>
                </div>
              </div>
              
              {/* عرض أرقام التحويل حسب الطريقة المختارة */}
              {depositForm.paymentMethod && (
                <div className={`p-4 rounded-lg ${
                  depositForm.paymentMethod === 'vodafone' ? 'bg-red-50' :
                  depositForm.paymentMethod === 'instapay' ? 'bg-purple-50' : 'bg-yellow-50'
                }`}>
                  
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    {depositForm.paymentMethod === 'vodafone' && '📱 اختر رقم فودافون كاش'}
                    {depositForm.paymentMethod === 'instapay' && '💳 اختر حساب إنستاباي'}
                    {depositForm.paymentMethod === 'binance' && '🔗 اختر محفظة بينانس'}
                  </p>
                  
                  <div className="space-y-2">
                    {paymentAccounts[depositForm.paymentMethod as keyof typeof paymentAccounts].map((account, index) => (
                      <div
                        key={index}
                        onClick={() => setDepositForm({...depositForm, selectedAccount: account.number})}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          depositForm.selectedAccount === account.number
                            ? depositForm.paymentMethod === 'vodafone' ? 'border-red-500 bg-white' :
                              depositForm.paymentMethod === 'instapay' ? 'border-purple-500 bg-white' :
                              'border-yellow-500 bg-white'
                            : 'border-transparent bg-white/50 hover:bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold">{account.name}</p>
                            <p className="text-sm font-mono">{account.number}</p>
                            {account.bank && <p className="text-xs text-gray-500">{account.bank}</p>}
                          </div>
                          {depositForm.selectedAccount === account.number && (
                            <span className="text-green-600 text-xl">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button type="submit" disabled={submitting || !depositForm.selectedAccount}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 disabled:opacity-50 font-bold">
                  {submitting ? 'جاري...' : 'تأكيد الحجز'}
                </button>
                <button type="button" onClick={() => setShowDepositModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-bold">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* عرض نتيجة الطلب (الإيصال) */}
      {orderResult && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            
            {/* أيقونة النجاح */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">✅</div>
              <h3 className="text-2xl font-bold text-green-600">تم استلام طلبك!</h3>
            </div>
            
            {/* تفاصيل الطلب */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-4 border-2 border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">رقم الطلب:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg bg-white px-3 py-1 rounded border">
                    {orderResult.order_number}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderResult.order_number)
                      alert('✅ تم نسخ رقم الطلب')
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="نسخ رقم الطلب"
                  >
                    📋
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">المنتج:</span>
                <span className="font-medium">{orderResult.product_title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">المبلغ:</span>
                <span className="font-bold text-amber-600 text-xl">{orderResult.amount} جنيه</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">رقم المحول منه:</span>
                <span className="font-mono">{orderResult.transfer_from}</span>
              </div>
            </div>
            
            {/* بيانات الدفع */}
            <div className={`p-4 rounded-lg mb-4 ${
              orderResult.method === 'vodafone' ? 'bg-red-50 border-2 border-red-200' :
              orderResult.method === 'instapay' ? 'bg-purple-50 border-2 border-purple-200' : 
              'bg-yellow-50 border-2 border-yellow-200'
            }`}>
              <p className="font-bold mb-3 text-center">
                {orderResult.method === 'vodafone' && '📱 بيانات فودافون كاش'}
                {orderResult.method === 'instapay' && '💳 بيانات إنستاباي'}
                {orderResult.method === 'binance' && '🔗 بيانات بينانس'}
              </p>
              
              <div className="bg-white p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">المستلم</p>
                <p className="font-bold text-lg">{orderResult.account_owner}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <p className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                    {orderResult.payment_account}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderResult.payment_account)
                      alert('✅ تم نسخ رقم الحساب')
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="نسخ رقم الحساب"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
            
            {/* ملحوظة هامة - تصوير الشاشة */}
            <div className="bg-yellow-100 border-r-4 border-yellow-500 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <p className="font-bold text-yellow-800">ملحوظة هامة:</p>
                  <p className="text-sm text-yellow-700">
                    من فضلك **صور الشاشة دي** كإثبات لعملية الدفع، وسيطلبها منك خدمة العملاء عند التواصل.
                  </p>
                </div>
              </div>
            </div>
            
            {/* رقم خدمة العملاء */}
            <div className="bg-green-50 p-4 rounded-lg mb-4 text-center">
              <p className="text-sm text-gray-600 mb-1">للتواصل والاستفسار عن الطلب</p>
              <a 
                href={`https://wa.me/201015262864?text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص الطلب رقم: ${orderResult.order_number}`)}`} 
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
              >
                <span>📞</span>
                خدمة العملاء - واتساب
              </a>
              <p className="text-xs text-gray-500 mt-2">رد خلال 5 دقائق إن شاء الله</p>
            </div>
            
            {/* تأكيد الإيصال */}
            <p className="text-sm text-gray-600 mb-4 text-center bg-gray-100 p-2 rounded-lg">
              ✅ تم إرسال الإيصال إلى واتساب. بعد التحويل، انتظر رسالة التأكيد.
            </p>
            
            {/* زر الإغلاق */}
            <button 
              onClick={() => {
                setShowDepositModal(false)
                setOrderResult(null)
                setDepositForm({ name: '', phone: '', amount: '', paymentMethod: '', selectedAccount: '', transferFrom: '' })
              }} 
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-bold"
            >
              تم
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{quickViewItem.title}</h3>
              <button onClick={() => setQuickViewItem(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Image src={quickViewItem.image} alt={quickViewItem.title} width={300} height={300}
                className="rounded-lg w-full h-auto" />
              <div className="space-y-3">
                <p>{quickViewItem.description}</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{quickViewItem.rating} ({quickViewItem.reviews})</span>
                </div>
                <div className="font-bold text-primary">{quickViewItem.priceInfo}</div>
                
                <div className="flex gap-2 pt-2">
                  <button onClick={(e) => handleWhatsAppClick(e, quickViewItem)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> واتساب
                  </button>
                  <button onClick={() => { setSelectedItem(quickViewItem); setQuickViewItem(null); setShowDepositModal(true); }}
                    className="flex-1 bg-amber-500 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" /> عربون
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Item Modal */}
      {selectedItem && !showDepositModal && !orderResult && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-auto">
          <button onClick={() => { setSelectedItem(null); router.push("/portfolio", { scroll: false }) }}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-2xl z-10 p-2 hover:bg-secondary rounded-full transition">
            ✕
          </button>

          <div className="bg-background w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[95vh] sm:rounded-2xl relative sm:my-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
              
              {/* Images */}
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden">
                  <Image src={activeImage} width={600} height={600}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                    alt={selectedItem.title} priority />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedItem.images?.map((img: string, index: number) => (
                    <div key={index} onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 ${
                        activeImage === img ? "border-primary" : "border-transparent"
                      }`}>
                      <Image src={img} width={60} height={60} className="w-10 h-10 sm:w-12 sm:h-12 object-cover" alt="" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{selectedItem.icon || "📦"}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{selectedItem.rating} ({selectedItem.reviews})</span>
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedItem.title}</h2>
                  <p className="text-muted-foreground mt-2">{selectedItem.description}</p>
                </div>

                {/* السعر */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <span className="font-bold text-primary text-lg">{selectedItem.priceInfo}</span>
                  </div>
                </div>

                {/* أزرار التفاعل في صفحة التفاصيل */}
                <div className="space-y-3 pt-4">
                  {/* زر التواصل عبر واتساب */}
                  <button onClick={(e) => handleWhatsAppClick(e)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    تواصل للاستفسار عبر واتساب
                  </button>
                  
                  {/* زر دفع العربون */}
                  <button onClick={() => setShowDepositModal(true)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    ادفع عربون واحجز المنتج
                  </button>
                  
                  {/* أزرار إضافية */}
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => copyProductLink(selectedItem.id)}
                      className={`py-2 rounded-lg font-medium transition ${copiedItemId === selectedItem.id ? "bg-green-500 text-white" : "bg-secondary"}`}>
                      {copiedItemId === selectedItem.id ? "✅ تم النسخ" : "🔗 نسخ الرابط"}
                    </button>
                    <button onClick={(e) => toggleFavorite(selectedItem.id, e)}
                      className={`py-2 rounded-lg font-medium transition ${favoriteItems.includes(selectedItem.id) ? "bg-red-500 text-white" : "bg-secondary"}`}>
                      <Heart className="w-4 h-4 inline ml-1" fill={favoriteItems.includes(selectedItem.id) ? "currentColor" : "none"} />
                      مفضلة
                    </button>
                  </div>
                </div>

                {/* معلومات إضافية */}
                {selectedItem.dimensions && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">الأبعاد:</span> {selectedItem.dimensions}
                  </div>
                )}
                {selectedItem.estimatedDelivery && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">التوصيل:</span> {selectedItem.estimatedDelivery}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-xl animate-fade-in-out z-50">
          <p>سيتم تحويلك للواتساب...</p>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fade-in-out { animation: fadeInOut 3s ease-in-out; }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
      `}</style>
    </div>
  )
}