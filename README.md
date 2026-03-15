# Victor Le Poole Portfolio

Portfolio fullscreen immersif avec back-office admin mobile first.

## Stack
- Next.js 16.1.6 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- MongoDB pour le contenu et l’admin
- Cloudinary pour les médias

## Fonctionnel
- Pages publiques: `/`, `/events`, `/video`, `/mariage`, `/contact`
- Navigation au clic uniquement (menu desktop, burger mobile et CTA)
- Transitions fluides entre pages
- Preloading screen avant entrée sur le site
- Burger menu réservé à la navigation
- Icône d’édition visible uniquement pour l’admin connecté
- Galeries assignables uniquement à `events`, `video`, `mariage`
- Back-office protégé: `/admin`, `/admin/pages`, `/admin/menu`, `/admin/galleries`

## Architecture
- `app/` routes App Router, route publique catch-all `[[...slug]]`, server actions et upload admin
- `components/site/` expérience fullscreen, burger, modal galerie, preloader
- `components/admin/` shell admin, éditeurs et upload field
- `lib/auth/` auth single-admin, cookie signé, protection
- `lib/site/` constantes, rendu public, types et store MongoDB
- `lib/cloudinary/` upload signé Cloudinary
- `data/site.ts` seed de fallback
- `docs/brief.md` brief fonctionnel du projet

## Variables d’environnement
Copier `.env.example` vers `.env.local` puis renseigner:

- `MONGODB_URI`: URI MongoDB
- `MONGODB_DB`: nom de base MongoDB
- `ADMIN_EMAIL`: email du single admin
- `ADMIN_PASSWORD`: mot de passe initial du single admin
- `SESSION_SECRET`: secret utilisé pour signer le cookie admin
- `CLOUDINARY_CLOUD_NAME`: nom du cloud Cloudinary
- `CLOUDINARY_API_KEY`: clé API Cloudinary
- `CLOUDINARY_API_SECRET`: secret API Cloudinary
- `CLOUDINARY_UPLOAD_FOLDER`: dossier cible Cloudinary, optionnel

## Démarrage
```bash
npm install
npm run dev
```

Build de vérification:

```bash
npm run lint
npm run build
```

## Notes
- Si MongoDB n’est pas configuré, le site fonctionne avec un seed local en mémoire pour faciliter le dev et le build.
- Si MongoDB est configuré et que la collection `admins` est vide, l’admin est créé automatiquement à partir de `ADMIN_EMAIL` et `ADMIN_PASSWORD`.
- Les images ne sont jamais stockées dans MongoDB: seules les URLs Cloudinary et les métadonnées sont persistées.
