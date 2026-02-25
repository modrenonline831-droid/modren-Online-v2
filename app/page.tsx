import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { PricingCards } from "@/components/pricing-cards"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-xl"></div>}>
      {children}
    </Suspense>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AIAssistant />
      
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <LazySection>
            <HeroSection />
          </LazySection>
        </section>
        
        <section className="relative py-8">
          <LazySection>
            <FeaturesSection />
          </LazySection>
        </section>
        
        <section className="relative py-12 bg-gradient-to-b from-white to-gray-50">
          <LazySection>
            <PricingCards />
          </LazySection>
        </section>
        
        <section className="relative py-16 overflow-hidden">
          <LazySection>
            <CTASection />
          </LazySection>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}