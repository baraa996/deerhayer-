"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  TicketPercent,
  BarChart3,
  Settings,
  Store,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const sidebarLinks = [
  { href: "/admin", label: "الإحصائيات", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/categories", label: "التصنيفات", icon: Tags },
  { href: "/admin/coupons", label: "الكوبونات", icon: TicketPercent },
  { href: "/admin/analytics", label: "التقارير", icon: BarChart3 },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">غير مصرح</h1>
          <p className="text-secondary-600 mb-4">
            لا تملك صلاحيات الوصول إلى لوحة التحكم
          </p>
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full bg-white border-l border-secondary-200 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-secondary-200">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2 font-bold text-primary-600",
              collapsed && "justify-center"
            )}
          >
            <Store className="h-6 w-6 shrink-0" />
            {!collapsed && <span className="text-sm">لوحة التحكم</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded-md hover:bg-secondary-100"
          >
            <ChevronLeft
              className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
            />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive =
              typeof window !== "undefined" &&
              window.location.pathname === `/ar${link.href}`
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900",
                  collapsed && "justify-center"
                )}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? link.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-secondary-200">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-600 hover:bg-secondary-100 transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Store className="h-5 w-5 shrink-0" />
            {!collapsed && <span>المتجر</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "lg:mr-16" : "lg:mr-64"
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-secondary-200 h-16 flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="mr-auto" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary-600">
              {session.user?.name}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
