# AGENTS.md

## Stack
- Next.js 16.1.6 App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Core rules
- Inspect the repository before editing
- Reuse existing patterns before creating new ones
- Keep the codebase simple and maintainable
- Do not add features outside the brief
- Protect all `/admin` routes
- Burger menu is navigation only
- Menu editing happens only in admin
- Never allow gallery assignment to `home` or `contact`
- Public users must never see admin controls

## Structure
- `app/` = routes
- `components/` = UI
- `lib/` = auth, data access, helpers
- `data/` = seed/demo content
- `docs/` = functional docs

## Validation
Run when relevant:
- `npm run lint`
- `npm run build`

## Done means
- feature works
- routes are not broken
- admin is protected
- public UI stays clean
- README stays accurate