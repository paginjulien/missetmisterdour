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
- Endpoint root `GET /`
- Endpoint `GET /event/2026`
- Handler 404 JSON uniforme (`code: NOT_FOUND`)

### 2) Compatibilité Vercel (fix 404)

- `api/index.ts` exporte l’app Express pour Vercel Serverless Functions
- `api/[...all].ts` active le fallback catch-all
- `vercel.json` réécrit `/(.*)` vers `/api/$1`

Résultat: les routes `/`, `/event/2026`, `/trpc/*` ne tombent plus sur la page 404 plateforme.

### 3) Sécurité runtime

- `helmet()` activé
- `express-rate-limit` activé (fenêtre 10 min)
- `x-powered-by` désactivé

### 4) tRPC branché côté Express

- Route `/trpc`
- Router `health` public
- Router `adminPing` protégé par rôle `ADMIN+`
- Context tRPC issu des headers (base pour future session DB)

### 5) RBAC et briques sécurité existantes

- Hiérarchie `USER(1) -> SUPER_ADMIN(9)` + `hasPermission`
- Vote anti-spam: hash SHA256(ip + salt) + 1 vote / 10 min
- Invitation: génération token, digest SHA256, expiration

### 6) Schéma Drizzle

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
- Runtime Express (`/` et 404)

## Vérification Vercel importante

Si Vercel pointe encore sur un commit ancien (`2783bec Initialize repository`), il faut:

1. pousser cette branche avec les nouveaux commits,
2. configurer le projet Vercel pour builder cette branche (ou merger sur `main`),
3. relancer un déploiement.

Sinon Vercel continue d’afficher la 404 plateforme, même si le code est corrigé localement.
