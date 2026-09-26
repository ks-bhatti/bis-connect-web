# BIS Connect — Company Website

Public marketing and business-verification website for **BIS CONNECT (SMC-PRIVATE) LIMITED**.

Static site (plain HTML + CSS + JS). **No backend, no build step, no dependencies.** Designed to be
hosted reliably on **GitHub Pages**, including under a project subpath
(`https://<username>.github.io/<repo>/`).

## Contents

```
index.html                       Single-page company website (Home, About, Services,
                                 Platform, How it works, Why, Pricing, Policies, Contact)
privacy-policy.html              Privacy Policy
terms-and-conditions.html        Terms & Conditions
refund-cancellation-policy.html  Refund & Cancellation Policy
service-delivery-policy.html     Service Delivery Policy
payment-policy.html              Payment Policy
css/styles.css                   Design system + all styling
js/main.js                       Mobile nav, scroll reveal, counters, sticky header
assets/                          Logo (from official BIS Connect letterhead), favicons, OG image
robots.txt  sitemap.xml          SEO
.nojekyll                        Tells GitHub Pages to serve files as-is (no Jekyll)
```

All internal links and asset references use **relative paths**, so the site works both at a domain
root and under a `/<repo>/` subpath without changes.

## Preview locally

Any static file server works. For example:

```bash
# from this folder
python -m http.server 8080
# then open http://localhost:8080/
```

Or simply open `index.html` in a browser (note: some browsers restrict a few features on `file://`;
a local server is recommended).

## Deploy to GitHub Pages (project site)

> Do this only when you are ready to publish.

1. Create a new GitHub repository, e.g. `bis-connect-web`.
2. Push the contents of this folder to the `main` branch.
3. In the repo: **Settings → Pages**.
4. Under **Build and deployment**, set **Source = Deploy from a branch**, **Branch = `main`**,
   **Folder = `/ (root)`**, then **Save**.
5. After a minute, the site is live at `https://<username>.github.io/bis-connect-web/`.

### Custom domain (optional)
If you point a custom domain (e.g. `bisconnect.pk`) at GitHub Pages:
1. Add a file named `CNAME` (no extension) to this folder containing only the domain, e.g. `bisconnect.pk`.
2. Configure the domain's DNS per GitHub's instructions and enable **Enforce HTTPS** in Settings → Pages.
3. Update the absolute URLs in `robots.txt` and `sitemap.xml` to the custom domain.

## Go-live status

Content and business/legal wording are approved and published (refund 7-day window, 5–7 business-day
review, activation within one business day, Pakistan governing law, "operated by" branding). Policy
pages carry an effective date of 26 September 2026, and `robots.txt`/`sitemap.xml` use the live base URL
`https://ks-bhatti.github.io/bis-connect-web/`.

- **Contact details** are the official letterhead values (email, phones, address) — approved for public display.
- **Company Information** block on the About section shows the SECP corporate identifier `0352556`,
  incorporation date 25 August 2026, company type and registered office (Punjab), from the official certificate.
- **Pricing**: "Request Pricing / Contact us" only — no prices shown.

## Notes

- The site contains no credentials or private corporate data of any kind.
- The BIS Connect logo in `assets/` was extracted from the official company letterhead. A vector (SVG)
  or high-resolution transparent PNG version can be dropped in to replace it if available.
