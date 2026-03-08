import { createClient } from './supabase/client'

// دالة إنشاء رقم طلب فريد
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  
  return `ORD-${year}${month}${day}-${random}`
}

// دالة إنشاء طلب جديد
export async function createOrder(orderData: any) {
  const supabase = createClient()
  
  const orderNumber = generateOrderNumber()
  
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_number: orderNumber,
      ...orderData
    }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// دالة البحث عن طلب بالكود
export async function getOrderByNumber(orderNumber: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('order_number', orderNumber)
    .single()
  
  if (error) return null
  return data
}

// دالة تحديث حالة الطلب
export async function updateOrderStatus(orderId: number, status: string, notes?: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status, 
      notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single()
  
  if (error) throw error
  return data
}