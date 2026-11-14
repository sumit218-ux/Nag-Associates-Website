# Nag & Associates Survey Consultancy Website

A responsive one-page website for **Nag & Associates Survey Consultancy** (Raniganj, Paschim Bardhaman, West Bengal) and its sister concern **Aadrita Buildcon LLP**, built with plain HTML, CSS and JavaScript. It needs no build step or dependencies.

## Structure

```
index.html          Main website (all sections)
landing.html        Marketing landing page (hero, features, testimonials, pricing, CTA)
css/styles.css      Styles, colour tokens and responsive layout
js/main.js          Mobile menu, scroll effects, contact form
css/landing.css     Landing page styles
js/landing.js       Landing page menu, animations, quote form
assets/favicon.svg  Site icon
```

## Sections

Header · Hero ("Precision Today, Progress Tomorrow") · Values strip · About · Survey & mapping services · Plans, approvals & printing · Technology · Aadrita Buildcon LLP (sister concern) · Call to action · Contact form · Footer

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Landing page placeholders

`landing.html` has two sections to finish before publishing (both marked with `TODO` comments):

- **Testimonials:** replace the three sample quotes with real client feedback (with permission).
- **Pricing:** replace `₹ —` with your starting prices, or change it to "On request".

## Editing notes

- **Contact details** appear in the Contact section and footer of `index.html`; the form recipient is `RECIPIENT` in `js/main.js`.
- The contact form opens the visitor's email app with the enquiry filled in. To receive submissions directly, set the form's `action` to a service such as Formspree or Netlify Forms and remove the `mailto` handler.
- **Brand colours** live in `css/styles.css` under `:root` (`--navy`, `--saffron`, `--green`).

## Deploy

As a static site it can be hosted on GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel, or any shared web host.

## Single-file demo

`demo/nag-associates-demo.html` (main site) and `demo/landing-demo.html` (landing page) are each bundled into one file (CSS and JS inlined) so it can be opened or shared on its own. It is a generated copy: edit `index.html`, `css/` and `js/`, then regenerate the demo.
