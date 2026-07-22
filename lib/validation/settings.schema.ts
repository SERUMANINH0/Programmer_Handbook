import { z } from "zod"

export const settingsSchema = z.object({
  locale: z.literal("pt-BR"),
  theme: z.enum(["dark", "light", "system"]),
  fontSize: z.enum(["sm", "md", "lg", "xl"]),
  animationsEnabled: z.boolean(),
  compactMode: z.boolean(),
  wallpaperRotationSeconds: z.number().min(3).max(120),
  pomodoroFocusMinutes: z.number().min(1).max(90),
  pomodoroBreakMinutes: z.number().min(1).max(30),
})

export type SettingsInput = z.infer<typeof settingsSchema>
