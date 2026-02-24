"use client"

import { useState, useEffect } from "react"
import { MessageCircle, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Home, Shield } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "عايز تعمل قطعة أثاث مخصوصة ليك؟",
    text: "إحنا بنبدأ دايمًا بفهم فكرتك واستخدامك الحقيقي للقطعة. كل مشروع بيبدأ من حكاية، واحنا بنسمع حكايتك الأول.",
    icon: "💭",
    color: "from-blue-500 to-cyan-500",
    features: ["استشارة مجانية", "تصميم مبدئي", "تحديد الميزانية"],
    image: "https://cdn-icons-png.flaticon.com/512/3022/3022894.png"
  },
  {
    id: 2,
    title: "المكان عندك شكله إيه؟",
    text: "بنراعي المساحة، الحركة، والإضاءة علشان القطعة تبقى مريحة وتتناسب مع ديكور بيتك بشكل مثالي.",
    icon: "🏠",
    color: "from-emerald-500 to-green-500",
    features: ["قياس المساحة", "تحليل الإضاءة", "تخطيط الحركة"],
    image: "https://cdn-icons-png.flaticon.com/512/3467/3467982.png"
  },
  {
    id: 3,
    title: "تحب خشب وشكل إيه؟",
    text: "بنساعدك تختار نوع الخشب، اللون، والتشطيب المناسب ليك. عندنا أكثر من 50 نوع خشب و100+ لون.",
    icon: "🎨",
    color: "from-amber-500 to-orange-500",
    features: ["اختيار الخشب", "تحديد اللون", "نوع التشطيب"],
    image: "https://cdn-icons-png.flaticon.com/512/2972/2972544.png"
  },
  {
    id: 4,
    title: "تحب تكون القطعة عاملة إزاي؟",
    text: "بنصمم قطعة متفصلة على بيتك مش على مقاس عام. كل تفصيلة بتتنفذ بدقة واهتمام.",
    icon: "📐",
    color: "from-purple-500 to-pink-500",
    features: ["تصميم ثلاثي الأبعاد", "موافقة نهائية", "بدء التصنيع"],
    image: "https://cdn-icons-png.flaticon.com/512/3246/3246707.png"
  },
  {
    id: 5,
    title: "جاهز نبدأ التنفيذ؟",
    text: "تنفيذ يدوي بإيد حرفيين وضمان جودة 5 سنوات. جاهزين نبدأ رحلة صناعة قطعتك الخاصة؟",
    icon: "🛠️",
    color: "from-red-500 to-rose-500",
    features: ["صناعة يدوية", "جودة مضمونة", "ضمان 5 سنوات"],
    image: "https://cdn-icons-png.flaticon.com/512/3246/3246726.png"
  }
]

const pricingPlans = [
  {
    name: "ركنة بسيطة",
    price: "متر يبداء من 4,500 ج",
    description: "للغرف الصغيرة والميزانية المحدودة",
    features: [
      "خشب زان جيد الجودة",
      "تصميم بسيط وعملي",
      "ضمان 5 سنوات",
      "تركيب احترافي",
    ],
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    badge: "الأنسب للميزانية"
  },
  {
    name: "ركنة ميكانيزم",
    price: "متر يبداء من 5,500 ج ",
    description: "ركنة ميكانيزم مودرن بجودة عالية",
    features: [
      "خشب زان أحمر مستورد",
      "ميكانيزم ألماني",
      "ضمان 5 سنوات شامل",
      "تشطيب ممتاز"
    ],
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    badge: "الأكثر مبيعاً",
    popular: true
  },
  {
    name: "ركنة عمولة ",
    price: "متر يبداء من 6,500",
    description: "تصميم كامل حسب طلبك ومساحتك",
    features: [
      "أفضل أنواع الخشب المستورد",
      "ضمان 5 سنوات شامل",
      "توصيل وتركيب فاخر",
      "جميع المقاسات المتاحة",
    ],
    color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-700",
    badge: "تصميم حصري"
  }
]

