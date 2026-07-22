"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useFuseSearch } from "@/hooks/useFuseSearch"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { NAV_ITEMS } from "@/lib/constants/routes"
import { t } from "@/lib/i18n"
import { useCommandPaletteStore } from "@/lib/store/command-palette.store"
import { useStatsStore } from "@/lib/store/stats.store"

export function CommandPalette() {
  const open = useCommandPaletteStore((state) => state.open)
  const setOpen = useCommandPaletteStore((state) => state.setOpen)
  const toggle = useCommandPaletteStore((state) => state.toggle)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebouncedValue(query, 150)
  const router = useRouter()
  const registerAccess = useStatsStore((state) => state.registerAccess)
  const { results } = useFuseSearch(debouncedQuery)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggle()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [toggle])

  function go(href: string) {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t("app.name")}
      description={t("search.placeholder")}
    >
      <CommandInput
        placeholder={t("search.placeholder")}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>{t("search.noResults")}</CommandEmpty>
        <CommandGroup heading={t("nav.home")}>
          {NAV_ITEMS.map((item) => (
            <CommandItem key={item.href} onSelect={() => go(item.href)}>
              <item.icon />
              {t(item.labelKey)}
            </CommandItem>
          ))}
        </CommandGroup>
        {results.length > 0 ? (
          <>
            <CommandSeparator />
            <CommandGroup heading={t("search.title")}>
              {results.slice(0, 8).map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={`${entry.title} ${entry.id}`}
                  onSelect={() => {
                    registerAccess(entry.id)
                    go(`/entrada/${entry.group}/${entry.slug}/${entry.id}`)
                  }}
                >
                  <span className="truncate">{entry.title}</span>
                  <span className="text-muted-foreground ml-auto truncate text-xs">
                    {entry.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        ) : null}
      </CommandList>
    </CommandDialog>
  )
}
