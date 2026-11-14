# Nag & Associates Survey Consultancy Website

A responsive one-page website for **Nag & Associates Survey Consultancy** (Raniganj, Paschim Bardhaman, West Bengal) and its sister concern **Aadrita Buildcon LLP**, built with plain HTML, CSS and JavaScript. It needs no build step or dependencies.

## Structure

```
index.html          Page content (all sections)
css/styles.css      Styles, colour tokens and responsive layout
js/main.js          Mobile menu, scroll effects, contact form
assets/favicon.svg  Site icon
```

## Sections

Header · Hero ("Precision Today, Progress Tomorrow") · Values strip · About · Survey & mapping services · Technology · Aadrita Buildcon LLP (sister concern) · Call to action · Contact form · Footer

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing notes

- **Contact details** appear in the Contact section and footer of `index.html`; the form recipient is `RECIPIENT` in `js/main.js`.
- The contact form opens the visitor's email app with the enquiry filled in. To receive submissions directly, set the form's `action` to a service such as Formspree or Netlify Forms and remove the `mailto` handler.
- **Brand colours** live in `css/styles.css` under `:root` (`--navy`, `--saffron`, `--green`).

## Deploy

As a static site it can be hosted on GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel, or any shared web host.
