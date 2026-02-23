# API & Routing — App Arcade
Mappa sintetica di rotte backend (MVC/REST) e pagine frontend.

## Backend — REST Controllers
- AuthController
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - GET `/api/auth/me`
- UserController
  - PATCH `/api/users/username`
  - PATCH `/api/users/password`
  - DELETE `/api/users`
- AvatarController
  - GET `/api/avatars`
  - POST `/api/avatars/select`
- ProgressController
  - POST `/api/progress/submit`
  - GET `/api/progress/me`
- LeaderboardController
  - GET `/api/leaderboard`
- FeedbackController
  - POST `/api/feedback`

## Frontend — Pagine Statiche
- `/` → `index.html`
- `/auth` → `auth.html`
- `/profile` → `profile.html`
- `/play` → `play.html`
- `/leaderboard` → `leaderboard.html`

## Middleware JS e Partials
- API layer: `static/js/api.js`
- Route guard: `static/js/guard.js`
- Partials loader: `static/js/partials.js` con `static/partials/header.html` e `footer.html`
