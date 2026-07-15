# Apply client fixes without removing original project files

This package is intentionally a patch-only package. It does not replace the whole project and does not delete pages, routes, components, images or API files.

## What this patch does

- Updates `data/siteData.json` only by modifying text values and adding missing service blocks.
- Keeps existing slugs such as `/services/expat-will`, `/services/business-set-up`, `/services/legalisations`, etc.
- Keeps original components such as `Header.jsx`, `Footer.jsx`, `HomeSections.jsx`, `ContactForm.jsx`, `ServiceLayout.jsx`, `ExpertStrip.jsx`, `JsonLd.jsx`.
- Fixes visible English, spelling, capitalization and naming issues.
- Adds the DIFC Will Draftsmen registry URL inside the wills section content.
- Creates `.backup` files before changing anything.

## How to apply

Copy `apply-client-fixes.js` to the root of the original project folder and run:

```bash
node apply-client-fixes.js
npm run dev
```

## Important

Do not use the earlier rebuilt package if the client wants all original files preserved. Use this patch on the original project instead.
