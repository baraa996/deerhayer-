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

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    })

    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
