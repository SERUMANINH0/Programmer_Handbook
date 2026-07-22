import { create } from "zustand"
import { persist } from "zustand/middleware"

import { DEFAULT_SETTINGS, type AppSettings } from "@/types/settings"

interface SettingsState extends AppSettings {
  updateSettings: (partial: Partial<AppSettings>) => void
  resetSettings: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (partial) => set((state) => ({ ...state, ...partial })),
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    { name: "ph-settings", skipHydration: true }
  )
)
