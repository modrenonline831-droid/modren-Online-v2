'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Star, Check, X, Eye, Trash2, Plus, Search, Filter,
  Calendar, User, Phone, MessageCircle, ThumbsUp, Clock,
  CheckCircle, AlertCircle, ArrowLeft
} from 'lucide-react'

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('الكل')
  
  // نموذج إضافة تقييم قديم
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    rating: 5,
    comment: '',
    date: '',
    product_id: ''
  })
  
  const supabase = createClient()
  const router = useRouter()

  // دالة جلب التقييمات
  const fetchReviews = async () => {
    setLoading(true)
    try {
      console.log('🔍 جاري جلب التقييمات...')
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('❌ خطأ من Supabase:', error)
        alert('خطأ في جلب التقييمات: ' + error.message)
      } else {
        console.log('✅ تم جلب التقييمات:', data?.length || 0)
        setReviews(data || [])
      }
    } catch (err) {
      console.error('❌ خطأ غير متوقع:', err)
    }
    setLoading(false)
  }

  // دالة جلب المنتجات (للمودال)
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, image')
      
      if (!error) {
        setProducts(data || [])
      }
    } catch (err) {
      console.error('خطأ في جلب المنتجات:', err)
    }
  }

  // تحميل البيانات
  useEffect(() => {
    fetchReviews()
    fetchProducts()
  }, [])

  // موافقة على تقييم
  const approveReview = async (id: number) => {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id)
    
    if (!error) {
      fetchReviews()
    } else {
      alert('خطأ: ' + error.message)
    }
  }

  // حذف تقييم
  const deleteReview = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
      
      if (!error) {
        fetchReviews()
      } else {
        alert('خطأ: ' + error.message)
      }
    }
  }

  // إضافة تقييم قديم
  const addOldReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const reviewDate = formData.date 
      ? new Date(formData.date).toISOString()
      : new Date().toISOString()
    
    const { error } = await supabase
      .from('reviews')
      .insert([{
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone || null,
        product_id: formData.product_id || null,
        rating: formData.rating,
        comment: formData.comment,
        date: reviewDate,
        is_approved: true,
        is_admin_post: true
      }])
    
    if (!error) {
      setShowAddModal(false)
      setFormData({
        customer_name: '',
        customer_phone: '',
        rating: 5,
        comment: '',
        date: '',
        product_id: ''
      })
      fetchReviews()
    } else {
      alert('خطأ: ' + error.message)
    }
  }

  // فلترة التقييمات
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer_name?.includes(searchTerm) ||
      review.comment?.includes(searchTerm) ||
      review.customer_phone?.includes(searchTerm)
    
    const matchesStatus = 
      filterStatus === 'الكل' ||
      (filterStatus === 'مقبول' && review.is_approved) ||
      (filterStatus === 'مرفوض' && !review.is_approved)
    
    return matchesSearch && matchesStatus
  })

  // إحصائيات
  const totalReviews = reviews.length
  const approvedCount = reviews.filter(r => r.is_approved).length
  const pendingCount = reviews.filter(r => !r.is_approved).length
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0'

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* الهيدر مع زر العودة */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
            إدارة تقييمات العملاء
          </h1>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalReviews}</div>
            <div className="text-sm text-gray-600">📊 إجمالي التقييمات</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-sm text-gray-600">✅ مقبول</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">⏳ في الانتظار</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{avgRating}</div>
            <div className="text-sm text-gray-600">⭐ متوسط التقييم</div>
          </div>
        </div>

        {/* شريط الإجراءات */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* بحث */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="🔍 بحث باسم العميل أو التعليق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg p-2 pr-10"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            {/* فلترة بالحالة */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg p-2 min-w-[150px]"
            >
              <option value="الكل">كل التقييمات</option>
              <option value="مقبول">✅ المقبولة</option>
              <option value="مرفوض">⏳ قيد المراجعة</option>
            </select>

            {/* زر إضافة تقييم قديم */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              إضافة تقييم قديم
            </button>
          </div>
        </div>

        {/* جدول التقييمات */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">جاري تحميل التقييمات...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right">العميل</th>
                    <th className="px-4 py-3 text-right">التقييم</th>
                    <th className="px-4 py-3 text-right">التعليق</th>
                    <th className="px-4 py-3 text-right">التاريخ</th>
                    <th className="px-4 py-3 text-right">الحالة</th>
                    <th className="px-4 py-3 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredReviews.map((review) => (
                    <tr key={review.id} className={`hover:bg-gray-50 ${review.is_admin_post ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {review.customer_name}
                        </div>
                        {review.customer_phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {review.customer_phone}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="truncate">{review.comment}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {new Date(review.date).toLocaleDateString('ar-EG')}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {review.is_approved ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3 h-3" />
                            مقبول
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3" />
                            في الانتظار
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          
                          {!review.is_approved && (
                            <button
                              onClick={() => approveReview(review.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="موافقة"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredReviews.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              <p>لا توجد تقييمات مطابقة للبحث</p>
            </div>
          )}
        </div>
      </div>

      {/* مودال عرض التفاصيل */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-600" />
              تفاصيل التقييم
            </h2>
            
            <div className="space-y-4">
              {/* معلومات العميل */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  بيانات العميل
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">الاسم</p>
                    <p className="font-medium">{selectedReview.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p dir="ltr">{selectedReview.customer_phone || 'غير متوفر'}</p>
                  </div>
                </div>
              </div>

              {/* التقييم */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  التقييم
                </h3>
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= selectedReview.rating 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* التعليق */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  التعليق
                </h3>
                <p className="whitespace-pre-wrap">{selectedReview.comment}</p>
              </div>

              {/* معلومات إضافية */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  معلومات إضافية
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">تاريخ الإضافة</p>
                    <p>{new Date(selectedReview.created_at).toLocaleString('ar-EG')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ التقييم</p>
                    <p>{new Date(selectedReview.date).toLocaleString('ar-EG')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الحالة</p>
                    <p className={selectedReview.is_approved ? 'text-green-600' : 'text-yellow-600'}>
                      {selectedReview.is_approved ? '✅ مقبول' : '⏳ في الانتظار'}
                    </p>
                  </div>
                  {selectedReview.is_admin_post && (
                    <div>
                      <p className="text-sm text-gray-500">نوع التقييم</p>
                      <p className="text-blue-600">📝 إضافة من الإدارة</p>
                    </div>
                  )}
                </div>
              </div>

              {/* أزرار */}
              <div className="flex gap-2 pt-4">
                {!selectedReview.is_approved && (
                  <button
                    onClick={() => {
                      approveReview(selectedReview.id)
                      setSelectedReview(null)
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    موافقة
                  </button>
                )}
                <button
                  onClick={() => setSelectedReview(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مودال إضافة تقييم قديم */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-6 h-6 text-green-600" />
              إضافة تقييم قديم
            </h2>
            
            <form onSubmit={addOldReview} className="space-y-4">
              {/* الاسم */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  اسم العميل
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  placeholder="محمد أحمد"
                />
              </div>

              {/* رقم الهاتف (اختياري) */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  رقم الهاتف (اختياري)
                </label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  placeholder="01012345678"
                />
              </div>

              {/* التقييم بالنجوم */}
              <div>
                <label className="block text-sm font-medium mb-1">التقييم</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full border rounded-lg p-2"
                >
                  {[5,4,3,2,1].map(r => (
                    <option key={r} value={r}>{r} نجوم ⭐</option>
                  ))}
                </select>
              </div>

              {/* التعليق */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  التعليق
                </label>
                <textarea
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  rows={4}
                  placeholder="اكتب تعليق العميل..."
                />
              </div>

              {/* التاريخ */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  التاريخ
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border rounded-lg p-2"
                />
                <p className="text-xs text-gray-500 mt-1">اتركه فارغاً لاستخدام تاريخ اليوم</p>
              </div>

              {/* المنتج (اختياري) - هتظهر لو في منتجات */}
              {products.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-1">المنتج (اختياري)</label>
                  <select
                    value={formData.product_id}
                    onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">بدون منتج</option>
                    {products.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* الأزرار */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  💾 حفظ التقييم
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}