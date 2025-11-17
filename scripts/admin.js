// scripts/create-admin.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔐 إنشاء حساب Admin جديد...\n')
    
    // البيانات الافتراضية
    const adminData = {
      name: 'Admin',
      email: 'admin@gym.com',
      password: 'admin123456',
      role: 'ADMIN'
    }
    
    // يمكنك تغيير البيانات من هنا أو من الـ command line
    const email = process.argv[2] || adminData.email
    const password = process.argv[3] || adminData.password
    const name = process.argv[4] || adminData.name
    
    // التحقق من عدم وجود المستخدم
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      console.log('⚠️  المستخدم موجود بالفعل:')
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Name: ${existingUser.name}`)
      console.log(`   Role: ${existingUser.role}`)
      console.log('\n💡 لو عايز تحذفه الأول:')
      console.log(`   DELETE FROM "User" WHERE email = '${email}';`)
      return
    }
    
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // إنشاء المستخدم
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    })
    
    // إنشاء الصلاحيات (كل شيء ✅)
    await prisma.permission.create({
      data: {
        userId: admin.id,
        canViewMembers: true,
        canCreateMembers: true,
        canEditMembers: true,
        canDeleteMembers: true,
        canViewPT: true,
        canCreatePT: true,
        canEditPT: true,
        canDeletePT: true,
        canViewStaff: true,
        canCreateStaff: true,
        canEditStaff: true,
        canDeleteStaff: true,
        canViewReceipts: true,
        canEditReceipts: true,
        canDeleteReceipts: true,
        canViewReports: true,
        canViewFinancials: true,
        canAccessSettings: true,
      }
    })
    
    console.log('✅ تم إنشاء حساب Admin بنجاح!\n')
    console.log('═'.repeat(50))
    console.log('📧 Email:    ', email)
    console.log('🔑 Password: ', password)
    console.log('👤 Name:     ', name)
    console.log('👑 Role:     ', 'ADMIN')
    console.log('═'.repeat(50))
    console.log('\n🌐 يمكنك تسجيل الدخول الآن على:')
    console.log('   http://localhost:4001\n')
    
  } catch (error) {
    console.error('❌ خطأ:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()