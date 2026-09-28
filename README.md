# Muhammad Naufal Hafiz — Portfolio

Hi, future me. This is your personal portfolio website. Everything you see
on the site (your jobs, projects, certificates, volunteering, skills)
is written in plain files in this folder. The website design reads those
files automatically — you almost never need to touch the design itself.

## Main technologies (what the site is built with)

- **Next.js** — the framework that turns your files into web pages.
- **React + TypeScript** — the language the pages are written in.
  TypeScript just checks your work for typos and mistakes.
- **Plain CSS** — one file (`src/app/globals.css`) controls all styling.
- **Git + GitHub** — saves versions of your work and publishes it.

You do not need to learn these deeply to update your content.

## Folder structure (the only parts you need to know)

```
Portofolio Assets/
├── src/content/      ← YOUR DATA. Edit these files to update the site.
├── src/components/   ← Website design. Leave alone.
├── src/app/          ← Pages (Work, Projects, Evidence…). Leave alone.
├── public/images/    ← Your photos go here.
├── public/cv/        ← Your CV file goes here.
├── IMAGE_GUIDE.md    ← Detailed photo instructions.
├── CV_GUIDE.md       ← Detailed CV instructions.
└── package.json      ← List of tools the project needs (rarely touched).
```

Golden rule: **content lives in `src/content/`, design lives everywhere
else.** To update the site, you only edit `src/content/`.

## Where profile information lives

`src/content/profile.ts` — your name, headline, short bio, email,
LinkedIn link, photo path, and CV path.

## Where experiences live

`src/content/experiences.ts` — every job, internship, and role, each one
a block with company, role, dates (`YYYY-MM`), location, bullet points,
skills, and tags.

## Where projects live

`src/content/projects.ts` — one block per case study (title, category,
description, problem, approach, evidence, outcome, tools, skills, and
which experience it came from).

## Where credentials live

`src/content/credentials.ts` — certificates and test scores. If you do
not know the issuer or date, leave the field empty — never guess.

## Where volunteering lives

`src/content/volunteering.ts` — one block per activity (organization,
role, dates, category, short description).

## Where skills and relationships live

- `src/content/skills.ts` — each skill plus the records that prove it.
- `src/content/relationships.ts` — the connections between skills,
  experiences, projects, and credentials. This file powers the graph.
- `src/content/types.ts` — the “shapes” every file must follow.
  You rarely need to open it.

## Where images go

`public/images/` with subfolders: `profile/`, `experiences/`,
`projects/`, `credentials/`, `volunteering/`. Full details in
`IMAGE_GUIDE.md`.

## How to add a new experience

1. Open `src/content/experiences.ts`.
2. Copy any existing block and paste it at the end of the list.
3. Change the `id` to something unique in `kebab-case`
   (lowercase words with dashes, e.g. `"new-company-analyst"`).
4. Fill in company, role, dates, location, and bullets. Leave anything
   unknown empty — do not invent.
5. Save, preview (see below), run checks (see below).

New projects, credentials, and volunteering entries work exactly the
same way in their own files.

## How to add a credential

Same steps in `src/content/credentials.ts`: copy a block, new unique
`id`, fill in title, and leave issuer/date empty if unknown.

## How to add volunteering

Same steps in `src/content/volunteering.ts`: copy a block, new unique
`id`, fill in organization, role, dates, category, and a 1–2 sentence
description.

## How to add images

1. Save the file under the right `public/images/` subfolder using a
   lowercase dashed name, e.g. `team-workshop.jpg`.
2. In the matching content block, add the path starting with `/images/`:
   `images: ["/images/experiences/team-workshop.jpg"]`.
3. The gallery appears automatically. No gallery? The page already looks
   complete without one.

## How to replace my profile photo

1. Save the photo as `public/images/profile/portrait.jpg`.
2. In `src/content/profile.ts`, set
   `profileImage: "/images/profile/portrait.jpg"`.
3. The Hero swaps from placeholder to photo by itself. To remove it,
   set `profileImage: undefined`.

## How to replace my CV

1. Save the PDF as `public/cv/your-name-cv.pdf`.
2. In `src/content/profile.ts`, set `cvUrl: "/cv/your-name-cv.pdf"`.
3. Download buttons appear everywhere automatically. Set it back to
   `undefined` to hide them. Full details in `CV_GUIDE.md`.

## How the Evidence Graph gets its data

The graph on the Evidence page is drawn **only** from
`src/content/skills.ts` (the nodes) and
`src/content/relationships.ts` (the links). Add a skill or a link there
and it appears in the graph, the mobile trails, and the text list —
no design work needed.

## How to preview changes

1. Open a terminal in this folder.
2. Run `npm run dev` (first time ever: `npm install` first).
3. Open the address it prints (usually `http://localhost:3000`).
4. Edit a content file, save, and the browser updates by itself.
5. Stop it with `Ctrl + C` when done.

## How to run quality checks

Before finishing any change, run these three in the terminal:

```
npx tsc --noEmit
npm run lint
npm run build
```

All three must pass with no errors. If the last one fails with a
strange OneDrive file error, delete the `.next` folder and run
`npm run build` again.

## How deployment works

1. Commit your changes with Git (`git add -A`, then
   `git commit -m "Describe what changed"`, then `git push`).
2. The hosting service (e.g. Vercel connected to this GitHub repo)
   rebuilds the site automatically from the latest commit.
3. Set `NEXT_PUBLIC_SITE_URL` to your real domain in the hosting
   dashboard so the sitemap and share previews use the right address.

That is the whole system: edit content files, preview, check, commit,
and the site updates itself.
