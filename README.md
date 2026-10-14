# DSLandscaping Services — Website

The website for **DSLandscaping Services**, Manchester: block paving, tarmac, resin, porcelain, paving slabs, fencing, and artificial and real grass. 20 years of experience, *helping you transform outdoor spaces with confidence*.

Mobile & WhatsApp: 07868 841 474 · Landline: 0161 327 4690 · Email: sales@dslandscapingservices.com · Hours: Monday to Friday, 8am–7pm

It's plain HTML, CSS and JavaScript. There's no build step and nothing to install, so it can be hosted almost anywhere for free.

## What's on the site

- **Header:** sits over the main photo, then turns solid green as you scroll. The menu underlines whichever section you're in. On phones, the menu opens as a full-screen panel.
- **Main section:** full-screen photo of a block paved driveway with the headline "Driveways worth *coming home* to."
- **Services ticker:** the service names drifting slowly across the page.
- **About us:** two overlapping photos with a "20 years of experience" badge, a short introduction about doing the groundwork properly, and three promises (free quotes, built to last, tidy).
- **Our services:** Block Paving, Tarmac, Resin, Porcelain, Paving Slabs, Fencing, Artificial Grass, and Real Grass & Turfing. Each has a photo and an **Enquire** link that jumps to the form with that service already picked.
- **Statement band:** wide photo with a gentle parallax effect, a short quote and a "Book a free visit" button.
- **How it works:** three steps.
- **Reviews:** approved customer reviews with star ratings, buttons to review the business on Google or read its Google reviews, and a **Write a review** form. See *Reviews* below.
- **FAQs:** seven common questions (quotes, how long a driveway takes, block paving vs tarmac vs resin, planning permission, looking after block paving, waste, areas covered) with answers that open and close.
- **Contact:** phone, WhatsApp, email, areas covered, hours and an enquiry form.
- **Footer.**
- **On phones:**
  - The main photo and statement band use portrait versions made for tall screens, which are also much smaller downloads.
  - The services become a swipeable row with progress dots instead of a long list.
  - A "Call us / Free quote" bar slides up from the bottom once you're past the main photo, and tucks away at the contact section, where big **Call** and **WhatsApp** buttons take over.
  - Every button and link is at least 44px tall so it's easy to tap, the menu scrolls if the screen is short (e.g. a phone on its side), and the form brings up the right keyboard for each field.
  - The parallax effect is switched off, and spacing is tighter so there's less scrolling.

Sections fade gently into view as you scroll. For visitors whose device is set to reduce motion, the animations are switched off.

One more section is already built but hidden until there's real content for it: **Recent projects** (photos of his own jobs). See below.

## Files

```
index.html          The page itself (all the text lives here)
css/styles.css      Colours, fonts and layout
js/main.js          Header, menu, scroll effects, the enquiry form and reviews
images/favicon.svg  Browser tab icon
images/work/        Put photos of his finished jobs here
```

## Previewing it

Double-click `index.html` to open it in a browser. You need to be online for the photos and fonts to load.

## ⚠️ About the photos

The photos on the site right now are **realistic AI-generated stand-ins** (made with Higgsfield). They're general garden pictures, **not photos of DSLandscaping's own work**, and the site never says they are. They load from Higgsfield's servers, and the files are large, so the page is slower than it should be.

Before the site goes live properly, swap them for real photos:

1. Take or pick photos of his own work. Phone photos are fine; wide landscape shots work best.
2. Save them in `images/` as JPGs, resized to about 2000px wide for the big photos and 1200px for the rest.
3. In `index.html`, find each `src="https://d8j0ntlcm91z4.cloudfront.net/..."` and change it to your file, e.g. `src="images/hero.jpg"`. Update the `alt` text to describe the new photo.
4. Also update the main photo's address in the `<head>` (the two `preload` lines, `og:image`, and `"image"` in the business details) so they all point at the new main photo.
5. The main photo and the stone path band each have a second, portrait photo for phones, in the `<source media="(max-width: 767px)" …>` line just above them. Point that at a portrait (upright) photo too, or delete the `<source …>` line to use the same photo on every screen.

| Photo on the site | Where it is in `index.html` |
| --- | --- |
| Block paved driveway (top of the page) | `class="hero-img"`, plus the phone version on the `<source>` line above it |
| Paving tools, and a driveway base ready for paving | `class="about-photo-main"` and `class="about-photo-small"` |
| Eight service photos | `class="service-img"` blocks, in order |
| Stone path at dusk | `class="band-img"`, plus the phone version on the `<source>` line above it |
| Block paved front path | `class="faq-photo"` |

## ⚠️ Before going live: things to check

The real mobile and WhatsApp number (07868 841 474), landline (0161 327 4690), email, area (Manchester) and hours (Monday to Friday, 8am–7pm) are in place everywhere.

