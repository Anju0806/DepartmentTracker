require('dotenv').config();
const inquirer = require('inquirer');
const department = require('../../models/department');
const { displayDepartments } = require('../../models/displayDepartments');
const employee = require('../../models/employee');
const { displayEmployees } = require('../../models/displayEmployees');
const connect = require('../connect');
const seedDepartments = require('./department_seeder');
const seedEmployees = require('./employee_seeder');
const seedRoles = require('./role_seeder');

async function displayOpeningPage() {
    console.log('Welcome to the DepartmentTracker Application!');
    console.log('-------------------------------------------');
    console.log('Please select an option to proceed:');
    console.log('1. View Departments');
    console.log('2. View Roles');
    console.log('3. View Employees');
    console.log('4. Add Departments');
    console.log('5. Add Roles');
    console.log('6. Add Employees');
    console.log('7. Update an Employee');
    console.log('8. Exit');

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Select an option:',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
        },
    ]);

    const selectedOption = answers.option;
    switch (selectedOption) {
        case '1':
            console.log('Viewing Departments...');
            // Call function to handle viewing departments
            const departments = await department.all();
            displayDepartments(departments);
            break;
        case '2':
            console.log('Viewing Roles...');
            // Call function to handle viewing roles
            break;
        case '3':
            console.log('Viewing Employees...');
            const employees = await employee.all();
            displayEmployees(employees);
            break;
        case '8':
            console.log('Exiting DepartmentTracker Application...');
            process.exit(0);
    }

    // Add further logic or function calls based on user's selection

    // Call the function recursively to display the opening page again
    await displayOpeningPage();
}

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

    const createrole = 'CREATE TABLE `depttracker_db`.`role` (`id` INT NOT NULL AUTO_INCREMENT,`title` VARCHAR(50) NOT NULL,`salary` VARCHAR(45) NOT NULL,`department_id` INT NULL,PRIMARY KEY (`id`),INDEX `department_id_idx` (`department_id` ASC) VISIBLE,CONSTRAINT `fk_department_id` FOREIGN KEY (`department_id`) REFERENCES`depttracker_db`.`department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE)';
    await db.execute(createrole);
    await seedRoles();

    // const createemployee = 'CREATE TABLE `depttracker_db`.`employee` (`id` INT NOT NULL AUTO_INCREMENT, `first_name` VARCHAR(30) NOT NULL, `last_name` VARCHAR(30) NOT NULL, `role_id` INT NULL, `manager_id` INT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `depttracker_db`.`role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, CONSTRAINT `fk_manager_id` FOREIGN KEY (`manager_id`) REFERENCES `depttracker_db`.`employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)';
    const createemployee = 'CREATE TABLE `depttracker_db`.`employee` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `first_name` VARCHAR(30) NOT NULL, `last_name` VARCHAR(30) NOT NULL, `role_id` INT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `depttracker_db`.`role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `manager_id` INT UNSIGNED, INDEX `man_ind` (`manager_id`), CONSTRAINT `fk_manager` FOREIGN KEY (`manager_id`) REFERENCES `employee`(`id`) ON DELETE SET NULL);';
    await db.execute(createemployee);
    await seedEmployees();

    console.log('Database seeding completed.');
    await displayOpeningPage();
})();


