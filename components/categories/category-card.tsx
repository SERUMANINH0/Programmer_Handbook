import Link from "next/link"

import { Card } from "@/components/ui/card"
import type { CategorySummary } from "@/types/category"

export function CategoryCard({ category }: { category: CategorySummary }) {
  return (
    <Link href={`/categorias/${category.group}/${category.slug}`} className="group block">
      <Card className="group-hover:border-brand/50 flex h-full flex-col gap-2 p-4 transition-all group-hover:shadow-md">
        <h3 className="font-semibold">{category.title}</h3>
        <p className="text-muted-foreground text-sm">
          {category.entryCount} item{category.entryCount === 1 ? "" : "s"}
        </p>
      </Card>
    </Link>
  )
}
