# Web Kit — Kit maître de création de sites premium

Ce repo est un template de départ pour construire des sites web premium (agences, hôtellerie/luxe, SaaS). Toute création de site DOIT suivre le workflow ci-dessous, dans l'ordre.

## Workflow obligatoire

### 1. Direction artistique

- Utiliser les skills **frontend-design** et **taste-skill** pour définir la direction artistique avant d'écrire le moindre composant.
- Paramètres taste-skill imposés : `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 7`, `VISUAL_DENSITY: 4`.
- Pour les clients **luxe / hôtellerie / haut de gamme**, utiliser en plus le skill **premium-design** (direction éditoriale, typographie serif, rythme magazine).
- Livrable de cette étape : palette, paire typographique, grille, ton, et l'élément signature de chaque page.

### 2. Build

Stack imposée :

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Motion** (motion.dev, successeur de Framer Motion)
- **shadcn/ui** pour les primitives UI

Structurer les composants réutilisables dans `components/`, partir des squelettes de `templates/` quand le type de projet correspond (`agency`, `hospitality`, `saas`).

### 3. Motion pass

Une passe d'animation dédiée, après le build statique :

- **motion-dev-animations** (skill) pour toutes les animations React : entrées, micro-interactions, transitions de layout, springs.
- **gsap-scrolltrigger** (skill) pour tout ce qui est piloté par le scroll : pinning, scrub, parallaxe, timelines scrollées.
- **threejs-webgl** (skill) UNIQUEMENT si de la 3D est explicitement demandée. Ne jamais ajouter de 3D de sa propre initiative.
- `prefers-reduced-motion` doit être respecté sur TOUTES les animations, sans exception.

### 4. Vérification visuelle (obligatoire)

- Utiliser le MCP **Playwright** (configuré dans `.mcp.json`) pour vérifier visuellement chaque page.
- Screenshots obligatoires en **desktop** (1440px) ET **mobile** (390px) avant de considérer une page terminée.
- Corriger tout débordement, chevauchement, ou rupture de layout constaté sur les screenshots.

### 5. Polish

- Passe finale avec le skill **impeccable** : hiérarchie visuelle, espacements, alignements, états d'erreur/vides, accessibilité, micro-interactions, copy UX.

### 6. SEO pass

- Metadata Next.js complètes (`title`, `description`, Open Graph, Twitter cards).
- HTML sémantique (un seul `h1` par page, hiérarchie de headings correcte).
- `sitemap.ts`, `robots.ts`, images avec `alt`, performance (LCP, CLS).

## Règles non négociables

- **Pas d'Inter par défaut.** Choisir une typographie qui porte la direction artistique.
- **Pas de dégradés violets génériques** ni d'esthétique "template IA".
- **Un élément signature par page** : chaque page doit avoir au moins un élément mémorable et distinctif.
- **Mobile-first** : concevoir et vérifier d'abord le mobile.
- **60fps minimum** sur toutes les animations (transform/opacity uniquement, pas d'animation de layout properties).

## Ressources

- Skills : `.claude/skills/` (voir README pour la liste complète)
- MCP : Playwright (vérification visuelle) et Context7 (docs à jour des librairies) dans `.mcp.json`
- Templates de départ : `templates/agency`, `templates/hospitality`, `templates/saas`
- Composants partagés : `components/`
