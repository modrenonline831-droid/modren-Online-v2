"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles, Shield, Truck } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "/handcrafted-wood-furniture-showcase.jpg",
      title: "أحدث تصميم مودرن بأعلي جودة وافضل سعر",
      subtitle: "تصاميم تختف الأنظار وجودة تدوم لأجيال",
      buttonText: "شاهد الكتالوج",
      badge: "🔥 الأكثر طلباً"
    },
    {
      image: "/1515.jpg",
      title: "أثاث دمياطي بجودة لا تقارن",
      subtitle: "خشب زان أحمر مستورد بأسعار تنافسية",
      buttonText: "استعرض المنتجات",
      badge: "🛡️ ضمان 5 سنوات"
    },
    {
      image: "/zezo.jpg",
      title: "تخفيضات تصل إلى 50%",
      subtitle: "عروض خاصة لفترة محدودة على أفضل التصاميم",
      buttonText: "اطلع على العروض",
      badge: "💥 عرض محدود"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleContactClick = (method: string) => {
    if (method === 'whatsapp') {
      window.open('https://wa.me/201015262864', '_blank')
    } else if (method === 'phone') {
      window.open('tel:+201015262864', '_blank')
    }
  }

  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-primary rounded-full -translate-x-24 md:-translate-x-32 -translate-y-24 md:-translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full translate-x-32 md:translate-x-48 translate-y-32 md:translate-y-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1 mt-6 md:mt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span>مصنع أثاث دمياطي منذ 1990</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent block">
                أحدث تصميمات مودرن
              </span>
              <span className="text-foreground block mt-1 md:mt-2">بجودة تدوم وأسعار تنافسية</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              تصاميم تختفي الأنظار وجودة تدوم لأجيال. أثاث دمياطي بأعلى الخامات وأفضل الأسعار تحت رعاية{' '}
              <span className="font-bold text-primary">مودرن أونلاين</span>.
              خبرة أكثر من 30 سنة في صناعة الأثاث الدمياطي الأصيل.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4 pt-2 md:pt-4">
              <div className="bg-secondary/50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">30+</div>
                <div className="text-xs md:text-sm text-muted-foreground">سنة خبرة</div>
              </div>
              <div className="bg-secondary/50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">5000+</div>
                <div className="text-xs md:text-sm text-muted-foreground">عميل راضي</div>
              </div>
              <div className="bg-secondary/50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">5</div>
                <div className="text-xs md:text-sm text-muted-foreground">سنوات ضمان</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 bg-green-50 text-green-700 rounded-lg text-xs md:text-sm">
                <Shield className="w-3 h-3 md:w-4 md:h-4" />
                <span>ضمان 5 سنوات</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs md:text-sm">
                <Truck className="w-3 h-3 md:w-4 md:h-4" />
                <span>شحن لجميع المحافظات</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 bg-amber-50 text-amber-700 rounded-lg text-xs md:text-sm">
                <span className="text-sm">🎯</span>
                <span>خشب زان أحمر</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground font-bold rounded-lg md:rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg md:hover:shadow-2xl hover:scale-105 active:scale-95 text-sm md:text-lg w-full sm:w-auto"
              >
                <span className="text-base md:text-lg">📚</span>
                <span>استعرض الكتالوج</span>
                <span className="group-hover:translate-x-1 transition-transform hidden sm:inline">→</span>
              </Link>

              <button
                onClick={() => handleContactClick('whatsapp')}
                className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 border-2 border-primary text-primary font-bold rounded-lg md:rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg md:hover:shadow-xl text-sm md:text-lg w-full sm:w-auto"
              >
                <span className="text-base md:text-lg">🎨</span>
                <span className="whitespace-nowrap">اختر التصميم المناسب</span>
              </button>
            </div>

            {/* Trust Badge */}
            <div className="pt-2 md:pt-4 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>متاحون الآن</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>رد خلال 5 دقائق</span>
              <span className="hidden sm:inline">•</span>
              <span>98% رضا العملاء</span>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
              {/* Slides */}
              <div className="relative h-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Slide Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      {slide.badge && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold mb-2 md:mb-3">
                          {slide.badge}
                        </div>
                      )}
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{slide.title}</h3>
                      <p className="text-white/90 text-xs md:text-sm">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md md:shadow-lg"
                aria-label="السابق"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md md:shadow-lg"
                aria-label="التالي"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? 'bg-white w-6 md:w-8'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`الانتقال للشريحة ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-xl md:rounded-2xl -z-10 blur-lg md:blur-xl"></div>
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-32 h-32 md:w-40 md:h-40 bg-secondary/30 rounded-xl md:rounded-2xl -z-10 blur-lg md:blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-2.5 md:h-3 bg-primary rounded-full mt-1.5 md:mt-2"></div>
        </div>
      </div>
    </section>
  )
}