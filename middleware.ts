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

  // ✅ كل المسارات تحت /admin محمية
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin')
  
  // استثناء صفحة تسجيل الدخول فقط
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  // إذا كان المسار يبدأ بـ /admin ومش صفحة login ومفيش session
  if (isAdminPath && !isLoginPage && !session) {
    console.log('🔒 Unauthorized access to:', req.nextUrl.pathname)
    const redirectUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // إذا كان المسار هو صفحة تسجيل الدخول والمستخدم مسجل بالفعل
  if (isLoginPage && session) {
    console.log('✅ Already logged in, redirecting to admin dashboard')
    const redirectUrl = new URL('/admin', req.url) // حول للوحة التحكم الرئيسية
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'], // ده بيحمي كل المسارات اللي تحت /admin
}