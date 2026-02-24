"use client"
import { Hammer, Scissors, ShieldCheck, Sparkles, Award, Clock, Truck, Users, Star } from "lucide-react"

const features = [
  {
    icon: Hammer,
    title: "حرفة صنعة منذ سنوات و خبرة اكثر من 30 سنة",
    description: "أخشابنا كاملة من الزان الأحمر الطبيعي المستورد بأسعار تجارية تنافسية",
    stats: "30+ سنة خبرة",
    color: "amber"
  },
  {
    icon: Scissors,
    title: "حرفة تشطيب متقنة",
    description: "أعلى فنش تشطيب من قلب دمياط بأفضل الخامات وبضمان 5 سنوات على كل قطعة",
    stats: "5 سنوات ضمان",
    color: "emerald"
  },
  {
    icon: ShieldCheck,
    title: "ضمان الجودة الفعلي",
    description: "احنا واقفين ورا كل قطعة. لو فيها أي مشكلة، بندعمك بالكامل. الضمان بتاعنا 5 سنوات لأننا واثقين في اللي بنعمله.",
    stats: "5 سنوات ضمان",
    color: "blue"
  },
  {
    icon: Truck,
    title: "شحن لجميع المحافظات",
    description: "نوصل طلباتك لأي مكان في مصر بأسعار تنافسية مع خدمة التوصيل والتركيب",
    stats: "لجميع المحافظات",
    color: "purple"
  },
  {
    icon: Award,
    title: "جائزة التميز في الصناعة",
    description: "حاصلين على جائزة أفضل مصنع أثاث مودرن في دمياط لعام 2023",
    stats: "حاصل على جائزة",
    color: "yellow"
  },
  {
    icon: Clock,
    title: "تسليم في الوقت المحدد",
    description: "التزامنا بتسليم المنتجات في الوقت المتفق عليه مع الحفاظ على أعلى معايير الجودة",
    stats: "95% تسليم في الوقت",
    color: "indigo"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium">لماذا نكون اختيارك الأول؟</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ليه تختارنا عن غيرنا؟
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            لأننا لا نصنع أثاثاً فقط، بل نصنع ذكريات تدوم مدى الحياة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colorClasses = {
              amber: "bg-amber-500/10 text-amber-600 border-amber-200",
              emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
              blue: "bg-blue-500/10 text-blue-600 border-blue-200",
              purple: "bg-purple-500/10 text-purple-600 border-purple-200",
              yellow: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
              indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-200"
            }

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-card border hover:border-primary/30 transition-all duration-300 hover:shadow-lg md:hover:shadow-2xl hover:-translate-y-1 p-4 md:p-6 lg:p-8"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full -translate-y-12 md:-translate-y-16 translate-x-12 md:translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-primary rounded-full translate-y-16 md:translate-y-20 -translate-x-16 md:-translate-x-20"></div>
                </div>

                {/* Icon Container */}
                <div className={`relative mb-4 md:mb-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${
                  colorClasses[feature.color as keyof typeof colorClasses]
                } flex items-center justify-center group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold ${
                    colorClasses[feature.color as keyof typeof colorClasses]
                  }`}>
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Border Effect */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-colors duration-300 pointer-events-none"></div>
              </div>
            )
          })}
        </div>

        {/* Stats Counter Section */}
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {[
            { value: "5000+", label: "عميل راضي", icon: <Users className="w-5 h-5 md:w-6 md:h-6" /> },
            { value: "30+", label: "سنة خبرة", icon: "🎯" },
            { value: "5", label: "سنوات ضمان", icon: "🛡️" },
            { value: "98%", label: "رضا العملاء", icon: "⭐" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-6 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-xl md:rounded-2xl backdrop-blur-sm hover:shadow-md md:hover:shadow-lg transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium mb-1 md:mb-1">{stat.label}</div>
              <div className="flex justify-center">
                {typeof stat.icon === 'string' ? (
                  <span className="text-xl md:text-2xl">{stat.icon}</span>
                ) : (
                  <div className="text-primary">{stat.icon}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <button
            onClick={() => window.open('https://wa.me/201015262864', '_blank')}
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:hover:shadow-2xl shadow-md md:shadow-lg w-full sm:w-auto"
          >
            <span className="text-lg md:text-xl">💬</span>
            <span className="text-sm md:text-base">تواصل معنا الآن للحصول على استشارة مجانية</span>
            <span className="hidden sm:inline text-lg md:text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}