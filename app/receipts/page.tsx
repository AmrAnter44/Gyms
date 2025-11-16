'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Receipt {
  id: string
  receiptNumber: number
  type: string
  amount: number
  paymentMethod: string
  staffName?: string
  itemDetails: string
  createdAt: string
  memberId?: string
  ptNumber?: number
  dayUseId?: string
}

export default function ReceiptsPage() {
  const router = useRouter()
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterPayment, setFilterPayment] = useState('all')

  useEffect(() => {
    fetchReceipts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [receipts, searchTerm, filterType, filterPayment])

  const fetchReceipts = async () => {
    try {
      const response = await fetch('/api/receipts')
      
      if (response.status === 401) {
        setMessage('❌ يجب تسجيل الدخول أولاً')
        setTimeout(() => router.push('/login'), 2000)
        return
      }
      
      if (response.status === 403) {
        setMessage('❌ ليس لديك صلاحية عرض الإيصالات')
        setReceipts([])
        setFilteredReceipts([])
        return
      }

      if (response.ok) {
        const data = await response.json()
        // ✅ التأكد إن data هو array
        if (Array.isArray(data)) {
          setReceipts(data)
          setFilteredReceipts(data)
        } else {
          console.error('البيانات المستلمة ليست array:', data)
          setReceipts([])
          setFilteredReceipts([])
        }
      } else {
        const error = await response.json()
        setMessage(`❌ ${error.error || 'فشل جلب الإيصالات'}`)
        setReceipts([])
        setFilteredReceipts([])
      }
    } catch (error) {
      console.error('Error fetching receipts:', error)
      setMessage('❌ حدث خطأ أثناء جلب الإيصالات')
      setReceipts([])
      setFilteredReceipts([])
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    // ✅ التأكد إن receipts هو array
    if (!Array.isArray(receipts)) {
      setFilteredReceipts([])
      return
    }

    let filtered = [...receipts]

    // فلتر البحث
    if (searchTerm) {
      filtered = filtered.filter(r => {
        try {
          const details = JSON.parse(r.itemDetails)
          return (
            r.receiptNumber.toString().includes(searchTerm) ||
            details.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            details.memberNumber?.toString().includes(searchTerm) ||
            r.staffName?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        } catch {
          return false
        }
      })
    }

    // فلتر النوع
    if (filterType !== 'all') {
      filtered = filtered.filter(r => r.type === filterType)
    }

    // فلتر طريقة الدفع
    if (filterPayment !== 'all') {
      filtered = filtered.filter(r => r.paymentMethod === filterPayment)
    }

    setFilteredReceipts(filtered)
  }

  const getTotalRevenue = () => {
    // ✅ التأكد إن filteredReceipts هو array
    if (!Array.isArray(filteredReceipts)) return 0
    return filteredReceipts.reduce((sum, r) => sum + r.amount, 0)
  }

  const getTodayCount = () => {
    // ✅ التأكد إن filteredReceipts هو array
    if (!Array.isArray(filteredReceipts)) return 0
    const today = new Date().toDateString()
    return filteredReceipts.filter(r => 
      new Date(r.createdAt).toDateString() === today
    ).length
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'Member': '🆕 عضو جديد',
      'تجديد عضويه': '🔄 تجديد',
      'PT': '💪 PT',
      'DayUse': '📅 Day Use',
      'Payment': '💰 دفع متبقي'
    }
    return labels[type] || type
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      'cash': '💵 كاش',
      'visa': '💳 فيزا',
      'vodafone_cash': '📱 فودافون كاش',
      'instapay': '💸 إنستاباي'
    }
    return labels[method] || method
  }

  const handlePrint = (receipt: Receipt) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    try {
      const details = JSON.parse(receipt.itemDetails)
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="utf-8">
          <title>إيصال رقم ${receipt.receiptNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt { max-width: 400px; margin: 0 auto; border: 2px solid #000; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .total { font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 10px; border-top: 2px solid #000; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h2>إيصال رقم: ${receipt.receiptNumber}</h2>
              <p>${new Date(receipt.createdAt).toLocaleString('ar-EG')}</p>
            </div>
            <div class="row"><span>النوع:</span><span>${getTypeLabel(receipt.type)}</span></div>
            ${details.memberName ? `<div class="row"><span>العضو:</span><span>${details.memberName}</span></div>` : ''}
            ${details.memberNumber ? `<div class="row"><span>رقم العضوية:</span><span>${details.memberNumber}</span></div>` : ''}
            <div class="row"><span>طريقة الدفع:</span><span>${getPaymentMethodLabel(receipt.paymentMethod)}</span></div>
            ${receipt.staffName ? `<div class="row"><span>الموظف:</span><span>${receipt.staffName}</span></div>` : ''}
            <div class="total">
              <div class="row"><span>المبلغ:</span><span>${receipt.amount} جنيه</span></div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">طباعة</button>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
    } catch (error) {
      console.error('Error printing receipt:', error)
      printWindow.close()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center" dir="rtl">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-xl">جاري التحميل...</p>
      </div>
    )
  }

  // ✅ عرض رسالة إذا لم يكن هناك صلاحية
  if (message && message.includes('صلاحية')) {
    return (
      <div className="container mx-auto p-6" dir="rtl">
        <div className="bg-red-100 border-r-4 border-red-500 p-6 rounded-lg text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl text-red-800 font-bold">{message}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">🧾 الإيصالات</h1>
          <p className="text-gray-600">عرض وإدارة جميع الإيصالات</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{filteredReceipts.length}</div>
          <div className="text-sm opacity-90">إجمالي الإيصالات</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{getTotalRevenue().toLocaleString()} جنيه</div>
          <div className="text-sm opacity-90">إجمالي الإيرادات</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{getTodayCount()}</div>
          <div className="text-sm opacity-90">إيصالات اليوم</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">🔍 بحث</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="رقم الإيصال، اسم العضو، الموظف..."
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">📋 نوع الإيصال</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">الكل</option>
              <option value="Member">عضو جديد</option>
              <option value="تجديد عضويه">تجديد</option>
              <option value="PT">PT</option>
              <option value="DayUse">Day Use</option>
              <option value="Payment">دفع متبقي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">💳 طريقة الدفع</label>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">الكل</option>
              <option value="cash">كاش</option>
              <option value="visa">فيزا</option>
              <option value="vodafone_cash">فودافون كاش</option>
              <option value="instapay">إنستاباي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
              <tr>
                <th className="px-6 py-4 text-right font-bold">رقم الإيصال</th>
                <th className="px-6 py-4 text-right font-bold">النوع</th>
                <th className="px-6 py-4 text-right font-bold">المبلغ</th>
                <th className="px-6 py-4 text-right font-bold">طريقة الدفع</th>
                <th className="px-6 py-4 text-right font-bold">الموظف</th>
                <th className="px-6 py-4 text-right font-bold">التاريخ</th>
                <th className="px-6 py-4 text-right font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((receipt) => {
                let details: any = {}
                try {
                  details = JSON.parse(receipt.itemDetails)
                } catch {}

                return (
                  <tr key={receipt.id} className="border-t hover:bg-blue-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-bold text-blue-600">#{receipt.receiptNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {getTypeLabel(receipt.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600">{receipt.amount} جنيه</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{getPaymentMethodLabel(receipt.paymentMethod)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{receipt.staffName || '-'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(receipt.createdAt).toLocaleString('ar-EG')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlePrint(receipt)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        🖨️ طباعة
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredReceipts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">🧾</div>
            <p className="text-xl font-medium">لا توجد إيصالات</p>
          </div>
        )}
      </div>
    </div>
  )
}