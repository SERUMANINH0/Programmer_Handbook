// Gera ícones PNG (sem dependências externas) para o manifest da PWA:
// um quadrado na cor da marca com um glifo ">_" (terminal), em duas resoluções.
import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"

const BRAND = [0x3b, 0x5f, 0xe0] // RGB
const WHITE = [0xff, 0xff, 0xff]

function pointInPolygon(x, y, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function drawIcon(size) {
  const buffer = Buffer.alloc(size * size * 4)
  const s = size / 192

  // Glifo ">" como dois paralelogramos (haste superior e inferior do "v" deitado).
  const chevronTop = [
    [60 * s, 55 * s],
    [78 * s, 55 * s],
    [112 * s, 96 * s],
    [94 * s, 96 * s],
  ]
  const chevronBottom = [
    [94 * s, 96 * s],
    [112 * s, 96 * s],
    [78 * s, 137 * s],
    [60 * s, 137 * s],
  ]
  const underscore = { x: 92 * s, y: 122 * s, w: 42 * s, h: 15 * s }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isGlyph =
        pointInPolygon(x, y, chevronTop) ||
        pointInPolygon(x, y, chevronBottom) ||
        (x >= underscore.x &&
          x <= underscore.x + underscore.w &&
          y >= underscore.y &&
          y <= underscore.y + underscore.h)

      const [r, g, b] = isGlyph ? WHITE : BRAND
      const offset = (y * size + x) * 4
      buffer[offset] = r
      buffer[offset + 1] = g
      buffer[offset + 2] = b
      buffer[offset + 3] = 0xff
    }
  }
  return buffer
}

function crc32(buf) {
  let c
  const table = crc32.table ?? (crc32.table = makeCrcTable())
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff
    crc = (crc >>> 8) ^ table[c]
  }
  return (crc ^ 0xffffffff) >>> 0
}

function makeCrcTable() {
  const table = []
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c
  }
  return table
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii")
  const lengthBuffer = Buffer.alloc(4)
  lengthBuffer.writeUInt32BE(data.length, 0)
  const crcBuffer = Buffer.alloc(4)
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0)
  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer])
}

function encodePng(rgbaBuffer, size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(size, 0)
  ihdrData.writeUInt32BE(size, 4)
  ihdrData[8] = 8 // bit depth
  ihdrData[9] = 6 // color type RGBA
  ihdrData[10] = 0
  ihdrData[11] = 0
  ihdrData[12] = 0
  const ihdr = chunk("IHDR", ihdrData)

  const rowSize = size * 4
  const raw = Buffer.alloc((rowSize + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (rowSize + 1)] = 0 // filter: none
    rgbaBuffer.copy(raw, y * (rowSize + 1) + 1, y * rowSize, (y + 1) * rowSize)
  }
  const idat = chunk("IDAT", zlib.deflateSync(raw))
  const iend = chunk("IEND", Buffer.alloc(0))

  return Buffer.concat([signature, ihdr, idat, iend])
}

const outDir = path.join(process.cwd(), "public", "icons")
fs.mkdirSync(outDir, { recursive: true })

for (const size of [192, 512]) {
  const png = encodePng(drawIcon(size), size)
  fs.writeFileSync(path.join(outDir, `icon-${size}.png`), png)
  console.log(`Ícone gerado: public/icons/icon-${size}.png`)
}
