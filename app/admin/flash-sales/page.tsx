'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FlashSalesAdmin() {
  const supabase = createClient()
  const router = useRouter()
  const [sales, setSales] = useState<any[]>([])
  const [editingSale, setEditingSale] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingNotification, setSendingNotification] = useState<number | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // التحقق من الجلسة عند تحميل الصفحة
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/admin/login')
        return
      }
      
      setCheckingAuth(false)
      fetchSales()
      fetchProducts()
    }

    checkSession()
  }, [])

  const fetchSales = async () => {
    setLoading(true)
    const { data } = await supabase.from('flash_sales').select('*').order('created_at', { ascending: false })
    setSales(data || [])
    setLoading(false)
  }

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('id, title, priceInfo')
    setProducts(data || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      await supabase.from('flash_sales').delete().eq('id', id)
      fetchSales()
    }
  }

  const sendNotification = async (sale: any) => {
    if (!confirm(`هل أنت متأكد من إرسال إشعار للعرض "${sale.title}"؟`)) {
      return
    }

    setSendingNotification(sale.id)
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `🔥 ${sale.title}`,
          message: `خصم ${sale.discount_percentage}% لفترة محدودة!`,
          url: `/flash-sales/${sale.id}`,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('✅ تم إرسال الإشعار بنجاح')
        console.log('✅ Notification sent:', data)
      } else {
        alert('❌ فشل إرسال الإشعار: ' + (data.error || 'خطأ غير معروف'))
        console.error('❌ Notification error:', data)
      }
    } catch (error) {
      alert('❌ حدث خطأ في الاتصال')
      console.error('❌ Fetch error:', error)
    } finally {
      setSendingNotification(null)
    }
  }

  const getProductNames = (productIds: number[]) => {
    if (!productIds || !products.length) return ''
    return productIds
      .map(id => products.find(p => p.id === id)?.title)
      .filter(Boolean)
      .join('، ')
  }

  // حساب الوقت المتبقي لعرضه في القائمة
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const distance = end - now

    if (distance < 0) return 'انتهى'

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days} يوم و ${hours} ساعة`
    if (hours > 0) return `${hours} ساعة و ${minutes} دقيقة`
    return `${minutes} دقيقة`
  }

  // عرض شاشة التحميل أثناء التحقق من الجلسة
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الجلسة...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>
  }

  return (
    <div dir="rtl" className="p-6 max-w-7xl mx-auto">
      {/* شريط العلوي مع زر تسجيل الخروج */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة العروض الحية (Flash Sales)</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
        >
          تسجيل خروج
        </button>
      </div>
      
      <button
        onClick={() => setEditingSale({ product_ids: [] })}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        إضافة عرض جديد
      </button>

      {editingSale && (
        <SaleForm
          sale={editingSale}
          products={products}
          onClose={() => setEditingSale(null)}
          onSave={() => {
            setEditingSale(null)
            fetchSales()
          }}
        />
      )}

      <div className="grid gap-4">
        {sales.map((sale) => {
          const now = new Date().getTime()
          const end = new Date(sale.end_date).getTime()
          const isExpired = now > end

          return (
            <div key={sale.id} className={`border rounded-lg p-4 bg-white shadow ${isExpired ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{sale.title}</h3>
                  {sale.description && <p className="text-gray-600 text-sm">{sale.description}</p>}
                  <p className="text-primary font-bold mt-1">خصم {sale.discount_percentage}%</p>
                  
                  {/* الوقت المتبقي */}
                  <div className="mt-2">
                    {isExpired ? (
                      <span className="text-red-600 text-sm font-bold">⏰ انتهى العرض</span>
                    ) : (
                      <span className="text-green-600 text-sm">
                        ⏳ متبقي: {getTimeRemaining(sale.end_date)}
                      </span>
                    )}
                  </div>

                  {sale.product_ids && sale.product_ids.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">المنتجات المشمولة:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">
                        {getProductNames(sale.product_ids)}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    تاريخ البدء: {new Date(sale.start_date).toLocaleString('ar-EG')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => sendNotification(sale)}
                    disabled={sendingNotification === sale.id}
                    className={`px-3 py-1 rounded text-sm ${
                      sendingNotification === sale.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    {sendingNotification === sale.id ? 'جاري الإرسال...' : 'إرسال إشعار'}
                  </button>
                  <button
                    onClick={() => setEditingSale(sale)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {sales.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">لا توجد عروض حالياً. أضف عرضاً جديداً!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SaleForm({ sale, products, onClose, onSave }: any) {
  const supabase = createClient()
  
  // حساب تاريخ البدء (الوقت الحالي) وتاريخ الانتهاء بناءً على المدة
  const getInitialStartDate = () => {
    if (sale.id && sale.start_date) {
      return sale.start_date.slice(0, 16)
    }
    // عرض جديد: وقت الحالي
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()) // للتوقيت المحلي
    return now.toISOString().slice(0, 16)
  }

  // حساب المدة من تاريخ الانتهاء إذا كان تعديل
  const getInitialDuration = () => {
    if (sale.id && sale.start_date && sale.end_date) {
      const start = new Date(sale.start_date).getTime()
      const end = new Date(sale.end_date).getTime()
      const diffMs = end - start
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      
      return { days, hours, minutes }
    }
    return { days: 0, hours: 0, minutes: 0 }
  }

  const initialDuration = getInitialDuration()

  const [formData, setFormData] = useState({
    title: sale.title || '',
    description: sale.description || '',
    discount_percentage: sale.discount_percentage || 0,
    duration_days: initialDuration.days,
    duration_hours: initialDuration.hours,
    duration_minutes: initialDuration.minutes,
    start_date: getInitialStartDate(),
    end_date: sale.end_date ? sale.end_date.slice(0, 16) : '',
    product_ids: sale.product_ids || [],
    is_active: sale.is_active ?? true,
  })

  // حساب تاريخ الانتهاء بناءً على المدة
  const calculateEndDate = () => {
    if (!formData.start_date) return ''
    const start = new Date(formData.start_date)
    start.setDate(start.getDate() + (formData.duration_days || 0))
    start.setHours(start.getHours() + (formData.duration_hours || 0))
    start.setMinutes(start.getMinutes() + (formData.duration_minutes || 0))
    return start.toISOString().slice(0, 16)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: parseInt(value) || 0 }
    setFormData(newFormData)
    if (newFormData.start_date) {
      const end = calculateEndDate()
      setFormData({ ...newFormData, end_date: end })
    }
  }

  // معالجة اختيار المنتجات من القائمة المتعددة
  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value))
    setFormData({ ...formData, product_ids: selectedOptions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // التحقق من البيانات
    if (!formData.title) {
      alert('الرجاء إدخال عنوان العرض')
      return
    }
    if (!formData.discount_percentage || formData.discount_percentage <= 0) {
      alert('الرجاء إدخال نسبة خصم صحيحة')
      return
    }
    if (formData.duration_days === 0 && formData.duration_hours === 0 && formData.duration_minutes === 0) {
      alert('الرجاء إدخال مدة العرض (يوم، ساعات، أو دقائق)')
      return
    }
    if (formData.product_ids.length === 0) {
      alert('الرجاء اختيار منتج واحد على الأقل')
      return
    }

    // إزالة الحقول المؤقتة
    const { duration_days, duration_hours, duration_minutes, ...submitData } = formData

    // التأكد من وجود end_date
    submitData.end_date = calculateEndDate()

    const { id, ...data } = sale

    let error
    if (id) {
      ({ error } = await supabase.from('flash_sales').update(submitData).eq('id', id))
    } else {
      ({ error } = await supabase.from('flash_sales').insert([submitData]))
    }

    if (error) {
      alert('حدث خطأ: ' + error.message)
    } else {
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">{sale.id ? 'تعديل العرض' : 'إضافة عرض جديد'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* عنوان العرض */}
          <div>
            <label className="block text-sm font-medium mb-1">عنوان العرض</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              placeholder="مثال: تخفيضات الصيف"
            />
          </div>

          {/* وصف العرض (اختياري) */}
          <div>
            <label className="block text-sm font-medium mb-1">وصف العرض (اختياري)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={2}
              placeholder="وصف مختصر للعرض"
            />
          </div>

          {/* نسبة الخصم */}
          <div>
            <label className="block text-sm font-medium mb-1">نسبة الخصم (%)</label>
            <input
              type="number"
              name="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* تاريخ البدء (للعلم فقط - غير قابل للتعديل) */}
          <div>
            <label className="block text-sm font-medium mb-1">تاريخ البدء</label>
            <input
              type="datetime-local"
              value={formData.start_date}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
            <p className="text-xs text-gray-500 mt-1">يتم تعيينه تلقائياً إلى الوقت الحالي</p>
          </div>

          {/* مدة العرض فقط (بدون تاريخ انتهاء) */}
          <div>
            <label className="block text-sm font-medium mb-2">مدة العرض</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">أيام</label>
                <input
                  type="number"
                  name="duration_days"
                  value={formData.duration_days}
                  onChange={handleDurationChange}
                  min="0"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">ساعات</label>
                <input
                  type="number"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleDurationChange}
                  min="0"
                  max="23"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">دقائق</label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleDurationChange}
                  min="0"
                  max="59"
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* اختيار المنتجات - قائمة منسدلة متعددة الاختيار */}
          <div>
            <label className="block text-sm font-medium mb-1">المنتجات المشمولة في العرض</label>
            <select
              multiple
              size={6}
              value={formData.product_ids.map(String)}
              onChange={handleProductSelect}
              className="w-full border p-2 rounded bg-white"
              required
            >
              {products.map((product: any) => (
                <option key={product.id} value={product.id} className="py-1">
                  {product.title} {product.priceInfo ? `- ${product.priceInfo}` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              يمكنك اختيار عدة منتجات بالضغط على Ctrl (أو Cmd في Mac) أثناء التحديد
            </p>
            <p className="text-sm text-gray-600 mt-2">
              تم اختيار <span className="font-bold text-primary">{formData.product_ids.length}</span> منتج
            </p>
          </div>

          {/* حالة النشاط */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm font-medium">نشط (يظهر في الموقع)</label>
          </div>

          {/* أزرار الحفظ والإلغاء */}
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            >
              حفظ
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}