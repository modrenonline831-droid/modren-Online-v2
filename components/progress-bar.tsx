'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  
  useEffect(() => {
    // إضافة شريط التقدم
    const style = document.createElement('style')
    style.innerHTML = `
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: linear-gradient(90deg, #1a365d 0%, #2d3748 50%, #4a5568 100%);
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #1a365d, 0 0 5px #1a365d;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `
    document.head.appendChild(style)
    
    // إضافة عنصر الشريط
    const bar = document.createElement('div')
    bar.id = 'nprogress'
    bar.innerHTML = '<div class="bar"><div class="peg"></div></div>'
    document.body.appendChild(bar)
    
    // تنظيف
    return () => {
      document.head.removeChild(style)
      document.body.removeChild(bar)
    }
  }, [pathname])
  
  return null
}