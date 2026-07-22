"use client"

import * as React from "react"

export function RegisterServiceWorker() {
  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Falha silenciosa: PWA offline é um enhancement, não bloqueia o uso do app.
    })
  }, [])

  return null
}
