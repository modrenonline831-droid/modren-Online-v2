'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Phone, Search, CheckCircle, Clock, XCircle, MessageCircle } from 'lucide-react'

export default function OrdersList({ orders }: { orders: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  const filteredOrders = orders.filter(order => 
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_name.includes(searchTerm) ||
    order.customer_phone.includes(searchTerm)
  )

  const updateStatus = async (orderId: number, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (!error) {
      router.refresh()
    }
  }

  const markContacted = async (orderId: number) => {
    const { error } = await supabase
      .from('orders')
      .update({ 
        whatsapp_contacted: true,
        contacted_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (!error) {
      router.refresh()
    }
  }

  const openWhatsApp = (phone: string, orderNumber: string) => {
    const message = encodeURIComponent(
      `مرحباً، بخصوص طلبك رقم ${orderNumber}\nكيف أقدر أساعدك؟`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  const getStatusBadge = (status: string) => {
    const statuses: any = {
      'قيد المراجعة': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
      'تم التواصل': { color: 'bg-blue-100 text-blue-800', icon: <Phone className="w-3 h-3" /> },
      'تم التأكيد': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
      'ملغي': { color: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3" /> }
    }
    return statuses[status] || statuses['قيد المراجعة']
  }

  return (
    <div dir="rtl">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 بحث برقم الطلب أو اسم العميل أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-semibold">رقم الطلب</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">العميل</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">المنتج</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">العربون</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">الحالة</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">التاريخ</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map((order) => {
              const status = getStatusBadge(order.status)
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm">{order.order_number}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-sm text-gray-500 ltr" dir="ltr">{order.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{order.product_title}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-primary">{order.deposit_amount} جنيه</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.icon}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openWhatsApp(order.customer_phone, order.order_number)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="فتح محادثة واتساب"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="عرض التفاصيل"
                      >
                        👁️
                      </button>
                      {!order.whatsapp_contacted && (
                        <button
                          onClick={() => markContacted(order.id)}
                          className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                          title="تحديد كـ تم التواصل"
                        >
                          📞
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">تفاصيل الطلب {selectedOrder.order_number}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">اسم العميل</label>
                  <div className="font-medium">{selectedOrder.customer_name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">رقم الهاتف</label>
                  <div className="font-medium ltr" dir="ltr">{selectedOrder.customer_phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">المنتج</label>
                  <div className="font-medium">{selectedOrder.product_title}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">مبلغ العربون</label>
                  <div className="font-bold text-primary">{selectedOrder.deposit_amount} جنيه</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">تاريخ الطلب</label>
                  <div>{new Date(selectedOrder.created_at).toLocaleString('ar-EG')}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">آخر تحديث</label>
                  <div>{new Date(selectedOrder.updated_at).toLocaleString('ar-EG')}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">الحالة</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    updateStatus(selectedOrder.id, e.target.value)
                    setSelectedOrder(null)
                  }}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="قيد المراجعة">قيد المراجعة</option>
                  <option value="تم التواصل">تم التواصل</option>
                  <option value="تم التأكيد">تم التأكيد</option>
                  <option value="ملغي">ملغي</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-500">ملاحظات</label>
                <textarea
                  value={selectedOrder.notes || ''}
                  onChange={async (e) => {
                    await supabase
                      .from('orders')
                      .update({ notes: e.target.value })
                      .eq('id', selectedOrder.id)
                  }}
                  className="w-full mt-1 p-2 border rounded"
                  rows={3}
                  placeholder="أضف ملاحظات..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => openWhatsApp(selectedOrder.customer_phone, selectedOrder.order_number)}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل عبر واتساب
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}