require('dotenv').config();
const inquirer = require('inquirer');
const department = require('../../models/department');
const { displayDepartments } = require('../../models/displayDepartments');
const employee = require('../../models/employee');
const { displayEmployees } = require('../../models/displayEmployees');
const role = require('../../models/role');
const { displayRoles } = require('../../models/displayRoles');
const connect = require('../connect');
const seedDepartments = require('./department_seeder');
const seedEmployees = require('./employee_seeder');
const seedRoles = require('./role_seeder');

async function displayOpeningPage() {
    console.log('Welcome to the DepartmentTracker Application!');
    console.log('--------------------------------------------');
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option to proceed:',
            choices: ['1. View Departments', '2. View Roles', '3. View Employees', '4. Add Department', '5. Add Role', '6. Add Employee', '7. Update Employee Role', '8. Exit'],
        },
    ]);

    const selectedOption = answers.option;
    switch (selectedOption) {
        case '1. View Departments':
            console.log('Viewing Departments...');
            // Call function to handle viewing departments
            const departments = await department.all();
            displayDepartments(departments);
            break;
        case '2. View Roles':
            console.log('Viewing Roles...');
            const roles = await role.all();
            displayRoles(roles);
            break;
        case '3. View Employees':
            console.log('Viewing Employees...');
            const employees = await employee.all();
            displayEmployees(employees);
            break;
        case '4. Add Department':
            console.log('Add a Department');
            const dept = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'Please add the department name: ',
                },
            ]);
            const department_name = dept.department;
            await department.create({ name: department_name })
                .then(() => {
                    console.log(`Department ${department_name} added successfully.`);
                })
                .catch(error => {
                    console.log('An error occurred while adding the department:', error);
                });
            break;
        /* ------------------- */
        case '5. Add Role':
            console.log('Add a Role');
            const addrole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Please add the role title: ',
                },
            ]);
            const role_name = addrole.role;
            const addsalary = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Please add the salary for the role:',
                },
            ]);
            const salary_name = addsalary.salary;

            const d = await department.all();
            const departmentChoices = d.map((dept) => ({ name: dept.name, value: dept.id }));
            const select_department = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept_selected',
                    message: 'Please select the department for `${role_name}:',
                    choices: departmentChoices,
                },
            ]);

            const selectedDept = select_department.dept_selected;
            const departmentId = selectedDept !== undefined ? selectedDept : null;

            await role.create({
                title: role_name,
                department_id: departmentId,
                salary: salary_name
            })
                .then(() => {
                    console.log(`Role ${role_name} added successfully.`);
                })
                .catch(error => {
                    console.log('An error occurred while adding the role:', error);
                });
            break;
        /* ------------------- */
        case '6. Add Employee':
            console.log('Add an Employee');
            // const employees = await employee.all();
            break;
        case '7. Update Employee Role':
            console.log('Update Employee Role');
            //const employees = await employee.all();
            break;
        case '8. Exit':
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


