# Database & ER — App Arcade

Descrizione entità e relazioni principali. Il diagramma deve essere coerente con le entity e annotazioni JPA.

## Entità

- User
  - id (PK)
  - username (unique)
  - password (hashed)
  - email? (se presente nel codice)
  - role (es. USER/ADMIN)
  - avatar (relazione con Avatar)
- Avatar
  - id (PK)
  - name
  - url/path immagine
- UserGameProgress
  - id (PK)
  - user (FK → User)
  - gameId / gameName
  - score
  - level / exp
  - updatedAt
- Feedback
  - id (PK)
  - user (FK → User)
  - message
  - createdAt

## Relazioni (attese)

- User 1 — N UserGameProgress
- User 1 — N Feedback
- User N — 1 Avatar (o 1 — 1 a seconda del codice, qui assunto N:1 molti utenti possono condividere un avatar predefinito)

## ER Diagram (Mermaid)

```mermaid
erDiagram
  USER ||--o{ USER_GAME_PROGRESS : has
  USER ||--o{ FEEDBACK : writes
  AVATAR ||--o{ USER : used_by

  USER {
    Long id PK
    String username
    String password
    String role
  }
  AVATAR {
    Long id PK
    String name
    String imagePath
  }
  USER_GAME_PROGRESS {
    Long id PK
    Long userId FK
    String gameId
    Integer score
    Integer level
    Integer exp
    Date updatedAt
  }
  FEEDBACK {
    Long id PK
    Long userId FK
    String message
    Date createdAt
  }
```

Note: verificare campi esatti confrontandoli con le classi in `models/`. Aggiornare se divergono.
