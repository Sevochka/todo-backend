USE `todo_backend` ;

-- -----------------------------------------------------
-- Table `todo_backend`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_backend`.`user` (
  `user_id` VARCHAR(36) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `todo_backend`.`folder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_backend`.`folder` (
  `folder_id` INT NOT NULL AUTO_INCREMENT,
  `emoji` VARCHAR(25) NULL,
  `name` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`folder_id`),
  INDEX `FK_folder_user_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_folder_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `todo_backend`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `todo_backend`.`todos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_backend`.`todos` (
  `completed` TINYINT NOT NULL,
  `todo_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NULL,
  `folder_id` INT NOT NULL,
  PRIMARY KEY (`todo_id`),
  INDEX `FK_folder_todos_folder_id_idx` (`folder_id` ASC) VISIBLE,
  CONSTRAINT `FK_folder_todos_folder_id`
    FOREIGN KEY (`folder_id`)
    REFERENCES `todo_backend`.`folder` (`folder_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

