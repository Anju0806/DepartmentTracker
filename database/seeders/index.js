require('dotenv').config();

const connect = require('../connect');
const seedDepartments = require('./department_seeder');
const seedEmployees = require('./employee_seeder');
const seedRoles = require('./role_seeder');



(async () => {
    const db = await connect();
    await db.execute('SET FOREIGN_KEY_CHECKS = 0');
    await db.execute('DROP TABLE IF EXISTS department');
    await db.execute('DROP TABLE IF EXISTS role');
    await db.execute('DROP TABLE IF EXISTS employee');
    await db.execute('SET FOREIGN_KEY_CHECKS = 1'); 

    const createdepartment = 'CREATE TABLE `depttracker_db`.`department` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(30) NOT NULL,PRIMARY KEY (`id`))';
    await db.execute(createdepartment);
    await seedDepartments();

    const createrole = 'CREATE TABLE `depttracker_db`.`role` (`id` INT NOT NULL AUTO_INCREMENT,`title` VARCHAR(50) NOT NULL,`salary` DECIMAL(10, 2) NOT NULL,`department_id` INT NULL,PRIMARY KEY (`id`),INDEX `department_id_idx` (`department_id` ASC) VISIBLE,CONSTRAINT `fk_department_id` FOREIGN KEY (`department_id`) REFERENCES`depttracker_db`.`department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE)';
    await db.execute(createrole);
    await seedRoles();

    const createemployee = 'CREATE TABLE `depttracker_db`.`employee` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `first_name` VARCHAR(30) NOT NULL, `last_name` VARCHAR(30) NOT NULL, `role_id` INT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `depttracker_db`.`role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `manager_id` INT UNSIGNED);';

    await db.execute(createemployee);
    await seedEmployees();




    console.log('Database seeding completed.');
    process.exit(0);
})();


