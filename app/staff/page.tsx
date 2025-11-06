'use client'

import { useEffect, useState } from 'react'

interface Staff {
  id: string
  name: string
  phone?: string
  position?: string
  salary?: number
  notes?: string
  isActive: boolean
  createdAt: string
}

// قائمة الوظائف الثابتة
const POSITIONS = [
  { value: 'مدرب', label: '💪 مدرب', icon: '💪' },
  { value: 'ريسبشن', label: '👔 ريسبشن', icon: '👔' },
  { value: 'بار', label: '☕ بار', icon: '☕' },
  { value: 'HK', label: '🧹 HK (نظافة)', icon: '🧹' },
  { value: 'مدير', label: '👨‍💼 مدير', icon: '👨‍💼' },
  { value: 'محاسب', label: '💼 محاسب', icon: '💼' },
  { value: 'صيانة', label: '🔧 صيانة', icon: '🔧' },
  { value: 'أمن', label: '🛡️ أمن', icon: '🛡️' },
  { value: 'other', label: '📝 أخرى...', icon: '📝' },
]

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showOtherPosition, setShowOtherPosition] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    position: '',
    customPosition: '', // للوظيفة المخصصة
    salary: 0,
    notes: '',
  })

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      position: '',
      customPosition: '',
      salary: 0,
      notes: '',
    })
    setShowOtherPosition(false)
    setEditingStaff(null)
    setShowForm(false)
  }

  const handleEdit = (staffMember: Staff) => {
    // التحقق إذا كانت الوظيفة موجودة في القائمة الثابتة
    const isStandardPosition = POSITIONS.some(
      (pos) => pos.value === staffMember.position && pos.value !== 'other'
    )

    setFormData({
      name: staffMember.name,
      phone: staffMember.phone || '',
      position: isStandardPosition ? staffMember.position || '' : 'other',
      customPosition: isStandardPosition ? '' : staffMember.position || '',
      salary: staffMember.salary || 0,
      notes: staffMember.notes || '',
    })
    setShowOtherPosition(!isStandardPosition)
    setEditingStaff(staffMember)
    setShowForm(true)
  }

  const handlePositionChange = (value: string) => {
    setFormData({ ...formData, position: value, customPosition: '' })
    setShowOtherPosition(value === 'other')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // تحديد الوظيفة النهائية
    const finalPosition =
      formData.position === 'other' ? formData.customPosition : formData.position

    if (!finalPosition) {
      setMessage('❌ يرجى تحديد الوظيفة')
      setLoading(false)
      return
    }

    try {
      const url = '/api/staff'
      const method = editingStaff ? 'PUT' : 'POST'
      const body = editingStaff
        ? { id: editingStaff.id, ...formData, position: finalPosition }
        : { ...formData, position: finalPosition }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setMessage(editingStaff ? '✅ تم تحديث الموظف بنجاح!' : '✅ تم إضافة الموظف بنجاح!')
        setTimeout(() => setMessage(''), 3000)
        fetchStaff()
        resetForm()
      } else {
        setMessage('❌ فشلت العملية')
      }
    } catch (error) {
      console.error(error)
      setMessage('❌ حدث خطأ')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموظف؟')) return

    try {
      await fetch(`/api/staff?id=${id}`, { method: 'DELETE' })
      fetchStaff()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleActive = async (staffMember: Staff) => {
    try {
      await fetch('/api/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: staffMember.id,
          isActive: !staffMember.isActive,
        }),
      })
      fetchStaff()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // دالة للحصول على أيقونة الوظيفة
  const getPositionIcon = (position: string): string => {
    const pos = POSITIONS.find((p) => p.value === position)
    return pos ? pos.icon : '👤'
  }

  // دالة للحصول على لون الوظيفة
  const getPositionColor = (position: string): string => {
    const colors: { [key: string]: string } = {
      مدرب: 'bg-green-100 text-green-800',
      ريسبشن: 'bg-blue-100 text-blue-800',
      بار: 'bg-orange-100 text-orange-800',
      HK: 'bg-purple-100 text-purple-800',
      مدير: 'bg-red-100 text-red-800',
      محاسب: 'bg-indigo-100 text-indigo-800',
      صيانة: 'bg-yellow-100 text-yellow-800',
      أمن: 'bg-gray-100 text-gray-800',
    }
    return colors[position] || 'bg-gray-100 text-gray-800'
  }

  // إحصائيات حسب الوظيفة
  const getStaffByPosition = () => {
    const counts: { [key: string]: number } = {}
    staff.forEach((s) => {
      if (s.position && s.isActive) {
        counts[s.position] = (counts[s.position] || 0) + 1
      }
    })
    return counts
  }

  const staffByPosition = getStaffByPosition()

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">👥 إدارة الموظفين</h1>
          <p className="text-gray-600">إضافة وتعديل وحذف الموظفين</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(!showForm)
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          {showForm ? 'إخفاء النموذج' : '➕ إضافة موظف جديد'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      {/* نموذج الإضافة/التعديل */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-2 border-blue-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            {editingStaff ? (
              <>
                <span>✏️</span>
                <span>تعديل موظف</span>
              </>
            ) : (
              <>
                <span>➕</span>
                <span>إضافة موظف جديد</span>
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* الاسم */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  الاسم <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="اسم الموظف"
                />
              </div>

              {/* رقم الهاتف */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">رقم الهاتف</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              {/* الوظيفة */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  الوظيفة <span className="text-red-600">*</span>
                </label>
                <select
                  required={!showOtherPosition}
                  value={formData.position}
                  onChange={(e) => handlePositionChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg"
                >
                  <option value="">-- اختر الوظيفة --</option>
                  {POSITIONS.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* حقل الوظيفة المخصصة */}
              {showOtherPosition && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    اكتب الوظيفة <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customPosition}
                    onChange={(e) =>
                      setFormData({ ...formData, customPosition: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    placeholder="مثال: مساعد مدير، مصور..."
                  />
                </div>
              )}

              {/* المرتب */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  المرتب (ج.م)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* ملاحظات */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">ملاحظات</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                rows={3}
                placeholder="ملاحظات إضافية..."
              />
            </div>

            {/* أزرار التحكم */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 font-bold text-lg shadow-lg transform transition hover:scale-105 active:scale-95"
              >
                {loading ? '⏳ جاري الحفظ...' : editingStaff ? '✅ تحديث' : '➕ إضافة موظف'}
              </button>
              {editingStaff && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-4 rounded-lg hover:from-gray-300 hover:to-gray-400 font-bold shadow-lg transform transition hover:scale-105 active:scale-95"
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">إجمالي الموظفين</p>
              <p className="text-4xl font-bold">{staff.length}</p>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">الموظفين النشطين</p>
              <p className="text-4xl font-bold">{staff.filter((s) => s.isActive).length}</p>
            </div>
            <div className="text-5xl opacity-20">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">إجمالي المرتبات</p>
              <p className="text-3xl font-bold">
                {staff.reduce((sum, s) => sum + (s.salary || 0), 0).toFixed(0)} ج.م
              </p>
            </div>
            <div className="text-5xl opacity-20">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">عدد المدربين</p>
              <p className="text-4xl font-bold">{staffByPosition['مدرب'] || 0}</p>
            </div>
            <div className="text-5xl opacity-20">💪</div>
          </div>
        </div>
      </div>

      {/* إحصائيات الوظائف */}
      {Object.keys(staffByPosition).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📊</span>
            <span>توزيع الموظفين حسب الوظيفة</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(staffByPosition)
              .sort(([, a], [, b]) => b - a)
              .map(([position, count]) => (
                <div
                  key={position}
                  className={`${getPositionColor(position)} rounded-lg p-4 text-center`}
                >
                  <div className="text-3xl mb-2">{getPositionIcon(position)}</div>
                  <p className="font-bold text-lg">{position}</p>
                  <p className="text-2xl font-black">{count}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* جدول الموظفين */}
      {loading ? (
        <div className="text-center py-12">جاري التحميل...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  <th className="px-4 py-3 text-right">الاسم</th>
                  <th className="px-4 py-3 text-right">الهاتف</th>
                  <th className="px-4 py-3 text-right">الوظيفة</th>
                  <th className="px-4 py-3 text-right">المرتب</th>
                  <th className="px-4 py-3 text-right">الحالة</th>
                  <th className="px-4 py-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => (
                  <tr
                    key={staffMember.id}
                    className={`border-t hover:bg-gray-50 transition ${
                      !staffMember.isActive ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold">{staffMember.name}</td>
                    <td className="px-4 py-3 text-gray-600">{staffMember.phone || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getPositionColor(
                          staffMember.position || ''
                        )}`}
                      >
                        <span>{getPositionIcon(staffMember.position || '')}</span>
                        <span>{staffMember.position || '-'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      {staffMember.salary ? `${staffMember.salary} ج.م` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(staffMember)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition transform hover:scale-105 ${
                          staffMember.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {staffMember.isActive ? '✅ نشط' : '❌ غير نشط'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(staffMember)}
                          className="text-blue-600 hover:text-blue-800 font-semibold transition hover:underline"
                        >
                          ✏️ تعديل
                        </button>
                        <button
                          onClick={() => handleDelete(staffMember.id)}
                          className="text-red-600 hover:text-red-800 font-semibold transition hover:underline"
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {staff.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-xl">لا يوجد موظفين حالياً</p>
              <p className="text-sm mt-2">ابدأ بإضافة موظف جديد</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}