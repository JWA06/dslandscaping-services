# DSLandscaping Services — Website

The website for **DSLandscaping Services**, landscaping and garden maintenance.

It's plain HTML, CSS and JavaScript. There's no build step and nothing to install, so it can be hosted almost anywhere for free.

## What's on the site

- **Header:** sits over the main photo, then turns solid green as you scroll. On phones, the menu opens as a full-screen panel.
- **Main section:** full-screen garden photo with the headline "Gardens worth coming home to."
- **About us:** photo, short introduction and three promises (free quotes, reliable, tidy).
- **Our services:** six services, each with a photo.
- **Statement band:** wide photo with a short quote and a "Book a free visit" button.
- **How it works:** three steps.
- **Contact:** phone, email, areas covered, hours and an enquiry form.
- **Footer.**

Two more sections are already built but hidden until there's real content for them: **Recent projects** (photos of his own jobs) and **Reviews**. See below.

## Files

```
index.html          The page itself (all the text lives here)
css/styles.css      Colours, fonts and layout
js/main.js          Header, mobile menu and the enquiry form
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

| Photo on the site | Where it is in `index.html` |
| --- | --- |
| Main garden photo (top of the page) | `class="hero-img"` |
| Garden tools | About section |
| Six service photos | `class="service-img"` blocks, in order |
| Stone path at dusk | `class="band-img"` |

## ⚠️ Before going live: replace the placeholder details

Search `index.html` for each one and replace **every** occurrence:

| Placeholder | Replace with |
| --- | --- |
| `07700 900123` | The real phone number as it should be shown |
| `+447700900123` | The same number in international format for the `tel:` links (e.g. `07123 456789` → `+447123456789`) |
| `hello@example.com` | The real email address (also in the form's `data-email="…"`) |
| `Your Town` | The town he's based in / the areas covered |
| `Mon–Fri 8am–6pm · Sat 8am–1pm` | The real working hours |

`07700 900123` is a fictional number reserved by Ofcom for TV and film, so nobody gets calls by mistake while it's still in place.

Also check these against what the business actually does, and edit anything that isn't right:
- The six services (and the matching options in the form's drop-down)
- "Free, no-obligation quotes", "On time, every time" and "We clear up and take the waste away"
- The About text. It reads best in his own words, e.g. *"I'm [name] and I started DSLandscaping Services in [year]…"*

## Showing his own work: Recent projects section

1. Save photos of finished jobs in `images/work/` as `job-1.jpg`, `job-2.jpg`, `job-3.jpg` (add more by copying a `<figure>…</figure>` block).
2. In `index.html`, find **RECENT WORK** and update each photo's `alt` description and caption.
3. Delete the two lines marked `HIDDEN: delete this line to show Recent Work`.
4. Add `<li><a href="#work">Our work</a></li>` to the menu near the top of `index.html`.

## Adding reviews

Use real reviews only, e.g. copied from Facebook or Google with the customer's permission.

1. In `index.html`, find **REVIEWS**.
2. Replace the example text with a real review and the customer's first name and town. Copy the `<blockquote>…</blockquote>` block for each extra review.
3. Delete the two lines marked `HIDDEN: delete this line to show Reviews`.

## How the enquiry form works

The site has no server, so when someone presses **Send enquiry**, their own email app opens with the enquiry written out and addressed to the business email. They then just press send.

To have enquiries sent straight to the inbox instead, use a free form service such as [Formspree](https://formspree.io):

1. Sign up and create a form to get a URL like `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, add `action` and `method` to the form's opening tag:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/abcdwxyz" method="POST" data-email="hello@example.com" novalidate>
   ```

The fields are still checked before sending.

## Changing the colours and fonts

The colours are set once at the top of `css/styles.css` under `:root`: `--forest` (main green), `--cream`, `--stone` and `--gold` (accents). Headings use Cormorant Garamond and body text uses Jost, both from Google Fonts.

## Putting it online (free options)

- **GitHub Pages:** in this repository on GitHub, open **Settings → Pages**, choose **Deploy from a branch**, pick the branch and the `/ (root)` folder, then save. The site will appear at `https://<username>.github.io/dslandscaping-services/`.
- **Netlify** or **Cloudflare Pages:** drag the project folder into their dashboard, or connect this repository.

Any of these can use a custom domain (e.g. `dslandscaping.co.uk`) once one has been bought.
