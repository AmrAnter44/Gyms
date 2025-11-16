import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { requirePermission } from '../../../../lib/auth'

// جلب رقم الإيصال التالي
export async function GET(request: Request) {
  try {
    // ✅ التحقق من صلاحية عرض الإيصالات
    await requirePermission(request, 'canViewReceipts')
    
    let counter = await prisma.receiptCounter.findUnique({ 
      where: { id: 1 } 
    })
    
    if (!counter) {
      // إنشاء العداد لأول مرة
      counter = await prisma.receiptCounter.create({
        data: { id: 1, current: 1000 }
      })
    }

    return NextResponse.json({ 
      nextNumber: counter.current,
      message: 'تم جلب رقم الإيصال التالي بنجاح'
    })
  } catch (error: any) {
    console.error('Error fetching next receipt number:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }
    
    if (error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'ليس لديك صلاحية الوصول لأرقام الإيصالات' },
        { status: 403 }
      )
    }
    
    return NextResponse.json({ 
      error: 'فشل جلب رقم الإيصال' 
    }, { status: 500 })
  }
}

// تحديث رقم البداية (للإعدادات)
export async function POST(request: Request) {
  try {
    // ✅ التحقق من صلاحية الوصول للإعدادات
    await requirePermission(request, 'canAccessSettings')
    
    const { startNumber } = await request.json()
    
    if (!startNumber || startNumber < 1) {
      return NextResponse.json({ 
        error: 'رقم البداية غير صحيح' 
      }, { status: 400 })
    }

    const counter = await prisma.receiptCounter.upsert({
      where: { id: 1 },
      update: { current: parseInt(startNumber) },
      create: { id: 1, current: parseInt(startNumber) }
    })

    return NextResponse.json({ 
      success: true,
      newNumber: counter.current,
      message: `تم تحديث رقم الإيصال ليبدأ من ${startNumber}`
    })
  } catch (error: any) {
    console.error('Error updating receipt counter:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }
    
    if (error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'ليس لديك صلاحية تعديل إعدادات الإيصالات' },
        { status: 403 }
      )
    }
    
    return NextResponse.json({ 
      error: 'فشل تحديث رقم الإيصال' 
    }, { status: 500 })
  }
}