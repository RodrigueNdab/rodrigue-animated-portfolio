# Bundled fonts

Self-hosted, so builds need no network access. All are licensed under the SIL Open Font License 1.1 (licence texts alongside).

| File | Family | Source package |
| --- | --- | --- |
| `Geist-Variable.woff2`, `GeistMono-Variable.woff2` | Geist, Geist Mono | `geist@1.7.2` (Vercel) |
| `space-grotesk-latin-{400,500,700}-normal.woff2` | Space Grotesk (Latin) | `@fontsource/space-grotesk` |
| `instrument-serif-latin-400-{normal,italic}.woff2` | Instrument Serif (Latin) | `@fontsource/instrument-serif` |

Latin subset only; Space Grotesk has no 900 weight (the same as the former Google Fonts setup), so `font-black` is synthesised by the browser.
