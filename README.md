# KRAFTIQ — Creatine Gummies Website

A static, no-build product/landing site for **KRAFTIQ**, a creatine-gummy brand for the EU
market. See [STRATEGY.md](STRATEGY.md) for brand/ICP strategy, [MARKETING-KIT.md](MARKETING-KIT.md)
for launch content, and [SHOT-LIST.md](SHOT-LIST.md) for the product photography brief.

## Live site
Deployed via GitHub Pages (Actions workflow in `.github/workflows/deploy-pages.yml`).
Once Pages is enabled (see below) it will be available at:
`https://timothymaistryfoster-bot.github.io/kraftiq-website/`

### One-time setup to go live
1. Go to the repo **Settings → Pages**.
2. Under "Build and deployment → Source", select **GitHub Actions**.
3. Push to `main` (already done) — the included workflow will build and deploy
   automatically on every push.
4. Optional: add a custom domain (e.g. `kraftiq.eu`) under Settings → Pages → Custom domain,
   and point your domain's DNS `CNAME`/`A` records at GitHub Pages.

### Connecting a custom domain (e.g. kraftiq.eu)
1. Register the domain with any EU-friendly registrar (Namecheap, INWX, IONOS).
2. In your DNS provider, add:
   - Four `A` records on the root domain pointing to GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `timothymaistryfoster-bot.github.io`
3. In the repo **Settings → Pages → Custom domain**, enter `kraftiq.eu` and save — GitHub
   will create a `CNAME` file in the repo automatically and provision HTTPS for you.
4. DNS propagation can take up to 24 hours; GitHub will show a green check once verified.

## Local development
No build step — just serve the folder statically, e.g.:
```bash
python3 -m http.server 8080
```
then open `http://localhost:8080`.

## Checkout (Stripe Payment Links)
Each pricing card's button (`.checkout-link` in `index.html`) is meant to point straight
at a **Stripe Payment Link** — no backend or code required:
1. Create a free Stripe account (or use an existing one) and switch on **Payments** for
   your country.
2. In the Stripe Dashboard, go to **Payment links → New**, create one product/price for
   each plan (one-time 30-day pack, monthly subscription, 3-month pack), matching the
   prices already shown on the site (€24.90, €19.90/mo, €59.90).
3. Copy each generated `https://buy.stripe.com/...` URL and paste it over the matching
   `PASTE_..._PAYMENT_LINK` placeholder href in `index.html`'s `#pricing` section.
4. Stripe Payment Links handle EU VAT, Klarna/SEPA/card payments, and receipts
   automatically — no server needed for a first launch.
5. Once you outgrow Payment Links (need cart bundling, discount codes at checkout, etc.),
   migrate to a full Shopify store or Stripe Checkout with a small serverless backend.

Until real links are pasted in, clicking a pricing button shows a friendly reminder
instead of navigating anywhere (see `initCheckoutLinks()` in `js/script.js`).

## Klaviyo email capture
The newsletter form (`#klaviyo-signup-form` in `index.html`) posts directly to Klaviyo's
public **Client Subscribe Profiles API** from `js/script.js` — no backend needed.

To connect it to your real Klaviyo account:
1. In Klaviyo, go to **Settings → API Keys** and copy your **Public API Key** (company ID).
2. In Klaviyo, go to **Lists & Segments**, open (or create) the list you want signups to
   join, and copy its **List ID** from the URL or list settings.
3. In `js/script.js`, replace:
   - `YOUR_PUBLIC_API_KEY` → your Public API Key
   - `YOUR_LIST_ID` → your List ID
4. Also replace `YOUR_PUBLIC_API_KEY` in the `<script ... klaviyo.js?company_id=...>` tag in
   `index.html`'s `<head>` — this enables Klaviyo's own on-site popups/forms product if you
   want to manage additional popups from the Klaviyo dashboard instead of/alongside the
   built-in form.
5. Set up your welcome flow in Klaviyo using the copy in `MARKETING-KIT.md` §4.

No other backend, npm install, or build tooling is required — everything is plain
HTML/CSS/JS so it can be dropped into any static host (GitHub Pages, Netlify, Vercel,
Cloudflare Pages) or into a Shopify theme's sections with minimal changes.

## Legal pages
`privacy.html`, `terms.html`, and `impressum.html` are templates only — have them reviewed
by a qualified lawyer before accepting real orders or collecting real customer data.
