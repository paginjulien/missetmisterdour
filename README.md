# missetmisterdour — base fullstack sécurisée (v0.2)

Cette version corrige le principal manque de la première PR: **backend réellement exécutable** avec routes HTTP, middleware sécurité, tRPC et gestion 404 structurée.

## Stack

- Frontend: React + Wouter
- Backend: Node + Express
- API: tRPC
- ORM: Drizzle (MySQL schema)
- Tests: Vitest

## Ce qui est implémenté

### 1) Runtime serveur concret

- Entrée serveur: `apps/server/src/index.ts`
- Application Express: `apps/server/src/app.ts`
- Endpoint root `GET /` (évite le 404 vide en prod)
- Endpoint `GET /event/2026`
- Handler 404 JSON uniforme (`code: NOT_FOUND`)

### 2) Sécurité runtime

- `helmet()` activé
- `express-rate-limit` activé (fenêtre 10 min)
- `x-powered-by` désactivé

### 3) tRPC branché côté Express

- Route `/trpc`
- Router `health` public
- Router `adminPing` protégé par rôle `ADMIN+`
- Context tRPC issu des headers (base pour future session DB)

### 4) RBAC et briques sécurité existantes

- Hiérarchie `USER(1) -> SUPER_ADMIN(9)` + `hasPermission`
- Vote anti-spam: hash SHA256(ip + salt) + 1 vote / 10 min
- Invitation: génération token, digest SHA256, expiration

### 5) Schéma Drizzle

- `votes`
- `vote_aggregates`
- `social_tracking`

## Démarrage

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

## Prochaine étape recommandée

- Session persistée DB + cookies signés + rotation
- Onboarding candidat complet (`candidate_applications`, approval admin)
- Audit logs complets + monitoring + alerting
- SEO SSR/OG pour `/share/:candidateId/:assetId`
- Upload media + watermark automatique
