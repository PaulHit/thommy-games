# Thommy-Games Website — Build Plan

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14+ (App Router, TypeScript, Tailwind CSS) |
| CMS | Sanity.io (embedded Studio at `/studio`) |
| Email | Brevo (300 emails/day free) |
| Hosting | Vercel |
| Domain | Hostico |

---

## Design Direction

### Vibe
Elegant + playful — inspired by [upstatejamboree.com](https://www.upstatejamboree.com/) — rustic-luxury feel with:
- Fullscreen hero image/carousel
- Serif headings (Playfair Display), clean sans-serif body text (Inter)
- Warm beige/cream backgrounds
- Gold-brown accent color
- Generous whitespace
- Photo-driven layout throughout
- Warm, natural, wood-inspired aesthetic complementing the handcrafted wooden games

### Color Palette (extracted from "Thommy Games Offer.pdf")

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| ██ | Warm Beige/Cream | `#F8F2E4` | Section backgrounds, hero overlay |
| ██ | Gold-Brown | `#B18558` | **Primary accent** — CTAs, buttons, highlights, decorative elements |
| ██ | Medium Brown | `#C3A586` | Secondary accent, borders, cards |
| ██ | Dark Brown/Marron | `#966D49` | Body text, headings, dark elements |
| ██ | White | `#FFFFFF` | Main background, cards |

### Typography
- **Headings:** Playfair Display (serif — elegant, wedding-appropriate)
- **Body:** Inter (sans-serif — clean, readable)
- *(Both can be changed later, these are placeholders)*

### Logo
- Source: `Resurse/Imagini/Logo Thommy Games.jpeg` (1080×1080px, JPEG with white background)
- **Needed:** Transparent PNG version (user will provide)
- Header placement: centered or left-aligned, dark mode compatible

---

## Brand Messaging (from "Informații de bază.pdf")

### Short Tagline
> Transformăm evenimentele în amintiri de neuitat prin jocuri interactive, elegante și potrivite pentru toate vârstele.

### Homepage Hero Line
> Uită de evenimentele plictisitoare. Cu Thommy Games, invitații tăi se joacă, râd, interacționează și își amintesc cu drag de evenimentul tău.

### Core Value Proposition
- Jocurile noastre **sparg gheața** între invitați
- Evenimentul devine **mai memorabil**
- Sunt **potrivite pentru toate vârstele**
- **Arată bine** în decor — elegante, naturale, premium
- Organizatorii **nu trebuie să se ocupe de montaj** — noi facem totul
- **Umplu momentele moarte** ale evenimentului (între ceremonie și masă, între feluri, etc.)

### Target Audience (priority order)
1. Miri care organizează nuntă
2. Cupluri care vor o experiență specială pentru invitați
3. Organizatori de botezuri / aniversări / majorate
4. Firme pentru team-building / evenimente corporate
5. Wedding planners
6. Locații de evenimente
7. Persoane cu petreceri private
8. Organizatori de evenimente outdoor

---

## Sanity CMS Schema Design

### `game` (24 total: 21 Level 1 + 3 Level 2)

| Field | Type |
|---|---|
| `name` | string |
| `slug` | slug |
| `level` | string ("1" or "2") |
| `description` | block text |
| `photos` | array of image |
| `videoUrl` | URL (optional) |
| `rules` | block text (optional) |
| `featured` | boolean |

**Level 1 games (21):** Șah Gigant, Cornhole, Mini-Hockey, Ring Toss de masă, Ladder Toss, Jenga Giant, Connect 4 Giant, Klask, Darts, Ring Toss de sol, X & 0, Wall Ball Maze, Counter-Balance, Arc cu săgeți, ThurnBall/Turnball, ShuffleBoard, Froebell Tower, Mölkky, Badminton, Kubb, SpikeBall

**Level 2 games (3):** Fussball, Air-Hockey, Masă Ping-Pong

### `package` (4 packages)

| Field | Type |
|---|---|
| `name` | string |
| `slug` | slug |
| `description` | block text |
| `price` | number (EUR) |
| `level1Count` | number |
| `level2Count` | number |
| `totalGames` | number |
| `includesAssistant` | boolean |
| `images` | array of image |
| `games` | array of reference → `game` |
| `featured` | boolean |
| `order` | number |

### Package Reference Data

| Package | Price | Games | L1 | L2 | Assistant |
|---|---|---|---|---|---|
| Starter | €350 | 6 | 5 | 1 | No |
| Classic | €525 | 9 | 7 | 2 | No |
| Pro | €700 | 12 | 9 | 3 | Yes |
| Epic | €1,250 | 20 | 17 | 3 | Yes |

All packages include: transport 70km from Beclean, setup/teardown, instructions, 5hr consecutive play.

### `page` (for About, Home content)

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `content` | portable text |
| `heroImage` | image |

### `testimonial`

| Field | Type |
|---|---|
| `name` | string |
| `role` | string (e.g. "Mireasă", "Wedding Planner") |
| `quote` | text |
| `photo` | image |
| `eventType` | string |

### `galleryEntry`

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `category` | string (nuntă / corporate / petrecere / festival / team-building) |
| `photos` | array of image |
| `date` | date |
| `description` | text |

### `faq`

| Field | Type |
|---|---|
| `question` | string |
| `answer` | block text |
| `order` | number |

### `siteSettings` (singleton)

| Field | Type |
|---|---|
| `logo` | image |
| `email` | string |
| `phone` | string |
| `address` | string (Beclean, România) |
| `freeTransportKm` | number (70) |
| `depositPercent` | number (30) |
| `gameHours` | number (5) |
| `socialLinks` | array of { platform, url } |
| `seo` | { title, description, ogImage } |

> **Why Sanity matters:** Company staff log in at `/studio` and edit prices, photos, descriptions, add new games/packages — changes go live instantly, no developer needed.

---

## Pages & Features

| Route | Content |
|---|---|
| `/` | **Home** — Hero carousel, featured packages grid, "ce includem" value props, testimonials carousel, presă / parteneri, Instagram feed, CTA |
| `/despre` | **About** — Povestea Thommy Games, photos, brand story, video |
| `/pachete` | **Rental Packages** — Grid of 4 packages: Starter, Classic, Pro, Epic — image, price, game count, "Vezi detalii" |
| `/pachete/[slug]` | **Package Detail** — Full description, included games list with level badges, photo gallery, price, **"Rezervă acest pachet" CTA form** |
| `/jocuri` | **Games Catalog** — All 24 games listed with photos, descriptions, level filter |
| `/galerie` | **Gallery/Events** — Filterable grid of past events by category |
| `/testimoniale` | **Testimonials** — Grid/masonry of client quotes with photos |
| `/ssi` | **FAQs** — Întrebări frecvente (accordion) |
| `/contact` | **Contact** — Formular general (nume, email, telefon, mesaj) + hartă / info Beclean |

> Language note: Site content appears to be primarily in Romanian (based on source documents). Pages should use Romanian slugs and content. This can be confirmed with the client.

---

## Booking Form (on `/pachete/[slug]`)

Fields:
- **Nume contact** (required)
- **Email** (required)
- **Telefon** (optional)
- **Tip eveniment** — dropdown: Nuntă / Eveniment Corporate / Petrecere Privată / Festival / Botez / Altul
- **Data evenimentului** — date picker
- **Locație / Venue** — text (with note about 70km free transport from Beclean)
- **Număr estimat invitați** — number
- **Mesaj / Cerințe speciale** — textarea
- **[Trimite cererea]** button

### Flow
1. User browses packages → clicks one → reads details → clicks "Rezervă acest pachet"
2. Form appears inline (scrolls to form section or expands)
3. On submit → `POST /api/contact` → Brevo API → email to company with all fields + package name
4. User sees success confirmation (toast)

---

## Key Services to Highlight (from client brief)

- Transport gratuit în limita a **70 km de Beclean**
- Posibilitate de deplasare și în alte zone, cu ofertă personalizată
- **Instalare** jocurilor înainte de eveniment
- **Strângere** jocurilor după eveniment
- **Instrucțiuni clare** afișate pentru fiecare joc
- **5 ore consecutive** de joc și socializare
- **Asistent dedicat** pentru pachetele Pro și Epic
- Rezervare prin plata unui **avans de 30%**

---

## Project Structure

```
thommy-games/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          # Home
│   ├── despre/page.tsx                   # About
│   ├── contact/page.tsx                  # Contact
│   ├── ssi/page.tsx                      # FAQs
│   ├── pachete/
│   │   ├── page.tsx                      # Packages listing
│   │   └── [slug]/page.tsx               # Package detail + booking form
│   ├── jocuri/
│   │   └── page.tsx                      # Games catalog
│   ├── galerie/page.tsx                  # Gallery/Events
│   ├── testimoniale/page.tsx             # Testimonials
│   ├── studio/[[...index]]/page.tsx      # Embedded Sanity Studio
│   └── api/
│       └── contact/route.ts              # Brevo email handler
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    # Sticky nav, mobile hamburger menu
│   │   └── Footer.tsx                    # Contact info, social links, nav
│   ├── home/
│   │   ├── Hero.tsx                      # Fullscreen image carousel
│   │   ├── FeaturedPackages.tsx
│   │   ├── WhatWeInclude.tsx             # Value props grid
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── PressLogos.tsx
│   │   └── InstagramFeed.tsx
│   ├── packages/
│   │   ├── PackageCard.tsx
│   │   ├── PackageDetail.tsx
│   │   └── BookingForm.tsx               # CTA form with validation
│   ├── games/
│   │   └── GameCard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Textarea.tsx
├── lib/
│   ├── sanity.ts                         # Sanity client config
│   ├── queries.ts                        # GROQ queries
│   └── brevo.ts                         # Brevo client config
├── schemas/                              # Sanity schema definitions
│   ├── index.ts                          # Exports all schemas
│   ├── game.ts
│   ├── package.ts
│   ├── page.ts
│   ├── testimonial.ts
│   ├── galleryEntry.ts
│   ├── faq.ts
│   └── siteSettings.ts
├── sanity.config.ts                      # Sanity Studio config
├── sanity.cli.ts
├── next.config.ts
├── tailwind.config.ts                    # Tailwind with custom colors
└── package.json
```

---

## Implementation Phases

### Phase 1 — Scaffolding
1. `npx create-next-app@latest thommy-games` — TypeScript, Tailwind, App Router
2. Install dependencies: `sanity`, `next-sanity`, `@sanity/vision`, `react-hook-form`, `zod`
3. `npx sanity init` — create Sanity project
4. Configure `sanity.config.ts`, `sanity.cli.ts`, `tailwind.config.ts` (custom colors)
5. Set up Google Fonts (Playfair Display + Inter) in `layout.tsx`

### Phase 2 — Sanity Schemas & Content
6. Write all schemas in `/schemas/` (game, package, page, testimonial, galleryEntry, faq, siteSettings)
7. Set up embedded Studio at `/studio`
8. Seed initial content — all 24 games, 4 packages, about page, sample testimonials & FAQs

### Phase 3 — Layout & Global Components
9. Build `Header` — sticky nav with logo, mobile hamburger, links
10. Build `Footer` — contact info, 70km free transport badge, social links, navigation

### Phase 4 — Pages
11. **Home** — Hero carousel, featured packages, value props, testimonials, press, Instagram
12. **Pachete listing** — Fetch from Sanity, display 4 cards with prices
13. **Pachet detail** — Full info + BookingForm component
14. **Jocuri** — All 24 games, filterable by level
15. **Despre** — Company story from Sanity `page` content
16. **Contact** — General form + location info
17. **SSI (FAQs)** — Accordion from Sanity
18. **Galerie** — Filterable grid from Sanity gallery entries
19. **Testimoniale** — Grid/masonry from Sanity

### Phase 5 — Email Integration
20. Build `POST /api/contact` route with Brevo API
21. Form validation with Zod (client + server)
22. Email template with all booking details

### Phase 6 — Polish & Deploy
23. SEO meta tags, Open Graph (per page)
24. Responsive testing (mobile/tablet/desktop)
25. Performance (Next.js Image, lazy loading, SSG where possible)
26. Push to GitHub → connect to Vercel → deploy
27. Configure custom domain via Hostico DNS (CNAME to Vercel)
28. Set Vercel env vars: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `CONTACT_EMAIL`

---

## Open Items (When You're Ready)

- **Logo PNG** — transparent background version (current is JPEG with white bg)
- **Photos** — 50+ images already in `Resurse/Imagini/`, ready to upload to Sanity
- **Language** — Content appears to be in Romanian; confirm if site should be fully Romanian, or bilingual (RO + EN)
- **Social media** — do you have Facebook/Instagram pages to link?
- **Price display** — confirmed to stay in EUR
- **Videos** — any demo videos of the games in action?