Also check these against what the business actually does, and edit anything that isn't right:
- The eight services (and the matching options in the form's drop-down; each **Enquire** link's `data-service` must match an option exactly)
- The service names in the ticker under the main photo
- "Free, no-obligation quotes", "A solid base under every job" and "We clear up and take the waste away"
- The resin description says it's resin-**bound** (which lets water drain through). If he lays resin-bonded surfaces instead, change that wording.
- The About text about groundwork and drainage. It reads best in his own words, e.g. *"I'm [name] and I started DSLandscaping Services in [year]…"*
- The FAQ answers, especially the driveway timescale and the block paving / tarmac / resin comparison. The planning permission answer describes the rules in England, which covers Manchester.

## Business details for Google

The `<script type="application/ld+json">` block in the `<head>` tells Google the business name, phone, email, area and opening hours, which helps it show up properly in local searches. The phone, email, area (Manchester) and hours are already set; if any of them change, update them there too. Once the site is live, setting up a free **Google Business Profile** is the single best thing for being found locally.

## Showing his own work: Recent projects section

1. Save photos of finished jobs in `images/work/` as `job-1.jpg`, `job-2.jpg`, `job-3.jpg` (add more by copying a `<figure>…</figure>` block).
2. In `index.html`, find **RECENT WORK** and update each photo's `alt` description and caption.
3. Delete the two lines marked `HIDDEN: delete this line to show Recent Work`.
4. Add `<li><a href="#work">Our work</a></li>` to the menu near the top of `index.html`.

## Reviews

Customers can leave a review in two ways:

- **On Google**, using the *Review us on Google* button. It opens the business's Google profile (`https://share.google/QSsx8nniPcHwvpDzM`). Google reviews also help the business show up in local searches, so they're the best kind to ask for.
- **On the website**, using the *Write a review* form (star rating, name, optional area, review).

### Reviews from the website form

The form uses [Netlify Forms](https://docs.netlify.com/forms/setup/), which is free for up to 100 submissions a month. New reviews are **not** published automatically, so spam or abusive posts never appear on the site.

One-time setup in Netlify (after the site is deployed):
1. Go to **Forms** for the site and turn on **form detection**, then redeploy (Deploys → Trigger deploy) so Netlify picks up the form.
2. To get an email for every new review, go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications**, add an email notification for the `review` form, and enter `sales@dslandscapingservices.com`.

New reviews then appear under **Forms → review** in Netlify. Spam is filtered automatically.

### Showing a review on the site

Approved reviews live in a short list near the bottom of the Reviews section in `index.html` (search for **APPROVED REVIEWS**). Add each review to the list between the square brackets, newest first, separated by commas:

```json
[
  { "name": "Sarah", "area": "Didsbury", "rating": 5, "text": "Brilliant job on our new driveway.", "source": "Website" },
  { "name": "James", "rating": 5, "text": "Tidy, quick and great value.", "source": "Google" }
]
```

`area` and `source` are optional. Use real reviews only; reviews copied from Google or elsewhere need the customer's permission. While the list is empty, the section invites customers to be the first to leave a review.

## How the enquiry form works

The site has no server, so when someone presses **Send enquiry**, their own email app opens with the enquiry (including their postcode, if given) written out and addressed to the business email. They then just press send.

To have enquiries sent straight to the inbox instead, use a free form service such as [Formspree](https://formspree.io):

1. Sign up and create a form to get a URL like `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, add `action` and `method` to the form's opening tag:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/abcdwxyz" method="POST" data-email="sales@dslandscapingservices.com" novalidate>
   ```

The fields are still checked before sending.

## Changing the colours and fonts

The colours are set once at the top of `css/styles.css` under `:root`: `--forest` (main green), `--cream`, `--stone` and `--gold` (accents). Headings use Cormorant Garamond and body text uses Jost, both from Google Fonts. The italic words in headings are wrapped in `<em>…</em>`.

## Putting it online with Netlify

The site is set up for [Netlify](https://www.netlify.com) (free plan). `netlify.toml` already tells Netlify there's no build step and to publish this folder, so there's nothing to configure.

1. Log in at [app.netlify.com](https://app.netlify.com) (signing in with GitHub is easiest).
2. Choose **Add new site** (or **Add new project**) → **Import an existing project** → **GitHub**, and allow Netlify to access the `dslandscaping-services` repository.
3. Pick the repository. Leave the branch as it is (`claude/dslandscaping-website-duavmn`), leave the build command empty, and leave the publish directory as `.`.
4. Click **Deploy**. After a minute the site is live at an address like `random-name-123.netlify.app`.
5. To tidy the address, go to **Site configuration → Change site name**, e.g. `dslandscaping` → `dslandscaping.netlify.app`.

From then on, every change pushed to that branch goes live automatically.

### Using the dslandscapingservices.com domain

In Netlify, open **Domain management → Add a domain** and enter `dslandscapingservices.com`. Netlify then shows the DNS records to add.

⚠️ The business email (`sales@dslandscapingservices.com`) runs on this domain. The safest option is to **keep the domain's DNS where it is** and just add the records Netlify asks for at the current domain provider. If you move the domain's nameservers to Netlify DNS instead, copy the existing email (MX) records across first, or email will stop working.

Netlify adds a free HTTPS certificate automatically once the domain points at it.
