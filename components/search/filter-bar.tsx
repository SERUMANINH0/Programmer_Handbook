"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SearchFilters } from "@/hooks/useFuseSearch"
import { getGroupMeta } from "@/lib/categories/registry"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value)))
  ).sort()
}

export function FilterBar({
  entries,
  filters,
  onChange,
}: {
  entries: IndexedEntry[]
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
}) {
  const groups = React.useMemo(() => uniqueSorted(entries.map((e) => e.group)), [entries])
  const platforms = React.useMemo(
    () => uniqueSorted(entries.flatMap((e) => e.platform ?? [])),
    [entries]
  )
  const languages = React.useMemo(
    () => uniqueSorted(entries.map((e) => e.language)),
    [entries]
  )
  const difficulties = ["iniciante", "intermediario", "avancado"] as const

  const hasActiveFilters = Object.values(filters).some(Boolean)

  function setFilter(key: keyof SearchFilters, value: string) {
    onChange({ ...filters, [key]: value === "all" ? undefined : value })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={filters.group ?? "all"} onValueChange={(v) => setFilter("group", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder={t("search.filters.group")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("search.filters.group")}</SelectItem>
          {groups.map((group) => (
            <SelectItem key={group} value={group}>
              {getGroupMeta(group).label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty ?? "all"}
        onValueChange={(v) => setFilter("difficulty", v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder={t("search.filters.difficulty")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("search.filters.difficulty")}</SelectItem>
          {difficulties.map((level) => (
            <SelectItem key={level} value={level}>
              {t(`common.difficultyLevels.${level}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {platforms.length > 0 ? (
        <Select
          value={filters.platform ?? "all"}
          onValueChange={(v) => setFilter("platform", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t("search.filters.platform")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.filters.platform")}</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}

      {languages.length > 0 ? (
        <Select
          value={filters.language ?? "all"}
          onValueChange={(v) => setFilter("language", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t("search.filters.language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.filters.language")}</SelectItem>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}

      {hasActiveFilters ? (
        <Button variant="ghost" size="sm" onClick={() => onChange({})}>
          <X className="size-3.5" />
          {t("search.filters.clear")}
        </Button>
      ) : null}
    </div>
  )
}
