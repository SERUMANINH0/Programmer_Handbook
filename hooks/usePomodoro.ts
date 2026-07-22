"use client"

import * as React from "react"

import { useSettingsStore } from "@/lib/store/settings.store"

type Mode = "focus" | "break"

export function usePomodoro() {
  const focusMinutes = useSettingsStore((state) => state.pomodoroFocusMinutes)
  const breakMinutes = useSettingsStore((state) => state.pomodoroBreakMinutes)

  const [mode, setMode] = React.useState<Mode>("focus")
  const [secondsLeft, setSecondsLeft] = React.useState(focusMinutes * 60)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setMode((currentMode) => (currentMode === "focus" ? "break" : "focus"))
          return (mode === "focus" ? breakMinutes : focusMinutes) * 60
        }
        return current - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, mode, focusMinutes, breakMinutes])

  function start() {
    setIsRunning(true)
  }

  function pause() {
    setIsRunning(false)
  }

  function reset() {
    setIsRunning(false)
    setMode("focus")
    setSecondsLeft(focusMinutes * 60)
  }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const label = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  return { mode, secondsLeft, label, isRunning, start, pause, reset }
}
