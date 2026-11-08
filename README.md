# Dark Fruits — website

Static site for the Dark Fruits Blox Fruits community. Nine pages, no framework, no dependencies,
no build step needed to serve it. **Every file sits in the repo root — there are no subfolders.**

## Files

| File | What it is |
| --- | --- |
| `index.html` | home |
| `trading.html` `values.html` `events.html` `giveaways.html` | section pages |
| `clans.html` `shop.html` `staff.html` `rules.html` | section pages |
| `styles.css` | the whole design system |
| `app.js` | nav, countdown, Discord stats, ambient canvas |
| `logo.webp` | animated logo (563 KB) |
| `logo-mark.webp` `logo-mark.png` | static logo, full artwork |
| `logo-icon.png` `logo-icon-96.png` | cropped skull emblem used in the nav and as the app icon |
| `favicon-32.png` | browser tab icon |
| `og.png` | social sharing card |
| `f00.png` … `f40.png` | fruit artwork |
| `build.mjs` | regenerates the nine pages from one shared layout |
| `serve.mjs` | local preview server |
| `wrangler.jsonc` | Cloudflare Worker config (serves the root folder) |
| `package.json` | `npm run build` / `serve` / `deploy` |
| `.assetsignore` | keeps tooling out of the public upload |

## Editing content

The pages share one header and footer, so they are generated rather than hand-edited:

1. Edit `build.mjs` — page copy, cards, links and section order live there.
2. Run `npm run build` to rewrite the HTML files.
3. Commit the generator and the generated HTML together.

Styling lives in `styles.css`; the design tokens (colours, radii, fonts) are the custom
properties at the top of that file.

## Local preview

```
npm run serve      # http://localhost:3000
```

Node 18 or newer. Nothing to install.

## Deploying to Cloudflare

**Wrangler** (keeps your `*.workers.dev` URL):

```
npx wrangler deploy
```

`wrangler.jsonc` points Cloudflare at the root folder, and `.assetsignore` stops it uploading
`build.mjs`, `serve.mjs` and the other tooling files.

**Dashboard:** Workers & Pages → Create application → Get started → Drag and drop your files →
select all the site files.

**No account setup:** <https://www.cloudflare.com/drop> accepts a folder or zip.

## Uploading through GitHub's website

Drag every file into the repo root. GitHub's drag-and-drop handles ordinary files, but it does
not accept dotfiles — add `.gitignore` and `.assetsignore` separately with
**Add file → Create new file** and name them exactly that.

## Notes

- The old 8.1 MB `dark-fruits-logo.gif` was replaced by `logo.webp`.
- Member and online counts are read live from Discord's public invite API, with static fallbacks.
- The event countdown target is `const end = new Date(...)` in `app.js`.
- Motion respects `prefers-reduced-motion`, and content never needs JavaScript to be visible.
