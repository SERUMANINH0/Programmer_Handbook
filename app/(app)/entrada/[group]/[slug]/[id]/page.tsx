import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EntryDetail } from "@/components/entries/entry-detail"
import { EntryViewTracker } from "@/components/entries/entry-view-tracker"
import {
  getAllEntriesFlat,
  getEntryById,
  getGroups,
  getCategoriesForGroup,
  getEntries,
} from "@/lib/data/repository"
import type { IndexedEntry } from "@/types/entry"

interface Props {
  params: Promise<{ group: string; slug: string; id: string }>
}

export function generateStaticParams() {
  return getGroups().flatMap((group) =>
    getCategoriesForGroup(group).flatMap((slug) =>
      getEntries(group, slug).map((entry) => ({ group, slug, id: entry.id }))
    )
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, slug, id } = await params
  const entry = getEntryById(group, slug, id)
  return {
    title: entry?.title ?? "Item não encontrado",
    description: entry?.description,
  }
}

export default async function EntryPage({ params }: Props) {
  const { group, slug, id } = await params
  const entry = getEntryById(group, slug, id)

  if (!entry) {
    notFound()
  }

  const indexedEntry: IndexedEntry = { ...entry, group, slug }
  const relatedEntries = entry.relatedCommands?.length
    ? getAllEntriesFlat().filter((candidate) =>
        entry.relatedCommands?.includes(candidate.id)
      )
    : []

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <EntryViewTracker entryId={entry.id} />
      <EntryDetail entry={indexedEntry} relatedEntries={relatedEntries} />
    </div>
  )
}
