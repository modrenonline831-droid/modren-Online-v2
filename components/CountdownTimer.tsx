'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: string
  className?: string
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  })

  useEffect(() => {
    const target = new Date(endDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = target - now

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        })
        clearInterval(interval)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, expired: false })
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  if (timeLeft.expired) {
    return <span className="text-red-600 font-bold text-xs">انتهى العرض</span>
  }

  // إذا كانت المدة أقل من يوم، نظهر الساعات والدقائق فقط
  if (timeLeft.days === 0) {
    return (
      <span className={`font-mono ${className}`}>
        {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
    )
  }

  // إذا كانت المدة يوم أو أكثر
  return (
    <span className={`font-mono ${className}`}>
      {timeLeft.days}يوم {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}
    </span>
  )
}