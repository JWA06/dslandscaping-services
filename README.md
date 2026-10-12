# DSLandscaping Services — Website

The website for **DSLandscaping Services**, garden maintenance and landscaping.

It's plain HTML, CSS and JavaScript. There's no build step and nothing to install, so it can be hosted almost anywhere for free.

## What's on the site

- **Header:** logo, phone number, and a green menu bar. On phones, a call button and a menu button.
- **Top section:** what the business does, the area it covers, a "Get a free quote" button and a call button.
- **What we do:** eight services, each with a short description.
- **Call strip:** "Need a hand with the garden?" with the phone number.
- **About us:** a short introduction, plus "How it works" in three steps.
- **Get a free quote:** phone, email, areas covered, hours and an enquiry form.
- **Footer.**

Two more sections are already built but hidden until there's real content for them: **Recent work** (photos) and **Reviews**. See below.

## Files

```
index.html          The page itself (all the text lives here)
css/styles.css      Colours, fonts and layout
js/main.js          Mobile menu and the enquiry form
images/favicon.svg  Browser tab icon
images/work/        Put photos of finished jobs here
```

## Previewing it

Double-click `index.html` to open it in a browser.

## ⚠️ Before going live: replace the placeholder details

The contact details are placeholders. Search `index.html` for each one and replace **every** occurrence:

| Placeholder | Replace with |
| --- | --- |
| `07700 900123` | The real phone number as it should be shown |
| `+447700900123` | The same number in international format for the `tel:` links (e.g. `07123 456789` → `+447123456789`) |
| `hello@example.com` | The real email address (also in the form's `data-email="…"`) |
| `Your Town` | The town he's based in / the areas covered |
| `Monday to Friday, 8am–6pm` / `Saturday, 8am–1pm` | The real working hours |

`07700 900123` is a fictional number reserved by Ofcom for TV and film, so nobody gets calls by mistake while it's still in place.

Also check these against what the business actually does, and edit or remove anything that isn't right:
- The eight services in "What we do" (and the matching options in the form's drop-down)
- "Free, no-obligation quotes", "Garden waste taken away" and "Small jobs welcome" in the top section
- The "About us" text. It's written to be general. It reads much better in his own words, e.g. *"I'm [name] and I started DSLandscaping Services in [year]…"*

## Adding photos

Real photos of his own work are what will make the site feel genuine. Phone photos are fine. Landscape (sideways) shots work best, and resizing them to about 1600px wide keeps the site quick to load.

### Recent work section

1. Save photos of finished jobs in `images/work/` as `job-1.jpg`, `job-2.jpg`, `job-3.jpg` (add more by copying a `<figure>…</figure>` block).
2. In `index.html`, find **RECENT WORK** and update each photo's `alt` description and caption.
3. Delete the two lines marked `HIDDEN: delete this line to show Recent Work`.
4. Add `<li><a href="#work">Our Work</a></li>` to the menu near the top of `index.html`.

### Big photo behind the heading

1. Save a good wide garden photo as `images/hero.jpg`.
2. In `css/styles.css`, find the `.hero` section, copy the `background: …` line from the note there, and paste it underneath the note.

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

## Changing the colours

The colours are set once at the top of `css/styles.css` under `:root`. `--green` is the main green and `--green-dark` is the menu bar and footer.

## Putting it online (free options)

- **GitHub Pages:** in this repository on GitHub, open **Settings → Pages**, choose **Deploy from a branch**, pick the branch and the `/ (root)` folder, then save. The site will appear at `https://<username>.github.io/dslandscaping-services/`.
- **Netlify** or **Cloudflare Pages:** drag the project folder into their dashboard, or connect this repository.

Any of these can use a custom domain (e.g. `dslandscaping.co.uk`) once one has been bought.
