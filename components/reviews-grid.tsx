'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ThumbsUp, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function ReviewsGrid({ reviews }: { reviews: any[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')

  const filteredReviews = reviews
    .filter(r => filterRating ? r.rating === filterRating : true)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === 'highest') return b.rating - a.rating
      return 0
    })

  return (
    <div className="space-y-6">
      {/* فلترة */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-4 py-2 rounded-lg transition ${!filterRating ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            الكل
          </button>
          {[5,4,3,2,1].map(r => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${filterRating === r ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
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
          <option value="newest">الأحدث أولاً</option>
          <option value="oldest">الأقدم أولاً</option>
          <option value="highest">الأعلى تقييماً</option>
        </select>
      </div>

      {/* التقييمات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            {/* رأس التقييم */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{review.customer_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(review.date).toLocaleDateString('ar-EG')}</span>
                    {review.is_admin_post && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        إدارة الموقع
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>

              {/* المنتج (إذا وجد) */}
              {review.products && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center gap-3">
                  {review.products.image && (
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={review.products.image}
                        alt={review.products.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{review.products.title}</p>
                    <p className="text-xs text-gray-500">{review.products.category}</p>
                  </div>
                </div>
              )}

              {/* التعليق */}
              <p className={`text-gray-700 leading-relaxed ${!expandedId || expandedId !== review.id ? 'line-clamp-3' : ''}`}>
                {review.comment}
              </p>

              {review.comment.length > 200 && (
                <button
                  onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                  className="text-primary text-sm mt-2 flex items-center gap-1 hover:underline"
                >
                  {expandedId === review.id ? (
                    <>عرض أقل <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>عرض المزيد <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}

              {/* الصور (إذا وجدت) */}
              {review.images && review.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">صور من العميل:</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {review.images.map((img: string, idx: number) => (
                      <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={img}
                          alt={`صورة ${idx + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* أزرار التفاعل */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">مفيد</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">رد</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد تقييمات حتى الآن</p>
        </div>
      )}
    </div>
  )
}