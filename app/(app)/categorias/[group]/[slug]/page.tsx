import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EntryGrid } from "@/components/entries/entry-grid"
import { PageHeader } from "@/components/common/page-header"
import { getGroupMeta } from "@/lib/categories/registry"
import { getCategoriesForGroup, getEntries, getGroups } from "@/lib/data/repository"
import { titleCaseFromSlug } from "@/lib/utils/slugify"
import type { IndexedEntry } from "@/types/entry"

interface Props {
  params: Promise<{ group: string; slug: string }>
}

export function generateStaticParams() {
  return getGroups().flatMap((group) =>
    getCategoriesForGroup(group).map((slug) => ({ group, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, slug } = await params
  const entries = getEntries(group, slug)
  return { title: entries[0]?.category ?? titleCaseFromSlug(slug) }
}

export default async function CategoryEntriesPage({ params }: Props) {
  const { group, slug } = await params
  const entries = getEntries(group, slug)

  if (entries.length === 0) {
    notFound()
  }

  const indexedEntries: IndexedEntry[] = entries.map((entry) => ({
    ...entry,
    group,
    slug,
  }))
  const title = entries[0]?.category ?? titleCaseFromSlug(slug)
  const groupMeta = getGroupMeta(group)

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <PageHeader
        title={title}
        subtitle={`${groupMeta.label} · ${entries.length} itens`}
      />
      <EntryGrid entries={indexedEntries} />
    </div>
  )
}
