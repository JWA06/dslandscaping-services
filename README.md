# DSLandscaping Services — Website

A friendly, green-themed website for **DSLandscaping Services**, a local landscaping and garden care business.

It's a plain HTML, CSS and JavaScript site. There's no build step and nothing to install, so it can be hosted almost anywhere for free.

## What's on the site

| Section | What it shows |
| --- | --- |
| **Hero** | Headline, short intro, "Get a Free Quote" button and a garden illustration |
| **Services** | Garden maintenance, lawn care & turfing, hedge & tree trimming, patios & paving, fencing & decking, planting & garden design |
| **About** | A short introduction and four values: reliable, tidy, fair pricing, care in every detail |
| **Our Work** | A six-picture gallery (currently illustrations, ready to swap for real photos) |
| **How It Works** | Four simple steps from first contact to finished garden |
| **Contact** | Phone, email, area covered, opening hours and a quote request form |

It works on phones, tablets and desktops, and includes a mobile menu, gentle scroll animations (turned off for visitors who prefer reduced motion) and keyboard-friendly navigation.

## Files

```
index.html          The page itself (all the text lives here)
css/styles.css      Colours, fonts and layout
js/main.js          Mobile menu, scroll effects and the contact form
images/favicon.svg  Browser tab icon
images/work/        Gallery pictures for the "Our Work" section
```

## Previewing it

Double-click `index.html` to open it in a browser. That's all you need.

## ⚠️ Before going live: replace the placeholder details

The contact details are placeholders. Search `index.html` for each one and replace **every** occurrence:

| Placeholder | Replace with | Where it appears |
| --- | --- | --- |
| `07700 900123` | The real phone number as it should be shown | Call-to-action band, contact section, footer |
| `+447700900123` | The same number in international format for `tel:` links (e.g. `07123 456789` → `+447123456789`) | Every `tel:` link |
| `hello@example.com` | The real email address | Contact section, footer, and the form's `data-email="…"` attribute |
| `Your Town & surrounding areas` | The towns or areas covered | Contact section and footer (written `Your Town &amp; surrounding areas` in the HTML) |
| `Mon–Fri 8am–6pm · Sat 8am–1pm` | The real working hours | Contact section |

`07700 900123` is a fictional number reserved by Ofcom for TV and film, so nobody will receive calls by mistake while it's still in place.

Also check that these statements are true for the business, and edit or remove any that aren't:
- "Free, no-obligation quotes" (hero, badges, How It Works and the call-to-action band)
- "We take the garden waste away" (About section)
- The list of services (remove any that aren't offered, or add extras such as garden clearance)

## Adding real photos to "Our Work"

Real photos of finished jobs will make the biggest difference to the site.

1. Put the photos in `images/work/`, e.g. `lawn.jpg`, `patio.jpg`. Landscape photos about 1200×900 px work best. Resize large phone photos first so the page stays quick to load.
2. In `index.html`, find the "Our Work" section and change each `src`, for example `images/work/lawn.svg` to `images/work/lawn.jpg`.
3. Update each `alt` text to describe the photo, e.g. `alt="Newly laid lawn in a back garden"`, and the caption under it if needed.

Photos are cropped to a 4:3 shape automatically, so slightly different sizes are fine.

## How the contact form works

The site has no server, so when a visitor presses **Send My Enquiry**, their own email app opens with the enquiry already written out and addressed to the business email. They then just press send.

To have enquiries sent straight to the inbox without opening the visitor's email app, use a free form service such as [Formspree](https://formspree.io):

1. Sign up and create a form to get a URL like `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, add `action` and `method` to the form's opening tag:
   ```html
   <form class="contact-form reveal" id="contact-form" action="https://formspree.io/f/abcdwxyz" method="POST" data-email="hello@example.com" novalidate>
   ```

That's it. The fields are still checked before sending, and the form then submits to Formspree instead of opening an email app.

## Changing the colours

All colours are defined once at the top of `css/styles.css` under `:root`. The main green is `--green-700` (`#256b40`) and the light accent is `--lime` (`#b5e06a`). Change those values and the whole site updates.

## Putting it online (free options)

- **GitHub Pages:** in this repository on GitHub, open **Settings → Pages**, choose **Deploy from a branch**, pick the branch and the `/ (root)` folder, then save. The site will appear at `https://<username>.github.io/dslandscaping-services/`.
- **Netlify** or **Cloudflare Pages:** drag the project folder into their dashboard, or connect this repository.

Any of these can use a custom domain (e.g. `dslandscaping.co.uk`) once one has been bought.
