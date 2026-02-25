CREATE DATABASE `arcadehub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

use arcadehub;

CREATE TABLE IF NOT EXISTS `arcadehub`.`avatars` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `required_level` INT NOT NULL DEFAULT '1',
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_avatars_name` (`name` ASC) VISIBLE,
  INDEX `idx_avatars_active_level` (`active` ASC, `required_level` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `arcadehub`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  `level` INT NOT NULL DEFAULT '1',
  `selected_avatar_id` BIGINT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `xp_total` BIGINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_users_username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `uk_users_email` (`email` ASC) VISIBLE,
  INDEX `idx_users_role_enabled` (`role` ASC, `enabled` ASC) VISIBLE,
  INDEX `idx_users_selected_avatar` (`selected_avatar_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_selected_avatar`
    FOREIGN KEY (`selected_avatar_id`)
    REFERENCES `arcadehub`.`avatars` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `arcadehub`.`user_game_progress` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `game_code` VARCHAR(20) NOT NULL,
  `best_score` INT NOT NULL DEFAULT '0',
  `last_score` INT NOT NULL DEFAULT '0',
  `played_count` INT NOT NULL DEFAULT '0',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_progress_user_game` (`user_id` ASC, `game_code` ASC) VISIBLE,
  INDEX `idx_progress_game_best` (`game_code` ASC, `best_score` ASC) VISIBLE,
  INDEX `idx_progress_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_progress_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `arcadehub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `arcadehub`.`feedback` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` ENUM('BUG', 'SUGGESTION', 'OTHER') NOT NULL DEFAULT 'BUG',
  `status` ENUM('NEW', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'NEW',
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `page` VARCHAR(120) NULL DEFAULT NULL,
  `user_agent` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_feedback_created` (`created_at` ASC) VISIBLE,
  INDEX `idx_feedback_status` (`status` ASC) VISIBLE,
  INDEX `idx_feedback_type` (`type` ASC) VISIBLE,
  INDEX `idx_feedback_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `arcadehub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci

