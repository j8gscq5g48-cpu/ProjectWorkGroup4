# ProjectWorkGroup4
## ArcadeHub App 
Piattaforma web full‑stack con giochi in stile arcade fruibili via browser. Sviluppata in Java Spring Boot, con frontend statico (HTML/CSS/JS), che offre attualmente 2 minigiochi: Flappy Bird e Invaders. I guest possono giocare senza login, ma con l’autenticazione è possibile creare il profilo che salva gli aggiornamenti. Con la creazione del profilo utente è , inoltre, possibile scegliere un avatar base. Gli altri avatar sono sbloccabili in base ai punti guadagnati e al livello raggiunto dall'utente. In più ci sono i progressi utente, la classifica globale che somma il totale dei 'best score' per ogni gioco oppure le classsifiche che mostrano il migliore utente per il singolo gioco. Infine, è facoltativa la possibilità per l'utente di segnalare possibili bug di sistema o feedback generali.

## Requisiti
- Java 17+
- Maven 3.8+
- Browser moderno (Chrome/Edge/Firefox)
- Porta TCP libera: 8080 (configurabile)
- MySQL Workbench + DMS

Opzionale per sviluppo:
- IDE (IntelliJ IDEA / Eclipse / VS Code + estensioni Java)


## Setup e Avvio
  1. Scaricare il file JAR e il file `arcadehub.sql`.
  2. Aprire MySQL workbranch, eseguire le query nel file `arcadehub.sql` per la creazione del database e delle tabelle.
  3. Spostare in cartella dove è stato scaricato il file JAR, aprire il terminare ed eseguire il comando:
    - windows: `java -jar arcadehub.jar ^ --spring.datasource.url=jdbc:mysql://localhost:3306/arcadehub ^ --spring.datasource.username=root ^ --spring.datasource.password=root`
    - Mac/Linux: `java -jar arcadehub.jar --spring.datasource.url=jdbc:mysql://localhost:3306/arcadehub --spring.datasource.username=root`

    Nota: I dati necessari nel database vengono inizializzati automaticamente all'avvio di Spring.
  4. Usare un browser moderno(Chrome o Edge) e aprire il link: http://localhost:8080


## Credenziali demo
È presente l'account di un user demo.
- Username: example
- Email: example@example.com
- Password: example


## Comandi utili per sviluppatori
- Build (con test): `mvn clean verify`
- Build (senza test): `mvn clean package -DskipTests`
- Avvio locale: `mvn spring-boot:run`
- Esecuzione test: `mvn test`
- Formattazione/analisi (se configurati plugin nel pom): `mvn fmt:format` / `mvn spotbugs:check`

Windows (script Maven wrapper inclusi):
- `mvnw.cmd clean package -DskipTests`
- `mvnw.cmd spring-boot:run`


## Struttura del progetto
ProjectWorkGroup4/
├── pom.xml                        # Dipendenze e build Maven
├── mvnw, mvnw.cmd                 # Maven Wrapper
├── src/
│   ├── main/
│   │   ├── java/it/project_work/app_arcade/
│   │   │   ├── AppArcadeApplication.java   # Entry point Spring Boot
│   │   │   ├── authentication/             # Feature: Auth (Controller, DTO, Service)
│   │   │   ├── profile/                    # Feature: Profilo & Leaderboard
│   │   │   ├── submitprogress/             # Feature: Salvataggio punteggi
│   │   │   ├── feedback/                   # Feature: Feedback utente
│   │   │   ├── models/                     # Entity JPA (User, Avatar, ecc.)
│   │   │   ├── repositories/               # interfacce Spring Data JPA
│   │   │   ├── config/                     # Security, CORS, Database Seeding
│   │   │   ├── exceptions/                 # Exception Handler e classi Custom
│   │   │   └── genericservice/             # Astrazioni e servizi generici
│   │   └── resources/
│   │       ├── db/                         # Script SQL (seed.sql)
│   │       ├── static/                     # Frontend statico
│   │       │   ├── css/                    # Stili (auth, home, play, ecc.)
│   │       │   ├── js/                     # Logica (game, api, auth, guard)
│   │       │   ├── images/                 # Sprite, sfondi e asset grafici
│   │       │   ├── audio/                  # Effetti sonori giochi
│   │       │   ├── assets/                 # Avatars e video intro
│   │       │   ├── partials/               # Frammenti HTML (header/footer)
│   │       │   └── *.html                  # Pagine: index, auth, play, profile...
│   │       └── application.properties|yml  # Configurazione di sistema
│   └── test/java/...                      # Test JUnit e Spring Boot
├── docs/                                  # Documentazione tecnica e flussi
├── README.md                              # Documentazione principale
└── .gitignore / .gitattributes            # Configurazione Git

Dettagli frontend
- Giochi: `static/js/game/flappy.js`, `static/js/game/invaders.js`
- Pagine: `static/index.html`, `static/auth.html`, `static/play.html`, `static/profile.html`, `static/leaderboard.html`
- Asset: immagini, audio, avatar in `static/*`

Backend principali
- Autenticazione: `security/*`, `controllers/AuthController.java`, `services/AuthService.java`
- Utenti/Profili: `controllers/UserController.java`, `services/UserService.java`, repository `UserRepository.java`
- Progressi/Giochi: `controllers/ProgressController.java`, `services/ProgressService.java`
- Classifiche: `controllers/LeaderboardController.java`, `services/LeaderboardService.java`, DTO `LeaderboardResponse*.java`
- Avatar/Feedback: relativi controller, servizi e repository


## Configurazione
- Porta server: modificabile con `server.port=8080` in `application.properties`
- CORS/sicurezza: vedi `security/SecurityConfig.java` e `security/CorsConfig.java`
- Database: specificato nell'`application properties`

Esempio (application.properties):
spring.datasource.username=root
spring.datasource.password=root
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/arcadehub?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.jpa.hibernate.ddl-auto=validate


## API principali
- Autenticazione: login, register, profilo, change password/username
- Progressi: submit score, get progress by game
- Classifica: top/leaderboard per gioco
- Avatar: elenco e selezione
- Feedback: invio feedback

Gli endpoint sono definiti nei rispettivi controller, per il consumo lato client, vedere `static/js/api.js`.


## Flusso utente
1. Utente entra come guest, con la possibilità di giocare, ma non salvare i dati.
2. Registrazione o login
3. Selezione avatar e modifica profilo
4. Avvio gioco da `Gioca` (Flappy o Invaders)
5. Salvataggio punteggio e visualizzazione classifica


## Troubleshooting
- Porta occupata: cambiare `server.port`
- Build fallita: lanciare `mvn -U clean package -DskipTests` per forzare update dipendenze
- Asset non caricati: controllare percorso in `static/*` e cache browser
- Problemi CORS/API: verificare `CorsConfig` e origini permesse


## Licenza
Questo progetto è distribuito sotto licenza inclusa nel file LICENSE.