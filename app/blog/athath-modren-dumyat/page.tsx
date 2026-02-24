"use client";

import type { Metadata } from "next"
import Link from "next/link"
import { 
  FaLeaf, 
  FaRulerCombined, 
  FaShieldAlt, 
  FaShippingFast, 
  FaStar, 
  FaTag, 
  FaTools,
  FaWhatsapp,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEye,
  FaChevronRight,
  FaCheckCircle
} from "react-icons/fa"
import { IoMdTimer, IoMdCheckmarkCircle } from "react-icons/io"
import { MdWorkspacePremium, MdOutlineDesignServices, MdLocalOffer } from "react-icons/md"
import { GiWoodBeam, GiEgyptianProfile } from "react-icons/gi"
import { RiCustomerService2Fill } from "react-icons/ri"
import { TbTruckDelivery } from "react-icons/tb"
import { useState, useEffect, useRef, ReactNode } from "react"

// بيانات المقال للمخطط الهيكلي
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "الدليل الشامل للأثاث الدمياطي الأصلي: من التاريخ للشراء",
  "description": "دليل شامل عن الأثاث الدمياطي الأصلي، تاريخه، مميزاته، أنواع الخشب المستخدم، وكيفية التمييز بين الأصلي والمقلد. تعرف على أفضل مصنع أثاث دمياطي مودرن بضمان 5 سنوات.",
  "image": [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  "datePublished": "2024-01-15T08:00:00+02:00",
  "dateModified": new Date().toISOString().split('T')[0] + "T08:00:00+02:00",
  "author": {
    "@type": "Organization",
    "name": "مودرن أونلاين",
    "url": "https://modrenonline.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "مودرن أونلاين",
    "logo": {
      "@type": "ImageObject",
      "url": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://modrenonline.com/blog/athath-modren-dumyat"
  }
}

// إنشاء مكون Metadata كديناميكي
const BlogMetadata = () => {
  return (
    <>
      <title>الأثاث الدمياطي الأصلي | مودرن أونلاين - جودة 5 سنوات ضمان</title>
      <meta name="description" content="دليل شامل عن الأثاث الدمياطي الأصلي: تاريخه، مميزاته، أنواع الخشب المستخدم، وكيفية التمييز بين الأصلي والمقلد. تعرف على أفضل مصنع أثاث دمياطي مودرن بضمان 5 سنوات." />
      <meta name="keywords" content="أثاث دمياطي, مصنع أثاث دمياطي, أثاث دمياط مودرن, انتريهات دمياطية, غرف نوم دمياطية, أثاث منزلي دمياطي, كنب دمياطي, ركنات دمياطية, مودرن أونلاين, أثاث مصر دمياط, جودة الأثاث الدمياطي, ضمان الأثاث, خشب الزان الدمياطي, أثاث منزلي فاخر, ديكور داخلي, أثاث مودرن 2024" />
      <meta property="og:title" content="الأثاث الدمياطي الأصلي | مودرن أونلاين - ضمان 5 سنوات" />
      <meta property="og:description" content="دليل شامل عن الأثاث الدمياطي: تاريخ، أنواع، جودة، وكيفية الشراء من أفضل مصنع في دمياط" />
      <meta property="og:url" content="https://modrenonline.com/blog/athath-modren-dumyat" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="ar_EG" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الأثاث الدمياطي الأصلي | دليل شامل للشراء" />
      <meta name="twitter:description" content="كل ما تحتاج معرفته عن الأثاث الدمياطي قبل الشراء" />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
      <link rel="canonical" href="https://modrenonline.com/blog/athath-modren-dumyat" />
    </>
  )
}

// تعريف الأنواع
interface Card3DProps {
  children: ReactNode;
  className?: string;
}

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

// مكون 3D Card
  const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        boxShadow: isHovered 
          ? `rgba(0, 0, 0, 0.1) 0px 20px 40px, 
             rgba(16, 185, 129, 0.1) 0px 0px 60px` 
          : 'rgba(0, 0, 0, 0.05) 0px 10px 30px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// مكون Floating Element
const FloatingElement = ({ children, delay = 0, className = "" }: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// مكون Counter Animation
const AnimatedCounter = ({ value, suffix = "", duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = value / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span ref={countRef} className="inline-block">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function DamiettaFurnitureGuide() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const publishDate = "15 يناير 2024";
  const readingTime = "8 دقائق";
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // لهجة مصرية محببة
  const egyptianPhrases = {
    intro: "بقى، انت عارف ان الأثاث الدمياطي ده مش مجرد قطعة خشب؟ دا تراث وحكاية وعمر كامل!",
    guarantee: "خلينا صريحين مع بعض، الضمان 5 سنين عندنا مش كلام في الهوا!",
    quality: "عندنا الجودة مش بس شعار، دا أسلوب حياة!",
    offer: "انت دلوقتي قدام فرصة، مش رفاهية!",
    contact: "متفكرش كتير، كلمنا وهنرتبلك كل حاجة!"
  };
  
  // SVG pattern as a variable
  const svgPattern = encodeURIComponent(
    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#9C92AC" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>'
  );
  
  return (
    <>
      {/* تأثيرات الخلفية المتحركة */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(16, 185, 129, 0.2), transparent 70%)`
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-cyan-600"
            style={{ width: `${scrollProgress}%`, transition: 'width 0.3s ease' }}
          />
        </div>
      </div>

      {/* Schema.org للمقال */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* تاجات Metadata */}
      <BlogMetadata />
      
      <article className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* الهيدر الجديد مع تأثيرات 3D */}
        <header className="mb-10 text-center">
          <Card3D className="mb-6">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white rounded-2xl p-8 shadow-2xl transform-gpu">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-right">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
                    الدليل الكامل للأثاث الدمياطي الأصلي 🏠
                  </h1>
                  <p className="text-lg opacity-90 backdrop-blur-sm bg-white/10 p-3 rounded-xl">
                    {egyptianPhrases.intro} <br />
                    <span className="font-bold animate-pulse">هنساعدك تفرق بين الأصلي والمغشوش وتختار الصح من أول مرة!</span>
                  </p>
                </div>
                <div className="relative group">
                  <div className="relative z-10 flex items-center gap-3 bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <GiEgyptianProfile className="text-4xl animate-bounce" />
                    <div className="text-right">
                      <div className="font-bold">نصيحة مصري</div>
                      <div className="text-sm">"الغالي رخيص والرخيص غالي"</div>
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                </div>
              </div>
            </div>
          </Card3D>
          
          {/* معلومات المقال */}
          <FloatingElement delay={200}>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-600 text-sm bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-600">نشر:</span>
                <span className="animate-pulse">{publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTimer className="text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span>تقرأه في {readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 animate-pulse" />
                <span>
                  <AnimatedCounter value={4.8} suffix="/5" duration={1500} /> (247 تقييم)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye className="text-purple-500 animate-pulse" />
                <span>
                  <AnimatedCounter value={2847} duration={2000} /> قراءة
                </span>
              </div>
            </div>
          </FloatingElement>
        </header>

        {/* جدول المحتويات المتحرك */}
        <FloatingElement delay={300}>
          <nav className="sticky top-4 z-10 bg-white/90 backdrop-blur-md border border-emerald-100 rounded-2xl p-5 mb-8 shadow-lg transform-gpu hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 animate-slide-in-right">
              <FaRulerCombined className="text-emerald-600 animate-pulse" />
              هتقرأ عن إيه النهاردة؟
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "section-history", label: "تاريخ دمياط", icon: "📜", color: "from-blue-400 to-cyan-400" },
                { id: "section-features", label: "مميزاتنا", icon: "⭐", color: "from-amber-400 to-orange-400" },
                { id: "section-wood-types", label: "أنواع الخشب", icon: "🌳", color: "from-emerald-400 to-green-400" },
                { id: "section-original-vs-fake", label: "فرق معانا", icon: "🔍", color: "from-red-400 to-pink-400" },
                { id: "section-buying-guide", label: "ازاي تشتري", icon: "🛒", color: "from-purple-400 to-indigo-400" },
                { id: "section-modern-designs", label: "أحدث موديلات", icon: "🎨", color: "from-pink-400 to-rose-400" },
                { id: "section-care", label: "صيانة سهلة", icon: "🔧", color: "from-indigo-400 to-blue-400" },
                { id: "section-faq", label: "أسئلتك", icon: "❓", color: "from-gray-400 to-slate-400" },
              ].map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative group overflow-hidden bg-gradient-to-br ${item.color} p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-white/20`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="text-2xl mb-1 group-hover:animate-bounce">{item.icon}</span>
                    <span className="text-sm font-medium text-white group-hover:text-yellow-200 drop-shadow-lg">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>
              ))}
            </div>
          </nav>
        </FloatingElement>

        {/* المحتوى الرئيسي */}
        <div className="space-y-10">
          
          {/* مقدمة بسيطة مع 3D تأثير */}
          <FloatingElement delay={400}>
            <Card3D>
              <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-emerald-50 to-cyan-50 p-8 rounded-2xl border-r-4 border-emerald-400 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200 to-transparent opacity-50 rounded-full -translate-y-32 translate-x-32" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="text-emerald-600 text-4xl animate-bounce">
                    ✨
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                      <span className="animate-pulse">معلومة هتفرق:</span> ليه الأثاث الدمياطي دايمًا الأحسن؟
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                      <strong className="text-emerald-600">بص يا صديقي،</strong> الأثاث الدمياطي مش مجرد قطعة في البيت... دا استثمار! 
                      علشان كده بنقولك: "اشتري دمياطي ولا تدفع تاني".
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl mt-4 border border-emerald-100 shadow-inner">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500 animate-pulse" />
                        اللي هتتعلمه النهاردة:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "✅ تعرف تاريخ الأثاث الدمياطي الحقيقي",
                          "✅ تفرق بين الخشب الأصلي والمقلد",
                          "✅ تختار التصميم اللي يناسب بيتك",
                          "✅ تتفادى الغش في الأسعار",
                          "✅ تعرف ازاي تحافظ عليه سنين طويلة",
                          "✅ تاخد أفضل عرض من مودرن أونلاين"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                            <span className="text-emerald-500 animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>
                              ●
                            </span>
                            <span className="text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Card3D>
          </FloatingElement>

          {/* القسم 1: تاريخ دمياط مع Floating */}
          <FloatingElement delay={500}>
            <section id="section-history" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">📜</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    #1
                  </span> قصتنا في دمياط: من أيام زمان!
                </h2>
              </div>
              
              <Card3D>
                <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-xl">
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    <strong className="text-blue-600">دمياط</strong> دي مش مدينة عادية يا باشا... دي{' '}
                    <strong className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      عاصمة الأثاث في مصر
                    </strong>! 
                    من أيام زمان وأجدادنا بيصنعوا الأثاث بأيدهم، وكل جيل بيضيف خبرة جديدة.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {[
                        {year: "من 1000 سنة", desc: "بدأنا نصنع أثاث للحكام والسلاطين"},
                        {year: "العصر المملوكي", desc: "تعلمنا النقوش والزخارف الدقيقة"},
                        {year: "القرن الـ19", desc: "دخلت علينا أدوات أوروبية متطورة"},
                        {year: "النهضة الحديثة", desc: "دمياط بقى ليها اسمها في العالم كله"}
                      ].map((item, i) => (
                        <FloatingElement key={i} delay={i * 200}>
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-0 group-hover:opacity-30 blur transition duration-500" />
                            <div className="relative flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                                  <span className="font-bold text-blue-600">{item.year.split(' ')[0]}</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 mb-1">{item.year}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        </FloatingElement>
                      ))}
                    </div>
                    
                    <FloatingElement delay={800}>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                        <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl text-center border border-emerald-100">
                          <div className="text-5xl mb-4 animate-bounce">🏆</div>
                          <h3 className="font-bold text-gray-800 mb-4 text-lg">أرقام بتتكلم عن نفسها</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { value: 30000, label: "ورشة في دمياط", color: "from-blue-500 to-cyan-500" },
                              { value: 65, label: "صادرات مصر من الأثاث", suffix: "%", color: "from-emerald-500 to-green-500" },
                              { value: 120, label: "دولة بتشتري من دمياط", color: "from-purple-500 to-pink-500" },
                              { value: 5, label: "أجيال خبرة عائلية", color: "from-orange-500 to-red-500" }
                            ].map((stat, i) => (
                              <div key={i} className="relative group/card overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix || "+"} duration={2000} />
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FloatingElement>
                  </div>
                </div>
              </Card3D>
            </section>
          </FloatingElement>

          {/* القسم 2: مميزاتنا مع Floating Grid */}
          <FloatingElement delay={600}>
            <section id="section-features" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">⭐</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    #2
                  </span> ليه تشتري من مودرن أونلاين؟ علشان...
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: "🛡️",
                    title: "ضمان 5 سنين",
                    desc: "مش كلام في الهوا! ضمان حقيقي على كل قطعة",
                    color: "from-blue-500 to-cyan-500",
                    points: ["ضمان شامل", "صيانة مجانية", "قطع غيار متوفرة"]
                  },
                  {
                    icon: "🌳",
                    title: "خشب طبيعي 100%",
                    desc: "خشب زان أوروبي مش MDF متقلب",
                    color: "from-emerald-500 to-green-500",
                    points: ["مقاوم للحشرات", "لا يتشقق", "عمر طويل"]
                  },
                  {
                    icon: "👨‍🔧",
                    title: "صناعة يدوية",
                    desc: "كل قطعة بتتلمس بأيد خبراء",
                    color: "from-orange-500 to-red-500",
                    points: ["دقة في التفاصيل", "جودة لا مثيل لها", "تفاني في العمل"]
                  },
                  {
                    icon: "🎨",
                    title: "تصميم حسب ذوقك",
                    desc: "اختر اللي يعجبك وبنصممه لك",
                    color: "from-purple-500 to-pink-500",
                    points: ["ألوان حسب اختيارك", "مقاسات تناسب بيتك", "استشارة مجانية"]
                  },
                  {
                    icon: "🚚",
                    title: "توصيل لكل مصر",
                    desc: "من الإسكندرية لأسوان، بنوصل لك",
                    color: "from-teal-500 to-emerald-500",
                    points: ["توصيل مجاني", "تركيب احترافي", "ضمان بعد التركيب"]
                  },
                  {
                    icon: "💳",
                    title: "تقسيط مريح",
                    desc: "بدون فوائد على 12 شهر",
                    color: "from-indigo-500 to-blue-500",
                    points: ["بسعر الكاش", "أقساط شهرية", "شروط سهلة"]
                  }
                ].map((feature, index) => (
                  <FloatingElement key={index} delay={index * 150}>
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                      <Card3D>
                        <div className="relative bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl">
                          <div className="text-3xl mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                            {feature.icon}
                          </div>
                          <h3 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h3>
                          <p className="text-gray-600 mb-4">{feature.desc}</p>
                          <ul className="space-y-2">
                            {feature.points.map((point, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                                <span className="text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Card3D>
                    </div>
                  </FloatingElement>
                ))}
              </div>
              
              <FloatingElement delay={900}>
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-2xl shadow-xl transform-gpu hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center justify-center gap-4">
                    <MdLocalOffer className="text-3xl animate-pulse" />
                    <div className="text-center">
                      <p className="font-bold text-lg mb-1">خلاصة القول:</p>
                      <p className="text-white/90">انت لما تشتري منّا، بتكون اشتريت{' '}
                        <strong className="text-yellow-200">راحة بال</strong> مش بس أثاث!</p>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </section>
          </FloatingElement>

          {/* القسم 3: أنواع الخشب مع 3D Cards */}
          <FloatingElement delay={700}>
            <section id="section-wood-types" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">🌳</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    #3
                  </span> خشب إيه اللي يناسبك؟ دليلك البسيط
                </h2>
              </div>
              
              <div className="space-y-5">
                {[
                  {
                    name: "خشب الزان الأوروبي",
                    desc: "الأقوى والأطول عمرًا - دايمًا اختيار الأذكياء",
                    price: "السعر: أعلى شوية، لكن عمره 20+ سنة",
                    bestFor: "مثالي لـ: غرف النوم، المكتبات، القطع الثقيلة",
                    tip: "نصيحة: لو عايز قطعة تبقي معاك سنين، ده اختيارك!",
                    gradient: "from-amber-500 to-orange-500"
                  },
                  {
                    name: "خشب الماهوجني (الموجنة)",
                    desc: "لونه أحمر داكن طبيعي - أناقة من غير مجهود",
                    price: "السعر: فاخر وعمره طويل",
                    bestFor: "مثالي لـ: الصالونات، طاولات الطعام، الأبواب",
                    tip: "نصيحة: بيتك هيبقى زي القصور!",
                    gradient: "from-red-500 to-pink-500"
                  },
                  {
                    name: "خشب الأرو (البلوط)",
                    desc: "ملمس مميز وخطوط واضحة - كلاسيكي وعصري",
                    price: "السعر: جودة عالية بسعر معقول",
                    bestFor: "مثالي لـ: الأرضيات، المطابخ، غرف المعيشة",
                    tip: "نصيحة: القطعة دي هتلفت نظر كل اللي يجي عندك",
                    gradient: "from-emerald-500 to-teal-500"
                  },
                  {
                    name: "MDF معاكس",
                    desc: "سطح أملس وقابل للتشكيل - اقتصادي وجميل",
                    price: "السعر: اقتصادي ومناسب الميزانية",
                    bestFor: "مثالي لـ: واجهات الخزانات، الأجزاء الديكورية",
                    tip: "نصيحة: مش كل MDF وحش، بس خلي بالك من النوعية",
                    gradient: "from-blue-500 to-cyan-500"
                  }
                ].map((wood, index) => (
                  <FloatingElement key={index} delay={index * 200}>
                    <Card3D>
                      <div className="relative group overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full -translate-y-12 translate-x-12" />
                        
                        <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${wood.gradient} animate-pulse`} />
                              <h3 className="text-xl font-bold text-gray-800">{wood.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{wood.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                                {wood.price}
                              </span>
                              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                                {wood.bestFor}
                              </span>
                            </div>
                          </div>
                          
                          <div className="lg:w-1/3">
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 group-hover:border-emerald-200 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-emerald-500">💡</span>
                                <div className="font-bold text-gray-700">نصيحة منّا:</div>
                              </div>
                              <div className="text-gray-800 font-medium">{wood.tip}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Card3D>
                  </FloatingElement>
                ))}
              </div>
            </section>
          </FloatingElement>

          {/* القسم 4: الفرق بينا وبين غيرنا مع 3D Comparison */}
          <FloatingElement delay={800}>
            <section id="section-original-vs-fake" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">🔍</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    #4
                  </span> اوعى تندم! فرق بين الأصلي والمغشوش
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Original */}
                <FloatingElement delay={400}>
                  <div className="relative group h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                    <Card3D>
                      <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 p-6 rounded-2xl shadow-xl h-full">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-2xl text-white">✅</span>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-0 animate-ping" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-emerald-800">مودرن أونلاين (الأصلي)</h3>
                            <p className="text-emerald-600">جودة ما بعدها جودة</p>
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {[
                            {text: "خشب طبيعي ثقيل - عمره طويل", emoji: "⚖️"},
                            {text: "رائحة خشب نقية - من غير كيماويات", emoji: "👃"},
                            {text: "توصيلات محكمة - من غير فراغات", emoji: "🔧"},
                            {text: "ضمان 5 سنين حقيقي - ورق رسمي", emoji: "📄"},
                            {text: "سعر يعكس الجودة - مش غالي ولا رخيص", emoji: "💰"}
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-colors duration-300">
                              <span className="text-2xl animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>
                                {item.emoji}
                              </span>
                              <span className="text-gray-700 font-medium">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card3D>
                  </div>
                </FloatingElement>

                {/* Fake */}
                <FloatingElement delay={600}>
                  <div className="relative group h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                    <Card3D>
                      <div className="relative bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 p-6 rounded-2xl shadow-xl h-full">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-2xl text-white">❌</span>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-pink-500 rounded-full opacity-0 animate-ping" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-red-800">التقليد الرخيص</h3>
                            <p className="text-red-600">أسعار مغرية، جودة مخيبة</p>
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {[
                            {text: "MDF خفيف - بيتكسر بسرعة", emoji: "⚖️"},
                            {text: "رائحة غراء كيماوية - بتضر صحتك", emoji: "👃"},
                            {text: "توصيلات متهاوية - بيفضل يهتز", emoji: "🔧"},
                            {text: "ضمان وهمي - أو مش موجود", emoji: "📄"},
                            {text: "سعر مغري - بس عمره قصير", emoji: "💰"}
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-colors duration-300">
                              <span className="text-2xl animate-shake" style={{ animationDelay: `${i * 200}ms` }}>
                                {item.emoji}
                              </span>
                              <span className="text-gray-700 font-medium">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card3D>
                  </div>
                </FloatingElement>
              </div>
              
              {/* Warning Message */}
              <FloatingElement delay={800}>
                <div className="mt-8 p-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-2xl shadow-xl transform-gpu hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl animate-pulse">⚠️</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">تنبيه مهم منّا:</h4>
                      <p className="text-white/90">
                        <strong className="text-yellow-200">بلاش تغرّك الأسعار الرخيصة!</strong> الفرق في السعر هو فرق في الجودة والعمر. 
                        الأثاث المغشوش بيخلص خلال 2-3 سنين، والأصلي بيكمل معاك 10+ سنين!
                      </p>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </section>
          </FloatingElement>

          {/* القسم 5: دليل الشراء */}
<FloatingElement delay={900}>
  <section id="section-buying-guide" className="scroll-mt-20">
    <div className="flex items-center gap-3 mb-8">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl text-white">🛒</span>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-0 animate-ping" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          #5
        </span> عايز تشتري؟ خد الخطوات دي
      </h2>
    </div>
    
    <div className="space-y-6">
      {/* خطوات الشراء */}
      <Card3D>
        <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl border border-purple-100 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            اشتري من مودرن أونلاين في 6 خطوات:
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {step: "١", title: "كلمنا", desc: "اتصل أو واتساب علشان نفهم احتياجاتك", icon: "📞", color: "from-blue-500 to-cyan-500"},
              {step: "٢", title: "اختار تصميم", desc: "من كتالوجاتنا أو صمم معانا", icon: "🎨", color: "from-purple-500 to-pink-500"},
              {step: "٣", title: "اتفق على السعر", desc: "أسعارنا ثابتة وواضحة من الأول", icon: "💰", color: "from-emerald-500 to-green-500"},
              {step: "٤", title: "ابعتلنا المساحة", desc: "ابعث مقاسات غرفك عشان نناسبها", icon: "📏", color: "from-amber-500 to-orange-500"},
              {step: "٥", title: "استلم في مصنعنا", desc: "تصنيع تحت إشراف خبراء", icon: "🏭", color: "from-red-500 to-pink-500"},
              {step: "٦", title: "استلم في بيتك", desc: "توصيل وتركيب مجاني", icon: "🚚", color: "from-teal-500 to-emerald-500"}
            ].map((item, index) => (
              <FloatingElement key={item.step} delay={index * 150}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                  <div className="relative text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </Card3D>
      
      {/* تم إزالة جدول الأسعار هنا */}
    </div>
  </section>
</FloatingElement>

          {/* القسم 6: التصاميم */}
          <FloatingElement delay={1000}>
            <section id="section-modern-designs" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">🎨</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    #6
                  </span> اخر صيحة في التصميمات
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: "الكلاسيكي المودرن",
                    desc: "كلاسيكي مع لمسات عصرية - دايمًا راقي",
                    features: ["ألوان خشب طبيعية", "خطوط أنيقة", "لمسات ذهبية"],
                    ideal: "البيوت الفاخرة والشقق الحديثة",
                    gradient: "from-amber-500 to-yellow-500"
                  },
                  {
                    title: "البسيط والأنيق",
                    desc: "مينيمال وجميل - مش محتاج مجهود",
                    features: ["ألوان فاتحة", "تخزين ذكي", "شكل هادي"],
                    ideal: "الشقق الصغيرة والمكاتب",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    title: "الخشب مع المعدن",
                    desc: "خشب قوي مع معدن أنيق - عصري وجريء",
                    features: ["مزيج جميل", "شكل مختلف", "قوة متكاملة"],
                    ideal: "الصالات والمطاعم",
                    gradient: "from-gray-500 to-slate-500"
                  },
                  {
                    title: "الألوان الزاهية",
                    desc: "خشب طبيعي مع ألوان حيوية - بيتفرح",
                    features: ["ألوان متنوعة", "طاقة إيجابية", "شبابي"],
                    ideal: "غرف الشباب والأطفال",
                    gradient: "from-pink-500 to-rose-500"
                  },
                  {
                    title: "الذكي والمتطور",
                    desc: "أثاث مع تكنولوجيا - من الآخر",
                    features: ["شواحن لاسلكية", "إضاءة ذكية", "تخزين متحرك"],
                    ideal: "غرف النوم والمكاتب الذكية",
                    gradient: "from-purple-500 to-indigo-500"
                  },
                  {
                    title: "الصديق للبيئة",
                    desc: "خشب معاد تدويره - بتفكر في المستقبل",
                    features: ["مواد طبيعية", "صديق للبيئة", "شعور رائع"],
                    ideal: "البيوت الواعية",
                    gradient: "from-emerald-500 to-green-500"
                  }
                ].map((design, index) => (
                  <FloatingElement key={index} delay={index * 150}>
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                      <Card3D>
                        <div className="relative bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl">
                          <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                            {["👑","🏢","🏭","🌿","📱","🌍"][index]}
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{design.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{design.desc}</p>
                          <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse" />
                              المميزات:
                            </div>
                            <ul className="space-y-1.5 text-xs text-gray-600">
                              {design.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="text-teal-500">●</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-3 border-t border-gray-100">
                            <div className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                              <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse" />
                              مثالي لـ:
                            </div>
                            <p className="text-gray-600 text-sm">{design.ideal}</p>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Card3D>
                    </div>
                  </FloatingElement>
                ))}
              </div>
            </section>
          </FloatingElement>

          {/* القسم 7: الصيانة */}
          <FloatingElement delay={1100}>
            <section id="section-care" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">🔧</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    #7
                  </span> ابقى احفظ أثاثك سنين
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* نصائح */}
                <FloatingElement delay={400}>
                  <Card3D>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-purple-100 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        نصائح سهلة للحفاظ:
                      </h3>
                      <div className="space-y-3">
                        {[
                          {title: "تنظيف يومي", desc: "قطعة قماش ناعمة وجافة - متحطش مياه", icon: "🧹"},
                          {title: "تنظيف أسبوعي", desc: "منظف خشب خاص مرة في الأسبوع", icon: "🧽"},
                          {title: "بعد الشمس", desc: "متخليهوش في الشمس المباشرة طول اليوم", icon: "☀️"},
                          {title: "الرطوبة المناسبة", desc: "حافظ على جو معتدل في الغرفة", icon: "💧"},
                          {title: "علاج الخدوش", desc: "عالج الخدوش الصغيرة على طول", icon: "🔨"}
                        ].map((tip, i) => (
                          <div key={i} className="group flex items-start gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-all duration-300">
                            <div className="text-2xl animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>
                              {tip.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                {tip.title}
                              </h4>
                              <p className="text-gray-600 text-sm">{tip.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </FloatingElement>

                {/* خدمات */}
                <FloatingElement delay={600}>
                  <Card3D>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-cyan-100 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        خدماتنا لك:
                      </h3>
                      <div className="space-y-3">
                        {[
                          {title: "صيانة مجانية", desc: "فحص مجاني كل سنتين في الضمان", icon: "🛠️"},
                          {title: "ترميم شامل", desc: "تجديد القطع القديمة بأسعار خاصة", icon: "🔄"},
                          {title: "ضمان 5 سنين", desc: "أطول ضمان في السوق على الهيكل", icon: "🛡️"},
                          {title: "قطع غيار", desc: "توفر جميع القطع لمدة 5 سنين", icon: "⚙️"},
                          {title: "فريق متخصص", desc: "فريق صيانة خبراء في دمياطي", icon: "👨‍🔧"}
                        ].map((service, i) => (
                          <div key={i} className="group flex items-start gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-all duration-300">
                            <div className="text-2xl animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>
                              {service.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-gray-600 text-sm">{service.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </FloatingElement>
              </div>
            </section>
          </FloatingElement>

          {/* القسم 8: الأسئلة */}
          <FloatingElement delay={1200}>
            <section id="section-faq" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-slate-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white">❓</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-gray-400 to-slate-400 rounded-full opacity-0 animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                    #8
                  </span> الأسئلة اللي بتيجي في بالنا كل يوم
                </h2>
              </div>
              
              <div className="space-y-3">
                {[
                  {
                    q: "الضمان 5 سنين ده على إيه بالظبط؟",
                    a: "ضمان شامل يا صديقي! 5 سنين على هيكل الأثاث، 3 سنين على المفصلات والأدراج، وسنتين على التشطيبات والدهانات. الضمان شامل قطع الغيار والعمالة برضه."
                  },
                  {
                    q: "عايز تصميم مش موجود عندكم، تقدرون تعمّلوه؟",
                    a: "طبعًا! عندنا خدمة التصميم المخصوص. ابعتلنا فكرتك أو صورة وحتلاقينا عاملينلك تصميم ثلاثي الأبعاد عشان تشوفه قبل ما تبدأ."
                  },
                  {
                    q: "بتوصلوا للمحافظات البعيدة زيّ أسوان؟",
                    a: "أكيد! بنوصل لكل محافظات مصر. في القاهرة الكبرى والإسكندرية توصيل مجاني. المحافظات التانية في رسوم شحن بسيطة حسب المكان."
                  },
                  {
                    q: "لو محتاج قطعة غيار بعد 4 سنين، هتلاقيها؟",
                    a: "متفكرش في الحوار ده! بنحتفظ بكل تصاميمنا في الأرشيف لمدة 10 سنين. أي قطعة غيار هتلاقينا عاملينها لك بنفس الدقة."
                  },
                  {
                    q: "عندكم تقسيط؟ وازاي؟",
                    a: "عندنا تقسيط بدون فوائد على 6 و12 شهر. وعادي على 24 شهر بفوايد بسيطة. محتاج بس صورة بطاقتك ورقم تلفونك، والباقي علينا."
                  },
                  {
                    q: "ازاي أتأكد إن الخشب طبيعي مش MDF؟",
                    a: "بنعطيك شهادة ضمان موثقة فيها نوع الخشب بالضبط. ولو عايز تزور المصنع في دمياط وتشوف بنفسك، أحنا تحت أمرك!"
                  }
                ].map((faq, index) => (
                  <FloatingElement key={index} delay={index * 150}>
                    <div className="relative group overflow-hidden">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                      <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-all duration-300">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full p-5 text-right flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 group"
                        >
                          <span className="font-bold text-gray-800 text-lg group-hover:text-emerald-600 transition-colors">
                            {faq.q}
                          </span>
                          <FaChevronRight className={`text-emerald-500 transition-all duration-300 ${
                            activeFaq === index ? 'rotate-90 scale-125' : 'group-hover:translate-x-1'
                          }`} />
                        </button>
                        {activeFaq === index && (
                          <div className="p-5 pt-0 animate-slideDown">
                            <div className="text-gray-700 leading-relaxed bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-lg border border-emerald-100">
                              {faq.a}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FloatingElement>
                ))}
              </div>
            </section>
          </FloatingElement>

          {/* الخاتمة */}
          <FloatingElement delay={1300}>
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700" />
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${svgPattern}")`
                }}
              />
              
              <div className="relative z-10 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-700/90 backdrop-blur-sm text-white p-8 rounded-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                    خلاصة الموضوع
                  </h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    الأثاث الدمياطي الأصلي استثمار في راحتك وراحة بيتك!
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    {number: 10, suffix: "+", label: "سنة خبرة", desc: "في صناعة الأثاث"},
                    {number: 3000, suffix: "+", label: "عميل مبسوط", desc: "في مصر والخليج"},
                    {number: 98, suffix: "%", label: "رضا العملاء", desc: "معدل رضا مستمر"},
                    {number: 100, suffix: "+", label: "تصميم مختلف", desc: "في كتالوجاتنا"}
                  ].map((stat, i) => (
                    <FloatingElement key={i} delay={i * 200}>
                      <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                        <div className="text-2xl font-bold mb-1 text-yellow-200">
                          <AnimatedCounter value={stat.number} suffix={stat.suffix} duration={2000} />
                        </div>
                        <div className="font-semibold mb-1">{stat.label}</div>
                        <div className="text-sm opacity-80">{stat.desc}</div>
                      </div>
                    </FloatingElement>
                  ))}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                    مميزات حصرية مع مودرن أونلاين:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      "تصميم ثلاثي الأبعاد مجاني",
                      "زيارة افتراضية للمصنع",
                      "عينة خشب مجانية",
                      "دعم فني 24/7",
                      "تحديثات على طلبك",
                      "تأمين على الشحنة"
                    ].map((feature, i) => (
                      <FloatingElement key={i} delay={i * 100}>
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                          <IoMdCheckmarkCircle className="text-emerald-300 animate-pulse" />
                          <span>{feature}</span>
                        </div>
                      </FloatingElement>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </FloatingElement>

          {/* CTA النهائي مع تأثيرات */}
          <FloatingElement delay={1400}>
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl transform-gpu hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-3 text-center animate-pulse">
                  جاهز تبدأ مشروع أثاث بيتك؟
                </h2>
                <p className="text-lg opacity-90 mb-6 text-center">
                  {egyptianPhrases.contact} <br />
                  استشارة مجانية وتصميم ثلاثي الأبعاد قبل ما تدفع!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://wa.me/201015262864?text=أهلاً، أنا من موقع مودرن أونلاين وعايز أستفسر عن أثاث دمياطي"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group/btn"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover/btn:opacity-20 blur transition duration-500" />
                    <div className="relative bg-white hover:bg-gray-50 text-emerald-600 font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center gap-2">
                      <FaWhatsapp className="text-xl animate-bounce" />
                      <span>كلمنا على الواتساب</span>
                    </div>
                  </a>
                  <a 
                    href="tel:+201015262864"
                    className="relative overflow-hidden group/btn"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-700 to-teal-800 rounded-xl opacity-0 group-hover/btn:opacity-20 blur transition duration-500" />
                    <div className="relative bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center gap-2">
                      <FaPhone className="animate-pulse" />
                      <span>اتصل دلوقتي</span>
                    </div>
                  </a>
                  <Link 
                    href="/portfolio"
                    className="relative overflow-hidden group/btn"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-white to-white/50 rounded-xl opacity-0 group-hover/btn:opacity-20 blur transition duration-500" />
                    <div className="relative bg-transparent hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border-2 border-white transition-all hover:scale-105 flex items-center gap-2">
                      <MdOutlineDesignServices className="text-xl animate-spin" style={{ animationDuration: '3s' }} />
                      <span>شوف أعمالنا</span>
                    </div>
                  </Link>
                </div>
                <p className="mt-4 opacity-80 text-sm text-center animate-pulse">
                  ⏰ خدمة العملاء من 9 الصبح لـ 11 الليل - كل أيام الأسبوع
                </p>
              </div>
            </div>
          </FloatingElement>
        </div>

        {/* فوتر المقال */}
        <FloatingElement delay={1500}>
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-4">معلومات المقال</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center animate-pulse">
                      <span className="text-blue-600">📅</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">نشر</div>
                      <div className="text-gray-600">{publishDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center animate-pulse">
                      <span className="text-emerald-600">✍️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">كاتب</div>
                      <div className="text-gray-600">فريق مودرن أونلاين - خبراء دمياطي</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-4">شارك مع أصحابك</h3>
                <div className="flex gap-3 mb-6">
                  {[
                    {platform: "فيسبوك", icon: <FaFacebookF />, color: "from-blue-600 to-blue-700"},
                    {platform: "تويتر", icon: <FaTwitter />, color: "from-sky-500 to-blue-500"},
                    {platform: "واتساب", icon: <FaWhatsapp />, color: "from-green-500 to-emerald-600"}
                  ].map((social, i) => (
                    <button
                      key={social.platform}
                      className={`relative overflow-hidden group/btn w-12 h-12 rounded-xl flex items-center justify-center text-lg hover:scale-110 transition-transform duration-300`}
                      aria-label={`شارك على ${social.platform}`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`} />
                      <div className="relative z-10 text-white">
                        {social.icon}
                      </div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20" />
                    </button>
                  ))}
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">الكلمات المفتاحية:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "أثاث دمياطي", "مصنع أثاث", "أثاث مودرن", 
                      "غرف نوم", "صالونات", "كنب دمياطي",
                      "خشب زان", "ضمان 5 سنين", "أثاث منزلي",
                      "مودرن أونلاين", "ديكور داخلي", "أثاث مصر"
                    ].map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* حقوق النشر */}
            <div className="mt-8 pt-6 border-t border-gray-300 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} مودرن أونلاين. كل الحقوق محفوظة.</p>
              <p className="mt-1">المقال ده مكتوب لفائدتك، ومفيش حاجة بتتدفع فيه.</p>
            </div>
          </footer>
        </FloatingElement>
      </article>

      {/* إضافة أنماط CSS للحركات */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .transform-gpu {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
        
        /* Selection color */
        ::selection {
          background-color: rgba(16, 185, 129, 0.3);
          color: #000;
        }
      `}</style>
    </>
  )
}