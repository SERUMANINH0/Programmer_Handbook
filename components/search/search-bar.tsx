"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function SearchBar({
  value,
  onChange,
  placeholder,
  className,
  autoFocus,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t("search.placeholder")}
        className="pl-9"
        aria-label={t("search.title")}
      />
    </div>
  )
}
