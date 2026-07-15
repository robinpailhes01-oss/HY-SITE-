# Web Kit — Premium Site Builder

Kit maître pour créer des sites web premium avec Claude Code : agences, hôtellerie/luxe, SaaS. Il embarque des skills de design, une config MCP et un workflow imposé (voir [CLAUDE.md](CLAUDE.md)).

## Usage — "Use this template"

1. Cliquer sur **Use this template** sur GitHub (ou cloner ce repo) pour démarrer un nouveau projet de site.
2. Ouvrir le projet avec **Claude Code** — les skills (`.claude/skills/`), les serveurs MCP (`.mcp.json`) et le workflow (`CLAUDE.md`) sont chargés automatiquement.
3. Décrire le site à construire (type de client, ton, contenu). Claude suit alors le workflow : direction artistique → build Next.js 14 → motion pass → vérification visuelle Playwright → polish → SEO.

## Skills embarqués (`.claude/skills/`)

| Skill | Rôle | Source |
|---|---|---|
| `frontend-design` | Direction artistique distinctive, typographie, anti-défauts "template" | [anthropics/claude-code](https://github.com/anthropics/claude-code) |
| `taste-skill` | Anti-slop : landing pages, portfolios, redesigns qui n'ont pas l'air générés | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) |
| `premium-design` | Interfaces éditoriales haut de gamme (luxe, hôtellerie, marques premium) | [luukalleman/premium-design-skill](https://github.com/luukalleman/premium-design-skill) |
| `motion-dev-animations` | Animations React 60/120fps avec Motion.dev (successeur de Framer Motion) | [199-biotechnologies/motion-dev-animations-skill](https://github.com/199-biotechnologies/motion-dev-animations-skill) |
| `motion-framer` | Composants motion, variants, gestures, AnimatePresence | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |
| `gsap-scrolltrigger` | Animations pilotées par le scroll : pinning, scrub, parallaxe | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |
| `threejs-webgl` | Scènes 3D / WebGL (uniquement si la 3D est demandée) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |
| `impeccable` | Polish final : hiérarchie, espacements, accessibilité, micro-interactions | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) |

## Serveurs MCP (`.mcp.json`)

- **Playwright** (`npx @playwright/mcp@latest`) — vérification visuelle obligatoire (screenshots desktop + mobile).
- **Context7** (`npx -y @upstash/context7-mcp`) — documentation à jour des librairies (Next.js, Tailwind, Motion…).

## Structure

```
.claude/skills/        Skills de design et d'animation
.mcp.json              Config MCP (Playwright, Context7)
CLAUDE.md              Workflow obligatoire et règles non négociables
templates/agency/      Squelette site agence
templates/hospitality/ Squelette site hôtellerie/luxe
templates/saas/        Squelette site SaaS
components/            Composants réutilisables
```

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Motion (motion.dev) · shadcn/ui
