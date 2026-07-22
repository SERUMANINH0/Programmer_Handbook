"use client"

import Link from "next/link"
import { BookOpenText, Search, X } from "lucide-react"

import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n"
import { useCommandPaletteStore } from "@/lib/store/command-palette.store"
import { useStudyStore } from "@/lib/store/study.store"

export function Header() {
  const setCommandPaletteOpen = useCommandPaletteStore((state) => state.setOpen)
  const focusMode = useStudyStore((state) => state.focusMode)
  const setFocusMode = useStudyStore((state) => state.setFocusMode)

  if (focusMode) {
    return (
      <header className="glass sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <span className="text-muted-foreground text-sm font-medium">
            {t("study.focusMode")}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setFocusMode(false)}>
            <X className="size-3.5" />
            {t("common.close")}
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpenText className="text-brand size-5" />
          <span className="hidden sm:inline">{t("app.name")}</span>
        </Link>

        <div className="flex-1" />

        <MainNav />

        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hidden gap-2 sm:flex"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-3.5" />
          {t("search.title")}
          <kbd className="bg-muted ml-2 rounded border px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl K
          </kbd>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          aria-label={t("search.title")}
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-4" />
        </Button>

        <ThemeToggle />
      </div>
    </header>
  )
}
