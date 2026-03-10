'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Play, Clock, Eye, Calendar, Youtube, Facebook, Video } from 'lucide-react'

export default function WorkshopPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('workshop_videos')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    
    if (!error) {
      setVideos(data || [])
    }
    setLoading(false)
  }

  // استخراج ID يوتيوب من الرابط (مع التحقق من null)
  const getYoutubeId = (url: string | null) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  // استخراج ID فيديو فيسبوك (مع التحقق من null)
  const getFacebookId = (url: string | null) => {
    if (!url) return null
    const regExp = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:watch\?v=|video\.php\?v=)?(\d+)/i
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  // الحصول على الصورة المصغرة
  const getThumbnail = (video: any) => {
    if (video.video_source === 'youtube' && video.video_id) {
      return `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
    } else if (video.video_source === 'facebook' && video.video_id) {
      return `https://graph.facebook.com/${video.video_id}/picture`
    }
    return null
  }

  // الحصول على رابط المشاهدة
  const getWatchUrl = (video: any) => {
    if (video.video_source === 'youtube' && video.youtube_url) {
      return video.youtube_url
    } else if (video.video_source === 'facebook' && video.facebook_url) {
      return video.facebook_url
    }
    return '#'
  }

  // الحصول على أيقونة المصدر
  const getSourceIcon = (video: any) => {
    if (video.video_source === 'youtube') {
      return <Youtube className="w-4 h-4 text-red-600" />
    } else if (video.video_source === 'facebook') {
      return <Facebook className="w-4 h-4 text-blue-600" />
    }
    return <Video className="w-4 h-4 text-gray-600" />
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* الهيدر */}
      <div className="bg-gradient-to-l from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎬 ورشة مودرن اونلاين</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            شاهد كيف نصنع الأثاث الدمياطي الأصيل بأيدٍ مصرية ماهرة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري التحميل...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد فيديوهات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const thumbnail = getThumbnail(video)
              const watchUrl = getWatchUrl(video)
              const sourceIcon = getSourceIcon(video)
              
              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
                >
                  <div className="relative aspect-video bg-gray-900">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          // لو الصورة الكبيرة مش موجودة، استخدم صورة بديلة
                          if (video.video_source === 'youtube' && video.video_id) {
                            (e.target as HTMLImageElement).src = 
                              `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        {sourceIcon}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>

                    {/* شارة المصدر */}
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                      {sourceIcon}
                      <span>{video.video_source === 'youtube' ? 'يوتيوب' : 'فيسبوك'}</span>
                    </div>

                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        <Clock className="w-3 h-3 inline ml-1" />
                        {video.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {video.category && (
                        <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {video.category}
                        </span>
                      )}

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(video.created_at).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* مودال عرض الفيديو */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-2xl hover:text-primary"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video mb-6">
                {selectedVideo.video_source === 'youtube' && selectedVideo.video_id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
                    title={selectedVideo.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                ) : selectedVideo.video_source === 'facebook' && selectedVideo.video_id ? (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${selectedVideo.video_id}`}
                    title={selectedVideo.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">رابط الفيديو غير صحيح</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {selectedVideo.description && (
                  <p className="text-gray-700">{selectedVideo.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {selectedVideo.category && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {selectedVideo.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views || 0} مشاهدة
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedVideo.created_at).toLocaleDateString('ar-EG')}
                  </span>
                  <span className="flex items-center gap-1">
                    {selectedVideo.video_source === 'youtube' ? (
                      <Youtube className="w-4 h-4 text-red-600" />
                    ) : (
                      <Facebook className="w-4 h-4 text-blue-600" />
                    )}
                    <span>{selectedVideo.video_source === 'youtube' ? 'يوتيوب' : 'فيسبوك'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}