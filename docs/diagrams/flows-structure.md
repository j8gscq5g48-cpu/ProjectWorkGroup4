# App Arcade — Mappa della Struttura per Flussi

Questa vista organizza il progetto per flussi funzionali end-to-end, mettendo in relazione componenti backend (Controller → Service → Repository → Model/DTO) e frontend (pagine, JS, CSS, asset).

Legenda:
- Backend: controller, servizi, repository, modelli, DTO, eccezioni, sicurezza
- Frontend: pagine HTML, JS, CSS, assets

Repository root: `/Users/gildaraccanelli/ProjectWorkGroup4/ProjectWorkGroup4`

---

## 1) Flusso Autenticazione e Account

- Backend
  - Controller: `src/main/java/it/project_work/app_arcade/controllers/AuthController.java`, `controllers/UserController.java`
  - Services: `services/AuthService.java`, `services/CustomUserDetailsService.java`, `services/UserService.java`
  - Repositories: `repositories/UserRepository.java`
  - Models: `models/User.java`
  - DTO: `dto/RegisterRequest.java`, `dto/LoginRequest.java`, `dto/MeResponse.java`, `dto/ChangePasswordRequest.java`, `dto/ChangeUsernameRequest.java`, `dto/DeleteAccountRequest.java`, `dto/UserResponse.java`, `dto/ApiResponse.java`, `dto/ApiError.java`
  - Sicurezza/Config: `security/SecurityConfig.java`, `security/SecurityBeans.java`, `security/CorsConfig.java`
  - Eccezioni: `exceptions/BadRequestException.java`, `exceptions/ConflictException.java`, `exceptions/GlobalExceptionHandler.java`
- Frontend
  - Pagine: `src/main/resources/static/auth.html`, `static/profile.html`
  - JS: `static/js/auth.js`, `static/js/profile.js`, `static/js/guard.js`, `static/js/api.js`
  - CSS: `static/css/auth.css`, `static/css/profile.css`, `static/css/style.css`
  - Partials/Layout: `static/partials/header.html`, `static/partials/footer.html`

---

## 2) Flusso Profilo Utente e Avatar

- Backend
  - Controller: `controllers/UserController.java`, `controllers/AvatarController.java`
  - Services: `services/UserService.java`
  - Repositories: `repositories/UserRepository.java`, `repositories/AvatarRepository.java`
  - Models: `models/User.java`, `models/Avatar.java`
  - DTO: `dto/SelectAvatarRequest.java`, `dto/UserResponse.java`, `dto/AvatarDto.java`, `dto/ApiResponse.java`
- Frontend
  - Pagina: `static/profile.html`
  - JS: `static/js/profile.js`, `static/js/api.js`
  - CSS: `static/css/profile.css`
  - Asset: `static/assets/avatars/*.webp`

---

## 3) Flusso Gioco e Progressi

- Backend
  - Controller: `controllers/ProgressController.java`
  - Services: `services/ProgressService.java`
  - Repositories: `repositories/ProgressRepository.java`
  - Models: `models/UserGameProgress.java`
  - DTO: `dto/SubmitScoreRequest.java`, `dto/ProgressResponse.java`, `dto/ApiResponse.java`
  - Utilities (logica livelli): `utilities/LevelInfo.java`, `utilities/Leveling.java`
- Frontend
  - Pagine: `static/play.html`
  - JS (giochi): `static/js/game/flappy.js`, `static/js/game/invaders.js`
  - JS (pagina play): `static/js/play.js`, `static/js/api.js`, `static/js/guard.js`
  - CSS: `static/css/play.css`
  - Asset gioco:
    - Flappy: `static/images/bird.webp`, `pipe-green.webp`, `base.webp`, `background.webp`, `audio/*.wav`
    - Invaders: `static/images/Invaders/*`, `audio/*.wav`

---

## 4) Flusso Classifiche (Leaderboard)

- Backend
  - Controller: `controllers/LeaderboardController.java`
  - Services: `services/LeaderboardService.java`
  - Repositories: `repositories/ProgressRepository.java`
  - Models: `models/UserGameProgress.java`, `models/User.java`
  - DTO: `dto/LeaderboardResponse.java`, `dto/LeaderboardResponseDto.java`, `dto/GameTopDTO.java`
- Frontend
  - Pagine: `static/leaderboard.html`, `static/index.html` (anteprima leaderboard in home)
  - JS: `static/js/leaderboard.js`, `static/js/home-leaderboard.js`, `static/js/api.js`
  - CSS: `static/css/leaderboard.css`, `static/css/home.css`

---

## 5) Flusso Feedback

- Backend
  - Controller: `controllers/FeedbackController.java`
  - Service: `services/FeedbackService.java`
  - Repository: `repositories/FeedbackRepository.java`
  - Model: `models/Feedback.java`
  - DTO: `dto/FeedbackCreateRequest.java`, `dto/ApiResponse.java`
- Frontend
  - Pagine: integrato in `static/index.html` o altra sezione
  - JS: `static/js/feedback.js`, `static/js/api.js`
  - CSS: `static/css/style.css` (o dedicato)

---

## 6) Flusso Navigazione e Pagine Pubbliche

- Backend
  - Controller: `controllers/IndexController.java`
- Frontend
  - Pagine: `static/index.html`, `static/play.html`, `static/leaderboard.html`, `static/auth.html`, `static/profile.html`
  - Partials: `static/partials/header.html`, `static/partials/footer.html`
  - JS generali: `static/js/home.js`, `static/js/partials.js`, `static/js/app-meta.js`, `static/js/to-top.js`
  - CSS generali: `static/css/style.css`, `static/css/home.css`

---

## 7) Cross-cutting/Shared

- DTO comuni: `dto/ApiResponse.java`, `dto/ApiError.java`
- Sicurezza/CORS: `security/*`
- Eccezioni/handler globali: `exceptions/*`
- Configurazione app: `AppArcadeApplication.java`, `pom.xml`
- Test: `src/test/java/it/project_work/app_arcade/AppArcadeApplicationTests.java`
- Asset condivisi: `static/images/*`, `static/audio/*`, `static/css/style.css`

---

## Note operative

- Ogni flusso backend segue lo schema Controller → Service → Repository → Model (+ DTO/Exceptions).
- Lato frontend, ogni pagina ha JS dedicato che usa `api.js` per le chiamate REST e `guard.js` per protezione route/autorizzazione.
- I giochi sono modularizzati in `static/js/game/*` con asset dedicati.
- Le utilities `LevelInfo`/`Leveling` sono centrali per calcolo livelli/exp nel flusso progressi e leaderboard.

