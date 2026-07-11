# Thommy Games

[**thommygames.ro**](https://thommygames.ro) — game rental platform for weddings, private parties, and corporate events.

Built from scratch for a local business in Beclean, Romania. 24 wooden games, 4 packages (€350–€1,250), end-to-end: CMS, email, domain, and CI/CD.

<p align="center">
  <strong>Next.js 15 · Sanity CMS · TypeScript · Tailwind CSS · Resend · Vercel</strong>
</p>

---

## Features

- **Custom-branded design** — Playfair Display + Inter fonts, cream/gold/green palette, responsive mobile-first layout
- **Full CMS** — CEO edits all content (games, packages, testimonials, benefits, videos, Instagram posts, page text) via Sanity Studio
- **Booking flow** — per-package game selection, Zod-validated forms, phone validation, no-past-date calendar
- **Automated email confirmations** — Resend integration with Sanity-editable templates, customer + company notification
- **Video showcase** — portrait-looping muted MP4s, GIF-like behavior (pointer-events locked, no controls)
- **Instagram carousel feed** — swipeable posts with touch targets, sourced from Sanity
- **Photo mosaic** — masonry-style grid from game photos via Sanity's image pipeline
- **Live revalidation** — instant content refresh via `/api/revalidate`

---

## Getting Started

```bash
git clone https://github.com/yourusername/thommy-games.git
cd thommy-games
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                   # http://localhost:3000
```

### Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token

# Resend (transactional email)
RESEND_API_KEY=your-resend-key
CONTACT_EMAIL=contact@yourdomain.com

# Revalidation
REVALIDATE_SECRET=your-secret
```

### Studio

CMS at `/studio` — requires authentication via Sanity. All schema types are in `/schemas`.

---

## Project Structure

```
├── app/
│   ├── api/           # contact, draft, revalidate, social, contact-info, footer-data
│   ├── contact/       # contact page with form + CMS-driven info
│   ├── despre/        # about page (Portable Text from Sanity)
│   ├── jocuri/        # all-games grid with image slider cards
│   ├── pachete/       # package listing + [slug] detail with booking form
│   ├── ssi/           # FAQ from Sanity
│   └── studio/        # Sanity Studio route
├── components/
│   ├── home/          # Hero, CTA, Benefits, FeaturedPackages, Gallery, Video, Instagram
│   ├── layout/        # Header, Footer, FloatingCTA
│   ├── packages/      # BookingForm
│   └── ui/            # Input, Select, Textarea, Button, ImageSlider, SocialLinks
├── schemas/           # Sanity schemas (game, package, page, testimonial, faq, siteSettings, etc.)
├── lib/               # Sanity client, queries, URL builder
├── sanity/            # preview client (draft mode)
└── public/            # logo.png, round_logo.png, favicon.ico, left.jpg, right.jpg
```

---

## Deployment

Hosted on **Vercel** with custom domain `thommygames.ro`. DNS, MX (Zoho Mail), and SSL all configured.

- `main` branch → production
- feature branches → Vercel preview deploys
- Content revalidation

---

## Email

- **Infrastructure**: Zoho Mail (MX + SPF + DKIM verified)
- **Sending**: Resend API
- **From**: `contact@thommygames.ro`
- **Templates**: editable in Sanity → Setări site → Template email confirmare

