# Maison Aurelia — a cattery website

A complete Next.js App Router website with an embedded Sanity Studio. The warm, editorial design gives the cats and their photographs room to breathe. Public content is managed in Sanity; visitors do not need an account.

**No contact form, newsletter, subscriptions, payment system, visitor login, or separate backend.** The only API route verifies Sanity webhooks to refresh cached content.

## Run locally

Use Node.js **22.12 or newer** and npm. Dependencies are pinned in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev:demo
```

Open [http://localhost:3000](http://localhost:3000). This explicitly enables the fictional design preview without requiring a Sanity account. The example email address is intentionally non-operational. There are no real WhatsApp or social destinations in the demo.

For your real content:

```sh
cp .env.example .env.local
# Fill in your Sanity project ID, dataset, and site URL.
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) to edit. Unconfigured Studio shows setup guidance. Sanity handles secure editor authentication; website visitors have no login.

## Architecture

- **Next.js 16.3.7**, App Router, React 19, strict TypeScript, Tailwind CSS 4.
- Server Components handle pages and content loading. Navigation, filtering, the shared lightbox, and Studio are the interactive client boundaries.
- **Sanity 6** is the production source of truth. Shared, explicit GROQ projections keep listings small and resolve the relationships between cats, litters, and kittens.
- `lib/sanity/data.ts` is the server-only data boundary. It reads published content, memoizes within a render, and caches Sanity requests for five minutes. It never silently replaces CMS errors with demo content.
- `next/image` optimizes local demo photos. Real photos use Sanity Image CDN transformations, crop/hotspot data, bounded widths, responsive sizes, reserved aspect ratios, and optional blur placeholders.
- Fonts are locally served Cormorant Garamond and Inter; no visitor requests to Google Fonts.
- Portable Text supports headings, paragraphs, lists, links, photographs, quotes, and helpful notes.
- Native modal dialogs give the mobile navigation and shared lightbox focus trapping, Escape handling, and focus restoration. The lightbox also supports arrow keys, next/previous buttons, and swipes.
- `lib/labels.ts` centralizes common interface labels and status names. CMS documents can gain locale fields and locale-aware queries later without rewriting components.

```text
app/
  (site)/               Public pages, shared header/footer
  studio/[[...tool]]/    Embedded Sanity Studio
  api/revalidate/       Signed Sanity webhook only
  sitemap.ts, robots.ts
components/             Reusable presentation and interaction components
lib/
  sanity/               Client, GROQ queries, fetchers, image helpers
  demo/                 Explicit, isolated fictional preview content
  contact.ts            Contact visibility, link validation, WhatsApp messages
  metadata.ts           Canonical, OpenGraph, and Twitter metadata
sanity/
  schemaTypes/          Documents and reusable field types
  structure.ts          Owner-oriented navigation
scripts/                Local schema validation
tests/                  GROQ/contact integration tests and browser tests
public/images/          Licensed demonstration photographs only
```

## Routes

| Page                                  | Address                                      |
| ------------------------------------- | -------------------------------------------- |
| Homepage                              | `/`                                          |
| Cattery overview                      | `/our-cattery`                               |
| Male / female cats                    | `/our-cattery/males`, `/our-cattery/females` |
| Cat profile                           | `/our-cattery/cats/[slug]`                   |
| Litters and individual litter         | `/litters`, `/litters/[slug]`                |
| Kitten profile                        | `/kittens/[slug]`                            |
| Exhibitions and individual exhibition | `/exhibitions`, `/exhibitions/[slug]`        |
| Filterable photo gallery              | `/gallery`                                   |
| Reorderable information sections      | `/information`                               |
| Direct contact links                  | `/contact`                                   |
| Legal pages                           | `/privacy`, `/imprint`                       |
| Content editor                        | `/studio`                                    |
| Search engine files                   | `/sitemap.xml`, `/robots.txt`                |

Unknown, unpublished, and hidden animal profiles return a proper 404. New published slugs work without a rebuild. Optional text, parent details, contact methods, and empty content sections are hidden. Litter category headings appear only when that category contains litters.

## Connect Sanity

