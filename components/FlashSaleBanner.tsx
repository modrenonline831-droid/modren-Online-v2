'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

interface FlashSale {
  id: number
  title: string
  description: string
  discount_percentage: number
  duration_value: number
  duration_unit: 'hours' | 'days'
  product_ids: number[]
  image_url: string
  created_at: string
}

export default function FlashSalesBanner() {
  const [activeSales, setActiveSales] = useState<FlashSale[]>([])
  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({})

  useEffect(() => {
    fetchActiveSales()
    const interval = setInterval(() => {
      updateTimeLeft()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchActiveSales = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('flash_sales')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (data) {
      setActiveSales(data)
      calculateTimeLeft(data)
    }
  }

  const calculateTimeLeft = (sales: FlashSale[]) => {
    const now = new Date().getTime()
    const newTimeLeft: Record<number, string> = {}

    sales.forEach(sale => {
      const createdAt = new Date(sale.created_at).getTime()
      let endTime = createdAt
      if (sale.duration_unit === 'hours') {
        endTime += sale.duration_value * 60 * 60 * 1000
      } else {
        endTime += sale.duration_value * 24 * 60 * 60 * 1000
      }

      const diff = endTime - now
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        newTimeLeft[sale.id] = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      } else {
        newTimeLeft[sale.id] = 'انتهى'
      }
    })

    setTimeLeft(newTimeLeft)
  }

  const updateTimeLeft = () => {
    if (activeSales.length > 0) {
      calculateTimeLeft(activeSales)
    }
  }

  if (activeSales.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-pulse">🔥</span>
          <h3 className="font-bold text-lg">عروض حية لفترة محدودة!</h3>
        </div>
        <div className="flex gap-4">
          {activeSales.map(sale => (
            <Link
              key={sale.id}
              href={`/flash-sales/${sale.id}`}
              className="bg-white text-gray-900 p-3 rounded-lg hover:scale-105 transition transform"
            >
              <div className="font-bold">{sale.title}</div>
              <div className="text-sm">خصم {sale.discount_percentage}%</div>
              <div className="text-xs text-gray-600 mt-1">
                متبقي: {timeLeft[sale.id] || '...'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}