import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { CommandPalette } from "@/components/layout/command-palette"
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker"
import { StoreHydration } from "@/components/store-hydration"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { t } from "@/lib/i18n"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://programmer-handbook.vercel.app"),
  title: {
    default: t("app.name"),
    template: `%s · ${t("app.name")}`,
  },
  description: t("app.tagline"),
  applicationName: t("app.name"),
  openGraph: {
    title: t("app.name"),
    description: t("app.tagline"),
    type: "website",
    locale: "pt_BR",
  },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <CommandPalette />
            <Toaster />
            <RegisterServiceWorker />
            <StoreHydration />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
