'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Check, X, Eye, Search, Filter, MessageCircle } from 'lucide-react'

export default function AdminOrdersList({ orders }: { orders: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState('الكل')
  const supabase = createClient()
  const router = useRouter()

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.includes(searchTerm) ||
      order.customer_phone.includes(searchTerm)
    
    const matchesFilter = filterStatus === 'الكل' || order.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const updateStatus = async (orderId: number, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        admin_reply: `تم ${status === 'تم التأكيد' ? 'الموافقة' : 'الرفض'} بواسطة الأدمن`,
        last_admin_message: new Date().toISOString()
      })
      .eq('id', orderId)

    if (!error) {
      router.refresh()
      
      // لو عايز تبعت إشعار للعميل (اختياري)
      // await sendWhatsAppNotification(orderId, status)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800'
      case 'تم التأكيد': return 'bg-green-100 text-green-800'
      case 'ملغي': return 'bg-red-100 text-red-800'
      case 'تم التواصل': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="🔍 بحث برقم الطلب أو اسم العميل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg min-w-[150px]"
        >
          <option value="الكل">كل الحالات</option>
          <option value="قيد المراجعة">⏳ قيد المراجعة</option>
          <option value="تم التأكيد">✅ تم التأكيد</option>
          <option value="ملغي">❌ ملغي</option>
          <option value="تم التواصل">📞 تم التواصل</option>
        </select>
      </div>

      {/* جدول الطلبات */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-right">رقم الطلب</th>
              <th className="px-4 py-3 text-right">العميل</th>
              <th className="px-4 py-3 text-right">المنتج</th>
              <th className="px-4 py-3 text-right">المبلغ</th>
              <th className="px-4 py-3 text-right">الحالة</th>
              <th className="px-4 py-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">{order.order_number}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="text-sm text-gray-500">{order.customer_phone}</div>
                </td>
                <td className="px-4 py-3">{order.product_title}</td>
                <td className="px-4 py-3 font-bold text-primary">{order.deposit_amount} جنيه</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    {order.status !== 'تم التأكيد' && (
                      <button
                        onClick={() => updateStatus(order.id, 'تم التأكيد')}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="موافقة"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    
                    {order.status !== 'ملغي' && (
                      <button
                        onClick={() => updateStatus(order.id, 'ملغي')}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="رفض"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal عرض التفاصيل */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">تفاصيل الطلب {selectedOrder.order_number}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-500">العميل</label>
                <p className="font-medium">{selectedOrder.customer_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">رقم الهاتف</label>
                <p dir="ltr">{selectedOrder.customer_phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">المنتج</label>
                <p>{selectedOrder.product_title}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">المبلغ</label>
                <p className="font-bold text-primary">{selectedOrder.deposit_amount} جنيه</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">طريقة الدفع</label>
                <p>{selectedOrder.payment_method === 'vodafone' ? '📱 فودافون كاش' : '💳 إنستاباي'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">رقم المحول منه</label>
                <p>{selectedOrder.transfer_from}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">رقم الحساب المستقبل</label>
                <p>{selectedOrder.payment_account}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">صاحب الحساب</label>
                <p>{selectedOrder.account_owner}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-500">تاريخ الطلب</label>
                <p>{new Date(selectedOrder.created_at).toLocaleString('ar-EG')}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => updateStatus(selectedOrder.id, 'تم التأكيد')}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                ✅ موافقة
              </button>
              <button
                onClick={() => updateStatus(selectedOrder.id, 'ملغي')}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                ❌ رفض
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
      )}
    </div>
  )
}