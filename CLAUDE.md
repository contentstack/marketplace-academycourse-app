## Developer Ecosystem workflow (read first)

This repo belongs to a Developer Ecosystem pod (DevEx: MCP, CLI, SDK, Starters including the SAP connector; Marketplace; Mkt Apps; Developer Hub).
New features and changes go through the deveco workflow before any code is written here:

1. Find the work's DSCDX idea and where it is in the flow. No idea yet: write one with the `brief` skill in `contentstack/product-wiki`.
2. The PRD, TRD, test cases, tickets and code come from your own routines (PM, Architect, QA agent, Dev), gate by gate. Do not plan, draft or build them in this session. No routine for a step yet: set it up with the `deveco-aisdlc-onboarding` skill in `contentstack/agent-skills`.
3. The order, gates and intake: https://github.com/contentstack/agent-skills/blob/main/skills/deveco-aisdlc-onboarding/references/run-protocol.md

Bug fixes and support cases keep this repo's usual path. Not sure which applies? Ask before building.

## This repo

Academy Course: a public training sample (Tier 1, UI-only) for the Contentstack Marketplace app course on LearnUpon. Learners start from this near-empty app and add UI locations by following the course exercises, so the skeleton and `snippets/` must match the course. Do not "finish" or refactor the stubs. Not deployed (no prod host found). Epic: MKT-19840. Wiki: `marketplace-apps/academycourse/` in `contentstack/product-wiki` if present (none yet).

- Stack: React 18 + CRA (`react-scripts`), TypeScript, `@contentstack/app-sdk`, `@contentstack/venus-components`, `react-router-dom` v6 with `BrowserRouter`.
- `manifest.json`: sample manifest (name/uid/org empty, base_url `http://localhost:3000`). Locations and routes: custom field `/custom-field` (json), stack dashboard `/stack-dashboard`, asset sidebar `/asset-sidebar`, entry sidebar `/entry-sidebar`, full page `/full-page`, field modifier `/field-modifier`, config `/app-configuration`, RTE `/json-rte.js`. `/` lists these links; `*` is a 404.
- `src/containers/<Location>/`: one screen per location; the `solution*.txt` files beside each are the course answers.
- `snippets/exercise-1..8/`: code the learner pastes in, per exercise.
- `rte/`: separate JSON RTE plugin (webpack, own `package.json`, from the RTE plugin boilerplate); `rte/src/solution-*.txt` are its answers.
- `src/common/`: providers, hooks, contexts for the App SDK.
- External services: Contentstack App SDK only. LearnUpon hosts the course.
- Env var names: `REACT_APP_MARKETPLACE_APP_NAME` (read in `MarketplaceAppProvider.tsx`); `NODE_ENV` (build-time).
- CI: only `.github/workflows/policy-scan.yml` and `sca-scan.yml` (Snyk). No tests, no `.nvmrc`; Node version unknown.

### Commands (from package.json; not yet run in CI — verified in the [Tests]/[Routine] PR)

- `npm start` (`react-scripts start`)
- `npm run build` (`react-scripts build`)
- `npm test` (`react-scripts test --env=jsdom --verbose`)
- `npm run lint`, `npm run lint:fix`, `npm run prettify`, `npm run precommit`, `npm run eject`
- RTE plugin, in `rte/`: `npm run build`, `start`, `dev`, `build-academy`

Branches `claude/<type>/<KEY>-<slug>`, PRs into `main`.
