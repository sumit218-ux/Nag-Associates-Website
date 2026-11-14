# Nag & Associates Website

A responsive one-page website for Nag & Associates (Chartered Accountants & Business Advisors), built from scratch with plain HTML, CSS and JavaScript. It needs no build step or dependencies.

## Structure

```
index.html          Page content (all sections)
css/styles.css      Styles, colour tokens and responsive layout
js/main.js          Mobile menu, scroll effects, contact form
assets/favicon.svg  Site icon
```

## Sections

Header and navigation · Hero · About · Services · Approach · Team · Call to action · Contact form · Footer

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Replace before going live

- **Contact details** (`index.html`, Contact section): address, phone and email.
- **Form recipient** (`js/main.js`): the `RECIPIENT` email address. The form currently opens the visitor's email app. To receive submissions directly, set the form's `action` to a service such as Formspree or Netlify Forms and remove the `mailto` handler.
- **Team** (`index.html`, Team section): partner names, roles, bios, and photos (replace the `.avatar` initials with `<img>` tags).
- **Brand colours** (`css/styles.css`, `:root`): `--navy` and `--gold`.

## Deploy

As a static site it can be hosted on GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel, or any shared web host.
