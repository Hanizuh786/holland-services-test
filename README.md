
# Holland Legal Services — Full SEO Multi-Page Website

This is the full SEO-focused multi-page version, not a single-page landing site.

## Included routes
- `/` Home
- `/contact` Contact us
- `/about` How the law firm works
- `/privacy` Privacy policy placeholder
- `/privacy-on` Privacy page
- `/services` Services index
- `/services/expat-will`
- `/services/vcc-variable-capital-company`
- `/services/leaving-the-uae`
- `/services/legalisations`
- `/services/employment-settlement-support`
- `/services/rent-disputes`
- `/services/filing-for-divorce`
- `/services/foundations`
- `/services/unpaid-invoices`
- `/services/business-set-up`
- `/insights/vat-number`
- `/insights/uae-inheritance-law`
- `/insights/become-a-resident-in-the-netherlands`

## Stack
- Next.js App Router
- Node.js + Express API
- Redux Toolkit Query
- SEO metadata
- Dynamic sitemap and robots
- LegalService JSON-LD
- Responsive black / bronze / orange visual theme

## Run
```bash
npm install
cp .env.example .env.local
npm run api
npm run dev
```

## Images
The code uses the publicly visible Holland Legal Services image paths for Hilda and Paul and falls back to local files if loading fails. Replace files in `public/images` if you want to lock images locally.

## Edit content
All main website content is in:
`data/siteData.json`

Blog posts are Markdown files in `content/insights`. After Netlify setup, authorized editors can create and publish them at `/admin/` without editing code.

## Netlify deployment and blog CMS

1. In Netlify, choose **Add new project → Import an existing project**, select this GitHub repository, and keep `main` as the production branch.
2. Netlify will read `netlify.toml` and use `npm run build` with `.next` as the publish directory. Modern Next.js support is applied automatically; do not pin the legacy Next.js plugin.
3. Go to **Integrations → Identity → Netlify Identity**, enable it, and set registration to **Invite only**.
4. Under Identity services, enable **Git Gateway** and connect it to this repository.
5. During testing, use the generated `https://YOUR-SITE.netlify.app/admin/` address. In Identity, invite the client's email address and test creating and publishing a post.
6. If the contact form should send email, copy the existing SMTP values into Netlify environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `SMTP_SECURE=true`.
7. After testing, add `holland-legal-services.ae` under **Domain management → Production domains**, make it the primary domain, and apply the DNS records Netlify provides. The CMS will then be available at `https://holland-legal-services.ae/admin/`.

Publishing in the CMS commits the article and any uploaded image to GitHub. That commit triggers a fresh Netlify deployment and also continues to trigger the existing Vercel deployment.

## API
Contact form posts to:
`POST /api/contact`

This Next.js route works on both Netlify and Vercel. The standalone Express server remains available for local/legacy use with `npm run api`. SMTP is optional and configured by environment variables.
# holland-services-test
