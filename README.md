# missetmisterdour — base fullstack sécurisée (v0.3)

Cette version corrige l’erreur de déploiement Vercel `404: NOT_FOUND` en ajoutant une **entrée serverless Vercel** qui route toutes les URLs vers l’app Express.

## Stack

- Frontend: React + Wouter
- Backend: Node + Express
- API: tRPC
- ORM: Drizzle (MySQL schema)
- Tests: Vitest

## Ce qui est implémenté

### 1) Runtime serveur concret

- Entrée serveur locale: `apps/server/src/index.ts`
- Application Express: `apps/server/src/app.ts`
- Page d'accueil `GET /` (HTML)
- Endpoint `GET /event/2026`
- Handler 404 JSON uniforme (`code: NOT_FOUND`)

### 2) Compatibilité Vercel (fix 404)

- `api/index.ts` exporte l’app Express pour Vercel Serverless Functions
- `api/[...all].ts` active le fallback catch-all
- `vercel.json` force toutes les routes vers `api/index.ts` via `routes` + build `@vercel/node`

Résultat: toutes les URLs passent par **une seule fonction Node** (`api/index.ts`), ce qui évite les non-correspondances de réécriture (`/api/$1`) et supprime la 404 plateforme.

### 3) Expérience navigateur

- `public/index.html` sert un shell frontend minimal
- `public/favicon.svg` évite les erreurs 404 de ressource en console

### 4) Sécurité runtime

- `helmet()` activé
- `express-rate-limit` activé (fenêtre 10 min)
- `x-powered-by` désactivé

### 5) tRPC branché côté Express

- Route `/trpc`
- Router `health` public
- Router `adminPing` protégé par rôle `ADMIN+`
- Context tRPC issu des headers (base pour future session DB)

### 6) RBAC et briques sécurité existantes

- Hiérarchie `USER(1) -> SUPER_ADMIN(9)` + `hasPermission`
- Vote anti-spam: hash SHA256(ip + salt) + 1 vote / 10 min
- Invitation: génération token, digest SHA256, expiration

### 7) Schéma Drizzle

- `votes`
- `vote_aggregates`
- `social_tracking`

## Démarrage local

```bash
npm install
npm run dev:server
```

Puis tester:

- `GET http://localhost:3000/`
- `GET http://localhost:3000/api/health`
- `GET http://localhost:3000/event/2026`
- `GET http://localhost:3000/trpc/health`

## Tests

```bash
npm test
```

Couvre:
- RBAC
- Invitations
- Vote anti-spam
- Runtime Express (shell HTML, `/api/health`, 404 API)

## Vérification Vercel importante

Si Vercel pointe encore sur un commit ancien (`2783bec Initialize repository`), il faut:

1. pousser cette branche avec les nouveaux commits,
2. configurer le projet Vercel pour builder cette branche (ou merger sur `main`),
3. relancer un déploiement.

Sinon Vercel continue d’afficher la 404 plateforme, même si le code est corrigé localement.


## Vercel build note

Le log fourni montre que Vercel build le commit ancien `2783bec` et exécute `vite build`.
Cette révision ajoute `vite` + `build` script + `index.html` racine pour éviter l'erreur `vite: command not found` si ce preset est actif.

Action requise côté Vercel: pointer la production branch sur le commit récent (ou merger vers `main`) puis redeployer.
