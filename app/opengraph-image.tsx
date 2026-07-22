import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: "#0a0a0a",
        color: "#ffffff",
        fontSize: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#3b5fe0" }}>{">_"}</span>
        Programmer Handbook
      </div>
      <div style={{ color: "#a1a1aa" }}>
        A maior referência gratuita para programadores
      </div>
    </div>,
    { ...size }
  )
}
