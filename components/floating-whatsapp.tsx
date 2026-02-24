'use client'

import { useState, useEffect } from 'react'

interface FloatingWhatsAppProps {
  phoneNumber: string
  message: string
  companyName: string
  responseTime: string
}

export function FloatingWhatsApp({ 
  phoneNumber, 
  message, 
  companyName, 
  responseTime 
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        aria-label={`تواصل مع ${companyName} عبر واتساب`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>
          <div className="text-2xl relative z-10">💬</div>
        </div>
        
        <div className="hidden md:block">
          <div className="font-bold text-sm whitespace-nowrap">
            تواصل عبر واتساب
          </div>
          <div className="text-xs opacity-90 mt-0.5">
            رد خلال {responseTime}
          </div>
        </div>
        
        <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-2"></div>
        
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
          🔥
        </div>
      </a>
    </div>
  )
}