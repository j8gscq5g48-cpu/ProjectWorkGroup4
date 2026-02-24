package it.project_work.app_arcade.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/*
 * Esegue query SQL di inizializzazione all'avvio dell'app.
 *
 * Funziona leggendo il file resources/db/seed.sql e lanciando
 * ogni statement separato da ";" (ignorando le righe commentate con -- e i blocchi).
 *
 * Configurazione:
 * - app.db.init-enabled=true/false per abilitare o disabilitare il seed all'avvio
 * - app.db.seed-location=classpath:db/seed.sql per cambiare il percorso del file SQL
 */

@Component
public class DatabaseInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    private final JdbcTemplate jdbcTemplate;

    @Value("${app.db.init-enabled:true}")
    private boolean initEnabled;

    @Value("${app.db.seed-location:classpath:db/seed.sql}")
    private Resource seedResource;

    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!initEnabled) {
            log.info("DatabaseInitializer disabilitato (app.db.init-enabled=false)");
            return;
        }

        if (seedResource == null || !seedResource.exists()) {
            log.warn("File seed SQL non trovato: {}", seedResource);
            return;
        }

        log.info("Esecuzione seed database da: {}", seedResource);
        List<String> statements = loadSqlStatements(seedResource);
        if (statements.isEmpty()) {
            log.info("Nessuno statement SQL da eseguire.");
            return;
        }

        int executed = 0;
        for (String stmt : statements) {
            String sql = stmt.trim();
            if (sql.isEmpty()) continue;
            try {
                jdbcTemplate.execute(sql);
                executed++;
            } catch (Exception ex) {
                log.error("Errore eseguendo SQL: {}\nCausa: {}", abbreviate(sql, 500), ex.getMessage(), ex);
                // continua con le altre query per non bloccare l'avvio
            }
        }
        log.info("Seed database completato. Statements eseguiti: {}", executed);
    }

    private static List<String> loadSqlStatements(Resource resource) throws IOException {
        try (InputStream is = resource.getInputStream();
             InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
             BufferedReader br = new BufferedReader(isr)) {

            String content = br.lines().collect(Collectors.joining("\n"));

            // Rimuove commenti /* ... */ multi-linea
            content = content.replaceAll("/\\*.*?\\*/", " ");
            // Rimuove commenti di linea -- ... fine riga
            content = content.replaceAll("--.*", " ");

            // Suddivide per ; tenendo conto che potrebbero esserci ; in stringhe (minimal handling)
            // Per semplicità assumiamo che il seed non abbia ; dentro stringhe.
            String[] parts = content.split(";\n|;\r\n|;\\s");

            List<String> result = new ArrayList<>();
            for (String part : parts) {
                String sql = part.trim();
                if (!sql.isEmpty()) {
                    result.add(sql);
                }
            }
            return result;
        }
    }

    private static String abbreviate(String s, int max) {
        if (s == null) return null;
        if (s.length() <= max) return s;
        return s.substring(0, Math.max(0, max - 3)) + "...";
    }
}