1. Create a project and a dataset in [Sanity Manage](https://www.sanity.io/manage). A public dataset is appropriate for the public website content. Never store private customer records in it.
2. Put the project ID and dataset in `.env.local` using the variables below.
3. In the Sanity project's **API → CORS origins**, add the exact local origin you use (`http://localhost:3000`, or `http://127.0.0.1:3000`) and your production website origin. Enable credentials for these Studio origins. Avoid a wildcard origin.
4. Restart the development server after changing environment variables. Visit `/studio` and sign in to the correct Sanity project.
5. Open **Settings → Site Settings**. Enter the real name, description, contact details, and social links. Publish.
6. Open **Website → Homepage**. Add your photographs, introduction, buttons, story, and philosophy. Publish.
7. Add cats, then litters, then kittens using the workflows below.
8. Invite the owner through the Sanity project's member settings with an appropriate editor role.

Do not import the fictional preview into your production dataset. A brand-new dataset starts clean. You do not need to deploy a separate Studio because `/studio` is bundled with this application.

### Environment variables

| Variable                        | Required                   | Purpose                                                                                          |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For real CMS/Studio        | Sanity project ID, publicly identifiable rather than a secret                                    |
| `NEXT_PUBLIC_SANITY_DATASET`    | For real CMS/Studio        | Dataset name; defaults to `production`                                                           |
| `NEXT_PUBLIC_SITE_URL`          | In production              | Full public origin, such as `https://your-cattery.example`; used for canonical links and sitemap |
| `SANITY_API_READ_TOKEN`         | Only for a private dataset | Sanity **viewer** token, used only on the server                                                 |
| `SANITY_REVALIDATE_SECRET`      | For instant CMS refresh    | Secret matching the Sanity webhook signature setting                                             |
| `CONTENT_MODE`                  | Optional                   | `sanity` (default) or `demo`; `dev:demo`/`build:demo` set this explicitly                        |

Environment values with `NEXT_PUBLIC_` are included in the build. Set them **before building** and rebuild after changing them. Never add a token or secret to a `NEXT_PUBLIC_` variable. Keep `.env.local` out of source control.

Without a configured Sanity project, the normal website displays graceful empty states and is `noindex`. An unavailable configured CMS produces an error state; it does not show imaginary fallback records.

## Owner's guide

### Add a male cat

1. **Our Cattery → Male Cats → Create**. The sex is already Male.
2. Enter the name, click **Generate** beside Page address, and optionally add an official title, breed, colour, birth date, and EMS code.
3. In **Photographs**, upload the cat's main photograph and add an image description. Use the image crop/hotspot tool to keep the face in view. Add gallery photos and drag to reorder.
4. In **Story & records**, add an introduction, parents, pedigree, verified health information, and achievements where applicable. Leave anything irrelevant empty.
5. In **Website display**, keep Visible on the website enabled. Enable Feature on the homepage if desired. Lower Display order numbers appear first.
6. **Publish**. The profile and male listing update automatically.

### Add a female cat

Use **Our Cattery → Female Cats → Create** and follow the same steps. Sex starts as Female. Existing cats can be edited at any time. Turning off visibility hides the profile without deleting its content. A hidden parent can retain its name on an existing litter's page, but no longer links to a hidden profile.

### Create a litter

1. **Litters → Planned Litters** or **Current Litters → Create**.
2. Enter a name such as Litter A and its optional letter. Generate the page address.
3. Choose the correct status: Planned, Expected, Current litter, Available, Reserved, or Previous litter.
4. Upload **this litter's own cover photograph** and its image description.
5. Add the birth date or expected date, plus any description.
6. Under **Parents & kittens**, select the mother and father from existing cat documents. The selectors filter by sex.
7. Publish the litter **before creating its kittens**.

The website groups Planned/Expected together, Current/Available/Reserved together, and Previous separately. There is no fixed limit of A/B/C; keep creating new litter documents normally.

### Add kittens to a litter

1. **Kittens → Create**. Enter the name and generate its page address.
2. Select the published litter in **Litter**. This is the primary relationship.
3. Set sex, colour, birth date, and availability: Available, Under evaluation, Reserved, Found a home (`sold`), or Staying with us.
4. Upload **that kitten's own main photograph**, add image descriptions, and optionally add more photographs and a story.
5. Publish. The kitten appears automatically on the litter's page and has its own profile.
6. Optionally select it in the litter's **Kittens** field too. The website combines both relationships without duplicates; Display order on each kitten controls its position.

To move a kitten, change its Litter field and remove any old explicit reference from the previous litter. Only the current litter's kittens appear in the normal litter selector. Do not unpublish a referenced parent; hide it using its visibility switch instead.

### Add an exhibition

**Exhibitions → Create**. Add a story title, page address, event name, date, location/country, cover photograph, participating cats, a short result highlight, full results, story, and optional gallery. Publish. Choose the event under Homepage → Featured content to show it on the homepage.

### Add gallery photographs

**Gallery → Create**. Upload a photo, enter a meaningful image description, choose Cats, Kittens, Exhibitions, or Cattery life, and optionally add a caption. Use Display order to arrange the main gallery. Publish. Choose selected gallery documents in Homepage → Featured content for the homepage preview.

### Update the homepage

**Website → Homepage**. The Welcome, Our story, Featured content, Philosophy, and Contact invitation tabs control the page. You can edit the hero and section headings, photographs, rich text, button destinations, selected cats/litters, gallery preview, exhibition, and contact invitation. Drag selected references to reorder. Empty optional sections are omitted. If the featured cat/litter selection is empty, the site uses published records marked Featured, up to three cats and two litters.

### Add and reorder information

**Website → Additional Information**. Add a section, give it a heading, and write its content. Use the editor toolbar for subheadings, lists, links, quotes, photographs, and helpful notes. Drag whole sections to change their order. The page's contents navigation follows the same order. No sections are hardcoded into the document.

### Update contact and social information

**Settings → Contact & Social Media** opens the same singleton as Site Settings. Select the **Contact**, **Social media**, or **Contact visibility** tab.

- Add an email address, international phone number, and/or international WhatsApp number.
- WhatsApp needs the number, not a URL. Spaces and normal punctuation are accepted; the website creates the `https://wa.me/...` link.
- Paste full HTTPS Instagram, Facebook, and TikTok profile URLs.
- Set the contact-page introduction and optional kitten enquiry template. `{name}` becomes the kitten's name, and `{litter}` becomes ` from Litter A` when linked.
- Disable any **Show …** switch to hide that channel everywhere, including the footer and contact invitations. A blank channel is always hidden, even if its switch is on.
- Publish. Kitten invitations prefer WhatsApp, then Email, then Instagram; other configured channels remain on Contact.

No message is sent by the website itself. Clicking a link opens the visitor's chosen email, phone, WhatsApp, or social application.

### Logo, name, SEO, and legal pages

**Settings → Site Settings → General** controls the name, optional logo, description, and public location. **Our cattery page** controls its introduction and the large male/female navigation photos. **Search & sharing** controls default search metadata and the sharing photograph.

**Settings → Privacy Policy / Imprint** contains editable legal documents. Supply accurate, jurisdiction-appropriate content, review it, and enable **Reviewed and ready for public display**. Until then, the website shows an explicit placeholder and excludes that legal page from search indexing. No legal identity, address, registration, or policy has been invented.

## Content schema

| Schema                                       | Kind                             | Purpose                                                                                           |
| -------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `cat`                                        | Document                         | Male/female profiles, photos, parent references, pedigree, health, achievements, visibility/order |
| `litter`                                     | Document                         | Individual cover, status, dates, mother/father references, kitten references, gallery             |
| `kitten`                                     | Document                         | Own photo/profile/status, reference to its litter                                                 |
| `exhibition`                                 | Document                         | Event, participating cats, result highlight/full results, photos                                  |
| `galleryImage`                               | Document                         | Image, collection, caption, display order                                                         |
| `homepage`                                   | Singleton: `homepage`            | Editorial homepage content and selected references                                                |
| `siteSettings`                               | Singleton: `siteSettings`        | Brand, contact, social visibility, SEO, cattery introduction                                      |
| `informationPage`                            | Singleton: `informationPage`     | Reorderable rich-text sections                                                                    |
| `legalPage`                                  | Singletons: `privacy`, `imprint` | Reviewed legal content                                                                            |
| `contentImage`, `richText`, `callout`, `cta` | Reusable types                   | Accessible images, rich content, notes, safe internal buttons                                     |

Singleton creation/duplication/deletion actions are removed from the normal Studio workflow. Owner-facing previews show names, thumbnails, sex/title, litter/status, and event dates.

## Publishing updates and cache revalidation

Without a webhook, public content refreshes using a five-minute ISR window; the first request after expiry may receive the cached page while it refreshes. To invalidate cached content immediately after publishing:

1. Set `SANITY_REVALIDATE_SECRET` in your hosting environment to a long random secret.
2. Create a Sanity webhook under **API → Webhooks**:
   - URL: `https://your-domain.example/api/revalidate`
   - HTTP method: **POST**
   - Trigger: **Create, Update, Delete**
   - Dataset: the dataset used by this website
   - Drafts: disabled
   - Filter: `_type in ["cat", "kitten", "litter", "exhibition", "galleryImage", "homepage", "informationPage", "siteSettings", "legalPage"]`
   - Projection: `{_type}`
   - Secret: the same `SANITY_REVALIDATE_SECRET`
3. Publish an edit and reload the relevant public page. The next request refreshes the expired content.

The handler validates the Sanity signature and document type. It uses a shared content cache tag because changing a parent or contact setting affects several routes. It does not accept arbitrary invalidation paths or a secret in the URL. No public content write endpoint exists.

Reference: [Sanity webhook verification](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs) and [Next.js revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

## Checks and production build

```sh
npm run check             # ESLint, strict TypeScript, GROQ/contact tests
npm run sanity:validate   # Compile and validate every Sanity schema
npm run sanity:extract    # Optional machine-readable schema export
npm run build             # Production Sanity/empty-state build
npm start
```

For a production-built design preview, use **both** matching commands:

```sh
npm run build:demo
npm run start:demo
```

Demo mode is build-time relevant because pages are prerendered. Changing `CONTENT_MODE` only when starting a previously built application does **not** replace prerendered content; rebuild after switching modes. Demo and unconfigured sites always use noindex metadata, disallow crawling, and have an empty sitemap.

### Browser tests

The Playwright suite uses installed Google Chrome by default:

```sh
npm run test:e2e
```

It starts a demo development server if needed. To test an already running production build:

```sh
E2E_BASE_URL=http://127.0.0.1:3001 npm run test:e2e
# For a normal build without a connected Sanity project:
E2E_MODE=empty E2E_BASE_URL=http://127.0.0.1:3002 npm run test:e2e
```

On CI without Chrome, install Playwright Chromium using `npx playwright install chromium`, then use `PLAYWRIGHT_CHANNEL=chromium`. The suite checks all routes, missing-profile 404s, parent/kitten relationships, filtering, keyboard/focus behavior, mobile navigation, swipe handling, optimized images, metadata, legal placeholders, and horizontal overflow at **375, 430, 768, 1024, 1440, and 1920 pixels**. Screenshots are written to ignored `test-results/`.

The project includes narrowly scoped overrides for patched versions of Sanity CLI transitive dependencies (`adm-zip`, `undici`, `js-yaml`, `smol-toml`, and `uuid`). They keep the current framework versions while addressing registry advisories. Review/remove these overrides when the upstream packages update.

## Deployment

Use a Node.js host with full Next.js App Router, ISR, route-handler, and image-optimization support, such as Vercel. This project is **not** a static export.

1. Put the project in your source repository and connect it to the host, or deploy from the host's supported CLI.
2. Set the real Sanity project ID/dataset, the exact HTTPS `NEXT_PUBLIC_SITE_URL`, `CONTENT_MODE=sanity`, and any optional server secrets **before building**.
3. Use `npm ci` and `npm run build`. On a standard Node server, start with `npm start` behind HTTPS. Keep a single instance or configure shared Next.js caching if you run multiple instances.
4. Add the production origin to Sanity's CORS settings with Studio credentials enabled.
5. Configure the signed webhook above, then test publishing a cat, updating a kitten's availability, and hiding a contact method.
6. Replace all demo assets/content; complete Privacy and Imprint. Check real email, phone, WhatsApp, and social destinations on a phone.

The implementation does not create a Sanity project, publish a site, set up a domain, or invent credentials. A live Studio publishing round trip must be checked after you connect your own project.

## What needs real content before launch

- Real cattery name/logo, breed information, story, and photography.
- Real cat and kitten details, titles, pedigrees, verified health records, parents, dates, and statuses.
- Actual litter plans, exhibitions/results, and gallery photographs.
- Real enabled contact channels, social profiles, and public location.
- Complete, reviewed Privacy and Imprint documents.
- A Sanity project/dataset and the production domain/environment values.

All bundled animal identities, titles, and exhibition results are fictional. The stock photographs are illustrative and do not establish the pictured animals' names, age, breed, pedigree, or show history. See [ASSET_CREDITS.md](./ASSET_CREDITS.md) for their sources. They are isolated under `lib/demo/` and `public/images/`; normal CMS content uses Sanity assets.
