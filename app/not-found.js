"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // إضافة تأثير صوتي بسيط عند تحميل الصفحة
    console.log('🌳 صفحة 404 محملة - تصميم خشب مودرن أونلاين')
    
    // توليد الجزيئات مرة واحدة فقط بعد تحميل الصفحة (على العميل)
    const newParticles = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 to-yellow-50/30 dark:from-amber-950/20 dark:to-yellow-950/10 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* تأثير نسيج الخشب في الخلفية */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="w-full h-full wood-grain"></div>
      </div>

      {/* إطار خشبي ديكور */}
      <div className="absolute top-6 left-6 right-6 bottom-6 sm:top-8 sm:left-8 sm:right-8 sm:bottom-8 border-[12px] border-amber-900/10 dark:border-amber-800/20 rounded-[32px] pointer-events-none shadow-2xl"></div>

      {/* اللوجو المركزي */}
      <div className="relative z-20 mb-8 sm:mb-12 group">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/90 to-amber-700 dark:from-primary/80 dark:to-amber-800 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-amber-900/20 dark:shadow-amber-950/30 transform rotate-2 group-hover:rotate-3 transition-transform duration-500">
          <div className="w-full h-full bg-background/95 dark:bg-background/90 rounded-xl flex items-center justify-center backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="مودرن أونلاين - أثاث دمياطي فاخر"
                width={70}
                height={70}
                className="object-contain drop-shadow-lg"
                priority
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="text-4xl text-primary dark:text-primary/90 animate-pulse">🪑</div>
                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                  `
                }}
              />
              {/* بريق على اللوجو */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 dark:bg-amber-500 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>
          {/* مسمار خشبي */}
          <div className="absolute -bottom-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-800 dark:bg-amber-900 rounded-full"></div>
          <div className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-800 dark:bg-amber-900 rounded-full"></div>
        </div>
        
        {/* ظل متحرك */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-amber-900/10 dark:bg-amber-950/20 blur-xl rounded-full animate-pulse"></div>
      </div>

      {/* رمز الخطأ */}
      <div className="relative z-20 mb-6 sm:mb-8">
        <div className="relative">
          <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-amber-900/90 dark:text-amber-200/90 tracking-tighter">
            4<span className="text-destructive dark:text-destructive/90 animate-pulse">0</span>4
          </div>
          
          {/* تشققات في الخشب */}
          <div className="absolute -top-1 left-1/4 w-8 h-1 bg-amber-700/30 dark:bg-amber-600/40 rounded-full transform -rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-1 bg-amber-700/30 dark:bg-amber-600/40 rounded-full transform rotate-12"></div>
        </div>
      </div>

      {/* وجه حزين مع تأثير */}
      <div className="relative z-20 mb-6 sm:mb-8">
        <div className="text-5xl sm:text-6xl animate-bounce-slow">😔</div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-2xl text-amber-600 dark:text-amber-500 opacity-70">🪚</div>
      </div>

      {/* العنوان والرسالة */}
      <div className="relative z-20 text-center mb-8 sm:mb-10 max-w-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
          آه! <span className="text-primary dark:text-primary/90">خشب</span> الصفحة انكسر
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          الصفحة اللي بتدور عليها مش موجودة، زي قطعة الأثاث الدمياطي النادرة اللي بقت تحفة في متحف!
          <br className="hidden sm:block" />
          بس متقلقش، هنقودك للطريق الصح.
        </p>
      </div>

      {/* الأزرار الرئيسية */}
      <div className="relative z-20 space-y-4 sm:space-y-5 mb-10 sm:mb-12 w-full max-w-md">
        <Link
          href="/"
          className="block w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-primary to-amber-700 dark:from-primary/90 dark:to-amber-800 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 border border-primary/20 text-center relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-lg">🏠</span>
            العودة للصفحة الرئيسية
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* خطوط خشب */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(180, 83, 9, 0.1) 50%)`,
              backgroundSize: '30px 100%'
            }}></div>
          </div>
        </Link>

        <Link
          href="/portfolio"
          className="block w-full py-4 sm:py-5 px-6 bg-card dark:bg-card/80 text-card-foreground font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-primary/20 dark:border-primary/30 text-center relative group hover:border-primary/40"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-lg">🎨</span>
            تصفح معرض الأثاث
          </span>
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </Link>
      </div>

      {/* أرفف خشبية للروابط */}
      <div className="relative z-20 w-full max-w-lg">
        <div className="bg-gradient-to-b from-card/80 to-card/60 dark:from-card/70 dark:to-card/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg relative">
          {/* الرف العلوي */}
          <div className="absolute -top-3 sm:-top-4 left-4 right-4 h-3 bg-gradient-to-r from-amber-800/80 to-amber-900/80 dark:from-amber-900 dark:to-amber-950 rounded-t-lg shadow-md"></div>
          
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-5 text-center">
            <span className="text-primary dark:text-primary/90">🔍</span> ابحث في أقسامنا
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { 
                href: '/blog', 
                label: 'المدونة', 
                icon: '📝',
                color: 'from-blue-100/80 to-blue-50/80 dark:from-blue-950/40 dark:to-blue-900/30',
                border: 'border-blue-200/50 dark:border-blue-800/30'
              },
              { 
                href: '/contact', 
                label: 'اتصل بنا', 
                icon: '📞',
                color: 'from-emerald-100/80 to-emerald-50/80 dark:from-emerald-950/40 dark:to-emerald-900/30',
                border: 'border-emerald-200/50 dark:border-emerald-800/30'
              },
              { 
                href: '/portfolio', 
                label: 'المعرض', 
                icon: '🖼️',
                color: 'from-purple-100/80 to-purple-50/80 dark:from-purple-950/40 dark:to-purple-900/30',
                border: 'border-purple-200/50 dark:border-purple-800/30'
              },
              { 
                href: '/pricing', 
                label: 'الأسعار', 
                icon: '💰',
                color: 'from-rose-100/80 to-rose-50/80 dark:from-rose-950/40 dark:to-rose-900/30',
                border: 'border-rose-200/50 dark:border-rose-800/30'
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-3 sm:p-4 ${link.color} ${link.border} border rounded-lg text-center hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 font-medium text-foreground/90 hover:text-primary dark:text-foreground/80 dark:hover:text-primary/90 group/link`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xl sm:text-2xl group-hover/link:scale-110 transition-transform duration-200">{link.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* الرف السفلي */}
          <div className="absolute -bottom-3 sm:-bottom-4 left-4 right-4 h-3 bg-gradient-to-r from-amber-800/80 to-amber-900/80 dark:from-amber-900 dark:to-amber-950 rounded-b-lg shadow-md"></div>
        </div>
      </div>

      {/* ديكورات خشبية عائمة */}
      <div className="fixed bottom-6 left-6 text-2xl sm:text-3xl text-amber-600/30 dark:text-amber-500/20 animate-float-slow">🪑</div>
      <div className="fixed top-6 right-6 text-2xl sm:text-3xl text-amber-600/30 dark:text-amber-500/20 animate-float-slow" style={{animationDelay: '1s'}}>🛏️</div>
      <div className="fixed top-1/3 left-8 text-xl sm:text-2xl text-amber-600/20 dark:text-amber-500/15 animate-float-slow" style={{animationDelay: '2s'}}>🚪</div>
      <div className="fixed bottom-1/3 right-8 text-xl sm:text-2xl text-amber-600/20 dark:text-amber-500/15 animate-float-slow" style={{animationDelay: '3s'}}>🪟</div>

      {/* جزيئات خشب عائمة - تم تعديلها */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-600/10 dark:bg-amber-500/10 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `particle-float ${particle.animationDuration} linear infinite`,
              animationDelay: particle.animationDelay
            }}
          ></div>
        ))}
      </div>

      {/* حقوق النشر */}
      <div className="relative z-20 mt-8 sm:mt-10 text-center">
        <p className="text-sm text-muted-foreground/80 dark:text-muted-foreground/70 font-medium">
          مودرن أونلاين &copy; {new Date().getFullYear()}
          <span className="block text-xs text-muted-foreground/60 dark:text-muted-foreground/50 mt-1">
            أثاث دمياطي فاخر بجودة 5 سنين ضمان
          </span>
        </p>
      </div>

      {/* خطوط خشب متحركة */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-amber-600/5 dark:via-amber-500/5 to-transparent"
            style={{
              top: `${15 + i * 12}%`,
              left: '5%',
              right: '5%',
              animation: `wood-grain-line ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>

      {/* أنيميشن مخصصة */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes particle-float {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg); 
            opacity: 0;
          }
        }
        
        @keyframes wood-grain-line {
          0%, 100% { 
            opacity: 0.1;
            transform: translateX(-20px);
          }
          50% { 
            opacity: 0.3;
            transform: translateX(20px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .wood-grain {
          background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 36c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14zm96 50c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14zm-86-14c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm126 62c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM68 180c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm112-152c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM24 172c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm56-130c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm46-22c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm-12 120c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm58 44c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zM64 126c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm114-26c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm-18-42c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM120 182c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM70 82c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM24 120c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' fill='%23d97706' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-size: 400px 400px;
          animation: wood-grain-move 40s linear infinite;
        }
        
        @keyframes wood-grain-move {
          0% { background-position: 0 0; }
          100% { background-position: 400px 400px; }
        }
      `}</style>
    </div>
  )
}