import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const rateLimit = new Map<string, { count: number; date: string }>()
const MAX_MESSAGES_PER_DAY = 15

// تخزين المحادثات في الذاكرة (مؤقت)
const conversationHistory = new Map<string, { 
  messages: Array<{ role: string; content: string }>,
  lastUpdated: Date
}>()

// التصنيفات المتاحة
const CATEGORIES = [
  { name: 'أنترية مغلف', icon: '🛋️', count: 0 },
  { name: 'ركن', icon: '🪑', count: 0 },
  { name: 'طرابيزات', icon: '🪵', count: 0 },
  { name: 'جزمات', icon: '👞', count: 0 },
  { name: 'فوتية', icon: '🛋', count: 0 },
  { name: 'كراسي', icon: '💺', count: 0 }
]

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0]
  if (realIp) return realIp
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0]
  const record = rateLimit.get(ip)

  if (!record || record.date !== today) {
    rateLimit.set(ip, { count: 1, date: today })
    return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - 1 }
  }

  if (record.count >= MAX_MESSAGES_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  rateLimit.set(ip, record)
  return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - record.count }
}

// دالة لعرض المنتج مع الرابط الصحيح
function formatProductCard(product: any) {
  const productUrl = `https://www.modrenonline.com/portfolio?product=${product.id}`
  const whatsappUrl = `https://wa.me/20101526264?text=${encodeURIComponent(`أنا عايز استفسر عن ${product.title || 'منتج'}`)}`
  
  return `
    <div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #eaeaea; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="flex-shrink: 0;">
          <img src="${product.image_url || 'https://modrenonline.com/default-product.jpg'}" 
               alt="${product.title || 'منتج'}" 
               style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
        </div>
        <div style="flex-grow: 1;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: bold; color: #333;">${product.title || 'منتج جديد'}</h3>
          <p style="margin: 4px 0; color: #27ae60; font-weight: bold;">💰 ${product.price || 0} جنيه</p>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">📦 ${product.category || 'أثاث مودرن'}</p>
          <div style="margin-top: 12px; display: flex; gap: 8px;">
            <a href="${productUrl}" target="_blank" style="display: inline-block; padding: 8px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
              🔍 عرض التفاصيل
            </a>
            <a href="${whatsappUrl}" target="_blank" style="display: inline-block; padding: 8px 16px; background: #25D366; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
              💬 واتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

// دالة لعرض تفاصيل المنتج بشكل كامل
function formatProductDetails(product: any) {
  const productUrl = `https://www.modrenonline.com/portfolio?product=${product.id}`
  const whatsappUrl = `https://wa.me/20101526264?text=${encodeURIComponent(`أنا عايز استفسر عن ${product.title}`)}`
  
  // تقسيم الوصف إذا كان موجود
  const description = product.description || 'قطعة فاخرة من الأثاث الدمياطي المودرن'
  const features = description.split('\n').filter((item: string) => item.trim() !== '')
  
  return `
    <div style="background: white; border-radius: 16px; padding: 20px; margin: 15px 0; border: 1px solid #eaeaea; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 0 0 200px;">
          <img src="${product.image_url || 'https://modrenonline.com/default-product.jpg'}" 
               alt="${product.title}" 
               style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px;" />
        </div>
        <div style="flex: 1; min-width: 250px;">
          <h2 style="margin: 0 0 15px 0; font-size: 24px; color: #2c3e50;">🛋️ ${product.title}</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <p style="margin: 5px 0; font-size: 20px; color: #27ae60; font-weight: bold;">💰 السعر: ${product.price} جنيه</p>
            <p style="margin: 5px 0; color: #666;">📦 التصنيف: ${product.category || 'أنترية مغلف'}</p>
          </div>
          
          <h3 style="margin: 15px 0 10px 0; color: #333;">📝 المواصفات:</h3>
          <ul style="list-style: none; padding: 0;">
            ${features.map((f: string) => `
              <li style="margin: 8px 0; padding-right: 20px; position: relative;">
                <span style="color: #3498db; margin-left: 8px;">•</span>
                ${f}
              </li>
            `).join('')}
          </ul>
          
          <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="${productUrl}" target="_blank" style="flex: 1; padding: 12px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold;">
              🔍 عرض الصفحة الرسمية
            </a>
            <a href="${whatsappUrl}" target="_blank" style="flex: 1; padding: 12px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold;">
              💬 استفسار واتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

// دالة لفحص إذا كان السؤال عن منتج معين
function findProductInQuery(query: string, products: any[]): any | null {
  const q = query.toLowerCase()
  
  // بحث في أسماء المنتجات
  for (const product of products) {
    if (product.title && q.includes(product.title.toLowerCase())) {
      return product
    }
  }
  
  // بحث بكلمات مفتاحية
  if (q.includes('انتريه') || q.includes('أنترية') || q.includes('الانتريه') || q.includes('الأنترية')) {
    return products.find(p => p.category === 'أنترية مغلف')
  }
  
  return null
}

// دالة لفحص نوع الطلب
function getRequestType(query: string, products: any[]): { 
  type: 'product_details' | 'category' | 'stats' | 'whatsapp' | 'none', 
  product?: any,
  category?: string 
} {
  const q = query.toLowerCase()
  
  // 1. البحث عن منتج معين
  const specificProduct = findProductInQuery(query, products)
  if (specificProduct) {
    return { type: 'product_details', product: specificProduct }
  }
  
  // 2. طلب تفاصيل عن منتج
  if (q.includes('مواصفات') || q.includes('تفاصيل') || q.includes('عرفني') || q.includes('مزيد')) {
    return { type: 'product_details' }
  }
  
  // 3. طلب تصنيف معين
  if (q.includes('أنترية') || q.includes('انتريه') || q.includes('كنب')) 
    return { type: 'category', category: 'أنترية مغلف' }
  if (q.includes('ركن') || q.includes('اركنة')) 
    return { type: 'category', category: 'ركن' }
  if (q.includes('طرابيزات') || q.includes('ترابيزات') || q.includes('طاولات')) 
    return { type: 'category', category: 'طرابيزات' }
  if (q.includes('جزمات') || q.includes('جزمة')) 
    return { type: 'category', category: 'جزمات' }
  if (q.includes('فوتية') || q.includes('فوتيه')) 
    return { type: 'category', category: 'فوتية' }
  if (q.includes('كراسي') || q.includes('كرسي')) 
    return { type: 'category', category: 'كراسي' }
  
  // 4. طلب إحصائيات
  if (q.includes('التصنيفات') || q.includes('الأقسام') || q.includes('إيه عندك') || q.includes('عندك ايه') || q.includes('عندك إيه')) {
    return { type: 'stats' }
  }
  
  // 5. طلب واتساب
  if (q.includes('واتساب') || q.includes('كلمني') || q.includes('الدعم')) {
    return { type: 'whatsapp' }
  }
  
  return { type: 'none' }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return new Response(
        JSON.stringify({ 
          response: 'عذراً، خلصت الرسائل المتاحة لليوم 😊. بكره تبدأ من جديد!'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages, isFirstMessage } = await req.json()
    
    // تحديث تاريخ المحادثة
    if (!conversationHistory.has(ip)) {
      conversationHistory.set(ip, { 
        messages: [], 
        lastUpdated: new Date() 
      })
    }
    
    const userMessage = messages[messages.length - 1]
    const history = conversationHistory.get(ip)!
    
    // حفظ رسالة المستخدم في التاريخ
    history.messages.push(userMessage)
    history.lastUpdated = new Date()

    // جلب المنتجات من Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('خطأ في Supabase:', error)
    }

    // تحديث أعداد التصنيفات
    if (products) {
      CATEGORIES.forEach(cat => {
        cat.count = products.filter(p => p.category === cat.name).length
      })
    }

    // تحديد نوع الطلب
    const requestType = getRequestType(userMessage.content, products || [])

    // استخدام Gemini للرد الطبيعي
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ response: 'مودرينو في إجازة دلوقتي 😴' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { 
        temperature: 0.8, 
        maxOutputTokens: 1000
      }
    })

    // تحضير الـ prompt حسب نوع الطلب
    let systemPrompt = `أنت "مودرينو"، مساعد موقع مودرن أونلاين للأثاث الدمياطي المودرن.`

    if (isFirstMessage) {
      systemPrompt += `\nهذه أول محادثة مع العميل، فعرف بنفسك: "أهلاً بيك في مودرن أونلاين، أنا مودرينو المساعد الذكي. عندنا تشكيلة من الأثاث الدمياطي المودرن، تحب تشوف إيه؟"`
    }

    // إضافة معلومات عن المنتجات
    if (products && products.length > 0) {
      systemPrompt += `\n\nالمنتجات المتاحة حاليًا:`
      products.forEach((p: any) => {
        systemPrompt += `\n- المنتج: ${p.title}`
        systemPrompt += `\n  السعر: ${p.price} جنيه`
        systemPrompt += `\n  التصنيف: ${p.category}`
        if (p.description) {
          systemPrompt += `\n  المواصفات: ${p.description.substring(0, 100)}...`
        }
      })
    }

    // إضافة سياق المحادثة
    if (history.messages.length > 1) {
      const recentMessages = history.messages.slice(-6)
      systemPrompt += `\n\nالمحادثة السابقة:`
      recentMessages.forEach((msg: any) => {
        if (msg.role === 'user') {
          systemPrompt += `\nالعميل: ${msg.content}`
        }
      })
    }

    systemPrompt += `\n\nالعميل: ${userMessage.content}\n
تعليمات الرد:
- رد بالعامية المصرية بشكل طبيعي
- استخدم إيموجيات مناسبة
- لو سأل عن منتج معين، اشرح مواصفاته بالتفصيل من البيانات المتاحة
- لو سأل عن حاجة مش موجودة، قوله بصراحة واقترح البديل
- خلي ردودك مفيدة ومختصرة

رد مودرينو:`

    const result = await model.generateContent(systemPrompt)
    const aiResponse = result.response.text()

    // بناء الرد النهائي
    let finalResponse = `
      <div style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border-right: 4px solid #3498db; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 16px; line-height: 1.8; color: #2c3e50;">${aiResponse}</p>
        </div>
    `

    // إضافة المحتوى المطلوب حسب نوع الطلب
    if (requestType.type === 'product_details' && requestType.product) {
      // عرض تفاصيل المنتج المطلوب
      finalResponse += formatProductDetails(requestType.product)
    }
    else if (requestType.type === 'category' && requestType.category) {
      // عرض منتجات التصنيف
      const categoryProducts = products?.filter((p: any) => p.category === requestType.category) || []
      if (categoryProducts.length > 0) {
        finalResponse += `<h3 style="color: #333; margin: 20px 0 15px 0;">${CATEGORIES.find(c => c.name === requestType.category)?.icon} منتجات ${requestType.category}:</h3>`
        categoryProducts.forEach((product: any) => {
          finalResponse += formatProductCard(product)
        })
      } else {
        finalResponse += `<p style="color: #e74c3c; margin: 15px 0;">❌ للأسف ${requestType.category} مش متوفر حالياً.</p>`
        const availableCategories = products?.filter((p: any) => p.category).map((p: any) => p.category) || []
        const uniqueCategories = [...new Set(availableCategories)]
        if (uniqueCategories.length > 0) {
          finalResponse += `<p style="color: #333;">✅ المتاح دلوقتي: ${uniqueCategories.join('، ')}</p>`
        }
      }
    }
    else if (requestType.type === 'stats') {
      // عرض إحصائيات التصنيفات
      finalResponse += '<div style="background: white; border-radius: 12px; padding: 16px; margin-top: 20px;">'
      finalResponse += '<h4 style="margin: 0 0 12px 0;">📊 التصنيفات المتاحة:</h4>'
      finalResponse += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">'
      
      CATEGORIES.forEach(cat => {
        finalResponse += `
          <div style="background: ${cat.count > 0 ? '#f0f9ff' : '#f5f5f5'}; padding: 10px; border-radius: 8px; text-align: center;">
            <span style="font-size: 24px;">${cat.icon}</span>
            <div style="font-size: 14px; font-weight: bold;">${cat.name}</div>
            <div style="font-size: 12px; color: ${cat.count > 0 ? '#27ae60' : '#999'};">
              ${cat.count > 0 ? `✅ ${cat.count} منتج` : '❌ غير متوفر'}
            </div>
          </div>
        `
      })
      
      finalResponse += '</div></div>'
    }
    else if (requestType.type === 'whatsapp') {
      finalResponse += `
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://wa.me/20101526264" target="_blank" style="display: inline-block; padding: 12px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            💬 كلمنا على واتساب
          </a>
        </div>
      `
    }

    finalResponse += '</div>'

    // حفظ الرد في التاريخ
    history.messages.push({ role: 'assistant', content: finalResponse })

    return new Response(
      JSON.stringify({ response: finalResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Error:', error)
    
    return new Response(
      JSON.stringify({ 
        response: 'عذراً، حصل عطل فني. تواصل مع أيمن واتساب: 01015262864' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}