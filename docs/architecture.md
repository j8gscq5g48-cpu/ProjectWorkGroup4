# Architettura — App Arcade
Obiettivo: descrivere le scelte architetturali e la separazione a livelli.

## Layering
- Controller → espongono REST endpoint, validano input a livello superficiale.
- Service → incapsulano business logic e orchestrano repository/utilities.
- Repository → persistenza dati via Spring Data JPA.
- Model → entity JPA e domain models.
- Security/Config → configurazione Spring Security, CORS e bean di sicurezza.
- View statiche → pagine e asset sotto `src/main/resources/static`.

## Diagramma (package-level)
```mermaid flowchart TD
  A[Controllers] --> B[Services]
  B --> C[Repositories]
  C --> D[(DB)]
  B --> E[Utilities]
  A -.-> F[Security/Config]
  G[Static Frontend]
```

## Motivazioni

- Separazione delle responsabilità, testabilità e riuso.
- Spring Security centralizza autenticazione/autorizzazione.
- DTO per disaccoppiare payload esterni dai modelli interni.
- Static frontend per semplicità di deploy nel contesto Spring Boot.
