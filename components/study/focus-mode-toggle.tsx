"use client"

import { Focus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n"
import { useStudyStore } from "@/lib/store/study.store"
import { cn } from "@/lib/utils"

export function FocusModeToggle() {
  const focusMode = useStudyStore((state) => state.focusMode)
  const setFocusMode = useStudyStore((state) => state.setFocusMode)

  return (
    <Button
      variant={focusMode ? "default" : "outline"}
      size="sm"
      onClick={() => setFocusMode(!focusMode)}
      className={cn(focusMode && "bg-brand text-brand-foreground")}
    >
      <Focus className="size-3.5" />
      {t("study.focusMode")}
    </Button>
  )
}
