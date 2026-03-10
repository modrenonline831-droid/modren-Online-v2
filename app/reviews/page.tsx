'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MessageCircle, ThumbsUp, ChevronDown, ChevronUp, Upload, X } from 'lucide-react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  
  // حالة نموذج إضافة تقييم
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    rating: 5,
    comment: '',
    images: [] as string[]
  })
  
  const [hoverRating, setHoverRating] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const supabase = createClient()

  // تحميل التقييمات
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      // ⬇️⬇️⬇️ التعديل المهم هنا ⬇️⬇️⬇️
      // جلب التقييمات المقبولة فقط بدون products
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('date', { ascending: false })
      
      if (error) {
        console.error('خطأ في جلب التقييمات:', error)
      } else {
        setReviews(data || [])
      }
    } catch (error) {
      console.error('خطأ:', error)
    }
    setLoading(false)
  }

  // رفع الصور
  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `reviews/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('review-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, publicUrl]
      }))
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('فشل رفع الصورة')
    } finally {
      setUploading(false)
    }
  }

  // إرسال التقييم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone || null,
          rating: formData.rating,
          comment: formData.comment,
          images: formData.images,
          date: new Date().toISOString(),
          is_approved: false
        }])

      if (!error) {
        setShowAddForm(false)
        setFormData({ customer_name: '', customer_phone: '', rating: 5, comment: '', images: [] })
        alert('✅ تم إرسال تقييمك، بانتظار مراجعة الإدارة')
        fetchReviews() // إعادة تحميل التقييمات
      } else {
        alert('❌ حدث خطأ: ' + error.message)
      }
    } catch (error) {
      alert('❌ حدث خطأ غير متوقع')
    }
    setSubmitting(false)
  }

  // فلترة وترتيب
  const filteredReviews = reviews
    .filter(r => filterRating ? r.rating === filterRating : true)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === 'highest') return b.rating - a.rating
      return 0
    })

  // حساب الإحصائيات
  const totalReviews = reviews.length
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews) 
    : 0

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* الهيدر */}
      <div className="bg-gradient-to-l from-primary to-primary/80 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">⭐ تقييمات عملائنا</h1>
          <p className="text-xl opacity-90">شاركنا رأيك في منتجاتنا وساعد غيرك في الاختيار</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{totalReviews}</div>
            <div className="text-gray-600">📊 إجمالي التقييمات</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{avgRating.toFixed(1)}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className={`w-5 h-5 ${star <= avgRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <div className="text-gray-600">🌟 متوسط التقييم</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">{reviews.filter(r => r.rating === 5).length}</div>
            <div className="text-gray-600">⭐⭐⭐⭐⭐ 5 نجوم</div>
          </div>
        </div>

        {/* زر إضافة تقييم */}
        {!showAddForm && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              ✍️ أضف تقييمك
            </button>
          </div>
        )}

        {/* نموذج إضافة تقييم */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-primary/20">
            <h2 className="text-xl font-bold mb-4">📝 أضف تقييمك</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* الاسم */}
              <div>
                <label className="block text-sm font-medium mb-1">👤 الاسم كاملاً</label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  placeholder="محمد أحمد"
                />
              </div>

              {/* رقم الهاتف */}
              <div>
                <label className="block text-sm font-medium mb-1">📱 رقم الواتساب (اختياري)</label>
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
                <label className="block text-sm font-medium mb-2">⭐ تقييمك</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({...formData, rating: star})}
                    >
                      <Star className={`w-8 h-8 ${star <= (hoverRating || formData.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* التعليق */}
              <div>
                <label className="block text-sm font-medium mb-1">💬 تعليقك</label>
                <textarea
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  rows={4}
                  placeholder="اكتب تجربتك مع المنتج..."
                />
              </div>

              {/* الصور */}
              <div>
                <label className="block text-sm font-medium mb-2">📸 صور (اختياري)</label>
                
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, images: formData.images.filter((_, i) => i !== idx)})}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">اضغط لرفع الصور</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const files = e.target.files
                      if (files) Array.from(files).forEach(uploadImage)
                    }}
                  />
                </label>
              </div>

              {/* الأزرار */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {submitting ? 'جاري الإرسال...' : '✅ إرسال التقييم'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  ❌ إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* فلترة وترتيب */}
        {reviews.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterRating(null)}
                className={`px-4 py-2 rounded-lg ${!filterRating ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                الكل
              </button>
              {[5,4,3,2,1].map(r => (
                <button
                  key={r}
                  onClick={() => setFilterRating(r)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg ${filterRating === r ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {r} <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="newest">🆕 الأحدث</option>
              <option value="oldest">📅 الأقدم</option>
              <option value="highest">⭐ الأعلى تقييماً</option>
            </select>
          </div>
        )}

        {/* عرض التقييمات */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">جاري تحميل التقييمات...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">لا توجد تقييمات بعد</p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-primary hover:underline"
              >
                كن أول من يضيف تقييماً ✨
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
                {/* رأس التقييم */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{review.customer_name}</h3>
                    <div className="text-sm text-gray-500">
                      📅 {new Date(review.date).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>

                {/* التعليق */}
                <p className={`text-gray-700 ${expandedId !== review.id ? 'line-clamp-3' : ''}`}>
                  {review.comment}
                </p>

                {review.comment?.length > 200 && (
                  <button
                    onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                    className="text-primary text-sm mt-2 hover:underline flex items-center gap-1"
                  >
                    {expandedId === review.id ? 'عرض أقل ↑' : 'عرض المزيد ↓'}
                  </button>
                )}

                {/* الصور */}
                {review.images && review.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">📸 صور من العميل:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {review.images.map((img: string, idx: number) => (
                        <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                {/* أزرار التفاعل */}
                <div className="flex gap-4 mt-4 pt-4 border-t">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">مفيد</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}