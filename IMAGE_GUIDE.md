# IMAGE_GUIDE.md — Adding photos to your portfolio

No image knowledge needed. Follow these steps exactly and the site will
display your photos automatically. If an entry has no image, the page
already looks complete — images are always optional.

## 1. Where to put images

Everything lives under `public/images/`. Never put website photos anywhere
else.

| What                 | Folder                          |
| -------------------- | ------------------------------- |
| Your portrait        | `public/images/profile/`        |
| Experience photos    | `public/images/experiences/`    |
| Project screenshots  | `public/images/projects/`       |
| Certificates         | `public/images/credentials/`    |
| Volunteering photos  | `public/images/volunteering/`   |

Tip: inside a folder, create one subfolder per item, e.g.
`public/images/projects/amazon-people-analytics/cover.jpg`.

## 2. Filename style

- Lowercase `kebab-case`: `team-workshop.jpg`, not `Team Workshop (1).JPG`.
- No spaces, no special characters. Dashes only.
- Keep names short and descriptive: `cover.jpg`, `dashboard.png`, `certificate.jpg`.

## 3. How to reference a file from content data

In any content file under `src/content/`, set the image field to the path
starting with `/images/`:

```ts
// src/content/profile.ts
profileImage: "/images/profile/portrait.jpg",

// src/content/experiences.ts (inside one experience)
images: ["/images/experiences/rspad/assessment-room.jpg"],

// src/content/projects.ts (inside one project)
images: ["/images/projects/kimia-farma/dashboard.png"],

// src/content/credentials.ts (inside one credential)
image: "/images/credentials/leadership-certificate.jpg",

// src/content/volunteering.ts (inside one entry)
images: ["/images/volunteering/ted/studio.jpg"],
```

Rules:

- The path must start with `/images/` and match the real filename exactly
  (capitals matter).
- To remove a photo, delete the line or set the field to `undefined` / `[]`.
  The page will fall back to its designed no-image state.
- Your portrait is special: leave `profileImage: undefined` and the Hero
  shows an elegant placeholder. The moment you set a path, the real photo
  appears — no component changes needed.

## 4. Recommended dimensions and aspect ratios

You do not need to be exact — the site crops gently into clean rectangles.

| Slot               | Aim for        | Minimum width |
| ------------------ | -------------- | ------------- |
| Portrait           | 4:5, e.g. 800×1000  | 600 px   |
| Galleries / cards  | 4:3, e.g. 1200×900  | 900 px   |
| Certificates       | 4:3, e.g. 1200×900  | 900 px   |

Keep each file under ~500 KB so pages stay fast. Most phone photos are
fine after exporting at 1200–1600 px wide.

## 5. Supported formats

Preferred: `.jpg` for photos, `.png` for screenshots with text,
`.webp` for the smallest files. `.avif` also works.
Avoid `.gif`, `.bmp`, `.tiff`, and `.heic` (convert HEIC to JPG first).

## 6. How to replace an existing image

1. Save the new file with the **same filename** in the same folder
   (overwrites the old one), **or** save it under a new name and update
   the path in `src/content/` as shown above.
2. Run the site (`npm run dev`) and check the page.
3. Before finishing, run `npx tsc --noEmit`, `npm run lint`,
   and `npm run build` per AGENTS.md quality rules.
