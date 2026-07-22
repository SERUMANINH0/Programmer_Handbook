import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { SettingsForm } from "@/components/settings/settings-form"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("settings.title") }

export default function ConfiguracoesPage() {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("settings.title")} subtitle={t("settings.subtitle")} />
      <SettingsForm />
    </div>
  )
}
