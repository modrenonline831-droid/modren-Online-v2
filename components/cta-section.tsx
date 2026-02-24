"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, Phone, Ruler, Home, ChevronRight, Sparkles, CheckCircle } from "lucide-react"

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentSize, setCurrentSize] = useState(0)
  const [measurements, setMeasurements] = useState({
    length: "",
    width: "",
    details: ""
  })

  const sizes = [
    { value: "2×3", label: "صغير", desc: "للغرف الصغيرة", icon: "📏" },
    { value: "3×4", label: "متوسط", desc: "مناسب للمعيشة", icon: "🛋️" },
    { value: "4×5", label: "كبير", desc: "للصالات الكبيرة", icon: "🏠" },
    { value: "مقاسات خاصة", label: "مخصص", desc: "حسب طلبك", icon: "🎯" }
  ]

  // دوران تلقائي بين المقاسات
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize((prev) => (prev + 1) % sizes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleContactClick = (method: string) => {
    let message = `مرحباً، أريد استشارة حول مقاس: ${sizes[currentSize].value}`
    if (measurements.length && measurements.width) {
      message += `\nالمقاسات: ${measurements.length}م × ${measurements.width}م`
    }
    if (measurements.details) {
      message += `\nتفاصيل إضافية: ${measurements.details}`
    }
    
    const encodedMessage = encodeURIComponent(message)
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/201015262864?text=${encodedMessage}`, '_blank')
    } else if (method === 'phone') {
      window.open('tel:+201015262864', '_blank')
    }
  }

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Background Pattern - محسن للهاتف */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 md:-translate-x-48 md:-translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 md:translate-x-48 md:translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-white rounded-full opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span>تخصيص حسب المساحة</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                حدد 
                <span className="block text-yellow-300 mt-1 md:mt-2">مساحتك الخاصة</span>
                ونحن نصنع الحل المثالي
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                متاح جميع المقاسات بجميع التفاصيل. نوفر لك حلول أثاث مخصصة تناسب كل مساحة، من الغرف الصغيرة إلى الصالات الكبيرة.
              </p>
            </div>

            {/* Features - محسن للهاتف */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {[
                { icon: "📏", title: "جميع المقاسات", desc: "من الصغير للكبير" },
                { icon: "🎨", title: "تخصيص كامل", desc: "حسب ذوقك" },
                { icon: "⚡", title: "تنفيذ سريع", desc: "خلال 15 يوم" },
                { icon: "🛡️", title: "5 سنوات ضمان", desc: "جودة مضمونة" },
                { icon: "🚚", title: "توصيل سريع", desc: "للمدن الكبرى" },
                { icon: "🎯", title: "استشارة مجانية", desc: "مع متخصص" }
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="text-xl md:text-2xl">{feature.icon}</div>
                    <div className="text-right">
                      <div className="font-bold text-white text-xs md:text-sm">{feature.title}</div>
                      <div className="text-white/70 text-xs">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6 pt-2 md:pt-4">
              {[
                { value: "100+", label: "مقاس متاح" },
                { value: "500+", label: "مشروع مكتمل" },
                { value: "98%", label: "رضا العملاء" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center px-2 md:px-0">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/80 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive */}
          <div className="space-y-6 md:space-y-8">
            {/* Size Selector */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Ruler className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
                <div className="text-right">
                  <h3 className="text-lg md:text-xl font-bold text-white">اختر مقاس مساحتك</h3>
                  <p className="text-white/70 text-xs md:text-sm">المقاسات المتاحة لدينا</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                {sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSize(idx)}
                    className={`group p-3 md:p-4 rounded-lg md:rounded-xl text-center transition-all duration-300 ${
                      currentSize === idx
                        ? 'bg-yellow-500 text-gray-900 shadow-lg md:shadow-2xl scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">{size.icon}</div>
                    <div className="text-lg md:text-2xl font-bold">{size.value}</div>
                    <div className="text-xs md:text-sm opacity-90">{size.label}</div>
                    <div className="text-xs opacity-70 mt-1 hidden md:block">{size.desc}</div>
                  </button>
                ))}
              </div>

              {/* Current Size Display */}
              <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-lg md:rounded-xl p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-white/80 mb-1 md:mb-2">المقاس المحدد حالياً</div>
                <div className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">{sizes[currentSize].value}</div>
                <div className="text-white/90 text-sm md:text-base">{sizes[currentSize].desc}</div>
              </div>
            </div>

            {/* Measurement Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Home className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
                <div className="text-right">
                  <h3 className="text-lg md:text-xl font-bold text-white">أرسل مقاسات مساحتك</h3>
                  <p className="text-white/70 text-xs md:text-sm">لنقوم بتصميم الحل الأمثل</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <input
                    type="text"
                    value={measurements.length}
                    onChange={(e) => handleMeasurementChange('length', e.target.value)}
                    placeholder="الطول (متر)"
                    className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 md:px-4 md:py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm md:text-base"
                  />
                  <input
                    type="text"
                    value={measurements.width}
                    onChange={(e) => handleMeasurementChange('width', e.target.value)}
                    placeholder="العرض (متر)"
                    className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 md:px-4 md:py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm md:text-base"
                  />
                </div>
                <textarea
                  value={measurements.details}
                  onChange={(e) => handleMeasurementChange('details', e.target.value)}
                  placeholder="تفاصيل إضافية عن المساحة (أبواب، نوافذ، إلخ)..."
                  rows={2}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 md:px-4 md:py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none text-sm md:text-base"
                />
              </div>

              <button
                onClick={() => handleContactClick('whatsapp')}
                className="w-full group bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-lg md:hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
              >
                <MessageCircle className="w-4 h-4 md:w-6 md:h-6" />
                <span>أرسل المقاسات عبر واتساب</span>
                <ChevronRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center lg:text-right">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">مستعد لبدء مشروعك؟</h3>
              <p className="text-white/80 text-sm md:text-base">
                تواصل معنا الآن للحصول على استشارة مجانية وتصميم مخصص لمساحتك
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleContactClick('whatsapp')}
                className="group bg-white text-primary hover:bg-gray-100 font-bold py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-lg md:hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>واتساب</span>
                <span className="text-base">💬</span>
              </button>
              
              <button
                onClick={() => handleContactClick('phone')}
                className="group bg-transparent border border-white text-white hover:bg-white hover:text-primary font-bold py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-lg md:hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>اتصال مباشر</span>
                <span className="text-base">📞</span>
              </button>
              
              <Link
                href="/portfolio"
                className="group bg-transparent border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-gray-900 font-bold py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-lg md:hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <span>📚</span>
                <span>شاهد الكتالوج</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 text-white/70 text-xs md:text-sm">
            {[
              "استشارة مجانية",
              "تصميم مخصص",
              "ضمان 5 سنوات",
              "توصيل وتركيب"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-1 md:gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-300 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements - مخفية على الهاتف */}
      <div className="hidden md:block absolute top-10 right-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
      <div className="hidden md:block absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    </section>
  )
}