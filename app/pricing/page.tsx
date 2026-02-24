"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing-cards"
import { useState } from "react"
import { Sparkles, Shield, Truck, Clock, CheckCircle, ChevronRight, MessageCircle, Phone, Star, Award } from "lucide-react"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("professionnel")
  const [showComparison, setShowComparison] = useState(false)

  const plansComparison = [
    {
      feature: "ضمان الجودة",
      basic: "5 سنوات",
      professional: "10 سنوات",
      vip: "20 سنة"
    },
    {
      feature: "نوع الخشب",
      basic: "زان محلي",
      professional: "زان أحمر مستورد",
      vip: "أفضل الخشب المستورد"
    },
    {
      feature: "التشطيب",
      basic: "تشطيب جيد",
      professional: "تشطيب ممتاز",
      vip: "تشطيب سويسري فاخر"
    },
    {
      feature: "تصميم ثلاثي الأبعاد",
      basic: "❌",
      professional: "✅",
      vip: "✅ + نموذج واقعي"
    },
    {
      feature: "التوصيل",
      basic: "مدينة واحدة",
      professional: "جميع المحافظات",
      vip: "توصيل فاخر + تركيب"
    },
    {
      feature: "مدة التنفيذ",
      basic: "20-30 يوم",
      professional: "15-25 يوم",
      vip: "10-20 يوم"
    },
    {
      feature: "متابعة شخصية",
      basic: "❌",
      professional: "✅",
      vip: "✅ + مدير مشروع"
    },
    {
      feature: "الصيانة",
      basic: "صيانة مدفوعة",
      professional: "صيانة مجانية سنة",
      vip: "صيانة مجانية 3 سنوات"
    }
  ]

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleWhatsAppClick = (planName: string) => {
    const message = `مرحباً، أنا مهتم بباكيج ${planName} وأريد استشارة مجانية`
    window.open(`https://wa.me/201015262864?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-secondary/5 to-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-48 translate-y-48"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>بأسعار شفافة وعدالة</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  اختار الباكيج
                </span>
                <br />
                <span className="text-foreground">اللي يناسب أحلامك</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                ثلاث مستويات من الحرفية والأسعار لتتناسب مع رؤيتك وميزانيتك. كل باكيج بيضمنلك جودة لا تقارن، 
                خدمة استثنائية، وضمان حرفية يدوم مدى الحياة.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">5 سنوات ضمان</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">توصيل مجاني</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">تنفيذ خلال 15 يوم</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">98% رضا العملاء</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Plan Selector */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-100 rounded-2xl p-1">
                {[
                  { id: "basic", label: "أساسي", price: "يبدأ من 5,000 ج" },
                  { id: "professionnel", label: "احترافي", price: "يبدأ من 15,000 ج" },
                  { id: "vip", label: "VIP مخصص", price: "سعر خاص" }
                ].map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-white shadow-lg text-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg">{plan.label}</div>
                      <div className="text-sm mt-1">{plan.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Cards */}
            <PricingCards />
            
            {/* Comparison Toggle */}
            <div className="text-center mt-12">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity"
              >
                <span>مقارنة تفصيلية بين الباكيجات</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Comparison Table */}
            {showComparison && (
              <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">مقارنة تفصيلية بين الباكيجات</h3>
                  <p className="text-gray-600 mt-2">شوف الفرق بين الباكيجات واختار اللي يناسبك</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-4 text-right font-bold text-gray-900">الميزة</th>
                        <th className="p-4 text-center font-bold text-gray-900">أساسي</th>
                        <th className="p-4 text-center font-bold text-gray-900">احترافي</th>
                        <th className="p-4 text-center font-bold text-gray-900">VIP مخصص</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plansComparison.map((row, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                          <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 ${
                              row.basic === '✅' ? 'text-green-600' : 
                              row.basic === '❌' ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {row.basic}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 ${
                              row.professional === '✅' ? 'text-green-600' : 
                              row.professional === '❌' ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {row.professional}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 ${
                              row.vip === '✅' ? 'text-green-600' : 
                              row.vip === '❌' ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {row.vip}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-gray-900">في كل الأسعار بتضمن</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    "استشارة تصميم احترافية مع متخصصين",
                    "اختيار من 50+ نوع خشب فاخر",
                    "حرفية من أفضل الحرفيين الدمياطيين",
                    "ضمان جودة يدوم مدى الحياة",
                    "توصيل داخل القاهرة الكبرى",
                    "تركيب احترافي",
                    "دعم فني طوال اليوم",
                    "صيانة وخدمة ما بعد البيع"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="font-bold text-gray-900">جائزة التميز</div>
                    <div className="text-sm text-gray-600">أفضل مصنع 2023</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">تقييم العملاء</div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 border border-primary/20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">محتار تختار باكيج؟</h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    كل مشروع فريد. بنفضل نعمل استشارة مجانية عشان نتناقش احتياجاتك، الألوان الجديدة، والميزانية. 
                    فريقنا هيساعدك تلاقي الحل الكويس اللي يناسبك تماماً.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                      <MessageCircle className="w-6 h-6 text-green-500" />
                      <div>
                        <div className="font-bold text-gray-900">استشارة مجانية</div>
                        <div className="text-sm text-gray-600">دون أي تكاليف</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                      <Phone className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-bold text-gray-900">دعم مباشر</div>
                        <div className="text-sm text-gray-600">24/7 على واتساب</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() => handleWhatsAppClick("الاستشارة المجانية")}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <MessageCircle className="w-6 h-6" />
                      احجز استشارة مجانية على واتساب
                    </button>
                    
                    <a
                      href="tel:+201015262864"
                      className="block text-center py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      اتصل بنا مباشرة: 0101 526 2864
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">مستعد تبدأ مشروع أحلامك؟</h3>
              <p className="text-white/90 text-lg mb-8">
                اختر الباكيج المناسب وابدأ رحلة صناعة قطعتك الخاصة مع أفضل الحرفيين
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleWhatsAppClick("الاحترافي")}
                  className="bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors hover:shadow-lg"
                >
                  💬 ابدأ المحادثة الآن
                </button>
                
                <a
                  href="/portfolio"
                  className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors hover:shadow-lg"
                >
                  📚 شاهد الكتالوج أولاً
                </a>
              </div>
              
              <p className="mt-6 text-white/80 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  متاحون الآن للرد خلال 5 دقائق
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}