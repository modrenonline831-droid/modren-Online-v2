import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ⚠️ تخزين مؤقت للحدود (في الذاكرة)
// لو عايزها تدوم لو السيرفر اتقفل، استخدم Supabase
const rateLimit = new Map<string, { count: number; date: string }>()

// 👈 حدد هنا أقصى رسائل في اليوم لكل جهاز
const MAX_MESSAGES_PER_DAY = 15

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0]
  if (realIp) return realIp
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const record = rateLimit.get(ip)

  if (!record || record.date !== today) {
    // أول رسالة اليوم أو يوم جديد
    rateLimit.set(ip, { count: 1, date: today })
    return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - 1 }
  }

  if (record.count >= MAX_MESSAGES_PER_DAY) {
    // تعدى الحد
    return { allowed: false, remaining: 0 }
  }

  // لسه في حد
  record.count += 1
  rateLimit.set(ip, record)
  return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - record.count }
}

export async function POST(req: NextRequest) {
  try {
    // 👈 التحقق من الحدود اليومية للجهاز
    const ip = getClientIp(req)
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return new Response(
        JSON.stringify({ 
          response: 'عذراً، خلصت الرسائل المتاحة لليوم 😊. بكره تبدأ من جديد! تقدر دلوقتي تكلم أيمن على واتساب: 01015262864'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages } = await req.json()

    // جلب المنتجات من Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) console.error('Supabase error:', error)

    let productsText = 'المنتجات المتوفرة حالياً:\n'
    if (products && products.length > 0) {
      products.forEach(p => {
        productsText += `- ${p.name}: ${p.price} جنيه (${p.category})${p.is_new ? ' 🆕 جديد' : ''}\n`
      })
    } else {
      productsText += '- لا توجد منتجات متوفرة حالياً.\n'
    }

    // معلومات الموقع الأساسية
    const siteInfo = `
موقع مودرن أونلاين (modrenonline.com) متخصص في الأثاث الدمياطي المودرن.

الصفحات المتاحة:
- الرئيسية: https://modrenonline.com/
- المنتجات: https://modrenonline.com/portfolio
- تفاصيل المنتج: https://modrenonline.com/portfolio/[id]
- اتصل بنا: https://modrenonline.com/contact
- من نحن: https://modrenonline.com/about
- سياسة التوصيل: https://modrenonline.com/Delivery%20Policy
- سياسة الاسترجاع: https://modrenonline.com/return-policy

التواصل:
- واتساب: https://wa.me/201015262864 (01015262864)
- فيسبوك: https://www.facebook.com/modrenonline1/?rdid=Tup3AwWlLZZpExM3
- انستجرام: https://instagram.com/modrenonline

${productsText}
    `

    const systemPrompt = `أنت مساعد ذكي اسمه "مودرينو" لموقع مودرن أونلاين. إليك معلومات الموقع:\n${siteInfo}\n\nتعليمات هامة جداً:
- رد بالعامية المصرية، واستخدم إيموجيات مناسبة.
- اكتب الروابط كنص عادي (مثل: https://modrenonline.com/portfolio) ولا تستخدم أي أكواد HTML مثل <a> أو <span>.
- إذا سأل عن منتج معين، اذكر اسمه وسعره ووصف بسيط.
- إذا سأل المستخدم عن المطور (زي: مين مطورك؟، مين عملك؟، مين صنعك؟)، ترد: "بشمهندس زياد الكابو 😎".
- لا تذكر المطور أبداً إلا إذا سأل عن ذلك مباشرة.
- خلي ردودك طبيعية ومفيدة ومش مطنشة.`

    const lastMessage = messages[messages.length - 1]?.content || ''
    const prompt = `${systemPrompt}\n\nالزبون: ${lastMessage}\nمودرينو:`

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ response: 'مودرينو في إجازة دلوقتي 😴، تقدر تكلم أيمن على الرقم ده واتساب: 01015262864' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
    })

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return new Response(
      JSON.stringify({ response }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ response: 'مودرينو في إجازة دلوقتي 😴، تقدر تكلم أيمن على الرقم ده واتساب: 01015262864' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}