export function PricingCards() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(20)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const isLast = currentStep === steps.length - 1

  // تحديث التقدم
  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100)
  }, [currentStep])

  // دوران تلقائي
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        if (!isLast) {
          setCurrentStep(prev => (prev + 1) % steps.length)
        }
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, isLast])

  const handleWhatsAppClick = (planName: string, price: string) => {
    const message = `مرحباً، أنا مهتم بـ ${planName} (${price}) وأريد معرفة المزيد عن التفاصيل والمواصفات`
    window.open(`https://wa.me/201015262864?text=${encodeURIComponent(message)}`, '_blank')
  }

  const nextStep = () => {
    if (!isLast) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 rounded-full mb-4 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">رحلة التصنيع الشخصي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              متر الركنة يبدأ من 5,000 جنية
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            من الفكرة إلى التنفيذ، ركنة تناسب ذوقك ومساحتك بأفضل الأسعار
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* اليسار: خطوات التصنيع */}
          <div className="space-y-6">
            {/* خطوات التصنيع */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* شريط التقدم */}
              <div className="relative h-1.5 bg-gray-100">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div 
                className="p-4 md:p-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* الخطوات */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-500">
                    خطوة {currentStep + 1} من {steps.length}
                  </div>
                  <div className="flex items-center gap-1">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          currentStep === idx
                            ? 'bg-blue-600 w-4'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* المحتوى */}
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${currentStepData.color} text-white text-xl md:text-2xl`}>
                    {currentStepData.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {currentStepData.text}
                    </p>
                  </div>
                </div>

                {/* المميزات */}
                <div className="space-y-2 mb-4">
                  {currentStepData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm md:text-base">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* أزرار التنقل */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
                      currentStep === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    رجوع
                  </button>

                  {!isLast ? (
                    <button
                      onClick={nextStep}
                      className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm md:text-base"
                    >
                      التالي
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => window.open('https://wa.me/201015262864', '_blank')}
                      className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm md:text-base"
                    >
                      <MessageCircle className="w-4 h-4" />
                      ابدأ مشروعك
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* إحصائيات */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "30+", label: "سنة خبرة", icon: "🎯" },
                { value: "5,000+", label: "مشروع", icon: "📦" },
                { value: "5", label: "سنوات ضمان", icon: "🛡️" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
                  <div className="text-lg md:text-xl mb-1">{stat.icon}</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* اليمين: أسعار الركنات */}
          <div className="space-y-6">
            {/* العنوان */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">أسعار الركنات</h3>
              <p className="text-gray-600">اختر الركنة المناسبة لمساحتك وميزانيتك</p>
            </div>

            {/* بطاقات الأسعار */}
            <div className="space-y-4">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl border p-4 md:p-6 transition-all duration-300 hover:shadow-md ${
                    selectedPlan === index
                      ? 'border-blue-600 shadow-md'
                      : plan.color
                  } ${plan.popular ? 'ring-1 ring-blue-500/20' : ''}`}
                  onClick={() => setSelectedPlan(index)}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${plan.textColor} bg-white shadow-sm`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full shadow">
                        ⭐ الأكثر طلباً
                      </span>
                    </div>
                  )}

                  {/* المحتوى */}
                  <div className="space-y-4">
                    {/* الاسم والسعر */}
                    <div className="text-center">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{plan.name}</h4>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>

                    {/* المميزات */}
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li 
                          key={idx}
                          className="flex items-center gap-2 text-sm md:text-base"
                          onMouseEnter={() => setHoveredFeature(idx)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <CheckCircle className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-colors ${
                            hoveredFeature === idx ? 'text-blue-600' : 'text-green-500'
                          }`} />
                          <span className={`transition-colors ${
                            hoveredFeature === idx ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* زر التواصل */}
                    <button
                      onClick={() => handleWhatsAppClick(plan.name, plan.price)}
                      className={`w-full py-2 md:py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md text-sm md:text-base ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                          : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        استفسر عن هذا النوع
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ملاحظة */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">ضمان إضافي</h4>
                  <p className="text-gray-700 text-xs md:text-sm">
                    جميع الركنات تشمل ضمان ضد العيوب الصناعية وصيانة مجانية خلال فترة الضمان
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl p-4 md:p-6 border border-blue-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-white rounded-lg shadow">
                    <span className="text-lg md:text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">مساحة صغيرة؟</h4>
                    <p className="text-gray-600 text-xs md:text-sm">مشكلتنا نحلها معاك! تواصل لتصميم ركنة تناسب مساحتك</p>
                  </div>
                </div>
                
                <button
                  onClick={() => window.open('https://wa.me/201015262864', '_blank')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all hover:shadow-lg text-sm md:text-base whitespace-nowrap"
                >
                  استشارة مجانية
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600">📏</span>
              </div>
              <h4 className="font-bold text-gray-900">جميع المقاسات</h4>
            </div>
            <p className="text-gray-600 text-sm">من الركنات الصغيرة للكبيرة، جميع المقاسات متاحة حسب المساحة</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600">⚡</span>
              </div>
              <h4 className="font-bold text-gray-900">تصنيع سريع</h4>
            </div>
            <p className="text-gray-600 text-sm">ركنتك جاهزة خلال 15-20 يوم مع ضمان الجودة والتنفيذ الدقيق</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <span className="text-amber-600">🔧</span>
              </div>
              <h4 className="font-bold text-gray-900">تركيب احترافي</h4>
            </div>
            <p className="text-gray-600 text-sm">تركيب دقيق بواسطة فنيين متخصصين مع ضمان التركيب لمدة سنة</p>
          </div>
        </div>
      </div>

      {/* CSS للأنيميشن */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}