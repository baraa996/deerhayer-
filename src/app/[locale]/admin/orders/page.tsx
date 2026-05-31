"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  paymentMethod: string
  createdAt: string
  user: { name: string }
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {})
  }, [])

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "success" | "warning"> = {
    PENDING: "warning",
    CONFIRMED: "default",
    PROCESSING: "secondary",
    SHIPPED: "default",
    DELIVERED: "success",
    CANCELLED: "destructive",
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">الطلبات</h1>

      <div className="bg-white rounded-lg border border-secondary-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              <th className="text-right py-3 px-4">رقم الطلب</th>
              <th className="text-right py-3 px-4">العميل</th>
              <th className="text-right py-3 px-4">المجموع</th>
              <th className="text-right py-3 px-4">طريقة الدفع</th>
              <th className="text-right py-3 px-4">الحالة</th>
              <th className="text-right py-3 px-4">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-secondary-500">لا توجد طلبات</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-3 px-4 font-medium">#{order.orderNumber}</td>
                  <td className="py-3 px-4">{order.user?.name || "—"}</td>
                  <td className="py-3 px-4">{order.total.toLocaleString("ar-SY")} ل.س</td>
                  <td className="py-3 px-4">{order.paymentMethod === "COD" ? "دفع عند الاستلام" : "بطاقة"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={statusColors[order.status] || "secondary"}>{order.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-secondary-500">{new Date(order.createdAt).toLocaleDateString("ar-SY")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
