# Release Notes — App Arcade

## v1.0.0

- Autenticazione: registrazione, login, me
- Profilo: modifica username/password, selezione avatar
- Giochi: Flappy, Invaders con invio punteggi
- Progressi: calcolo livelli/exp, salvataggio score
- Leaderboard: classifica globale con top per gioco
- Feedback: invio feedback utente
- Sicurezza: Spring Security + CORS
- Frontend statico: pagine HTML, CSS, JS modulari

## Note di rilascio

- Requisiti: JDK 17+, Maven, DB configurato (es. MySQL/H2) secondo `application.properties`
- Migrazioni: se presenti, eseguire in bootstrap (non incluse in questo documento)
- Conosciute limitazioni: assenza pannello admin dedicato (se non previsto)
