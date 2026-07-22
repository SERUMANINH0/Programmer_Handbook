import { Header } from "@/components/layout/header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  )
}
