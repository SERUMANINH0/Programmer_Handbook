"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { SearchBar } from "@/components/search/search-bar"
import { t } from "@/lib/i18n"

export function HomeSearch() {
  const [value, setValue] = React.useState("")
  const router = useRouter()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push(value.trim() ? `/pesquisar?q=${encodeURIComponent(value)}` : "/pesquisar")
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
      <SearchBar
        value={value}
        onChange={setValue}
        placeholder={t("home.searchPlaceholder")}
      />
    </form>
  )
}
