import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { prisma } from "@/lib/prisma"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret")

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "يرجى تسجيل الدخول مرة أخرى" },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7)
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.id as string

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { product: { select: { nameAr: true } } },
        },
      },
    })

    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json(
      { message: "يرجى تسجيل الدخول مرة أخرى" },
      { status: 401 }
    )
  }
}
