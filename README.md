# Rodrigue Ndabashinze — Academic Portfolio

Academic portfolio of Rodrigue Ndabashinze, MD, MSc Epidemiology (University Medical Center Rostock), built with Next.js 15, React 19, GSAP, Lenis and next-transition-router.

Based on the MIT-licensed [aitezazdev/Portfolio](https://github.com/aitezazdev/Portfolio) template by Aitezaz Sikandar (see `LICENSE`). Code: MIT. Site content adapted from rodriguendabashinze.com is CC BY-NC-ND 4.0; publications and third-party materials are not covered by that licence.

## Content

All content lives in `src/content/` (`profile`, `experience`, `research`, `publications`, `talks`, `skills`, `awards`); presentation is in `src/components/sections/`. Optional fields (authors, DOI, abstract, slides, video, photos) render only when present.

Optional assets are detected at build time and omitted when missing:

- Portrait: `public/images/profile/portrait.(jpg|png|webp|avif)`
- CV: any PDF in `public/documents/cv/`
- Talk programmes, slides, videos, photos: paths listed in `src/content/talks.ts` (e.g. `public/uploads/Colloquium_Program_final.pdf`)

## Environment variables

See `.env.example`. All are optional. `NEXT_PUBLIC_SITE_URL` sets the canonical URL (unset = `noindex` preview). The contact form is hidden and `/api/contact/` returns 503 until `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` and either `RESEND_API_KEY` or `SMTP_HOST`/`SMTP_USER`/`SMTP_PASSWORD` are set. No analytics or tracking is included.

## Development

```bash
npm install
npm run dev
npm run lint && npx tsc --noEmit && npm run build
```
