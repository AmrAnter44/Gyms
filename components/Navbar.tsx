'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function Navbar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'الرئيسية', icon: '🏠' },
    { href: '/members', label: 'الأعضاء', icon: '👥' },
    { href: '/pt', label: 'PT', icon: '💪' },
    { href: '/dayuse', label: 'يوم استخدام', icon: '📊' },
    { href: '/staff', label: 'الموظفين', icon: '👷' }, // ✅ إضافة خانة الموظفين
    { href: '/receipts', label: 'الإيصالات', icon: '🧾' },
    { href: '/expenses', label: 'المصروفات', icon: '💸' },
    { href: '/visitors', label: 'الزوار', icon: '🚶' },
    { href: '/search', label: 'البحث', icon: '🔍' },
    { href: '/closing', label: 'التقفيل', icon: '💰' },
    { href: '/settings', label: 'الإعدادات', icon: '⚙️' },
  ]

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
<img src='icon.png'  alt="logo" className='w-6 h-6'/>
            <span className="font-bold text-xl">X GYM</span>
          </div>
          
          <div className="flex gap-1 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-all hover:bg-white/20 whitespace-nowrap ${
                  pathname === link.href ? 'bg-white/30 font-bold' : ''
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}