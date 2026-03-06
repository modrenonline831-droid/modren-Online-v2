import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // إنشاء response مؤقت
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // تحديث الكوكيز في الـ response
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          // حذف الكوكيز من الـ response
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // تحديث الجلسة - مهم جداً!
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Middleware session error:', error)
  }

  // قائمة المسارات المحمية
  const protectedPaths = ['/admin/flash-sales', '/admin/products', '/admin/dashboard']
  
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  )

  // إذا كان المسار محمياً ولا يوجد session، حول إلى صفحة تسجيل الدخول
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // إذا كان المسار هو صفحة تسجيل الدخول والمستخدم مسجل بالفعل، حول إلى صفحة العروض
  if (req.nextUrl.pathname === '/admin/login' && session) {
    const redirectUrl = new URL('/admin/flash-sales', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}