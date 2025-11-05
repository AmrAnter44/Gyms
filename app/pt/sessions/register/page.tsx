'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PTSession {
  ptNumber: number
  clientName: string
  phone: string
  sessionsRemaining: number
  coachName: string
}

export default function RegisterPTSessionPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<PTSession[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    ptNumber: '',
    date: new Date().toISOString().split('T')[0], // التاريخ الحالي
    time: new Date().toTimeString().slice(0, 5), // الوقت الحالي
    notes: ''
  })

  useEffect(() => {
    fetchPTSessions()
    
    // قراءة ptNumber من URL إذا وجد
    const params = new URLSearchParams(window.location.search)
    const ptNumber = params.get('ptNumber')
    if (ptNumber) {
      setFormData(prev => ({
        ...prev,
        ptNumber: ptNumber
      }))
    }
  }, [])

  const fetchPTSessions = async () => {
    try {
      const response = await fetch('/api/pt')
      const data = await response.json()
      // فلترة الجلسات التي لديها جلسات متبقية فقط
      setSessions(data.filter((pt: PTSession) => pt.sessionsRemaining > 0))
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      // دمج التاريخ والوقت
      const sessionDateTime = `${formData.date}T${formData.time}:00`

      const response = await fetch('/api/pt/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ptNumber: parseInt(formData.ptNumber),
          sessionDate: sessionDateTime,
          notes: formData.notes
        })
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('✅ تم تسجيل الحضور بنجاح!')
        
        // إعادة تعيين النموذج
        setFormData({
          ptNumber: '',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toTimeString().slice(0, 5),
          notes: ''
        })
        
        // تحديث القائمة
        fetchPTSessions()
        
        // إخفاء الرسالة بعد 3 ثواني
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(`❌ ${result.error || 'فشل تسجيل الحضور'}`)
      }
    } catch (error) {
      console.error(error)
      setMessage('❌ حدث خطأ في الاتصال')
    } finally {
      setSubmitting(false)
    }
  }

  const selectPT = (pt: PTSession) => {
    setFormData({
      ...formData,
      ptNumber: pt.ptNumber.toString()
    })
  }

  // فلترة الجلسات حسب البحث
  const filteredSessions = sessions.filter(pt =>
    pt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pt.ptNumber.toString().includes(searchTerm) ||
    pt.phone.includes(searchTerm)
  )

  const selectedPT = sessions.find(pt => pt.ptNumber.toString() === formData.ptNumber)

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">📝 تسجيل حضور جلسة PT</h1>
          <p className="text-gray-600">سجل حضور العميل في جلسة التدريب الشخصي</p>
        </div>
        <button
          onClick={() => router.push('/pt/sessions/history')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          📊 سجل الحضور
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* قائمة الجلسات المتاحة */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">جلسات PT المتاحة</h2>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 ابحث برقم PT أو الاسم أو الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">جاري التحميل...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد جلسات متاحة'}
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredSessions.map((pt) => (
                <div
                  key={pt.ptNumber}
                  onClick={() => selectPT(pt)}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    formData.ptNumber === pt.ptNumber.toString()
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{pt.clientName}</h3>
                      <p className="text-sm text-gray-600">{pt.phone}</p>
                    </div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                      #{pt.ptNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">المدرب: {pt.coachName}</span>
                    <span className={`font-bold ${pt.sessionsRemaining <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                      {pt.sessionsRemaining} جلسات متبقية
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* نموذج التسجيل */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">بيانات الحضور</h2>

          {message && (
            <div className={`mb-4 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          {selectedPT && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-lg mb-2">الجلسة المحددة:</h3>
              <div className="space-y-1">
                <p><span className="font-semibold">رقم PT:</span> #{selectedPT.ptNumber}</p>
                <p><span className="font-semibold">العميل:</span> {selectedPT.clientName}</p>
                <p><span className="font-semibold">المدرب:</span> {selectedPT.coachName}</p>
                <p><span className="font-semibold">الجلسات المتبقية:</span> 
                  <span className={`font-bold mr-2 ${selectedPT.sessionsRemaining <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                    {selectedPT.sessionsRemaining}
                  </span>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                رقم PT <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.ptNumber}
                onChange={(e) => setFormData({ ...formData, ptNumber: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-lg text-lg font-bold text-green-600"
                placeholder="أدخل رقم PT أو اختر من القائمة"
              />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📅</span>
                <span>تاريخ ووقت الجلسة</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    التاريخ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg font-mono text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الوقت <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg font-mono text-lg"
                  />
                </div>
              </div>

              <div className="mt-4 bg-white border-2 border-purple-300 rounded-lg p-3">
                <p className="text-sm text-gray-600">الوقت المحدد:</p>
                <p className="text-lg font-mono font-bold text-purple-700">
                  {new Date(`${formData.date}T${formData.time}`).toLocaleString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                ملاحظات (اختياري)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-lg resize-none"
                rows={3}
                placeholder="أضف أي ملاحظات عن الجلسة..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !formData.ptNumber}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold text-lg transition"
            >
              {submitting ? '⏳ جاري التسجيل...' : '✅ تسجيل الحضور'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}