import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminOrdersList from '@/components/admin-orders-list'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">📋 إدارة طلبات العربون</h1>
      <AdminOrdersList orders={orders || []} />
    </div>
  )
}