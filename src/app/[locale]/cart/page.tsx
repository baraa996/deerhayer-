"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-secondary-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">سلتك فارغة</h1>
        <p className="text-secondary-600 mb-8">أضف بعض المنتجات إلى سلتك</p>
        <Link href="/products">
          <Button>
            <ArrowLeft className="ml-2 h-4 w-4" />
            مواصلة التسوق
          </Button>
        </Link>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const shipping = subtotal >= 50000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">سلة المشتريات</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-4 p-4 border border-secondary-200 rounded-lg"
            >
              <div className="w-24 h-24 bg-secondary-100 rounded-lg flex items-center justify-center shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ShoppingBag className="h-8 w-8 text-secondary-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1 truncate">{item.name}</h3>
                {item.variantName && (
                  <p className="text-sm text-secondary-500 mb-1">
                    {item.variantName}
                  </p>
                )}
                <p className="text-lg font-bold text-primary-600">
                  {item.price.toLocaleString("ar-SY")} ل.س
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-secondary-200 rounded-md">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.variantId
                        )
                      }
                      className="p-2 hover:bg-secondary-100"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.variantId
                        )
                      }
                      className="p-2 hover:bg-secondary-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-secondary-200 rounded-lg p-6 space-y-4 sticky top-24">
            <h2 className="font-semibold text-lg mb-4">ملخص الطلب</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600">المجموع الفرعي</span>
                <span>{subtotal.toLocaleString("ar-SY")} ل.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">الشحن</span>
                <span>
                  {shipping === 0
                    ? "مجاني"
                    : `${shipping.toLocaleString("ar-SY")} ل.س`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-secondary-400">
                  توصيل مجاني للطلبات فوق 50,000 ل.س
                </p>
              )}
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>الإجمالي</span>
              <span className="text-primary-600">
                {total.toLocaleString("ar-SY")} ل.س
              </span>
            </div>

            <Link href="/checkout">
              <Button className="w-full" size="lg">
                إتمام الطلب
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
