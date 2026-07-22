"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import { WallpaperHUD } from "@/components/wallpaper/wallpaper-hud"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { useWallpaperRotation } from "@/hooks/useWallpaperRotation"

export function WallpaperStage() {
  const router = useRouter()
  const { entries, isLoading } = useSearchIndex()
  const {
    currentEntry,
    currentGroup,
    isPaused,
    goToNextGroup,
    goToPrevGroup,
    togglePause,
  } = useWallpaperRotation(entries)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
        router.push("/")
      } else if (event.key === "ArrowRight") {
        goToNextGroup()
      } else if (event.key === "ArrowLeft") {
        goToPrevGroup()
      } else if (event.key === " ") {
        event.preventDefault()
        togglePause()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router, goToNextGroup, goToPrevGroup, togglePause])

  React.useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {})
    return () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
  }, [])

  if (isLoading || !currentEntry) {
    return <div className="flex h-dvh w-dvw items-center justify-center bg-black" />
  }

  return (
    <div
      className="relative flex h-dvh w-dvw items-center justify-center overflow-hidden bg-black text-white"
      onClick={togglePause}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEntry.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-6 px-8 text-center"
        >
          <p className="text-sm font-medium tracking-widest text-white/50 uppercase">
            {currentEntry.category}
            {currentEntry.subcategory ? ` · ${currentEntry.subcategory}` : ""}
          </p>
          <h1 className="text-4xl font-semibold sm:text-6xl">{currentEntry.title}</h1>
          {currentEntry.shortcut ? (
            <code className="rounded-lg bg-white/10 px-4 py-2 font-mono text-2xl">
              {currentEntry.shortcut}
            </code>
          ) : currentEntry.syntax ? (
            <code className="max-w-2xl truncate rounded-lg bg-white/10 px-4 py-2 font-mono text-lg">
              {currentEntry.syntax}
            </code>
          ) : null}
          <p className="max-w-xl text-lg text-white/70">{currentEntry.description}</p>
        </motion.div>
      </AnimatePresence>

      <WallpaperHUD group={currentGroup} paused={isPaused} />
    </div>
  )
}
