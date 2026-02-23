# Diagrammi dei Flussi Principali — App Arcade

Almeno un flow chart per: CRUD, azione utente, azione admin.

## CRUD (Esempio: Creazione Feedback)
```mermaid
flowchart TD
  A[Utente compila form feedback] --> B[Validazione client]
  B --> C[POST /api/feedback]
  C --> D[Controller valida DTO]
  D --> E[Service: business rules]
  E --> F[Repository: save]
  F --> G[Esito OK]
  G --> H[Redirect/Messaggio successo]
```

## Azione Utente (Invio punteggio gioco)
```mermaid
flowchart TD
  A[Fine partita] --> B[Calcolo score client]
  B --> C[POST /api/progress/submit]
  C --> D[Controller verifica autenticazione]
  D --> E[Service: aggiorna livelli/exp]
  E --> F[Repository: persiste UserGameProgress]
  F --> G[Response con nuovo livello/exp]
  G --> H[UI mostra progresso]
```

## Azione Admin (Gestione utenti) — opzionale
```mermaid
flowchart TD
  A[Admin apre dashboard] --> B[GET /api/admin/users]
  B --> C[Controller + Security: check ROLE_ADMIN]
  C --> D[Service: regole gestione]
  D --> E[Repository: query utenti]
  E --> F[Lista utenti]
  F --> G[Admin modifica/elimina utente]
```

Note: la parte Admin è prevista come estensione. Allineare con implementazione reale se introdotta.
