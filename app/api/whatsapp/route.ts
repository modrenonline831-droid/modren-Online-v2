import { NextResponse } from 'next/server'

const WHATSAPP_API_URL = 'https://api.callmebot.com/whatsapp.php'
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY
const ADMIN_PHONE = process.env.ADMIN_PHONE

export async function POST(request: Request) {
  try {
    const { phone, message, isAdmin = false } = await request.json()

    // تنظيف الرسالة من أي حروف غريبة
    const cleanMessage = message.replace(/[^\u0600-\u06FF\u0030-\u0039\u0660-\u0669a-zA-Z\s\n\r\-\.\,\:\(\)]/g, '')
    
    if (isAdmin) {
      // رسالة للأدمن
      const url = `${WHATSAPP_API_URL}?phone=${ADMIN_PHONE}&text=${encodeURIComponent(cleanMessage)}&apikey=${WHATSAPP_API_KEY}`
      await fetch(url)
      return NextResponse.json({ success: true })
    }

    if (phone) {
      // تنظيف رقم الهاتف
      const cleanPhone = phone.replace(/[^0-9]/g, '')
      // تحويل الرقم للصيغة الدولية
      const internationalPhone = cleanPhone.startsWith('01') 
        ? '20' + cleanPhone.slice(1)
        : cleanPhone
      
      const url = `${WHATSAPP_API_URL}?phone=${internationalPhone}&text=${encodeURIComponent(cleanMessage)}&apikey=${WHATSAPP_API_KEY}`
      await fetch(url)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('WhatsApp API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}