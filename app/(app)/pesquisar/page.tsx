import type { Metadata } from "next"

import { SearchView } from "@/components/search/search-view"
import { PageHeader } from "@/components/common/page-header"
import { t } from "@/lib/i18n"

export const metadata: Metadata = {
  title: t("search.title"),
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function PesquisarPage({ searchParams }: Props) {
  const { q } = await searchParams

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("search.title")} />
      <SearchView initialQuery={q ?? ""} />
    </div>
  )
}
