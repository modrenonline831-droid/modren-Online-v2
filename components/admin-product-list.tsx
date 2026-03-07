'use client'

import { useState, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
    <div dir="rtl" className="p-2 sm:p-4">
      {/* رأس الصفحة مع لينك العروض المؤقتة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <button
          onClick={() => setEditingProduct({})}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto order-2 sm:order-1"
        >
          إضافة منتج جديد
        </button>
        
        <Link
          href="/admin/flash-sales"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2"
        >
          <span>⚡</span>
          <span>العروض المؤقتة</span>
          <span className="bg-purple-400 px-2 py-0.5 rounded-full text-xs">جديد</span>
        </Link>
      </div>

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

      {/* جدول المنتجات - متجاوب مع الموبايل */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-1 sm:p-2 border">الصورة</th>
              <th className="p-1 sm:p-2 border">العنوان</th>
              <th className="p-1 sm:p-2 border hidden sm:table-cell">الفئة</th>
              <th className="p-1 sm:p-2 border hidden md:table-cell">متوفر</th>
              <th className="p-1 sm:p-2 border">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border hover:bg-gray-50">
                <td className="p-1 sm:p-2 border">
                  {product.image && (
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      width={40} 
                      height={40} 
                      className="object-cover rounded w-8 h-8 sm:w-12 sm:h-12"
                    />
                  )}
                </td>
                <td className="p-1 sm:p-2 border font-medium">
                  <div className="truncate max-w-[120px] sm:max-w-none">
                    {product.title}
                  </div>
                </td>
                <td className="p-1 sm:p-2 border hidden sm:table-cell">
                  {product.category}
                </td>
                <td className="p-1 sm:p-2 border hidden md:table-cell">
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.inStock ? 'نعم' : 'لا'}
                  </span>
                </td>
                <td className="p-1 sm:p-2 border">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-yellow-600"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* رسالة إذا مفيش منتجات */}
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد منتجات حالياً
        </div>
      )}
    </div>
  )
}

