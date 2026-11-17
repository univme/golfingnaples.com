# Golfing Naples — first website

A Vercel-ready, responsive static website for Naples residents and visitors. The brand direction combines a coastal flag-and-palm crest, emerald and ivory, gold details, editorial serif typography, and original illustrated course cards.

## Run locally

Requires Node.js 22+ and Python 3 for the optional local server. There are no production dependencies or API keys.

```sh
npm test
npm run build
npm run dev
```

Open http://localhost:3000. Use an HTTP server rather than double-clicking the file; JavaScript modules require HTTP.

## Deploy to Vercel

1. Put this folder in a Git repository and import it in your Vercel account.
2. Framework preset: Other. Build command: `npm run build`. Output directory: `dist`.
3. Deploy a preview and test the desktop and mobile experience.
4. When ready, add `golfingnaples.com` to the Vercel project and follow Vercel's displayed DNS instructions. No domain changes have been made by this project.

`vercel.json` supplies the build settings and response security headers. No environment variables are required. Canonical URLs, sitemap, and social metadata intentionally use https://golfingnaples.com/. Keep preview deployments out of search indexing using Vercel preview defaults; use the custom domain only when approved for launch.

## What works

- Six course options across five facilities: ArrowHead, Tiburón, Lely Flamingo, Lely Mustang, Valencia, Eagle Lakes.
- Combined keyword, local-area, and resort/daily-fee filters, including accent-insensitive search.
- Local-device shortlist with graceful handling of unavailable or corrupted browser storage.
- Expandable access notes with course-owned source links and direct paths to booking information.
- Area selection, planning and value checklists, FAQ, and privacy dialog.
- Responsive navigation and layout; semantic headings, labeled controls, keyboard focus styles, reduced-motion handling, and progressive enhancement for static course content.
- Self-hosted fonts and image assets; no external scripts, analytics, tracking pixels, forms, or lead collection.

## Files

- `site/index.html`: page structure, content, and crawlable course cards.
- `site/styles.css`: responsive design system and font declarations.
- `site/app.js`: interface behavior; `site/model.js`: search and shortlist logic.
- `site/courses.json`: structured initial course reference used by tests. Keep this and visible cards synchronized when editing.
- `site/assets/crest.svg`: editable original brand mark.
- `site/assets/course-*.svg`: original decorative course illustrations, not actual layouts.
- `site/assets/social.jpg`: 1200 × 630 social image.
- `site/robots.txt`, `site/sitemap.xml`, `site/llms.txt`: discovery metadata.
- `scripts/build.mjs`: dependency-free static packaging.
- `tests/discovery.test.mjs`: filtering and storage regression tests.

## Editorial and launch notes

The uploaded strategy document is background source material. Its proposals are not treated as instructions to activate affiliate schemes, contact partners, create memberships, or publish unsupported claims.

Access was checked against course-owned pages on November 16, 2026. This is a curated initial selection, not a complete Naples directory. Fees, inventory, private access, future deals, and commercial partnerships are not promised. Lely's Flamingo and Mustang publicly welcome outside players, and Tiburón has a public online booking path; a resort setting is different from a resort-guest-only access rule.

Local labels are editorial browsing categories, not formal neighborhood boundaries. Naples remains the umbrella brand. Marco Island, Bonita Springs, and Estero are not included in this initial selection and should be introduced later as separately named nearby destinations.

### Remaining launch verification

- Browser-based desktop/mobile layout and keyboard testing remains required. Browser preview tools were unavailable in this environment; DOM checks are not a substitute for visual testing.
- Source is prepared for the GitHub repository univme/golfingnaples.com. Vercel deployment and custom-domain status must be confirmed from the platform, not inferred from this README.
- Reconfirm course information and external booking destinations before public launch and regularly thereafter.
- Approve final branding and replace illustrative stock photography with licensed Naples-specific photography when available.
- Add a real contact destination if you want inquiries. No contact details were supplied, so none were invented.
- There is no newsletter delivery, live rate feed, negotiated deal inventory, concierge fulfillment, or analytics collection. Add and test those services when their providers and operating process are chosen.

### Measurement plan

Suggested future events: `course_filter_applied`, `course_saved`, `course_booking_outbound`, `area_selected`, and `guide_expanded`. No analytics provider is installed and no events currently leave the visitor's browser. Booking completion requires a course or affiliate integration and cannot be inferred from an outbound click.

## Asset credits

- Hero: Unsplash photograph, https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa ; used as generic golf inspiration, not a representation of a listed Naples course. Unsplash license: https://unsplash.com/license .
- DM Sans and Libre Caslon Display: Google Fonts; self-hosted WOFF2 files with SIL Open Font License texts included alongside the fonts.
- Crest, course illustrations, schematic area map, and social-image layout: original project assets.

## Course sources

- ArrowHead: https://www.arrowheadgolfnaples.com/golf/faqs
- Tiburón: https://www.tiburonnaples.com/golf/dynamic-pricing
- Lely: https://www.lelyresortgolfandcountryclub.com/
- Valencia: https://www.valenciagolfandcountryclub.com/
- Eagle Lakes: https://www.eaglelakesgolfclub.net/

## Production and SEO configuration

- Production canonical URL: https://golfingnaples.com/
- Production HTML explicitly allows indexing; robots.txt allows public crawling and references the populated sitemap.
- Vercel preview/development builds receive noindex metadata, a crawler block, and an empty sitemap. Production builds restore the indexable source files.
- Organization, WebSite, and WebPage JSON-LD use a consistent identity; the CSP permits only the exact inline JSON-LD payload by its SHA-256 hash. Update that hash when editing structured data.
- Fonts use WOFF2; critical fonts and the hero image are preloaded.
- No measured Lighthouse score is claimed. The supplied Nertia report audited floridasteaks.com and cannot establish scores for this site. Run a new production audit after the correct domain is live.

Vercel import: choose the repository, Framework **Other**, build `npm run build`, output `dist`. No environment variables are needed. Connect golfingnaples.com and follow the exact DNS values Vercel returns. Keep unrelated email and verification DNS records.
