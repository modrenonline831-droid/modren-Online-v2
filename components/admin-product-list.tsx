'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminProductList({ products }: { products: any[] }) {
  const supabase = createClient()
  const router = useRouter()
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) {
        router.refresh()
      } else {
        alert('حدث خطأ أثناء الحذف')
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => setEditingProduct({})}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        إضافة منتج جديد
      </button>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => {
            setEditingProduct(null)
            router.refresh()
          }}
        />
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">الصورة</th>
            <th className="p-2 border">العنوان</th>
            <th className="p-2 border">الفئة</th>
            <th className="p-2 border">متوفر</th>
            <th className="p-2 border">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="p-2 border">
                {product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    width={50} 
                    height={50} 
                    className="object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2 border">{product.title}</td>
              <td className="p-2 border">{product.category}</td>
              <td className="p-2 border">{product.inStock ? 'نعم' : 'لا'}</td>
              <td className="p-2 border">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProductForm({ product, onClose, onSave }: { product: any; onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState(product)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleArrayChange = (name: string, value: string) => {
    const arr = value.split(',').map(item => item.trim())
    setFormData({ ...formData, [name]: arr })
  }

  // قائمة الأيقونات المتاحة
  const iconOptions = [
    { value: "🛋️", label: "كنبة/أنترية" },
    { value: "🪑", label: "كرسي/ركنة" },
    { value: "🪵", label: "طاولة/طرابيزة" },
    { value: "👞", label: "جزامة/حذاء" },
    { value: "🛏️", label: "سرير" },
    { value: "🚪", label: "باب/دولاب" },
    { value: "💡", label: "إضاءة" },
    { value: "🪞", label: "مرآة" },
    { value: "🧺", label: "سلة/تخزين" },
    { value: "📦", label: "صندوق/عام" },
  ]

  // دالة رفع الصورة إلى Supabase Storage
  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // الحصول على الرابط العام للصورة
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('فشل رفع الصورة')
      return null
    } finally {
      setUploading(false)
    }
  }

  // رفع الصورة الرئيسية
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const publicUrl = await uploadImage(file)
    if (publicUrl) {
      setFormData({ ...formData, image: publicUrl })
    }
  }

  // رفع الصور الإضافية
  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadedUrls: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      // دمج الصور الجديدة مع القديمة
      const existingImages = formData.images || []
      setFormData({ ...formData, images: [...existingImages, ...uploadedUrls] })
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('فشل رفع الصور الإضافية')
    } finally {
      setUploading(false)
    }
  }

  // حذف صورة من قائمة الصور الإضافية
  const removeImage = (indexToRemove: number) => {
    const updatedImages = formData.images.filter((_: any, index: number) => index !== indexToRemove)
    setFormData({ ...formData, images: updatedImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // التأكد من وجود جلسة نشطة
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('يجب تسجيل الدخول أولاً')
      router.push('/admin/login')
      return
    }

    const { id, ...data } = formData
    let error

    if (id) {
      const { error: updateError } = await supabase.from('products').update(data).eq('id', id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from('products').insert([data])
      error = insertError
    }

    if (error) {
      alert('حدث خطأ: ' + error.message)
    } else {
      onSave()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">{product.id ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
        
        {uploading && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
            جاري رفع الصور... يرجى الانتظار
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* الصورة الرئيسية */}
          <div>
            <label className="block text-sm font-medium mb-1">الصورة الرئيسية</label>
            <div className="flex items-center gap-4 flex-wrap">
              {formData.image && (
                <div className="relative w-20 h-20 border rounded overflow-hidden">
                  <Image 
                    src={formData.image} 
                    alt="Main" 
                    width={80} 
                    height={80} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="border p-2 rounded flex-1"
                disabled={uploading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">اختر صورة من جهازك لرفعها</p>
          </div>

          {/* الصور الإضافية */}
          <div>
            <label className="block text-sm font-medium mb-1">الصور الإضافية</label>
            
            {/* عرض الصور المرفوعة */}
            {formData.images && formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.images.map((img: string, index: number) => (
                  <div key={index} className="relative w-16 h-16 group border rounded overflow-hidden">
                    <Image 
                      src={img} 
                      alt={`Additional ${index + 1}`} 
                      width={64} 
                      height={64} 
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesUpload}
              className="w-full border p-2 rounded"
              disabled={uploading}
            />
            <p className="text-xs text-gray-500 mt-1">يمكنك اختيار عدة صور مرة واحدة</p>
          </div>

          {/* باقي الحقول */}
          <div>
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الفئة</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">اختر فئة</option>
              <option>أنترية مغلف</option>
              <option>ركن</option>
              <option>طرابيزات</option>
              <option>جزمات</option>
              <option>فوتية</option>
              <option>كراسي</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الوصف</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الألوان (مفصولة بفواصل)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors ? formData.colors.join(', ') : ''}
              onChange={(e) => handleArrayChange('colors', e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="أحمر, أزرق, أخضر"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">التفاصيل (مفصولة بفواصل)</label>
            <input
              type="text"
              name="details"
              value={formData.details ? formData.details.join(', ') : ''}
              onChange={(e) => handleArrayChange('details', e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="خشب زان, سفنج 38"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">معلومات السعر</label>
            <input
              type="text"
              name="priceInfo"
              value={formData.priceInfo || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="مثال: اسعار تنافسية جداً"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">المميزات (مفصولة بفواصل)</label>
            <input
              type="text"
              name="features"
              value={formData.features ? formData.features.join(', ') : ''}
              onChange={(e) => handleArrayChange('features', e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="ضمان 5 سنوات, توصيل مجاني"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock || false}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm font-medium">متوفر في المخزون</label>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الوسوم (مفصولة بفواصل)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags ? formData.tags.join(', ') : ''}
              onChange={(e) => handleArrayChange('tags', e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="أفضل مبيع, جديد"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الأبعاد</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="مثال: 100×80 سم"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">مدة التوصيل المقدرة</label>
            <input
              type="text"
              name="estimatedDelivery"
              value={formData.estimatedDelivery || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="مثال: 10-15 يوم"
            />
          </div>

          {/* حقل الأيقونة - اختيار من قائمة */}
          <div>
            <label className="block text-sm font-medium mb-1">الأيقونة</label>
            <select
              name="icon"
              value={formData.icon || '🛋️'}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {iconOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.value} - {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">المشاهدات</label>
              <input
                type="number"
                name="views"
                value={formData.views || 0}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الطلبات</label>
              <input
                type="number"
                name="orders"
                value={formData.orders || 0}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">التقييم</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating || 0}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">عدد التقييمات</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews || 0}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">آخر طلب (نص)</label>
              <input
                type="text"
                name="lastOrder"
                value={formData.lastOrder || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="مثال: 2 يوم مضى"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex-1"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ'}
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