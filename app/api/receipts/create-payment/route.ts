import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { requirePermission } from '../../../../lib/auth'

export async function POST(request: Request) {
  try {
    // ✅ التحقق من صلاحية تعديل الأعضاء (لأن دفع المتبقي يعدل بيانات العضو)
    await requirePermission(request, 'canEditMembers')
    
    const { memberId, amount, paymentMethod, notes } = await request.json()

    if (!memberId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'بيانات غير صحيحة' }, { status: 400 })
    }

    // جلب بيانات العضو
    const member = await prisma.member.findUnique({
      where: { id: memberId }
    })

    if (!member) {
      return NextResponse.json({ error: 'العضو غير موجود' }, { status: 404 })
    }

    // جلب رقم الإيصال التالي
    const lastReceipt = await prisma.receipt.findFirst({
      orderBy: { receiptNumber: 'desc' }
    })

    const receiptNumber = lastReceipt ? lastReceipt.receiptNumber + 1 : 1000

    // تفاصيل الإيصال
    const itemDetails = {
      memberNumber: member.memberNumber,
      memberName: member.name,
      paidAmount: amount,
      remainingAmount: member.remainingAmount - amount,
      paymentMethod: paymentMethod || 'cash',
      notes: notes || ''
    }

    // إنشاء الإيصال
    const receipt = await prisma.receipt.create({
      data: {
        receiptNumber,
        type: 'Payment', // نوع جديد: دفع متبقي
        amount,
        itemDetails: JSON.stringify(itemDetails),
        paymentMethod: paymentMethod || 'cash',
        memberId
      }
    })

    return NextResponse.json(receipt)
  } catch (error: any) {
    console.error('Error creating payment receipt:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }
    
    if (error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'ليس لديك صلاحية إنشاء إيصالات الدفع' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'فشل إنشاء الإيصال' },
      { status: 500 }
    )
  }
}