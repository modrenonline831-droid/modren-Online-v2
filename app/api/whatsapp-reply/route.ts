import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { message, from } = await req.json()
    
    // فحص إذا كانت الرسالة فيها كود طلب
    const orderMatch = message.match(/ORD-\d+-\d+/)
    
    if (orderMatch) {
      const orderNumber = orderMatch[0]
      const reply = message.toLowerCase()
      
      let newStatus = ''
      if (reply.includes('تم') || reply.includes('ok')) {
        newStatus = 'تم التأكيد'
      } else if (reply.includes('لم يتم') || reply.includes('لا')) {
        newStatus = 'ملغي'
      } else if (reply.includes('قيد')) {
        newStatus = 'قيد المراجعة'
      }
      
      if (newStatus) {
        const { error } = await supabase
          .from('orders')
          .update({ 
            status: newStatus,
            admin_reply: message,
            last_admin_message: new Date().toISOString()
          })
          .eq('order_number', orderNumber)
        
        if (!error) {
          // إرسال تأكيد للعميل
          await fetch('https://api.ultramsg.com/107624/messages/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: '81qxwhp5lpk4o9sr',
              to: from,
              body: `✅ تم تحديث حالة طلبك ${orderNumber} إلى: ${newStatus}`
            })
          })
        }
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}