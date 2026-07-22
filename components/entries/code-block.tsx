"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn("group bg-muted/40 relative rounded-lg border", className)}>
      {label ? (
        <div className="text-muted-foreground border-b px-3 py-1.5 text-xs font-medium">
          {label}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-3 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1.5 right-1.5 size-7 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={t("common.copy")}
        onClick={handleCopy}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  )
}
