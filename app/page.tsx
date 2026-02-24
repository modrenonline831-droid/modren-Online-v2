import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { PricingCards } from "@/components/pricing-cards"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"

// مكون لتحميل العناصر تدريجياً
function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-xl"></div>}>
      {children}
    </Suspense>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* الهيدر */}
      <Header />
      
      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        {/* قسم الهيرو */}
        <section className="relative overflow-hidden">
          <LazySection>
            <HeroSection />
          </LazySection>
          
          {/* تأثيرات خلفية */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-2xl"></div>
          </div>
        </section>
        
        {/* قسم المميزات */}
        <section className="relative py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent -z-10"></div>
          <LazySection>
            <FeaturesSection />
          </LazySection>
        </section>
        
        {/* قسم التصميم الذاتي */}
        <section className="relative py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white"></div>
          <LazySection>
            <PricingCards />
          </LazySection>
          
          {/* تأثيرات */}
          <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"></div>
          </div>
        </section>
        
        {/* قسم الدعوة للإجراء */}
        <section className="relative py-16 overflow-hidden">
          <LazySection>
            <CTASection />
          </LazySection>
          
          {/* تأثيرات */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent"></div>
          </div>
        </section>
      </main>
      
      {/* الفوتر */}
      <Footer />
      
      {/* مؤشر تحميل للصفحة بأكملها */}
      <div className="fixed inset-0 pointer-events-none -z-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}