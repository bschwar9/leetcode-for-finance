# Ascend — the roadmap to your dream job

"LeetCode for every career." Search a company + role and get a structured,
NeetCode-style **roadmap**, crowd-sourced **interview questions**, **networking**
targets, **compensation** data, and the **skills & certifications** you need —
all in one place.

This repo currently contains the **MVP front-end prototype**: a zero-dependency
static web app (HTML / CSS / vanilla JS). No build step, no install — open it in
a browser and it works.

## Run it locally

Any static server works. The simplest:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in your browser.

## Host it publicly on GitHub Pages (free)

This is a static site, so GitHub Pages can serve it with no build step. One-time setup:

1. **Make the repo public:** repo **Settings → General → Danger Zone → Change
   visibility → Make public**. (Free GitHub Pages requires a public repo.)
2. **Turn on Pages:** **Settings → Pages → Build and deployment →
   Source: _Deploy from a branch_**, pick branch **`main`**
   and folder **`/ (root)`**, then **Save**.
3. Wait ~1 minute. Your shareable URL will be:

   **https://bschwar9.github.io/leetcode-for-finance/**

Every push to that branch re-publishes automatically. The site uses only
relative paths, so it works correctly under the `/leetcode-for-finance/` subpath.

## What's here

```
index.html        Landing page: search + browse companies/fields
role.html         Role detail page with the 5 tabs
css/styles.css    Blue/white theme + NeetCode-style roadmap tree
js/data.js        Seed/mock content (companies, roles, questions, people, comp)
js/app.js         All rendering + interactivity
```

### The five tabs (per role)

| Tab | What it does |
|-----|--------------|
| **Roadmap** | Ordered topic tree with curated video/resource links. Check items off — progress is saved per-device in `localStorage`. |
| **Interview Questions** | Crowd-sourced questions by round/difficulty. Upvote and add your own (persisted locally). |
| **Networking** | People in the target role with outreach **message templates** and a one-click LinkedIn search. |
| **Compensation** | Self-reported base / bonus / signing ranges with a visual breakdown. |
| **Skills & Requirements** | Must-haves, nice-to-haves, and the certifications that matter. |

Seeded examples: Morgan Stanley (Financial Analyst), Goldman Sachs (IB Analyst),
JPMorgan (Quant Analyst), BlackRock (Risk Analyst).

## Adding a company or role

Everything is data-driven. Add an entry to `DATA.companies` in `js/data.js`
following the shape of the existing ones — the UI renders automatically.

## Roadmap / phase 2 ideas

- **Backend + database** so questions, votes, and roadmaps are truly shared
  (not just local), with user accounts.
- **Real LinkedIn / data integrations** for networking and comp.
- **More tabs:** resume review (ATS keyword check), mock interviews / practice
  problems, an application tracker, and company-culture reviews.
- Expand beyond finance into tech, consulting, accounting, and more.

> All data here is illustrative sample content for the prototype.
