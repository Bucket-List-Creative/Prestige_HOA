/**
 * Generate the site icons from the P monogram in `public/images/logo.png`.
 *
 *   node scripts/build-icons.mjs            # write the app icons
 *   node scripts/build-icons.mjs <outDir>   # write previews there instead
 *
 * The box below was measured by scanning the logo for lit pixels. The P's stem
 * runs behind the rooflines below y≈506, so the box stops there; the glyph is
 * keyed off its dark ground so it composites onto flat navy without a seam.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'public/images/logo.png')
const BOX = { left: 551, top: 262, width: 191, height: 244 }
const NAVY = { r: 10, g: 16, b: 32, alpha: 1 }
const FILL = 0.8 // share of the canvas height the glyph occupies

async function glyph() {
  const { data, info } = await sharp(SRC)
    .extract(BOX)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const out = Buffer.alloc(data.length)
  const FLOOR = 26 // luminance of the navy ground
  const CEIL = 150 // luminance at which the gold is fully opaque

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const a = Math.max(0, Math.min(1, (lum - FLOOR) / (CEIL - FLOOR)))
    out[i] = r
    out[i + 1] = g
    out[i + 2] = b
    out[i + 3] = Math.round(a * 255)
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()
}

async function icon(size, file) {
  const h = Math.round(size * FILL)
  const w = Math.round(BOX.width * (h / BOX.height))
  let layer = sharp(await glyph()).resize({
    width: w,
    height: h,
    kernel: 'lanczos3',
  })
  // At tab sizes the hairline serifs and the bowl thin out, so lift the gold
  // and sharpen; larger sizes keep the logo's own shading untouched.
  if (size <= 32) layer = layer.modulate({ brightness: 1.15 }).sharpen({ sigma: 0.6 })

  await sharp({
    create: { width: size, height: size, channels: 4, background: NAVY },
  })
    .composite([
      {
        input: await layer.png().toBuffer(),
        left: Math.round((size - w) / 2),
        top: Math.round((size - h) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(file)

  console.log(`  ${path.relative(root, file)} (${size}px)`)
}

const outDir = process.argv[2]

if (outDir) {
  for (const size of [512, 32, 16]) {
    await icon(size, path.join(outDir, `preview-${size}.png`))
    if (size <= 32) {
      await sharp(path.join(outDir, `preview-${size}.png`))
        .resize({ width: 256, kernel: 'nearest' })
        .toFile(path.join(outDir, `zoom-${size}.png`))
    }
  }
} else {
  const app = path.join(root, 'src/app')
  await icon(32, path.join(app, 'icon.png'))
  await icon(512, path.join(app, 'icon1.png'))
  await icon(180, path.join(app, 'apple-icon.png'))
}
