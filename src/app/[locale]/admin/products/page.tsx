"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit2, Trash2 } from "lucide-react"

interface Product {
  id: string
  nameAr: string
  price: number
  quantity: number
  isActive: boolean
  category: { nameAr: string }
  images: { url: string }[]
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {})
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
        <Input
          placeholder="بحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      <div className="bg-white rounded-lg border border-secondary-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              <th className="text-right py-3 px-4">المنتج</th>
              <th className="text-right py-3 px-4">التصنيف</th>
              <th className="text-right py-3 px-4">السعر</th>
              <th className="text-right py-3 px-4">المخزون</th>
              <th className="text-right py-3 px-4">الحالة</th>
              <th className="text-center py-3 px-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-secondary-500">
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-3 px-4">{product.nameAr}</td>
                  <td className="py-3 px-4 text-secondary-500">{product.category?.nameAr}</td>
                  <td className="py-3 px-4">{product.price.toLocaleString("ar-SY")} ل.س</td>
                  <td className="py-3 px-4">{product.quantity}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.isActive ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:text-primary-600"><Edit2 className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
