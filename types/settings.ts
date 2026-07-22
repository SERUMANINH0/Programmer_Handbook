export type ThemeMode = "dark" | "light" | "system"
export type FontSize = "sm" | "md" | "lg" | "xl"
export type Locale = "pt-BR"

export interface AppSettings {
  locale: Locale
  theme: ThemeMode
  fontSize: FontSize
  animationsEnabled: boolean
  compactMode: boolean
  wallpaperRotationSeconds: number
  pomodoroFocusMinutes: number
  pomodoroBreakMinutes: number
}

export const DEFAULT_SETTINGS: AppSettings = {
  locale: "pt-BR",
  theme: "dark",
  fontSize: "md",
  animationsEnabled: true,
  compactMode: false,
  wallpaperRotationSeconds: 12,
  pomodoroFocusMinutes: 25,
  pomodoroBreakMinutes: 5,
}
