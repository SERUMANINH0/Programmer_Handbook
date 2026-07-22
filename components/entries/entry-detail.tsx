import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { BulletList, DetailSection } from "@/components/entries/detail-section"
import { CodeBlock } from "@/components/entries/code-block"
import { DifficultyBadge } from "@/components/entries/difficulty-badge"
import { TagList } from "@/components/entries/tag-list"
import { FavoriteButton } from "@/components/favorites/favorite-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

export function EntryDetail({
  entry,
  relatedEntries,
}: {
  entry: IndexedEntry
  relatedEntries: IndexedEntry[]
}) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm font-medium">
            {entry.category}
            {entry.subcategory ? ` · ${entry.subcategory}` : ""}
          </p>
          <FavoriteButton entryId={entry.id} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {entry.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={entry.difficulty} />
          {entry.language ? <Badge variant="outline">{entry.language}</Badge> : null}
          {entry.version ? <Badge variant="outline">v{entry.version}</Badge> : null}
          {entry.platform?.map((platform) => (
            <Badge key={platform} variant="outline">
              {platform}
            </Badge>
          ))}
          {entry.shortcut ? <Badge className="font-mono">{entry.shortcut}</Badge> : null}
        </div>
        <p className="text-muted-foreground">{entry.description}</p>
      </header>

      <Separator />

      {entry.syntax ? (
        <DetailSection title={t("entry.syntax")}>
          <CodeBlock code={entry.syntax} />
        </DetailSection>
      ) : null}

      {entry.example ? (
        <DetailSection title={t("entry.example")}>
          <CodeBlock code={entry.example} />
        </DetailSection>
      ) : null}

      {entry.result ? (
        <DetailSection title={t("entry.result")}>
          <CodeBlock code={entry.result} />
        </DetailSection>
      ) : null}

      {entry.parameters?.length ? (
        <DetailSection title={t("entry.parameters")}>
          <div className="flex flex-col divide-y rounded-lg border">
            {entry.parameters.map((param) => (
              <div key={param.name} className="flex flex-col gap-1 p-3 text-sm">
                <div className="flex items-center gap-2">
                  <code className="font-mono font-semibold">{param.name}</code>
                  {param.required ? (
                    <Badge variant="destructive" className="text-[10px]">
                      obrigatório
                    </Badge>
                  ) : null}
                </div>
                <p className="text-muted-foreground">{param.description}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      ) : null}

      {entry.flags?.length ? (
        <DetailSection title={t("entry.flags")}>
          <div className="flex flex-col divide-y rounded-lg border">
            {entry.flags.map((flag) => (
              <div key={flag.flag} className="flex flex-col gap-1 p-3 text-sm">
                <code className="font-mono font-semibold">{flag.flag}</code>
                <p className="text-muted-foreground">{flag.description}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      ) : null}

      {entry.returns ? (
        <DetailSection title={t("entry.returns")}>
          <p className="text-muted-foreground text-sm">{entry.returns}</p>
        </DetailSection>
      ) : null}

      {entry.notes?.length ? (
        <DetailSection title={t("entry.notes")}>
          <BulletList items={entry.notes} />
        </DetailSection>
      ) : null}

      {entry.bestPractices?.length ? (
        <DetailSection title={t("entry.bestPractices")}>
          <BulletList items={entry.bestPractices} />
        </DetailSection>
      ) : null}

      {entry.commonMistakes?.length ? (
        <DetailSection title={t("entry.commonMistakes")}>
          <BulletList items={entry.commonMistakes} />
        </DetailSection>
      ) : null}

      {relatedEntries.length ? (
        <DetailSection title={t("entry.relatedCommands")}>
          <div className="flex flex-wrap gap-2">
            {relatedEntries.map((related) => (
              <Link
                key={related.id}
                href={`/entrada/${related.group}/${related.slug}/${related.id}`}
              >
                <Badge variant="secondary" className="cursor-pointer font-normal">
                  {related.title}
                </Badge>
              </Link>
            ))}
          </div>
        </DetailSection>
      ) : null}

      {entry.tags?.length ? (
        <DetailSection title={t("entry.tags")}>
          <TagList tags={entry.tags} />
        </DetailSection>
      ) : null}

      {entry.officialDocumentation || entry.externalReferences?.length ? (
        <DetailSection title={t("entry.officialDocumentation")}>
          <div className="flex flex-col gap-1.5 text-sm">
            {entry.officialDocumentation ? (
              <a
                href={entry.officialDocumentation}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand flex items-center gap-1.5 hover:underline"
              >
                <ExternalLink className="size-3.5" />
                {entry.officialDocumentation}
              </a>
            ) : null}
            {entry.externalReferences?.map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand flex items-center gap-1.5 hover:underline"
              >
                <ExternalLink className="size-3.5" />
                {ref.label}
              </a>
            ))}
          </div>
        </DetailSection>
      ) : null}

      <p className="text-muted-foreground text-xs">
        Atualizado em {new Date(entry.updatedAt).toLocaleDateString("pt-BR")}
      </p>
    </article>
  )
}
