-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smart_tools
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smart_tools
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smart_tools` DEFAULT CHARACTER SET utf8 ;
USE `smart_tools` ;

-- -----------------------------------------------------
-- Table `smart_tools`.`administrators`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_tools`.`administrators` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `password` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_index` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `smart_tools`.`contests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_tools`.`contests` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `url` VARCHAR(300) NOT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT NOT NULL,
  `administrator_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `url_index` (`url` ASC) INVISIBLE,
  INDEX `administrator_index` (`administrator_id` ASC) VISIBLE,
  CONSTRAINT `administrator_id`
    FOREIGN KEY (`administrator_id`)
    REFERENCES `smart_tools`.`administrators` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `smart_tools`.`videos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_tools`.`videos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` INT(11) NOT NULL DEFAULT '0',
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` TEXT NOT NULL,
  `original_video` TEXT NOT NULL,
  `converted_video` TEXT NULL DEFAULT NULL,
  `contest_id` INT(11) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `contest_id_idx` (`contest_id` ASC) INVISIBLE,
  CONSTRAINT `contest_id`
    FOREIGN KEY (`contest_id`)
    REFERENCES `smart_tools`.`contests` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
