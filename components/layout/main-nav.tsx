"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ITEMS } from "@/lib/constants/routes"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const PRIMARY_ITEMS = NAV_ITEMS.filter((item) =>
  ["/", "/categorias", "/pesquisar", "/favoritos"].includes(item.href)
)

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
      {PRIMARY_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {t(item.labelKey)}
          </Link>
        )
      })}
    </nav>
  )
}
