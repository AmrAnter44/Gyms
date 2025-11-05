// app/api/members/route.ts - بدون أرقام عشرية نهائياً
import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// 🔧 دالة للبحث عن رقم إيصال متاح (integers فقط)
async function getNextAvailableReceiptNumber(startingNumber: number): Promise<number> {
  // ✅ تحويل لـ integer صريح
  let currentNumber = parseInt(startingNumber.toString())
  let attempts = 0
  const MAX_ATTEMPTS = 100
  
  while (attempts < MAX_ATTEMPTS) {
    const existingReceipt = await prisma.receipt.findUnique({
      where: { receiptNumber: currentNumber }
    })
    
    if (!existingReceipt) {
      console.log(`✅ رقم إيصال متاح: ${currentNumber}`)
      return currentNumber
    }
    
    console.log(`⚠️ رقم ${currentNumber} موجود، تجربة ${currentNumber + 1}...`)
    currentNumber++
    attempts++
  }
  
  throw new Error(`فشل إيجاد رقم إيصال متاح بعد ${MAX_ATTEMPTS} محاولة`)
}

// GET - جلب كل الأعضاء
export async function GET() {
  try {
    console.log('🔍 بدء جلب الأعضاء...')
    
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
      include: { receipts: true }
    })
    
    console.log('✅ تم جلب', members.length, 'عضو')
    
    if (!Array.isArray(members)) {
      console.error('❌ Prisma لم يرجع array:', typeof members)
      return NextResponse.json([], { status: 200 })
    }
    
    return NextResponse.json(members, { status: 200 })
  } catch (error) {
    console.error('❌ Error fetching members:', error)
    
    return NextResponse.json([], { 
      status: 200,
      headers: {
        'X-Error': 'Failed to fetch members'
      }
    })
  }
}

