# Contentstack Marketplace Course App

A public training sample for the Contentstack Marketplace app course on LearnUpon:
[https://contentstack-external.learnupon.com/catalog/courses/3472721](https://contentstack-external.learnupon.com/catalog/courses/3472721)

You start from this skeleton and add Marketplace UI locations by following the course exercises. It is a learning sample, not a production app: it is not deployed, and the screens are intentionally minimal until you complete the exercises.

## What is in the repo

| Path | What it is |
| --- | --- |
| `src/containers/<Location>/` | One screen per UI location. The `solution*.txt` file beside each is the course answer. |
| `snippets/exercise-1` to `exercise-8` | Code to paste in, per exercise, as the course directs. |
| `src/common/` | App SDK providers, hooks and contexts shared by the screens. |
| `manifest.json` | Sample app manifest (name, uid and organization are empty; `base_url` is `http://localhost:3000`). |
| `rte/` | A separate JSON RTE plugin (webpack, its own `package.json`). See `rte/README.md`. |

## UI locations

| Location | Route |
| --- | --- |
| Custom field (json) | `/custom-field` |
| Stack dashboard | `/stack-dashboard` |
| Asset sidebar | `/asset-sidebar` |
| Entry sidebar | `/entry-sidebar` |
| Full page | `/full-page` |
| Field modifier | `/field-modifier` |
| App configuration | `/app-configuration` |
| JSON RTE plugin | `/json-rte.js` (built from `rte/`) |

`/` shows links to these routes; any other path shows a 404 page. The app uses `BrowserRouter`.

## Set up

1. `npm install` (Node version is not pinned in the repo; use a current LTS compatible with `react-scripts` 5).
2. `npm start` serves the app at `http://localhost:3000`, the `base_url` in `manifest.json`.
3. Register the app in Contentstack with that manifest and follow the course for each exercise.

Optional: `REACT_APP_MARKETPLACE_APP_NAME` is read by `src/common/providers/MarketplaceAppProvider.tsx`.

## Scripts

`npm start`, `npm run build`, `npm test`, `npm run lint`, `npm run lint:fix`, `npm run prettify`. The repo has no tests yet and no deploy script; hosting is up to the learner. For the RTE plugin, run `npm run build` (or `build-academy`) inside `rte/`.

## Links

- Jira Epic: [MKT-19840](https://contentstack.atlassian.net/browse/MKT-19840)
- Wiki: `marketplace-apps/academycourse/` in `contentstack/product-wiki`, if present.
- Agents: see `CLAUDE.md`.
