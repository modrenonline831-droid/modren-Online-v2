import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// الأرقام المسموح لها بتحديث الحالة
const AUTHORIZED_NUMBERS = [
  '201015262864', // رقم الدعم
  '201034909863'  // رقم الأدمن
]

export async function POST(req: Request) {
  try {
    const { message, from } = await req.json()
    
    console.log('📨 رسالة واردة:', { from, message })
    
    // ✅ السماح للأرقام المصرح بها فقط
    if (!AUTHORIZED_NUMBERS.includes(from)) {
      console.log('❌ رقم غير مصرح:', from)
      return NextResponse.json({ 
        success: false, 
        error: 'رقم غير مصرح' 
      })
    }
    
    // فحص إذا كانت الرسالة فيها كود طلب
    const orderMatch = message.match(/ORD-\d+-\d+/)
    
    if (orderMatch) {
      const orderNumber = orderMatch[0]
      const reply = message.toLowerCase()
      
      let newStatus = ''
      if (reply.includes('تم') || reply.includes('ok') || reply.includes('تأكيد')) {
        newStatus = 'تم التأكيد'
      } else if (reply.includes('لم يتم') || reply.includes('لا') || reply.includes('رفض')) {
        newStatus = 'ملغي'
      } else if (reply.includes('تواصل') || reply.includes('كلمت')) {
        newStatus = 'تم التواصل'
      } else if (reply.includes('شحن')) {
        newStatus = 'تم الشحن'
      } else if (reply.includes('وصل') || reply.includes('توصيل')) {
        newStatus = 'تم التوصيل'
      } else {
        return NextResponse.json({ 
          success: false, 
          error: 'لم يتم التعرف على الأمر' 
        })
      }
      
      // تحديث حالة الطلب في Supabase
      const { error, data } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          admin_reply: message,
          last_admin_message: new Date().toISOString(),
          updated_by: from // معرف من قام بالتحديث
        })
        .eq('order_number', orderNumber)
        .select()
      
      if (!error && data && data[0]) {
        // إرسال تأكيد للعميل
        const customerPhone = data[0].customer_phone
        const cleanPhone = customerPhone.replace(/[^0-9]/g, '')
        const internationalPhone = cleanPhone.startsWith('01') ? '20' + cleanPhone.slice(1) : cleanPhone
        
        // إرسال إشعار للأدمن الآخر (اختياري)
        const otherAdmin = AUTHORIZED_NUMBERS.find(num => num !== from)
        if (otherAdmin) {
          await fetch('https://api.ultramsg.com/107624/messages/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: '81qxwhp5lpk4o9sr',
              to: otherAdmin,
              body: `👤 الرقم ${from} قام بتحديث الطلب ${orderNumber} إلى: ${newStatus}`
            })
          })
        }
        
        // إرسال للعميل
        await fetch('https://api.ultramsg.com/107624/messages/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: '81qxwhp5lpk4o9sr',
            to: internationalPhone,
            body: `✅ تم تحديث حالة طلبك ${orderNumber} إلى: ${newStatus}\n📝 ملاحظات: ${message}`
          })
        })
        
        return NextResponse.json({ 
          success: true, 
          message: `تم تحديث الطلب ${orderNumber} إلى ${newStatus}`,
          updated_by: from
        })
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ خطأ:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}