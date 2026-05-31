"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  HeadphonesIcon,
  CreditCard,
  Gift,
} from "lucide-react"

const features = [
  { icon: Truck, title: "توصيل سريع", desc: "توصيل إلى باب منزلك في أسرع وقت" },
  { icon: ShieldCheck, title: "دفع آمن", desc: "طرق دفع آمنة ومتعددة" },
  { icon: HeadphonesIcon, title: "دعم فني", desc: "فريق دعم متاح على مدار الساعة" },
  { icon: Gift, title: "عروض حصرية", desc: "خصومات وعروض حصرية يومية" },
]

export default function HomePage() {
  const t = useTranslations("site")

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("name")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="text-lg">
                  <ShoppingBag className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-white text-white hover:bg-white/20"
                >
                  تصفح التصنيفات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-secondary-600 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">تصنيفات المنتجات</h2>
            <p className="text-secondary-600">تصفح أكبر تشكيلة من المنتجات المتنوعة</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center p-6 rounded-lg border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <span className="font-medium text-sm text-center group-hover:text-primary-600">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ابدأ التسوق الآن
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            استمتع بتجربة تسوق فريدة مع أفضل المنتجات وأسرع توصيل
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-lg">
              <CreditCard className="ml-2 h-5 w-5" />
              تسوق الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

const categories = [
  { name: "إلكترونيات", slug: "electronics", icon: "📱" },
  { name: "ملابس رجالية", slug: "men-fashion", icon: "👔" },
  { name: "ملابس نسائية", slug: "women-fashion", icon: "👗" },
  { name: "مواد غذائية", slug: "food", icon: "🛒" },
  { name: "مستحضرات تجميل", slug: "cosmetics", icon: "💄" },
  { name: "أدوات منزلية", slug: "home", icon: "🏠" },
  { name: "ألعاب أطفال", slug: "toys", icon: "🧸" },
  { name: "كتب", slug: "books", icon: "📚" },
  { name: "عطور", slug: "perfumes", icon: "🌺" },
  { name: "هدايا", slug: "gifts", icon: "🎁" },
  { name: "أدوات زراعية", slug: "agriculture", icon: "🌱" },
  { name: "منتجات حرفية", slug: "handmade", icon: "🎨" },
]
