-- Esempio di seed: crea ruoli, avatar base, utente admin, ecc.
-- Modifica liberamente in base al tuo schema reale.

-- Avatars base (se non esistono)
INSERT INTO avatars (id, name, image_url, required_level)
SELECT 1, 'Avatar 1', '/assets/avatars/avatar-1.webp', 1
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 1);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 2, 'Avatar 2', '/assets/avatars/avatar-2.webp', 1
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 2);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 3, 'Avatar 3', '/assets/avatars/avatar-3.webp', 2
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 3);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 4, 'Avatar 4', '/assets/avatars/avatar-4.webp', 3
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 4);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 5, 'Avatar 5', '/assets/avatars/avatar-5.webp', 4
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 5);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 6, 'Avatar 6', '/assets/avatars/avatar-6.webp', 5
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 6);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 7, 'Avatar 7', '/assets/avatars/avatar-7.webp', 6
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 7);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 8, 'Avatar 8', '/assets/avatars/avatar-8.webp', 7
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 8);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 9, 'Avatar 9', '/assets/avatars/avatar-9.webp', 8
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 9);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 10, 'Avatar 10', '/assets/avatars/avatar-10.webp',9
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 10);

INSERT INTO avatars (id, name, image_url, required_level)
SELECT 11, 'Avatar 11', '/assets/avatars/avatar-11.webp', 10
WHERE NOT EXISTS (SELECT 1 FROM avatars WHERE id = 11);

-- Utente example (se la tabella/colonne combaciano con il tuo schema)
-- La password è un hash BCrypt di "example" generico: $2a$12$sdTd6xKJilS3.IlTRhXJvuTkWrtHbm2/yFiSNLYZ99DrauyUZR8A6
-- Cambiala in qualcosa di sicuro o gestiscila da codice Java creando l'utente via servizio.
INSERT INTO users (id, username, password_hash, email, level, selected_avatar_id)
SELECT 1, 'example', '$2a$12$sdTd6xKJilS3.IlTRhXJvuTkWrtHbm2/yFiSNLYZ99DrauyUZR8A6', 'example@example.com', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 1);

-- Esempi per progressi di gioco
-- INSERT INTO user_game_progress (id, user_id, game, score, created_at)
-- SELECT 1, 1, 'flappy', 100, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM user_game_progress WHERE id = 1);
