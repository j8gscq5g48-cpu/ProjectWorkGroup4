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
```
ProjectWorkGroup4/
├─ pom.xml                       # Dipendenze e build
├─ src/
│  ├─ main/
│  │  ├─ java/it/project_work/app_arcade/
│  │  │  ├─ AppArcadeApplication.java  # Entry point Spring Boot
│  │  │  ├─ controllers/               # Controller REST & pagine
│  │  │  ├─ dto/                       # DTO request/response
│  │  │  ├─ exceptions/                # Eccezioni & handler globali
│  │  │  ├─ models/                    # Entity/JPA models
│  │  │  ├─ repositories/              # Spring Data JPA repository
│  │  │  ├─ security/                  # Config sicurezza & CORS
│  │  │  ├─ services/                  # Business logic
│  │  │  └─ utilities/                 # Helper di dominio
│  │  └─ resources/
│  │     ├─ static/                    # Frontend statico
│  │     │  ├─ css/                    # Stili
│  │     │  ├─ js/                     # Script (api, auth, game, ecc.)
│  │     │  ├─ images/, audio/, assets/avatars/
│  │     │  └─ *.html                  # Pagine: index, auth, play, profile, leaderboard
│  │     └─ application.properties|yml # Config (se presente)
│  └─ test/java/...                    # Test JUnit/Spring
├─ README.md
├─ LICENSE
└─ .gitignore / .gitattributes
```

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
- Database: se non specificato nel `pom.xml`/`application.properties`, Spring Boot utilizza H2/in‑memory o la configurazione di default del progetto. Imposta le proprietà JPA/datasource secondo necessità.

Esempio (application.properties):
```
server.port=8080
spring.datasource.url=jdbc:h2:mem:arcade;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```


## API principali (overview)
- Autenticazione: login, register, me, change password/username
- Progressi: submit score, get progress by game
- Classifica: top/leaderboard per gioco
- Avatar: elenco e selezione
- Feedback: invio feedback

Gli endpoint sono definiti nei rispettivi controller sotto `controllers/`. Per il consumo lato client, vedere `static/js/api.js`.


## Flusso utente
1. Registrazione o login
2. Selezione avatar e modifica profilo
3. Avvio gioco da `Play` (Flappy o Invaders)
4. Salvataggio punteggio e visualizzazione classifica


## Troubleshooting
- Porta occupata: cambiare `server.port`
- Build fallita: lanciare `mvn -U clean package -DskipTests` per forzare update dipendenze
- Asset non caricati: controllare percorso in `static/*` e cache browser
- Problemi CORS/API: verificare `CorsConfig` e origini permesse


## Licenza
Questo progetto è distribuito sotto licenza inclusa nel file LICENSE.