// كومبوننت منفصل للحقل الديناميكي
const DynamicField = ({ 
  label, 
  items, 
  onAdd, 
  onRemove, 
  onUpdate, 
  placeholder 
}: { 
  label: string
  items: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, value: string) => void
  placeholder: string
}) => {
  // استخدام useCallback لمنع إعادة إنشاء الدوال
  const handleUpdate = useCallback((index: number, value: string) => {
    onUpdate(index, value)
  }, [onUpdate])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={onAdd}
          className="bg-green-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
        >
          +
        </button>
      </div>
      
      {items.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              type="text"
              value={item}
              onChange={(e) => handleUpdate(index, e.target.value)}
              className="w-full border p-2 rounded text-sm"
              placeholder={placeholder}
              // إضافة هذه الخاصية لمنع فقدان التركيز
              autoComplete="off"
            />
          </div>
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 flex-shrink-0"
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function ProductForm({ product, onClose, onSave }: { product: any; onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState(product)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // استخدام useState منفصل لكل قائمة
  const [featuresList, setFeaturesList] = useState<string[]>(() => {
    if (product.features) {
      return Array.isArray(product.features) ? product.features : [product.features]
    }
    return ['']
  })
  
  const [detailsList, setDetailsList] = useState<string[]>(() => {
    if (product.details) {
      return Array.isArray(product.details) ? product.details : [product.details]
    }
    return ['']
  })
  
  const [colorsList, setColorsList] = useState<string[]>(() => {
    if (product.colors) {
      return Array.isArray(product.colors) ? product.colors : [product.colors]
    }
    return ['']
  })
  
  const supabase = createClient()
  const router = useRouter()

  // تحديث formData عند تغيير القوائم
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      features: featuresList.filter(f => f.trim() !== ''),
      details: detailsList.filter(d => d.trim() !== ''),
      colors: colorsList.filter(c => c.trim() !== '')
    }))
  }, [featuresList, detailsList, colorsList])

  // دوال إضافة وحذف الحقول الديناميكية - باستخدام useCallback
  const addFeature = useCallback(() => {
    setFeaturesList(prev => [...prev, ''])
  }, [])

  const removeFeature = useCallback((index: number) => {
    if (featuresList.length > 1) {
      setFeaturesList(prev => prev.filter((_, i) => i !== index))
    }
  }, [featuresList.length])

  const updateFeature = useCallback((index: number, value: string) => {
    setFeaturesList(prev => {
      const newList = [...prev]
      newList[index] = value
      return newList
    })
  }, [])

  const addDetail = useCallback(() => {
    setDetailsList(prev => [...prev, ''])
  }, [])

  const removeDetail = useCallback((index: number) => {
    if (detailsList.length > 1) {
      setDetailsList(prev => prev.filter((_, i) => i !== index))
    }
  }, [detailsList.length])

  const updateDetail = useCallback((index: number, value: string) => {
    setDetailsList(prev => {
      const newList = [...prev]
      newList[index] = value
      return newList
    })
  }, [])

  const addColor = useCallback(() => {
    setColorsList(prev => [...prev, ''])
  }, [])

  const removeColor = useCallback((index: number) => {
    if (colorsList.length > 1) {
      setColorsList(prev => prev.filter((_, i) => i !== index))
    }
  }, [colorsList.length])

  const updateColor = useCallback((index: number, value: string) => {
    setColorsList(prev => {
      const newList = [...prev]
      newList[index] = value
      return newList
    })
  }, [])

  // دالة معالجة التغيير للحقول العادية
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev: any) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
  }, [])

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

  // دوال رفع الصور
  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
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

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('فشل رفع الصورة')
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const publicUrl = await uploadImage(file)
    if (publicUrl) {
      setFormData((prev: any) => ({ ...prev, image: publicUrl }))
    }
  }

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

      setFormData((prev: any) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls]
      }))
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('فشل رفع الصور الإضافية')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (indexToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, index: number) => index !== indexToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-3 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {product.id ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </h2>
        
        {uploading && (
          <div className="bg-blue-100 text-blue-700 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm">
            جاري رفع الصور... يرجى الانتظار
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* قسم الصور */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">صور المنتج</h3>
            
            {/* الصورة الرئيسية */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">الصورة الرئيسية</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {formData.image && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 border rounded overflow-hidden flex-shrink-0">
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
                  className="w-full border p-1.5 sm:p-2 rounded text-sm"
                  disabled={uploading}
                />
              </div>
            </div>

            {/* الصور الإضافية */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">صور إضافية</label>
              
              {formData.images && formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.images.map((img: string, index: number) => (
                    <div key={index} className="relative w-14 h-14 sm:w-16 sm:h-16 group border rounded overflow-hidden">
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
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
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
                className="w-full border p-1.5 sm:p-2 rounded text-sm"
                disabled={uploading}
              />
              <p className="text-xs text-gray-500 mt-1">يمكنك اختيار عدة صور مرة واحدة</p>
            </div>
          </div>

          {/* قسم المعلومات الأساسية */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">معلومات أساسية</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">عنوان المنتج</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: كنبة زان فاخر"
                  required
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">الفئة</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
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
            </div>
          </div>

          {/* قسم الوصف والتفاصيل الديناميكية */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">وصف وتفاصيل المنتج</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">وصف المنتج</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  rows={3}
                  placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                  autoComplete="off"
                />
              </div>
              
              <DynamicField
                label="المميزات"
                items={featuresList}
                onAdd={addFeature}
                onRemove={removeFeature}
                onUpdate={updateFeature}
                placeholder="مثال: ضمان 10 سنوات"
              />
              
              <DynamicField
                label="التفاصيل (الخامات المستخدمة)"
                items={detailsList}
                onAdd={addDetail}
                onRemove={removeDetail}
                onUpdate={updateDetail}
                placeholder="مثال: خشب زان طبيعي"
              />
              
              <DynamicField
                label="الألوان المتاحة"
                items={colorsList}
                onAdd={addColor}
                onRemove={removeColor}
                onUpdate={updateColor}
                placeholder="مثال: أحمر فاتح"
              />
            </div>
          </div>

          {/* قسم معلومات السعر والتوصيل */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">السعر والتوصيل</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">معلومات السعر</label>
                <input
                  type="text"
                  name="priceInfo"
                  value={formData.priceInfo || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: يبدأ من 5000 جنيه"
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">مدة التوصيل</label>
                <input
                  type="text"
                  name="estimatedDelivery"
                  value={formData.estimatedDelivery || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: 7 إلى 15 يوم"
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">الأبعاد</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: الطول 200 سم - العرض 80 سم"
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">آخر طلب</label>
                <input
                  type="text"
                  name="lastOrder"
                  value={formData.lastOrder || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: آخر طلب كان من 3 أيام"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* قسم الوسوم والإحصائيات */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">وسوم وإحصائيات</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">الوسوم</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags || ''}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="مثال: الأكثر مبيعاً 2024"
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">الأيقونة</label>
                <select
                  name="icon"
                  value={formData.icon || '🛋️'}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.value} - {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">المشاهدات</label>
                <input
                  type="number"
                  name="views"
                  value={formData.views || 0}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">الطلبات</label>
                <input
                  type="number"
                  name="orders"
                  value={formData.orders || 0}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">التقييم</label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  value={formData.rating || 0}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">عدد التقييمات</label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews || 0}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* خيارات إضافية */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
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
          </div>
          
          {/* أزرار الحفظ والإلغاء */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-blue-600 text-white px-4 py-3 sm:py-2 rounded hover:bg-blue-700 disabled:opacity-50 order-2 sm:order-1 sm:flex-1"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ المنتج'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-3 sm:py-2 rounded hover:bg-gray-600 order-1 sm:order-2 sm:flex-1"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}