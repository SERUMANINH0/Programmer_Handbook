"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { t } from "@/lib/i18n"
import { useSettingsStore } from "@/lib/store/settings.store"
import { settingsSchema, type SettingsInput } from "@/lib/validation/settings.schema"

export function SettingsForm() {
  const settings = useSettingsStore()

  const form = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      locale: settings.locale,
      theme: settings.theme,
      fontSize: settings.fontSize,
      animationsEnabled: settings.animationsEnabled,
      compactMode: settings.compactMode,
      wallpaperRotationSeconds: settings.wallpaperRotationSeconds,
      pomodoroFocusMinutes: settings.pomodoroFocusMinutes,
      pomodoroBreakMinutes: settings.pomodoroBreakMinutes,
    },
  })

  function onSubmit(values: SettingsInput) {
    settings.updateSettings(values)
    toast.success(t("settings.saved"))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.theme")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dark">{t("settings.themeOptions.dark")}</SelectItem>
                  <SelectItem value="light">
                    {t("settings.themeOptions.light")}
                  </SelectItem>
                  <SelectItem value="system">
                    {t("settings.themeOptions.system")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.fontSize")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sm">SM</SelectItem>
                  <SelectItem value="md">MD</SelectItem>
                  <SelectItem value="lg">LG</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="animationsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel className="grow">{t("settings.animations")}</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compactMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel className="grow">{t("settings.compactMode")}</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallpaperRotationSeconds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.wallpaperRotation")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={3}
                  max={120}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pomodoroFocusMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.pomodoroFocus")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={90}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pomodoroBreakMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.pomodoroBreak")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={30}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>{t("settings.language")}: pt-BR</FormDescription>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit">{t("settings.save")}</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              settings.resetSettings()
              form.reset()
            }}
          >
            {t("settings.reset")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
