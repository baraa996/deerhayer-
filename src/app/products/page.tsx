"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

interface Product {
  id: string
  nameAr: string
  price: number
  images: { url: string }[]
  category: { nameAr: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        const res = await fetch(`/api/products?${params}`)
        const data = await res.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [search])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="ml-2 h-4 w-4" />
          فلترة
        </Button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
        <Input
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square skeleton" />
              <div className="h-4 w-3/4 skeleton" />
              <div className="h-4 w-1/2 skeleton" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary-500 text-lg">لا توجد منتجات متاحة</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group border border-secondary-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-secondary-100 flex items-center justify-center">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.nameAr}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-secondary-400">صورة</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-secondary-500 mb-1">
                  {product.category?.nameAr}
                </p>
                <h3 className="font-medium mb-2 line-clamp-2">
                  {product.nameAr}
                </h3>
                <p className="text-lg font-bold text-primary-600">
                  {product.price.toLocaleString("ar-SY")} ل.س
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
