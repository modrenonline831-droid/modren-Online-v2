"use client"

import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* الدائرة الخارجية */}
        <div className="w-12 h-12 md:w-16 md:h-16 border-3 md:border-4 border-primary/20 rounded-full"></div>
        
        {/* الدائرة الدوارة */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-3 md:border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        
        {/* الأيقونة */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// نسخة أصغر للاستخدام في الأزرار
export function SmallLoadingSpinner() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="relative w-4 h-4">
        <div className="w-4 h-4 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// نسخة للصفحة كاملة
export function FullPageLoading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-xs md:max-w-md px-4">
        {/* اللوجو */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 md:gap-3">
            <div className="p-2 md:p-3 bg-gradient-to-r from-primary to-primary/80 rounded-lg md:rounded-xl shadow-md md:shadow-lg">
              <span className="text-white text-xl md:text-2xl">🛋️</span>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Modern Online
              </div>
              <div className="text-xs md:text-sm text-gray-500">جاري التحميل...</div>
            </div>
          </div>
        </div>
        
        {/* مؤشر التحميل */}
        <div className="relative mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 border-3 md:border-4 border-primary/10 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-3 md:border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
          </div>
        </div>
        
        {/* شريط التقدم */}
        <div className="w-48 md:w-64 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 animate-progress-bar"></div>
        </div>
        
        {/* النص */}
        <p className="mt-3 md:mt-4 text-gray-600 text-xs md:text-sm">جاري تحميل أفضل تجربة تسوق...</p>
        
        {/* CSS للشريط المتحرك */}
        <style jsx>{`
          @keyframes progress-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-progress-bar {
            animation: progress-bar 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

// نسخة للمنتجات
export function ProductLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-lg md:rounded-xl overflow-hidden bg-white border border-gray-200 animate-pulse">
          {/* الصورة */}
          <div className="aspect-square bg-gray-200"></div>
          
          {/* المحتوى */}
          <div className="p-3 md:p-4 space-y-2 md:space-y-3">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2.5 md:h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2.5 md:h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-2.5 md:h-3 bg-gray-200 rounded w-2/3"></div>
            
            {/* السعر */}
            <div className="flex items-center justify-between pt-2 md:pt-2">
              <div className="h-5 md:h-6 bg-gray-200 rounded w-16 md:w-20"></div>
              <div className="h-5 md:h-6 bg-gray-200 rounded w-12 md:w-16"></div>
            </div>
            
            {/* الزر */}
            <div className="h-8 md:h-10 bg-gray-200 rounded-md md:rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// نسخة للتفاصيل
export function DetailLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* صورة المنتج */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-xl md:rounded-2xl"></div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        {/* تفاصيل المنتج */}
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <div className="h-6 md:h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-6 md:h-8 bg-gray-200 rounded w-24 md:w-32"></div>
            <div className="h-6 bg-gray-200 rounded w-20 md:w-24"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="h-10 md:h-12 bg-gray-200 rounded-lg"></div>
            <div className="h-10 md:h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// نسخة للبطاقات الصغيرة
export function CardLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-2 md:p-3 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-md md:rounded-lg mb-2 md:mb-3"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 mb-1 md:mb-2"></div>
          <div className="h-2 md:h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

// نسخة للقوائم
export function ListLoadingSkeleton() {
  return (
    <div className="space-y-2 md:space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white border border-gray-200 rounded-lg md:rounded-xl">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 md:h-10 bg-gray-200 rounded w-20 md:w-24"></div>
        </div>
      ))}
    </div>
  )
}