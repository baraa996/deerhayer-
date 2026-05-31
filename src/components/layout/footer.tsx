"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Store, Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  shop: {
    title: "المتجر",
    links: [
      { label: "المنتجات", href: "/products" },
      { label: "التصنيفات", href: "/categories" },
      { label: "العروض", href: "/offers" },
      { label: "الطلبات", href: "/orders" },
    ],
  },
  support: {
    title: "الدعم",
    links: [
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "الشروط والأحكام", href: "/terms" },
      { label: "سياسة الإرجاع", href: "/returns" },
      { label: "الشحن والتوصيل", href: "/shipping" },
    ],
  },
}

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-secondary-200 bg-secondary-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-600 mb-4">
              <Store className="h-6 w-6" />
              <span>سوق ديرحافر</span>
            </Link>
            <p className="text-sm text-secondary-600 mb-4">
              متجر إلكتروني متكامل لكل احتياجاتك اليومية. نوفر لك أفضل المنتجات
              بأفضل الأسعار مع خدمة توصيل سريعة وآمنة.
            </p>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-secondary-900 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-3">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-secondary-600">
                <Phone className="h-4 w-4" />
                <span>+963 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-600">
                <Mail className="h-4 w-4" />
                <span>info@deerhayer.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-600">
                <MapPin className="h-4 w-4" />
                <span>ديرحافر، سوريا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-200 pt-8 text-center text-sm text-secondary-500">
          <p>© {new Date().getFullYear()} سوق ديرحافر. {t("rights")}</p>
        </div>
      </div>
    </footer>
  )
}
