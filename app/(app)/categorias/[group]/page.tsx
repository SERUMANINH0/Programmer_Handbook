import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CategoryCard } from "@/components/categories/category-card"
import { PageHeader } from "@/components/common/page-header"
import { getGroupMeta } from "@/lib/categories/registry"
import { getCategoriesForGroup, getEntries, getGroups } from "@/lib/data/repository"
import { titleCaseFromSlug } from "@/lib/utils/slugify"

interface Props {
  params: Promise<{ group: string }>
}

export function generateStaticParams() {
  return getGroups().map((group) => ({ group }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params
  return { title: getGroupMeta(group).label }
}

export default async function GroupPage({ params }: Props) {
  const { group } = await params
  const slugs = getCategoriesForGroup(group)

  if (slugs.length === 0) {
    notFound()
  }

  const groupMeta = getGroupMeta(group)
  const categories = slugs.map((slug) => {
    const entries = getEntries(group, slug)
    return {
      group,
      slug,
      title: entries[0]?.category ?? titleCaseFromSlug(slug),
      entryCount: entries.length,
    }
  })

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <PageHeader title={groupMeta.label} subtitle={groupMeta.description} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  )
}
