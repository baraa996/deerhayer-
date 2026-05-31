"use client"

import { useEffect, useState } from "react"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

interface Stats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  recentOrders: { id: string; orderNumber: string; total: number; status: string; createdAt: string }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const cards = [
    { label: "إجمالي المنتجات", value: stats?.totalProducts ?? 0, icon: Package, color: "bg-blue-500" },
    { label: "إجمالي الطلبات", value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: "bg-green-500" },
    { label: "العملاء", value: stats?.totalCustomers ?? 0, icon: Users, color: "bg-purple-500" },
    { label: "الإيرادات", value: `${(stats?.totalRevenue ?? 0).toLocaleString("ar-SY")} ل.س`, icon: DollarSign, color: "bg-primary-600" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة الإحصائيات</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-lg border border-secondary-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-secondary-500">{card.label}</span>
                <div className={`${card.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold mb-4">آخر الطلبات</h2>
        {(!stats?.recentOrders || stats.recentOrders.length === 0) ? (
          <p className="text-secondary-500 text-center py-8">لا توجد طلبات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-right py-3 px-2">رقم الطلب</th>
                  <th className="text-right py-3 px-2">المجموع</th>
                  <th className="text-right py-3 px-2">الحالة</th>
                  <th className="text-right py-3 px-2">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-secondary-100">
                    <td className="py-3 px-2">{order.orderNumber}</td>
                    <td className="py-3 px-2">{order.total.toLocaleString("ar-SY")} ل.س</td>
                    <td className="py-3 px-2">{order.status}</td>
                    <td className="py-3 px-2">{new Date(order.createdAt).toLocaleDateString("ar-SY")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
