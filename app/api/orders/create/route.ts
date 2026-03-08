import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  console.log('📦 Orders API POST called')
  
  try {
    const body = await request.json()
    console.log('📦 Order data received:', body)

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_number: body.order_number,
        product_id: body.product_id,
        product_title: body.product_title,
        product_price: body.product_price,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        deposit_amount: body.deposit_amount,
        payment_method: body.payment_method,
        payment_account: body.payment_account,
        account_owner: body.account_owner,
        transfer_from: body.transfer_from,
        status: body.status || 'قيد المراجعة'
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json({ 
        error: 'Database error', 
        details: error.message 
      }, { status: 500 })
    }

    console.log('✅ Order created:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Orders API error:', error)
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: String(error)
    }, { status: 500 })
  }
}

// إضافة GET method عشان ما يظهرش error 405
export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed',
    message: 'Use POST to create orders'
  }, { status: 405 })
}