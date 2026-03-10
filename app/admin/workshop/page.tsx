'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Play, Edit, Trash2, Plus, Eye, Search, Filter, 
  Youtube, Facebook, Clock, Calendar, CheckCircle, XCircle, ArrowLeft,
  Video, Hash
} from 'lucide-react'

export default function AdminWorkshopPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('الكل')
  const [filterSource, setFilterSource] = useState('الكل')
  
  // نموذج إضافة/تعديل فيديو
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_source: 'youtube',
    youtube_url: '',
    facebook_url: '',
    video_id: '',
    category: '',
    duration: '',
    views: 0,
    is_published: true
  })
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('workshop_videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) {
      setVideos(data || [])
    }
    setLoading(false)
  }

  // استخراج ID يوتيوب من الرابط
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  // استخراج ID فيديو فيسبوك
  const getFacebookId = (url: string) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:watch\?v=|video\.php\?v=)?(\d+)/i
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  // حفظ فيديو (إضافة أو تعديل)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let videoData: any = {
      title: formData.title,
      description: formData.description,
      video_source: formData.video_source,
      category: formData.category,
      duration: formData.duration,
      views: formData.views,
      is_published: formData.is_published,
      updated_at: new Date().toISOString()
    }

    // تعبئة البيانات حسب المصدر
    if (formData.video_source === 'youtube') {
      const youtubeId = getYoutubeId(formData.youtube_url)
      videoData.youtube_url = formData.youtube_url
      videoData.video_id = youtubeId
      videoData.facebook_url = null
    } else if (formData.video_source === 'facebook') {
      const facebookId = getFacebookId(formData.facebook_url)
      videoData.facebook_url = formData.facebook_url
      videoData.video_id = facebookId
      videoData.youtube_url = null
    }

    let error
    if (editingVideo) {
      // تعديل
      const { error: updateError } = await supabase
        .from('workshop_videos')
        .update(videoData)
        .eq('id', editingVideo.id)
      error = updateError
    } else {
      // إضافة
      const { error: insertError } = await supabase
        .from('workshop_videos')
        .insert([videoData])
      error = insertError
    }

    if (!error) {
      setShowAddModal(false)
      setEditingVideo(null)
      setFormData({
        title: '',
        description: '',
        video_source: 'youtube',
        youtube_url: '',
        facebook_url: '',
        video_id: '',
        category: '',
        duration: '',
        views: 0,
        is_published: true
      })
      fetchVideos()
      alert(editingVideo ? '✅ تم تعديل الفيديو' : '✅ تم إضافة الفيديو')
    } else {
      alert('❌ خطأ: ' + error.message)
    }
  }

  // حذف فيديو
  const deleteVideo = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
      const { error } = await supabase
        .from('workshop_videos')
        .delete()
        .eq('id', id)
      
      if (!error) {
        fetchVideos()
        alert('✅ تم حذف الفيديو')
      }
    }
  }

  // تحديث عدد المشاهدات
  const updateViews = async (id: number, newViews: number) => {
    const { error } = await supabase
      .from('workshop_videos')
      .update({ views: newViews })
      .eq('id', id)
    
    if (!error) {
      fetchVideos()
    }
  }

  // فلترة الفيديوهات
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title?.includes(searchTerm) || 
                         video.description?.includes(searchTerm)
    const matchesStatus = filterStatus === 'الكل' ||
                         (filterStatus === 'منشور' && video.is_published) ||
                         (filterStatus === 'مسودة' && !video.is_published)
    const matchesSource = filterSource === 'الكل' || video.video_source === filterSource
    return matchesSearch && matchesStatus && matchesSource
  })

  // الحصول على الصورة المصغرة
  const getThumbnail = (video: any) => {
    if (video.video_source === 'youtube' && video.video_id) {
      return `https://img.youtube.com/vi/${video.video_id}/default.jpg`
    } else if (video.video_source === 'facebook' && video.video_id) {
      return `https://graph.facebook.com/${video.video_id}/picture`
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* الهيدر مع أزرار التنقل */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
              title="العودة للوحة التحكم"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Play className="w-8 h-8 text-primary" />
              إدارة فيديوهات الورشة
            </h1>
          </div>
          
          {/* زر عرض الموقع */}
          <Link
            href="/workshop"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            <span className="hidden md:inline">عرض الصفحة</span>
          </Link>
        </div>

        {/* شريط الإجراءات */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* بحث */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="🔍 بحث في العناوين والوصف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg p-2 pr-10"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            {/* فلترة المصدر */}
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="border rounded-lg p-2 min-w-[130px]"
            >
              <option value="الكل">📺 كل المصادر</option>
              <option value="youtube">▶️ يوتيوب</option>
              <option value="facebook">📘 فيسبوك</option>
            </select>

            {/* فلترة الحالة */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg p-2 min-w-[130px]"
            >
              <option value="الكل">📋 الكل</option>
              <option value="منشور">✅ منشور</option>
              <option value="مسودة">⏳ مسودة</option>
            </select>

            {/* زر إضافة فيديو */}
            <button
              onClick={() => {
                setEditingVideo(null)
                setFormData({
                  title: '',
                  description: '',
                  video_source: 'youtube',
                  youtube_url: '',
                  facebook_url: '',
                  video_id: '',
                  category: '',
                  duration: '',
                  views: 0,
                  is_published: true
                })
                setShowAddModal(true)
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              إضافة فيديو
            </button>
          </div>
        </div>

        {/* جدول الفيديوهات */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">جاري تحميل الفيديوهات...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right">الفيديو</th>
                    <th className="px-4 py-3 text-right">العنوان</th>
                    <th className="px-4 py-3 text-right">المصدر</th>
                    <th className="px-4 py-3 text-right">التصنيف</th>
                    <th className="px-4 py-3 text-right">المدة</th>
                    <th className="px-4 py-3 text-right">المشاهدات</th>
                    <th className="px-4 py-3 text-right">الحالة</th>
                    <th className="px-4 py-3 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredVideos.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-500">
                        لا توجد فيديوهات
                      </td>
                    </tr>
                  ) : (
                    filteredVideos.map((video) => {
                      const thumbnail = getThumbnail(video)
                      
                      return (
                        <tr key={video.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden">
                              {thumbnail ? (
                                <img
                                  src={thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Video className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{video.title}</div>
                            {video.description && (
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {video.description}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {video.video_source === 'youtube' ? (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                                <Youtube className="w-3 h-3" />
                                يوتيوب
                              </span>
                            ) : (
                              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                                <Facebook className="w-3 h-3" />
                                فيسبوك
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {video.category && (
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                {video.category}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {video.duration && (
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="w-4 h-4" />
                                {video.duration}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{video.views || 0}</span>
                              <button
                                onClick={() => {
                                  const newViews = prompt('أدخل عدد المشاهدات الجديد:', video.views || 0)
                                  if (newViews !== null) {
                                    updateViews(video.id, parseInt(newViews) || 0)
                                  }
                                }}
                                className="text-xs text-blue-600 hover:underline"
                              >
                                تعديل
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {video.is_published ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                                <CheckCircle className="w-3 h-3" />
                                منشور
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                                <XCircle className="w-3 h-3" />
                                مسودة
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {/* زر مشاهدة حسب المصدر */}
                              {(video.video_source === 'youtube' && video.youtube_url) && (
                                <a
                                  href={video.youtube_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                                  title="مشاهدة على يوتيوب"
                                >
                                  <Youtube className="w-5 h-5" />
                                </a>
                              )}
                              {(video.video_source === 'facebook' && video.facebook_url) && (
                                <a
                                  href={video.facebook_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                                  title="مشاهدة على فيسبوك"
                                >
                                  <Facebook className="w-5 h-5" />
                                </a>
                              )}
                              
                              {/* زر تعديل */}
                              <button
                                onClick={() => {
                                  setEditingVideo(video)
                                  setFormData({
                                    title: video.title,
                                    description: video.description || '',
                                    video_source: video.video_source || 'youtube',
                                    youtube_url: video.youtube_url || '',
                                    facebook_url: video.facebook_url || '',
                                    video_id: video.video_id || '',
                                    category: video.category || '',
                                    duration: video.duration || '',
                                    views: video.views || 0,
                                    is_published: video.is_published
                                  })
                                  setShowAddModal(true)
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                                title="تعديل"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              
                              {/* زر حذف */}
                              <button
                                onClick={() => deleteVideo(video.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                                title="حذف"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* مودال إضافة/تعديل فيديو */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              {editingVideo ? (
                <>
                  <Edit className="w-6 h-6 text-blue-600" />
                  تعديل الفيديو
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 text-green-600" />
                  إضافة فيديو جديد
                </>
              )}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* عنوان الفيديو */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  عنوان الفيديو <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  placeholder="مثال: مراحل صناعة كنبة زان فاخر"
                />
              </div>

              {/* اختيار المصدر */}
              <div>
                <label className="block text-sm font-medium mb-2">مصدر الفيديو</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="video_source"
                      value="youtube"
                      checked={formData.video_source === 'youtube'}
                      onChange={(e) => setFormData({...formData, video_source: e.target.value})}
                      className="w-4 h-4"
                    />
                    <Youtube className="w-5 h-5 text-red-600" />
                    <span>يوتيوب</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="video_source"
                      value="facebook"
                      checked={formData.video_source === 'facebook'}
                      onChange={(e) => setFormData({...formData, video_source: e.target.value})}
                      className="w-4 h-4"
                    />
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span>فيسبوك</span>
                  </label>
                </div>
              </div>

              {/* رابط حسب المصدر */}
              {formData.video_source === 'youtube' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    رابط يوتيوب <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="https://youtu.be/... أو https://youtube.com/watch?v=..."
                  />
                </div>
              )}

              {formData.video_source === 'facebook' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    رابط فيسبوك <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="https://www.facebook.com/watch/?v=... أو https://fb.watch/..."
                  />
                </div>
              )}

              {/* الوصف */}
              <div>
                <label className="block text-sm font-medium mb-1">الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                  placeholder="وصف مختصر للفيديو..."
                />
              </div>

              {/* التصنيف والمدة */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">التصنيف</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="كنب، طرابيزات، ركنات..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">المدة</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="4:30"
                  />
                </div>
              </div>

              {/* عدد المشاهدات (يدوي) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  عدد المشاهدات <span className="text-gray-500">(يمكنك تحديدها يدوياً)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.views}
                  onChange={(e) => setFormData({...formData, views: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg p-2"
                  placeholder="0"
                />
              </div>

              {/* حالة النشر */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="is_published" className="text-sm font-medium">
                  منشور (ظاهر للعملاء)
                </label>
              </div>

              {/* أزرار */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  {editingVideo ? '💾 حفظ التعديلات' : '✅ إضافة الفيديو'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingVideo(null)
                  }}
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