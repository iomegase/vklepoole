# Functional Brief

## Goal
Build a fullscreen immersive portfolio website with a mobile-first admin dashboard.

## Public pages
- Home
- Events
- Video
- Mariage
- Contact

## Extra state
- Preloading screen with an elegant intro animation

## Public UX rules
- No classic persistent navbar
- Burger menu is navigation only
- Main navigation is a fullscreen slide system
- One slide at a time
- Swipe on mobile and drag/swipe on desktop
- Home is the center of the navigation grid

## Navigation grid
- Up from Home => Events
- Left from Home => Video
- Down from Home => Mariage
- Right from Home => Contact

## Admin rules
- One single admin
- Admin routes must be protected
- Public users must never see admin controls
- Pencil/edit affordances appear only when admin is authenticated

## Persistence
Store in MongoDB:
- admin
- pages
- menu
- galleries
- gallery items
- gallery assignments

Store in Cloudinary:
- page images
- gallery media
- visual site assets

## Gallery rules
Assignable pages only:
- Events
- Video
- Mariage

Forbidden:
- Home
- Contact

## Admin pages
- /admin/login
- /admin
- /admin/pages
- /admin/menu
- /admin/galleries

## Priority
V1 must stay clean, stable, simple, and maintainable.
