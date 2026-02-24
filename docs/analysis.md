# Analisi Iniziale — App Arcade

## Descrizione del progetto
Piattaforma web full‑stack con giochi in stile arcade fruibili via browser. Sviluppata in Java Spring Boot, con frontend statico (HTML/CSS/JS), che offre attualmente 2 minigiochi: Flappy Bird e Invaders. I guest possono giocare senza login, ma con l’autenticazione è possibile creare il profilo che salva gli aggiornamenti. Con la creazione del profilo utente è , inoltre, possibile scegliere un avatar base. Gli altri avatar sono sbloccabili in base ai punti guadagnati e al livello raggiunto dall'utente. In più ci sono i progressi utente, la classifica globale che somma il totale dei 'best score' per ogni gioco oppure le classsifiche che mostrano il migliore utente per il singolo gioco. Infine, è facoltativa la possibilità per l'utente di segnalare possibili bug di sistema o feedback generali. 

## Obiettivo
- Offrire un'esperienza minigiochi stile arcade semplice e fluida con:
    - progressione (livelli/exp);
    - classifiche globali;
    - gestione profilo utente (credenziali e avatar).

## Target utenti
- Utenti casual gamer che desiderano partite one-shot stile arcade.
- Possibile estensione a community con competitive leaderboard.

## Feature principali
- Registrazione/Login/Logout e profilo (username, password, avatar, livelli utente).
- Giochi: Flappy Bird, Invaders con invio punteggi.
- Progressione: livelli/exp calcolati da logica dedicata.
- Classifiche globali per gioco.
- Classifica globale per utente migliore (somma data dal 'best score' per ogni gioco).
- Invio feedback.

## Feature opzionali
- Aggiungere un frame splash screen con nome (ArcadeHub) e suono.
- Aggiungere tasto 'torna su'.
- Sviluppo terzo minigioco Tetris.

## Flusso principale (happy path utente)
1. L'utente apre la Home clicca su Gioca, sceglie un gioco e prova.
2. L'utente può andare su login si registra e accede al suo account.
3. Se autenticato, a fine partita c'è l'invio del punteggio, avviene il salvataggio e l'aggiornamento dei livelli/exp.
4. L'utente consulta la leaderboard.
5. L'utente aggiorna il proprio profilo e avatar.
6. Facoltativo: invia un feedback.
