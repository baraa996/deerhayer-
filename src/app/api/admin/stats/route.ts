import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [totalProducts, totalOrders, totalCustomers, totalRevenue, recentOrders] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true } } },
      }),
    ])

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      })),
    })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
