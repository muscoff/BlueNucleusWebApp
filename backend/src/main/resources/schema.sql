CREATE DATABASE IF NOT EXISTS `bluenucleus`;

USE `bluenucleus`;

CREATE TABLE IF NOT EXISTS `users` ( 
  
  `id` INT NOT NULL AUTO_INCREMENT,
  `firebase_id` VARCHAR(255) NOT NULL UNIQUE,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `github_username` VARCHAR(255) NOT NULL,
  `active_status` BOOLEAN NOT NULL DEFAULT TRUE,
  `is_admin` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)

);

CREATE TABLE IF NOT EXISTS `students` ( 
  
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)

);

CREATE TABLE IF NOT EXISTS `category` ( 
  
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL UNIQUE,
  `is_active` TINYINT NOT NULL DEFAULT 0,

  PRIMARY KEY (`id`)

);

CREATE TABLE IF NOT EXISTS `tasks` ( 
  
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `category` INT NOT NULL,
  `description` TEXT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 0,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE IF NOT EXISTS `usertasks` ( 
  
  `id` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(255) NOT NULL,
  `taskids` TEXT NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`userid`) REFERENCES `users`(`firebase_id`) ON DELETE CASCADE ON UPDATE CASCADE

);

-- CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';

-- GRANT ALL PRIVILEGES ON bluenucleus.* TO 'user'@'localhost' IDENTIFIED BY 'password';
