'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  type: 'member' | 'pt'
  data: any
}

type SearchMode = 'id' | 'name'

export default function SearchPage() {
  const router = useRouter()
  const [searchMode, setSearchMode] = useState<SearchMode>('id')
  const [memberId, setMemberId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [lastSearchTime, setLastSearchTime] = useState<Date | null>(null)
  const memberIdRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (searchMode === 'id') {
      memberIdRef.current?.focus()
    } else {
      nameRef.current?.focus()
    }
  }, [searchMode])

  // 🆕 دالة تشغيل صوت النجاح (اشتراك نشط)
  const playSuccessSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      
      // نغمة نجاح قوية (3 نغمات صاعدة)
      const times = [0, 0.15, 0.3]
      const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5
      
      times.forEach((time, index) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequencies[index], ctx.currentTime + time)
        
        // صوت عالي جداً
        gainNode.gain.setValueAtTime(0.8, ctx.currentTime + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.3)
        
        oscillator.start(ctx.currentTime + time)
        oscillator.stop(ctx.currentTime + time + 0.3)
      })
    } catch (error) {
      console.error('Error playing success sound:', error)
    }
  }

  // 🆕 دالة تشغيل صوت الإنذار (اشتراك منتهي أو غير موجود)
  const playAlarmSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      
      // صوت إنذار قوي ومتكرر
      const alarmPattern = [
        { freq: 2000, time: 0 },
        { freq: 600, time: 0.15 },
        { freq: 2000, time: 0.3 },
        { freq: 600, time: 0.45 },
        { freq: 2000, time: 0.6 },
        { freq: 600, time: 0.75 },
      ]
      
      alarmPattern.forEach(({ freq, time }) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.type = 'square' // موجة مربعة لصوت أقوى
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time)
        
        // صوت عالي جداً للإنذار
        gainNode.gain.setValueAtTime(0.9, ctx.currentTime + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.15)
        
        oscillator.start(ctx.currentTime + time)
        oscillator.stop(ctx.currentTime + time + 0.15)
      })
    } catch (error) {
      console.error('Error playing alarm sound:', error)
    }
  }

  // 🆕 دالة تشغيل صوت التحذير (اشتراك قريب من الانتهاء)
  const playWarningSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      
      // نغمة تحذير (نغمتين)
      const times = [0, 0.2]
      const frequencies = [440, 370] // A4, F#4
      
      times.forEach((time, index) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.type = 'triangle'
        oscillator.frequency.setValueAtTime(frequencies[index], ctx.currentTime + time)
        
        // صوت متوسط للتحذير
        gainNode.gain.setValueAtTime(0.7, ctx.currentTime + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.25)
        
        oscillator.start(ctx.currentTime + time)
        oscillator.stop(ctx.currentTime + time + 0.25)
      })
    } catch (error) {
      console.error('Error playing warning sound:', error)
    }
  }

  // 🆕 دالة فحص حالة العضو وتشغيل الصوت المناسب
  const checkMemberStatusAndPlaySound = (member: any) => {
    const isActive = member.isActive
    const expiryDate = member.expiryDate ? new Date(member.expiryDate) : null
    const today = new Date()
    
    if (!isActive || (expiryDate && expiryDate < today)) {
      // اشتراك منتهي - صوت إنذار
      playAlarmSound()
      return 'expired'
    } else if (expiryDate) {
      const diffTime = expiryDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays <= 7) {
        // اشتراك قريب من الانتهاء - صوت تحذير
        playWarningSound()
        return 'warning'
      } else {
        // اشتراك نشط - صوت نجاح
        playSuccessSound()
        return 'active'
      }
    } else {
      // لا يوجد تاريخ انتهاء - صوت نجاح
      playSuccessSound()
      return 'active'
    }
  }

  const handleSearchById = async () => {
    if (!memberId.trim()) {
      playAlarmSound()
      return
    }

    setLoading(true)
    setSearched(true)
    const foundResults: SearchResult[] = []

    try {
      const membersRes = await fetch('/api/members')
      const members = await membersRes.json()
      
      // ✅ البحث برقم العضوية (يستثني Other لأنهم memberNumber = null)
      const filteredMembers = members.filter((m: any) => 
        m.memberNumber !== null && m.memberNumber.toString() === memberId.trim()
      )
      
      filteredMembers.forEach((member: any) => {
        foundResults.push({ type: 'member', data: member })
      })

      setResults(foundResults)
      setLastSearchTime(new Date())

      if (foundResults.length > 0) {
        // 🆕 فحص حالة العضو وتشغيل الصوت المناسب
        checkMemberStatusAndPlaySound(foundResults[0].data)
      } else {
        // 🆕 لم يتم العثور على نتائج - صوت إنذار
        playAlarmSound()
      }

      setMemberId('')
      setTimeout(() => {
        memberIdRef.current?.focus()
        memberIdRef.current?.select()
      }, 500)

    } catch (error) {
      console.error('Search error:', error)
      playAlarmSound()
    } finally {
      setLoading(false)
    }
  }

  const handleSearchByName = async () => {
    if (!searchName.trim() && !searchPhone.trim()) {
      playAlarmSound()
      alert('يرجى إدخال الاسم أو رقم الهاتف للبحث')
      return
    }

    setLoading(true)
    setSearched(true)
    const foundResults: SearchResult[] = []

    try {
      const membersRes = await fetch('/api/members')
      const members = await membersRes.json()

      const ptRes = await fetch('/api/pt')
      const ptSessions = await ptRes.json()

      const filteredMembers = members.filter((m: any) => {
        const nameMatch = searchName.trim() 
          ? m.name.toLowerCase().includes(searchName.trim().toLowerCase())
          : true
        const phoneMatch = searchPhone.trim()
          ? m.phone.includes(searchPhone.trim())
          : true
        return nameMatch && phoneMatch
      })

      filteredMembers.forEach((member: any) => {
        foundResults.push({ type: 'member', data: member })
      })

      const filteredPT = ptSessions.filter((pt: any) => {
        const nameMatch = searchName.trim()
          ? pt.clientName.toLowerCase().includes(searchName.trim().toLowerCase())
          : true
        const phoneMatch = searchPhone.trim()
          ? pt.phone.includes(searchPhone.trim())
          : true
        return nameMatch && phoneMatch
      })

      filteredPT.forEach((pt: any) => {
        foundResults.push({ type: 'pt', data: pt })
      })

      setResults(foundResults)
      setLastSearchTime(new Date())

      if (foundResults.length > 0) {
        // 🆕 فحص حالة أول نتيجة
        if (foundResults[0].type === 'member') {
          checkMemberStatusAndPlaySound(foundResults[0].data)
        } else {
          // PT دائماً صوت نجاح
          playSuccessSound()
        }
      } else {
        // 🆕 لم يتم العثور على نتائج - صوت إنذار
        playAlarmSound()
      }

    } catch (error) {
      console.error('Search error:', error)
      playAlarmSound()
    } finally {
      setLoading(false)
    }
  }

  const handleIdKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchById()
    }
  }

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchByName()
    }
  }

  const calculateRemainingDays = (expiryDate: string | null | undefined): number | null => {
    if (!expiryDate) return null
    
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }

  const handleViewMemberDetails = (memberId: string) => {
    router.push(`/members/${memberId}`)
  }

  const handleViewPTDetails = (ptId: string) => {
    router.push(`/pt/${ptId}`)
  }

  return (
    <div className="container mx-auto p-6 min-h-screen" dir="rtl">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <span>🔍</span>
          <span>البحث السريع</span>
        </h1>
        <p className="text-gray-600">سكان سريع أو بحث بالاسم - الصوت يؤكد النتيجة تلقائياً</p>
        <p className="text-sm text-orange-600 mt-2">
          🔊 <strong>صوت أخضر ✅:</strong> اشتراك نشط | 
          <strong className="text-yellow-600"> صوت أصفر ⚠️:</strong> قريب من الانتهاء | 
          <strong className="text-red-600"> صوت أحمر 🚨:</strong> منتهي أو غير موجود
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 border-4 border-blue-200">
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSearchMode('id')
              setSearched(false)
              setResults([])
            }}
            className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
              searchMode === 'id'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🎯 البحث برقم العضوية (ID)
          </button>
          <button
            onClick={() => {
              setSearchMode('name')
              setSearched(false)
              setResults([])
            }}
            className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
              searchMode === 'name'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👤 البحث بالاسم والرقم
          </button>
        </div>
      </div>

      {searchMode === 'id' && (
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 border-4 border-blue-200">
          <div className="mb-6">
            <label className=" text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
              <span>🎯</span>
              <span>البحث برقم العضوية (ID)</span>
            </label>
            <div className="flex gap-3">
              <input
                ref={memberIdRef}
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                onKeyPress={handleIdKeyPress}
                className="flex-1 px-6 py-6 border-4 border-green-300 rounded-xl text-4xl font-bold text-center focus:border-green-600 focus:ring-4 focus:ring-green-200 transition"
                placeholder="اسكن أو اكتب رقم العضوية..."
                autoFocus
              />
              <button
                onClick={handleSearchById}
                disabled={loading || !memberId.trim()}
                className="px-8 py-6 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                🔍 بحث
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 اضغط Enter للبحث السريع
            </p>
          </div>
        </div>
      )}

      {searchMode === 'name' && (
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 border-4 border-green-200">
          <label className=" text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
            <span>👤</span>
            <span>البحث بالاسم والرقم</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم</label>
              <input
                ref={nameRef}
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleNameKeyPress}
                className="w-full px-4 py-4 border-2 border-green-300 rounded-lg text-xl focus:border-green-600 focus:ring-4 focus:ring-green-200 transition"
                placeholder="اكتب اسم العضو أو جزء منه..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                onKeyPress={handleNameKeyPress}
                className="w-full px-4 py-4 border-2 border-green-300 rounded-lg text-xl focus:border-green-600 focus:ring-4 focus:ring-green-200 transition"
                placeholder="اكتب رقم الهاتف أو جزء منه..."
              />
            </div>
          </div>
          
          <button
            onClick={handleSearchByName}
            disabled={loading || (!searchName.trim() && !searchPhone.trim())}
            className="w-full px-6 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 disabled:bg-gray-400 transition"
          >
            🔍 بحث
          </button>
          
          <p className="text-sm text-gray-500 mt-2">
            💡 يمكنك البحث بالاسم فقط، أو رقم الهاتف فقط، أو كليهما معاً
          </p>
        </div>
      )}

      {lastSearchTime && (
        <div className="bg-gray-100 p-3 rounded-lg text-center text-sm text-gray-600 mb-4">
          آخر بحث: {lastSearchTime.toLocaleTimeString('ar-EG')}
        </div>
      )}

      {searched && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-green-200 animate-fadeIn">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin text-6xl mb-4">⏳</div>
              <p className="text-2xl text-gray-600 font-bold">جاري البحث...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20 bg-red-50 animate-pulse">
              <div className="text-8xl mb-6 animate-bounce">🚨</div>
              <p className="text-3xl font-bold text-red-600 mb-3">لم يتم العثور على نتائج</p>
              <p className="text-xl text-red-500">
                {searchMode === 'id' 
                  ? `للبحث عن رقم العضوية "${memberId}"`
                  : `للبحث عن "${searchName || searchPhone}"`
                }
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-4 text-center">
                <span className="bg-green-100 text-green-800 px-6 py-3 rounded-xl text-xl font-bold">
                  ✅ تم العثور على {results.length} {results.length === 1 ? 'نتيجة' : 'نتائج'}
                </span>
              </div>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="border-4 border-blue-200 rounded-2xl p-6 hover:bg-blue-50 transition">
                    {result.type === 'member' && (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-300 bg-gray-100 flex-shrink-0">
                              {result.data.profileImage ? (
                                <img 
                                  src={result.data.profileImage} 
                                  alt={result.data.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <span className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
                                👤 عضو
                              </span>
                              <h3 className="text-3xl font-bold mt-3">{result.data.name}</h3>
                            </div>
                          </div>
                          {/* ✅ عرض رقم العضوية فقط إذا كان موجود (ليس Other) */}
                          {result.data.memberNumber !== null && (
                            <span className="text-5xl font-bold text-blue-600">
                              #{result.data.memberNumber}
                            </span>
                          )}
                          {result.data.memberNumber === null && (
                            <span className="text-2xl font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                              Other
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">الهاتف</p>
                            <p className="text-xl font-bold">{result.data.phone}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">السعر</p>
                            <p className="text-xl font-bold">{result.data.subscriptionPrice} ج.م</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">المتبقي</p>
                            <p className="text-xl font-bold text-red-600">{result.data.remainingAmount} ج.م</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">الحالة</p>
                            <span className={`inline-block px-3 py-1 rounded-lg text-lg font-bold ${
                              result.data.isActive && (!result.data.expiryDate || new Date(result.data.expiryDate) >= new Date())
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white animate-pulse'
                            }`}>
                              {result.data.isActive && (!result.data.expiryDate || new Date(result.data.expiryDate) >= new Date()) ? '✅ نشط' : '🚨 منتهي'}
                            </span>
                          </div>
                        </div>

                        {result.data.expiryDate && (
                          <div className="mb-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">تاريخ الانتهاء</p>
                                <p className="text-xl font-bold text-gray-800">
                                  {new Date(result.data.expiryDate).toLocaleDateString('ar-EG')}
                                </p>
                              </div>
                              {(() => {
                                const days = calculateRemainingDays(result.data.expiryDate)
                                if (days === null) return null
                                
                                if (days < 0) {
                                  return (
                                    <div className="text-right">
                                      <p className="text-red-600 font-bold text-2xl animate-pulse">
                                        🚨 منتهي منذ {Math.abs(days)} يوم
                                      </p>
                                    </div>
                                  )
                                } else if (days <= 7) {
                                  return (
                                    <div className="text-right">
                                      <p className="text-orange-600 font-bold text-2xl">
                                        ⚠️ باقي {days} يوم فقط
                                      </p>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div className="text-right">
                                      <p className="text-green-600 font-bold text-2xl">
                                        ✅ باقي {days} يوم
                                      </p>
                                    </div>
                                  )
                                }
                              })()}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-3">
                          <button
                            onClick={() => handleViewMemberDetails(result.data.id)}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center gap-3"
                          >
                            <span>👁️</span>
                            <span>عرض التفاصيل الكاملة</span>
                            <span>➡️</span>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {result.type === 'pt' && (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
                              💪 PT
                            </span>
                            <h3 className="text-3xl font-bold mt-3">{result.data.clientName}</h3>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">الهاتف</p>
                            <p className="text-xl font-bold">{result.data.phone}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">المدرب</p>
                            <p className="text-xl font-bold">{result.data.coachName}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">الجلسات المتبقية</p>
                            <p className="text-xl font-bold text-green-600">{result.data.sessionsRemaining}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">سعر الجلسة</p>
                            <p className="text-xl font-bold">{result.data.pricePerSession} ج.م</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleViewPTDetails(result.data.id)}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center gap-3"
                        >
                          <span>👁️</span>
                          <span>عرض التفاصيل الكاملة</span>
                          <span>➡️</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}