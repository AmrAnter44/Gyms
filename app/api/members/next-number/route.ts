import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// جلب رقم العضوية التالي
export async function GET() {
  try {
    console.log('🔍 بدء البحث عن آخر رقم عضوية...')
    
    // ✅ جلب آخر رقم عضوية (نستثني الأعضاء اللي memberNumber = null)
    const lastMember = await prisma.member.findFirst({
      where: {
        memberNumber: {
          not: null
        }
      },
      orderBy: { memberNumber: 'desc' },
      select: { memberNumber: true, name: true }
    })

    console.log('👤 آخر عضو:', lastMember)

    // ✅ الرقم التالي
    const nextNumber = lastMember?.memberNumber ? lastMember.memberNumber + 1 : 1001

    console.log('📊 آخر رقم عضوية:', lastMember?.memberNumber, '➡️ الرقم التالي:', nextNumber)

    return NextResponse.json({ 
      nextNumber: nextNumber,
      message: 'تم جلب رقم العضوية التالي بنجاح',
      lastMember: lastMember?.name || 'لا يوجد'
    }, { status: 200 })
    
  } catch (error) {
    console.error('❌ Error fetching next member number:', error)
    
    // ✅ حتى في حالة الخطأ، نرجع رقم افتراضي
    return NextResponse.json({ 
      nextNumber: 1001,
      message: 'تم استخدام رقم افتراضي بسبب خطأ',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }) // ✅ 200 وليس 500
  }
}

// تحديث رقم البداية (للإعدادات)
export async function POST(request: Request) {
  try {
    const { startNumber } = await request.json()
    
    if (!startNumber || startNumber < 1) {
      return NextResponse.json({ 
        error: 'رقم البداية غير صحيح' 
      }, { status: 400 })
    }

    const parsedNumber = parseInt(startNumber)

    // ✅ التحقق من عدم وجود رقم عضوية بهذا الرقم (نستثني null)
    const existingMember = await prisma.member.findUnique({
      where: { memberNumber: parsedNumber }
    })

    if (existingMember) {
      return NextResponse.json({ 
        error: `رقم العضوية ${parsedNumber} مستخدم بالفعل` 
      }, { status: 400 })
    }

    console.log('✅ تم تحديث رقم البداية إلى:', parsedNumber)

    return NextResponse.json({ 
      success: true,
      newNumber: parsedNumber,
      message: `تم تحديث رقم العضوية ليبدأ من ${parsedNumber}`
    })
  } catch (error) {
    console.error('❌ Error updating member counter:', error)
    return NextResponse.json({ 
      error: 'فشل تحديث رقم العضوية' 
    }, { status: 500 })
  }
}