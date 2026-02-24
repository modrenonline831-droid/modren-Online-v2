"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Shield, Truck, MessageCircle, Facebook, Music, Send, Heart } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // هنا يمكن إضافة منطق الاشتراك
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const handleContactClick = (type: string) => {
    if (type === 'whatsapp') {
      window.open('https://wa.me/201015262864', '_blank')
    } else if (type === 'phone') {
      window.open('tel:+201015262864', '_blank')
    } else if (type === 'email') {
      window.open('mailto:modrenonline831@gmail.com', '_blank')
    }
  }

  const quickLinks = [
    { name: "الرئيسية", href: "/", icon: "🏠" },
    { name: "المعرض", href: "/portfolio", icon: "🖼️" },
    { name: "صمم بنفسك", href: "/pricing", icon: "🎨" },
    { name: "تواصل معنا", href: "/contact", icon: "💬" },
    { name: "الشروط والأحكام", href: "/about", icon: "👥" }
  ]

  const categories = [
    { name: "أنترية مغلف", count: 12, href: "/portfolio?category=أنترية مغلف" },
    { name: "ركن", count: 8, href: "/portfolio?category=ركن" },
    { name: "طرابيزات", count: 15, href: "/portfolio?category=طرابيزات" },
    { name: "جزمات", count: 10, href: "/portfolio?category=جزمات" },
    { name: "فوتية", count: 7, href: "/portfolio?category=فوتية" },
    { name: "كراسي", count: 9, href: "/portfolio?category=كراسي" }
  ]

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, text: "+20 101 526 2864", action: () => handleContactClick('phone') },
    { icon: <MessageCircle className="w-5 h-5" />, text: "واتساب سريع", action: () => handleContactClick('whatsapp') },
    { icon: <Mail className="w-5 h-5" />, text: "modrenonline831@gmail.com", action: () => handleContactClick('email') },
    { icon: <MapPin className="w-5 h-5" />, text: "مصر، دمياط - مركز دمياط، باب الحرس" },
    { icon: <Clock className="w-5 h-5" />, text: "السبت - الخميس: 9ص - 10م | الجمعة: 1ظ - 10م" }
  ]

  const socialLinks = [
    { icon: <MessageCircle className="w-5 h-5" />, href: "https://wa.me/201015262864", label: "واتساب", color: "bg-green-500 hover:bg-green-600" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/share/1D8fRBtXbc/", label: "فيسبوك", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: <Music className="w-5 h-5" />, href: "https://www.tiktok.com/@modren.online", label: "تيك توك", color: "bg-black hover:bg-gray-800" },
    { icon: <Send className="w-5 h-5" />, href: "#", label: "تيليجرام", color: "bg-sky-500 hover:bg-sky-600" }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-12 md:pt-16 pb-6 md:pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* القسم العلوي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* العمود الأول: معلومات الشركة */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-lg">
                <span className="text-white text-lg md:text-xl">🛋️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Modern Online
                </span>
              </h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              أثاث دمياطي مصنوع يدويًا بأعلى جودة، يرفع مستوى منزلك بأناقة خالدة. 
              خبرة 30+ سنة في صناعة الأثاث الدمياطي الأصيل.
            </p>
            
            {/* شارات الثقة */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 pt-3 md:pt-4">
              <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg text-xs md:text-sm">
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0" />
                <span>ضمان 5 سنوات</span>
              </div>
              <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg text-xs md:text-sm">
                <Truck className="w-3 h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                <span>شحن لجميع المحافظات</span>
              </div>
            </div>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-800 flex items-center gap-2">
              <span>🔗</span>
              <span className="text-sm md:text-base">التنقل السريع</span>
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 md:gap-3 text-gray-300 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-white/5 text-sm md:text-base"
                  >
                    <span className="text-base md:text-lg">{link.icon}</span>
                    <span className="flex-1">{link.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: الفئات */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-800 flex items-center gap-2">
              <span>📁</span>
              <span className="text-sm md:text-base">فئات المنتجات</span>
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.href}
                    className="flex items-center justify-between text-gray-300 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-white/5 text-sm md:text-base"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs md:text-sm bg-white/10 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الرابع: التواصل */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-800 flex items-center gap-2">
              <span>📞</span>
              <span className="text-sm md:text-base">تواصل معنا</span>
            </h4>
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-2 md:gap-3 text-gray-300 ${info.action ? 'cursor-pointer hover:text-primary' : ''} transition-colors`}
                  onClick={info.action}
                >
                  <div className="p-1.5 md:p-2 bg-white/5 rounded-lg flex-shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  <span className="text-xs md:text-sm flex-1">{info.text}</span>
                </div>
              ))}
            </div>

            {/* النشرة البريدية */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800">
              <h5 className="font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                <span>📧</span>
                اشترك في النشرة
              </h5>
              <form onSubmit={handleSubscribe} className="space-y-2 md:space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    className="w-full bg-white/10 border border-gray-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold py-2.5 md:py-3 rounded-lg transition-all duration-300 hover:shadow-lg text-sm md:text-base"
                >
                  {subscribed ? "✅ تم الاشتراك" : "اشترك الآن"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* القسم الأوسط: وسائل التواصل */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* وسائل التواصل الاجتماعي */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <span className="text-gray-300 text-sm md:text-base">تابعنا على:</span>
              <div className="flex gap-1.5 md:gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} p-2 md:p-3 rounded-lg md:rounded-xl text-white transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-lg md:hover:shadow-xl flex items-center justify-center`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* وسائل الدفع */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <span className="text-gray-300 text-sm md:text-base">وسائل الدفع:</span>
              <div className="flex gap-1.5 md:gap-2">
                {["💳", "🏦", "📱", "💰", "💵"].map((method, index) => (
                  <div
                    key={index}
                    className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl text-base md:text-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title={`وسيلة دفع ${index + 1}`}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* القسم السفلي */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* حقوق النشر */}
            <div className="text-center md:text-left order-3 md:order-1">
              <p className="text-gray-400 text-xs md:text-sm">
                &copy; {new Date().getFullYear()} <span className="text-primary font-bold">Modern Online</span>. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                صنع بكل ❤️ في مصر، دمياط
              </p>
            </div>

            {/* روابط إضافية */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm order-2">
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">
                شروط الاستخدام
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-primary transition-colors">
                سياسة الشحن
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-primary transition-colors">
                سياسة الإرجاع
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">
                الأسئلة الشائعة
              </Link>
            </div>

            {/* العودة للأعلى */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 md:p-3 bg-gradient-to-r from-primary to-primary/80 rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl hover:scale-105 transition-all duration-300 order-1 md:order-3"
              aria-label="العودة للأعلى"
            >
              <span className="text-white text-sm md:text-base">⬆️</span>
            </button>
          </div>

          {/* شهادة الجودة */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl">
                  <Shield className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm md:text-base">جودة معتمدة</div>
                  <div className="text-gray-400 text-xs md:text-sm">أثاث دمياطي أصيل بمواد خام أوروبية</div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl">
                  <Truck className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm md:text-base">شحن لجميع المحافظات</div>
                  <div className="text-gray-400 text-xs md:text-sm">جميع أنحاء مصر خلال 3-7 أيام</div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl">
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-red-400" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm md:text-base">رضا مضمون</div>
                  <div className="text-gray-400 text-xs md:text-sm">98% من عملائنا راضون عن جودة منتجاتنا</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط القوة */}
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-xs md:text-sm">
            تم التطوير بكل ❤️ لخدمة صناعة الأثاث الدمياطي الأصيل منذ 1990
          </div>
        </div>
      </div>
    </footer>
  )
}