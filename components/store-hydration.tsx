"use client"

import * as React from "react"

import { useFavoritesStore } from "@/lib/store/favorites.store"
import { useHistoryStore } from "@/lib/store/history.store"
import { useSettingsStore } from "@/lib/store/settings.store"
import { useStatsStore } from "@/lib/store/stats.store"
import { useStudyStore } from "@/lib/store/study.store"

/**
 * Stores persistidas usam `skipHydration: true` para garantir que a primeira
 * renderização no cliente seja idêntica ao HTML vindo do servidor (evita
 * mismatch de hidratação). A reidratação real a partir do localStorage só
 * acontece aqui, uma vez, depois do mount — daí o próximo render já reflete
 * favoritos/histórico/config salvos.
 */
export function StoreHydration() {
  React.useEffect(() => {
    useFavoritesStore.persist.rehydrate()
    useHistoryStore.persist.rehydrate()
    useStatsStore.persist.rehydrate()
    useSettingsStore.persist.rehydrate()
    useStudyStore.persist.rehydrate()
  }, [])

  return null
}
