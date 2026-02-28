# missetmisterdour — Audit & base architecture

Ce dépôt a été initialisé avec une base technique alignée sur ton cahier des charges:

- Frontend React + Wouter
- Backend Node + Express + tRPC
- ORM Drizzle (schema MySQL)
- Auth session sécurisée
- RBAC hiérarchique avec contrôle backend prioritaire
- Tests Vitest (RBAC, invitation, anti-spam vote)

## Éléments implémentés

- `apps/server/src/rbac.ts`
  - hiérarchie des rôles de USER (1) à SUPER_ADMIN (9)
  - `hasPermission(level)`.
- `apps/server/src/trpc.ts`
  - exemple de `roleProcedure` pour bloquer côté API selon le niveau requis.
- `apps/server/src/security/vote.ts`
  - SHA256(ip + salt)
  - règle anti-spam 1 vote / 10 min / IP.
- `apps/server/src/security/invitation.ts`
  - token d'invitation, digest SHA256, expiration.
- `apps/server/src/auth/session.ts`
  - base de cookies sécurisés: HttpOnly + SameSite strict + timeout.
- `apps/server/src/db/schema.ts`
  - tables: `votes`, `vote_aggregates`, `social_tracking`.
- `apps/web/src/routes.tsx`
  - structure des routes publiques, candidate et admin.
- `apps/web/src/rbac/RoleGuard.tsx`
  - garde d'affichage frontend (non suffisante sans contrôle backend).

## Manques à confirmer avec toi (prochaine étape)

1. Schéma utilisateur complet (users, roles, permissions, sessions DB).
2. Flux onboarding candidat de bout en bout avec `candidate_applications` + admin approval.
3. Setup Express runtime + adapter tRPC (`/trpc`) + middleware Helmet/CSP/rate-limit.
4. Upload photo + watermark + workflow validation admin.
5. SEO SSR / OG dynamique pour `/share/:candidateId/:assetId`.
6. Audit logs exhaustifs + monitoring + backup automation.

Si tu valides, je peux enchaîner sur l'étape 2: implémentation runtime backend (Express + tRPC + middlewares sécurité) et migrations Drizzle prêtes prod.
