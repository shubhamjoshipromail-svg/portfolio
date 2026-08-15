# Shubham Joshi — Applied AI Portfolio

Job-first portfolio for Shubham Joshi, an applied AI engineer working across
agent systems, trained ML models, data engineering, product interfaces, and
technical communication.

Production URL: <https://portfolio-production-9040.up.railway.app/>

## Design direction

The interface uses a Swiss-modernist editorial system rather than a generic
developer-portfolio template:

- a strict twelve-column layout;
- large grotesk typography with serif editorial contrast;
- monospace labels for metrics, states, and technical annotations;
- warm paper, near-black ink, and signal colors used semantically;
- evidence-specific diagrams instead of decorative technology graphics;
- restrained viewport reveals with a complete reduced-motion fallback.

The first screen states the hiring argument and presents four proofs. Deeper
technical context uses progressive disclosure so recruiters can scan quickly
without removing the detail engineering reviewers need.

Immediately below the hero, a recruiter fast lane reframes the same evidence
for Applied AI, forward-deployed, and data-science hiring. This is navigation,
not three competing personal brands: the portfolio keeps one identity while
making the relevant proof quick to find.

## Content hierarchy

Flagship work:

1. **AgentDock** — governed agent infrastructure and durable execution.
2. **ACHP × CMS** — client-facing healthcare data engineering and analysis.
3. **OpsPilot** — ModernBERT training, taxonomy redesign, and human review.
4. **Vibe Curator** — multi-model generative product and WebGL environment.

Supporting systems:

- RxCheck
- Negotiator
- FridgeChef
- Nimbus

Every public technical claim links to the relevant GitHub repository, model,
dataset, or official CMS data source.

The standalone Elsewhere section exposes GitHub, Hugging Face, LinkedIn, and
the AgentDock video without making visitors hunt through project cards.

## Resume system

The site includes a compact chooser for three synchronized one-page PDFs:

- Applied AI engineering
- Forward-deployed engineering
- Data science

Each variant preserves the same facts and project metrics; only ordering,
summary, and role-specific emphasis change. Regenerate them with
`tmp/resume-build-venv/bin/python tools/build_resumes.py`.

## Stack

- semantic HTML
- hand-authored CSS
- vanilla JavaScript
- Caddy
- Docker
- Railway

The repository still contains the existing FastAPI portfolio-assistant backend.
The redesigned frontend does not currently expose that assistant; it remains
available for a later, deliberately designed integration.

## Local preview

```bash
python3 -m http.server 4173
```

Open <http://127.0.0.1:4173>.

## Production deployment

Railway builds the root `Dockerfile`. Caddy serves the static frontend and
retains the existing `/api/*` reverse proxy to FastAPI.

```text
Browser
  └── Caddy on Railway $PORT
      ├── /          static portfolio
      ├── /assets/*  resume and media
      └── /api/*     FastAPI on 127.0.0.1:8000
```

The current production site is unchanged until this branch is pushed and
deployed. Railway can continue serving the same URL, so no redirect is required.

## Verification

Before deployment:

```bash
node --check script.js
git diff --check
docker build -t shubham-portfolio .
docker run --env-file .env -p 8080:8080 shubham-portfolio
```

Then verify desktop, 390 px mobile, keyboard navigation, reduced motion, every
external source, metadata, and any downloadable resumes.
