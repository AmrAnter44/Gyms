'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PTSessionRecord {
  id: string
  ptNumber: number
  clientName: string
  coachName: string
  sessionDate: string
  notes: string | null
  createdAt: string
  pt: {
    clientName: string
    coachName: string
    phone: string
  }
}

export default function PTSessionHistoryPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<PTSessionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPTNumber, setFilterPTNumber] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/pt/sessions')
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (sessionId: string, ptNumber: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا السجل؟ سيتم إعادة الجلسة للعداد.')) return

    try {
      const response = await fetch(`/api/pt/sessions?sessionId=${sessionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('✅ تم حذف السجل بنجاح')
        fetchSessions()
      } else {
        alert('❌ فشل حذف السجل')
      }
    } catch (error) {
      alert('❌ حدث خطأ')
    }
  }

  // فلترة السجلات
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.coachName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.ptNumber.toString().includes(searchTerm)
    
    const matchesPTNumber = !filterPTNumber || session.ptNumber.toString() === filterPTNumber
    
    const sessionDate = new Date(session.sessionDate)
    const matchesDateFrom = !dateFrom || sessionDate >= new Date(dateFrom)
    const matchesDateTo = !dateTo || sessionDate <= new Date(dateTo)

    return matchesSearch && matchesPTNumber && matchesDateFrom && matchesDateTo
  })

  // إحصائيات
  const totalSessions = filteredSessions.length
  const uniquePTs = new Set(filteredSessions.map(s => s.ptNumber)).size
  const todaySessions = filteredSessions.filter(s => {
    const sessionDate = new Date(s.sessionDate).toDateString()
    const today = new Date().toDateString()
    return sessionDate === today
  }).length

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">📊 سجل حضور جلسات PT</h1>
          <p className="text-gray-600">مراجعة جميع سجلات حضور جلسات التدريب الشخصي</p>
        </div>
        <button
          onClick={() => router.push('/pt/sessions/register')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          ➕ تسجيل حضور جديد
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">إجمالي الجلسات</p>
              <p className="text-4xl font-bold">{totalSessions}</p>
            </div>
            <div className="text-5xl opacity-20">📊</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">جلسات اليوم</p>
              <p className="text-4xl font-bold">{todaySessions}</p>
            </div>
            <div className="text-5xl opacity-20">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">عدد العملاء</p>
              <p className="text-4xl font-bold">{uniquePTs}</p>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
        </div>
      </div>

      {/* الفلاتر */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">🔍 الفلاتر والبحث</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">بحث عام</label>
            <input
              type="text"
              placeholder="اسم العميل، المدرب، رقم PT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رقم PT محدد</label>
            <input
              type="number"
              placeholder="رقم PT..."
              value={filterPTNumber}
              onChange={(e) => setFilterPTNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">من تاريخ</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">إلى تاريخ</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {(searchTerm || filterPTNumber || dateFrom || dateTo) && (
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterPTNumber('')
              setDateFrom('')
              setDateTo('')
            }}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700"
          >
            ❌ مسح الفلاتر
          </button>
        )}
      </div>

      {/* جدول السجلات */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">جاري التحميل...</div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            لا توجد سجلات حضور
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-right">رقم PT</th>
                  <th className="px-4 py-3 text-right">العميل</th>
                  <th className="px-4 py-3 text-right">المدرب</th>
                  <th className="px-4 py-3 text-right">تاريخ الجلسة</th>
                  <th className="px-4 py-3 text-right">وقت الجلسة</th>
                  <th className="px-4 py-3 text-right">ملاحظات</th>
                  <th className="px-4 py-3 text-right">تاريخ التسجيل</th>
                  <th className="px-4 py-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => {
                  const sessionDate = new Date(session.sessionDate)
                  const isToday = sessionDate.toDateString() === new Date().toDateString()
                  
                  return (
                    <tr 
                      key={session.id} 
                      className={`border-t hover:bg-gray-50 ${isToday ? 'bg-green-50' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-bold text-green-600">#{session.ptNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold">{session.clientName}</p>
                          <p className="text-sm text-gray-600">{session.pt.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{session.coachName}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono ${isToday ? 'font-bold text-green-600' : ''}`}>
                          {sessionDate.toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-blue-600">
                          {sessionDate.toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {session.notes ? (
                          <span className="text-sm text-gray-700">{session.notes}</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">
                          {new Date(session.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(session.id, session.ptNumber)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          🗑️ حذف
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ملخص بالأسفل */}
      {filteredSessions.length > 0 && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            عرض <span className="font-bold">{filteredSessions.length}</span> سجل من إجمالي <span className="font-bold">{sessions.length}</span> سجل
          </p>
        </div>
      )}
    </div>
  )
}