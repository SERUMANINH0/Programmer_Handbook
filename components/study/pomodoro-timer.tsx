"use client"

import { Pause, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePomodoro } from "@/hooks/usePomodoro"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function PomodoroTimer() {
  const { mode, label, isRunning, start, pause, reset } = usePomodoro()

  return (
    <Card className="flex flex-col items-center gap-3 p-4">
      <p
        className={cn(
          "text-xs font-medium tracking-wide uppercase",
          mode === "focus" ? "text-brand" : "text-difficulty-iniciante"
        )}
      >
        {mode === "focus" ? t("study.pomodoro.focus") : t("study.pomodoro.shortBreak")}
      </p>
      <p className="font-mono text-4xl font-semibold tabular-nums">{label}</p>
      <div className="flex gap-2">
        {isRunning ? (
          <Button size="sm" variant="outline" onClick={pause}>
            <Pause className="size-3.5" />
            {t("study.pomodoro.pause")}
          </Button>
        ) : (
          <Button size="sm" onClick={start}>
            <Play className="size-3.5" />
            {t("study.pomodoro.start")}
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="size-3.5" />
          {t("study.pomodoro.reset")}
        </Button>
      </div>
    </Card>
  )
}
