import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('📨 Webhook received:', data)
    
    // توجيه الرسالة إلى معالج ردود الأدمن
    await fetch('https://www.modrenonline.com/api/whatsapp-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: data.body || data.message || '',
        from: data.from || data.author || ''
      })
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}