// POST - إضافة عضو جديد
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      memberNumber, 
      name, 
      phone, 
      profileImage,
      inBodyScans, 
      invitations, 
      freePTSessions, 
      subscriptionPrice, 
      remainingAmount, 
      notes, 
      startDate, 
      expiryDate, 
      paymentMethod 
    } = body

    console.log('📝 إضافة عضو جديد:', { memberNumber, name, profileImage })

    // ✅ تحويل كل الأرقام لـ integers
    const cleanMemberNumber = memberNumber ? parseInt(memberNumber.toString()) : undefined
    const cleanInBodyScans = parseInt((inBodyScans || 0).toString())
    const cleanInvitations = parseInt((invitations || 0).toString())
    const cleanFreePTSessions = parseInt((freePTSessions || 0).toString())
    const cleanSubscriptionPrice = parseInt(subscriptionPrice.toString())
    const cleanRemainingAmount = parseInt((remainingAmount || 0).toString())

    // التحقق من أن رقم العضوية غير مستخدم
    if (cleanMemberNumber) {
      const existingMember = await prisma.member.findUnique({
        where: { memberNumber: cleanMemberNumber }
      })
      
      if (existingMember) {
        console.error('❌ رقم العضوية مستخدم:', cleanMemberNumber)
        return NextResponse.json(
          { error: `رقم العضوية ${cleanMemberNumber} مستخدم بالفعل` }, 
          { status: 400 }
        )
      }
    }

    // التحقق من التواريخ
    if (startDate && expiryDate) {
      const start = new Date(startDate)
      const end = new Date(expiryDate)
      
      if (end <= start) {
        return NextResponse.json(
          { error: 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية' },
          { status: 400 }
        )
      }
    }

    // إنشاء العضو
    const member = await prisma.member.create({
      data: {
        memberNumber: cleanMemberNumber,
        name,
        phone,
        profileImage,
        inBodyScans: cleanInBodyScans,
        invitations: cleanInvitations,
        freePTSessions: cleanFreePTSessions,
        subscriptionPrice: cleanSubscriptionPrice,
        remainingAmount: cleanRemainingAmount,
        notes,
        startDate: startDate ? new Date(startDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
    })

    console.log('✅ تم إنشاء العضو:', member.id, 'صورة:', member.profileImage)

    // إنشاء إيصال دائماً
    let receiptData = null
    try {
      let counter = await prisma.receiptCounter.findUnique({ where: { id: 1 } })
      
      if (!counter) {
        console.log('📊 إنشاء عداد الإيصالات لأول مرة')
        counter = await prisma.receiptCounter.create({
          data: { id: 1, current: 1000 }
        })
      }

      console.log('🧾 رقم الإيصال من العداد:', counter.current)

      // ✅ البحث عن رقم إيصال متاح (integers فقط)
      const availableReceiptNumber = await getNextAvailableReceiptNumber(counter.current)
      
      console.log('✅ سيتم استخدام رقم الإيصال:', availableReceiptNumber)

      // ✅ المبلغ المدفوع كـ integer
      const paidAmount = cleanSubscriptionPrice - cleanRemainingAmount

      let subscriptionDays = null
      if (startDate && expiryDate) {
        const start = new Date(startDate)
        const end = new Date(expiryDate)
        subscriptionDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      }

      const receipt = await prisma.receipt.create({
        data: {
          receiptNumber: availableReceiptNumber,
          type: 'Member',
          amount: paidAmount,
          paymentMethod: paymentMethod || 'cash',
          itemDetails: JSON.stringify({
            memberNumber: cleanMemberNumber,
            memberName: name,
            subscriptionPrice: cleanSubscriptionPrice,
            paidAmount: paidAmount,
            remainingAmount: cleanRemainingAmount,
            freePTSessions: cleanFreePTSessions,
            inBodyScans: cleanInBodyScans,
            invitations: cleanInvitations,
            startDate: startDate,
            expiryDate: expiryDate,
            subscriptionDays: subscriptionDays,
          }),
          memberId: member.id,
        },
      })

      console.log('✅ تم إنشاء الإيصال:', receipt.receiptNumber)

      // ✅ تحديث العداد (integer)
      const newCounterValue = availableReceiptNumber + 1
      await prisma.receiptCounter.update({
        where: { id: 1 },
        data: { current: newCounterValue }
      })

      console.log('🔄 تم تحديث عداد الإيصالات إلى:', newCounterValue)

      receiptData = {
        receiptNumber: receipt.receiptNumber,
        amount: receipt.amount,
        paymentMethod: receipt.paymentMethod,
        createdAt: receipt.createdAt,
        itemDetails: JSON.parse(receipt.itemDetails)
      }

    } catch (receiptError) {
      console.error('❌ خطأ في إنشاء الإيصال:', receiptError)
      if (receiptError instanceof Error && receiptError.message.includes('Unique constraint')) {
        console.error('❌ رقم الإيصال مكرر! المحاولة مرة أخرى...')
      }
    }

    return NextResponse.json({
      success: true,
      member: member,
      receipt: receiptData
    }, { status: 201 })

  } catch (error) {
    console.error('❌ خطأ في إضافة العضو:', error)
    return NextResponse.json({ error: 'فشل إضافة العضو' }, { status: 500 })
  }
}

// PUT - تحديث عضو
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, profileImage, ...data } = body

    const updateData: any = {}
    
    // ✅ تحويل كل الأرقام لـ integers
    if (data.memberNumber !== undefined) {
      updateData.memberNumber = parseInt(data.memberNumber.toString())
    }
    if (data.inBodyScans !== undefined) {
      updateData.inBodyScans = parseInt(data.inBodyScans.toString())
    }
    if (data.invitations !== undefined) {
      updateData.invitations = parseInt(data.invitations.toString())
    }
    if (data.freePTSessions !== undefined) {
      updateData.freePTSessions = parseInt(data.freePTSessions.toString())
    }
    if (data.subscriptionPrice !== undefined) {
      updateData.subscriptionPrice = parseInt(data.subscriptionPrice.toString())
    }
    if (data.remainingAmount !== undefined) {
      updateData.remainingAmount = parseInt(data.remainingAmount.toString())
    }
    
    if (profileImage !== undefined) {
      updateData.profileImage = profileImage
    }
    
    if (data.name) updateData.name = data.name
    if (data.phone) updateData.phone = data.phone
    if (data.notes !== undefined) updateData.notes = data.notes
    
    if (data.startDate) {
      updateData.startDate = new Date(data.startDate)
    }
    if (data.expiryDate) {
      updateData.expiryDate = new Date(data.expiryDate)
    }

    const member = await prisma.member.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json({ error: 'فشل تحديث العضو' }, { status: 500 })
  }
}

// DELETE - حذف عضو
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'رقم العضو مطلوب' }, { status: 400 })
    }

    await prisma.member.delete({ where: { id } })
    return NextResponse.json({ message: 'تم الحذف بنجاح' })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json({ error: 'فشل حذف العضو' }, { status: 500 })
  }
}