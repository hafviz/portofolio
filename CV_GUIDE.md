# CV_GUIDE.md — Adding or replacing your CV

No CV exists yet, and the site is designed that way: every CV button and
link is hidden until you add one. Nothing looks broken in the meantime.

## 1. Add your CV (first time)

1. Save your file as PDF inside `public/cv/`, for example:
   `public/cv/muhammad-naufal-hafiz-cv.pdf`
   Use lowercase `kebab-case`, no spaces.
2. Open `src/content/profile.ts` and set:
   ```ts
   cvUrl: "/cv/muhammad-naufal-hafiz-cv.pdf",
   ```
3. Done. The **Download CV** button appears automatically in the Hero,
   the footer gains a CV link, and the nav gains a CV item — all with
   accessible labels. No component changes needed.

## 2. Replace your CV later

- **Same filename:** overwrite the PDF in `public/cv/`. Nothing else
  changes. (Visitors may see a cached copy for a while — that is normal.)
- **New filename:** save the new PDF, delete the old one, and update the
  `cvUrl` path in `src/content/profile.ts` to match exactly.

## 3. Remove your CV

Set `cvUrl: undefined` in `src/content/profile.ts` (and optionally delete
the PDF). All CV buttons and links disappear gracefully.

## 4. Rules

- PDF only. Keep it under ~2 MB.
- Never commit a CV containing private data you do not want public
  (phone numbers, home address, ID numbers).
- After any change, run `npx tsc --noEmit`, `npm run lint`,
  and `npm run build` per AGENTS.md quality rules.
