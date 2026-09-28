# Portfolio Development Rules

This is Muhammad Naufal Hafiz's professional portfolio.

## Core architecture

This portfolio must always be content-driven.

Never hardcode individual portfolio entries directly into UI components.

Portfolio content must be stored separately from presentation components.

Use reusable components for experiences, projects, credentials, volunteering, skills, and education.

## Content categories

Maintain separate content/data structures for:

- profile
- experiences
- projects
- credentials
- education
- volunteering
- skills
- relationships

## Accuracy rules

Never invent:

- employers
- roles
- dates
- universities
- credentials
- achievements
- metrics
- skills
- outcomes
- relationships

If data is missing, leave the field empty, null, optional, or marked as unavailable.

Never guess.

## Design rules

The design direction is:

- academic
- editorial
- modern
- highly readable
- inspired by the clarity and information architecture of MIT Learn
- NOT a visual clone of MIT Learn

Visual principles:

- warm off-white background
- black or near-black typography
- restrained dark red accent
- thin borders
- generous whitespace
- strong typographic hierarchy
- softly rounded cards (10px), pill filter chips, 6px buttons
- subtle hover states

Avoid:

- gradients
- glassmorphism
- neon
- excessive shadows
- generic SaaS aesthetics
- excessive animations
- decorative clutter

## Image rules

Images must live under:

/public/images/

Use subfolders when useful:

/public/images/profile/
/public/images/experiences/
/public/images/projects/
/public/images/credentials/
/public/images/volunteering/

Do not require a profile image yet.
The site must work properly without one.

## Responsiveness

Everything must work on:

- mobile
- tablet
- desktop

Do not simply shrink complex desktop interfaces onto mobile.

## Changes

When I ask to add a new experience, credential, project, or volunteering entry:

- update data/content
- reuse existing components
- preserve the visual design
- only change shared components if truly required

## Quality

Before declaring a development task complete:

- check TypeScript
- run lint
- run build
- fix errors caused by the changes

Do not redesign unrelated sections unless I explicitly ask.
