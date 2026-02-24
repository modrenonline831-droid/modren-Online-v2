import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminProductList from '@/components/admin-product-list'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('createdAt', { ascending: false })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم الإدارة</h1>
      <p className="mb-4 text-green-600">مرحباً {user.email}</p>
      <AdminProductList products={products || []} />
    </div>
  )
}