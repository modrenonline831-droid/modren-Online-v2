"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PortfolioGrid from "@/components/portfolio-grid"
import { Sparkles, Shield, Truck, Award, ChevronDown, Filter, Grid, List } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // جلب المنتجات من Supabase
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('createdAt', { ascending: false })
      
      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // تتبع التمرير لزر العودة للأعلى
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المنتجات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-secondary/5 to-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-48 translate-y-48"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
              <ChevronDown className="w-4 h-4 rotate-270" />
              <span className="text-primary font-medium">الكتالوج</span>
            </div>
            
            {/* Main Title */}
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>تصفح منتجاتنا المميزة</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  كتالوج الأثاث المودرن
                </span>
                <br />
                <span className="text-foreground">من قلب دمياط</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                استكشف تميزنا في الخامات والأشكال الراقية والتصاميم الجديدة. 
                متميزون في أجود الخامات والخشب الزان الأحمر الطبيعي المستورد.
                كل قطعة صنعت بيد حرفيين دمياطيين بخبرة 30+ سنة.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: <Award className="w-6 h-6" />, value: "30+", label: "سنة خبرة" },
                { icon: <Shield className="w-6 h-6" />, value: "5", label: "سنوات ضمان" },
                { icon: "🎨", value: "100+", label: "تصميم حصري" },
                { icon: <Truck className="w-6 h-6" />, value: "24/7", label: "دعم متواصل" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* View Mode Selector */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200 py-3">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">فلتر المنتجات</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-primary">{products.length}</span> منتج متاح
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">عرض:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : ""}`}
                    title="عرض شبكي"
                  >
                    <Grid className={`w-5 h-5 ${viewMode === "grid" ? "text-primary" : "text-gray-500"}`} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow" : ""}`}
                    title="عرض قائمة"
                  >
                    <List className={`w-5 h-5 ${viewMode === "list" ? "text-primary" : "text-gray-500"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Grid Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <PortfolioGrid viewMode={viewMode} products={products} />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    👑 متخصصون في التصاميم الحصرية
                  </h3>
                  <p className="text-gray-600 mb-6">
                    لكل قطعة في كتالوجنا قصة ترويها. خبرة 30 سنة في صناعة الأثاث الدمياطي 
                    تترجم إلى جودة لا تقارن وتفاصيل تختفي الأنظار.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">خشب زان طبيعي</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">5 سنوات ضمان</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">تصميم حسب الطلب</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center md:text-right">
                  <a
                    href="https://wa.me/201015262864"
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <span>💬</span>
                    <span>استشارة مجانية الآن</span>
                  </a>
                  <p className="text-sm text-gray-500 mt-4">
                    رد خلال 5 دقائق - متاحون 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300"
          aria-label="العودة للأعلى"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}
    </div>
  )
}