---
description: Brief client guidé puis création d'un site premium selon le workflow du kit
---

Tu démarres la création d'un nouveau site premium. Suis ces trois phases dans l'ordre, sans en sauter aucune.

## Phase 1 — Brief client (questions une par une)

Pose les 8 questions suivantes **une par une** : pose une question, attends la réponse, puis pose la suivante. Ne les pose JAMAIS toutes d'un coup. Si une réponse est vague, demande une précision avant de passer à la question suivante.

1. Quel est le nom de l'entreprise et son secteur d'activité ?
2. Que font-ils concrètement ? (le vrai métier, pas le pitch marketing)
3. Qui est le client cible, et quel est le positionnement prix : entrée de gamme, premium ou luxe ?
4. Quel ton de marque souhaité ? (ex. sobre et institutionnel, chaleureux, audacieux, éditorial…)
5. Existe-t-il une charte graphique (couleurs, typographies, logo) ou faut-il la créer ?
6. Quel contenu est disponible (textes, photos) et que faut-il générer ?
7. Y a-t-il des sites de référence aimés ou détestés ? (question optionnelle : si l'utilisateur n'en a pas, passer à la suite sans insister)
8. Quelles pages sont nécessaires ?

## Phase 2 — Proposition de direction artistique (validation obligatoire)

Une fois les 8 réponses obtenues, utilise les skills **frontend-design** et **taste-skill** (et **premium-design** si le positionnement est luxe/hôtellerie/haut de gamme, ainsi que **brandkit** si l'identité visuelle est à créer) pour formuler une proposition explicite de 5 à 6 lignes contenant :

- La **direction artistique** choisie et pourquoi elle sert ce client précis.
- Les **réglages taste-skill** : `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY` — chaque valeur justifiée en une phrase par rapport au brief (les valeurs par défaut du kit sont 7/7/4, ajuste-les si le brief le justifie).
- La **palette** (couleurs précises, pas de dégradés violets génériques).
- La **paire typographique** — JAMAIS Inter, Roboto ou Arial par défaut ; choisir des typographies qui portent la direction artistique.
- L'**élément signature de la homepage** : l'élément mémorable et distinctif de la page d'accueil.

Puis **attends explicitement la validation de l'utilisateur**. Ne génère AUCUN code avant son accord. S'il demande des ajustements, propose une version révisée et attends à nouveau sa validation.

## Phase 3 — Build (après validation uniquement)

Suivre STRICTEMENT le workflow défini dans `CLAUDE.md`, dans l'ordre :

1. **Build** : Next.js 14 (App Router) + TypeScript + Tailwind CSS + Motion + shadcn/ui, en partant du template correspondant (`templates/agency`, `templates/hospitality` ou `templates/saas`) si le type de projet correspond. Mobile-first.
2. **Motion pass** : motion-dev-animations pour les animations React, gsap-scrolltrigger pour le scroll, threejs-webgl uniquement si de la 3D a été explicitement demandée. `prefers-reduced-motion` respecté partout, 60fps minimum (transform/opacity uniquement).
3. **Vérification visuelle Playwright** : screenshots desktop (1440px) ET mobile (390px) de chaque page, correction de tout débordement ou rupture de layout.
4. **Polish** avec le skill impeccable.
5. **SEO pass** : metadata complètes, HTML sémantique, sitemap, robots, alt, performance.

Rappel des règles non négociables de `CLAUDE.md` : un élément signature par page, pas d'esthétique "template IA".
