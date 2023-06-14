
require('dotenv').config();
const inquirer = require('inquirer');
const department = require('./models/department');
const { displayDepartments, displayBudget } = require('./models/displayDepartments');
const employee = require('./models/employee');
const { displayEmployees } = require('./models/displayEmployees');
const role = require('./models/role');
const { displayRoles } = require('./models/displayRoles');


console.log(process.env.DB_HOST);

async function displayOpeningPage() {
    console.log('Welcome to the DepartmentTracker Application!');
    console.log('--------------------------------------------');
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option to proceed:',
            choices:
                ['1. View Departments',
                    '2. View Roles',
                    '3. View Employees',
                    '4. Add Department',
                    '5. Add Role',
                    '6. Add Employee',
                    '7. Update Employee Role',
                    '8. Update Employee Manager',
                    '9. View employees by manager',
                    '10. View employees by department',
                    '11. View the total utilized budget of a department',
                    '12. Delete from Database',
                    '13. Exit'],
        },
    ]);

    const selectedOption = answers.option;
    switch (selectedOption) {
        case '1. View Departments':
            console.log('Viewing Departments...');
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
                    name: 'salary',
                    message: 'Please add the salary for the role:',
                },
            ]);
            const salary_name = addsalary.salary;

            let d = await department.all();
            let departmentChoices = d.map((dept) => ({ name: dept.name, value: dept.id }));
            let select_department = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept_selected',
                    message: 'Please select the department :',
                    choices: departmentChoices,
                },
            ]);

            let departmentId = select_department.dept_selected;
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
            const addfirstname = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstname',
                    message: 'Please add employees first name: ',
                },
            ]);
            const employee_firstname = addfirstname.firstname;
            const addlastname = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'Please add employees second name: ',
                },
            ]);
            const employee_lastname = addlastname.lastname;

            let r = await role.all();
            let roleChoices = r.map((rolemap) => ({ name: rolemap.title, value: rolemap.id }));
            let select_role = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_selected',
                    message: 'Please select the role: ',
                    choices: roleChoices,
                },
            ]);
            let roleId = select_role.role_selected;

            await employee.create({
                firstname: employee_firstname,
                lastname: employee_lastname,
                role_id: roleId,
                manager_id: null,
            })
                .then(() => {
                    console.log(`Employee ${employee_firstname} ${employee_lastname} added successfully.`);
                })
                .catch(error => {
                    console.log('An error occurred while adding the role:', error);
                });
            break;

        case '7. Update Employee Role':
            console.log('Update Employee Role');
            e = await employee.all();
            empChoices = e.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
            select_emp = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'emp_selected',
                    message: 'Please select the employee: ',
                    choices: empChoices,
                },
            ]);
            empId = select_emp.emp_selected;

            let r1 = await role.all();
            rChoices = r1.map((rolemap) => ({ name: rolemap.title, value: rolemap.id }));
            selecta_role = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_selected',
                    message: 'Please select the role: ',
                    choices: rChoices,
                },
            ]);
            roleId_replace = selecta_role.role_selected;
            try {
                await employee.updateEmployeeRole({
                    id: empId,
                    role_id: roleId_replace,
                });
                console.log(`Employee role updated successfully.`);
            } catch (error) {
                console.log('An error occurred while updating the employee role:', error);
            }
            break;

        case '8. Update Employee Manager':
            console.log('Update Employee Manager');
            e = await employee.all();
            empChoices = e.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
            select_emp = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'emp_selected',
                    message: 'Please select the employee: ',
                    choices: empChoices,
                },
            ]);
            empId = select_emp.emp_selected;

            m = await employee.all();
            managerChoices = m.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
            select_manager = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_selected',
                    message: 'Please select the manager: ',
                    choices: managerChoices,
                },
            ]);
            managerId = select_manager.manager_selected;
            try {
                await employee.updateEmployeeManager({
                    id: empId,
                    manager_id: managerId,
                });
                console.log(`Employee manager updated successfully.`);
            } catch (error) {
                console.log('An error occurred while updating the employee manager:', error);
            }
            break;

        case '9. View employees by manager':
            console.log('View employees by manager...');
            m = await employee.all();
            managerChoices = m.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
            select_manager = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_selected',
                    message: 'Please select the manager: ',
                    choices: managerChoices,
                },
            ]);
            managerId = select_manager.manager_selected;
            try {
                employee_by_manager = await employee.employeeByManager(managerId);

                if (employee_by_manager.length === 0) {
                    console.log('No Employees found under the manager...');
                }
                else {
                    displayEmployees(employee_by_manager);
                }

            } catch (error) {
                console.log('An error occurred while updating the employee manager:', error);
            }
            break;
        case '10. View employees by department':
            console.log('View employees by department...');

            let d1 = await department.all();
            let departmentChoices1 = d1.map((dept) => ({ name: dept.name, value: dept.id }));
            let select_department1 = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept_selected',
                    message: 'Please select the department :',
                    choices: departmentChoices1,
                },
            ]);

            dptId = select_department1.dept_selected;
            try {
                employee_by_department = await employee.employeeByDepartment(dptId);

                if (employee_by_department.length === 0) {
                    console.log('No Employees found under the department...');
                }
                else {
                    displayEmployees(employee_by_department);
                }

            } catch (error) {
                console.log('An error occurred while updating the employee manager:', error);
            }
            break;
        case '11. View the total utilized budget of a department':
            try {
                result = await department.budget();

                if (result.length === 0) {
                    console.log('No departments found...');
                }
                else {
                    displayBudget(result);
                }

            } catch (error) {
                console.log('An error occurred while displaying budget:', error);
            }
            break;
        case '12. Delete from Database':
            let delete_option = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'deleteoption',
                    message: 'Please select an option to delete from :',
                    choices: ['1. Delete a department','2. Delete a role','3. Delete an employee','4. Exit from deleting'],
                },
            ]);
            const selected_opt = delete_option.deleteoption;
            switch (selected_opt) {
            case '1. Delete a department':
                   let d1 = await department.all();
                    let departmentChoices1 = d1.map((dept) => ({ name: dept.name, value: dept.id }));
                    let select_department1 = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'dept_selected',
                            message: 'Please select the department :',
                            choices: departmentChoices1,
                        },
                    ]);
        
                    let departmentId = select_department1.dept_selected;
                    try {
                        deletequery = await department.deleteFromDepartment(departmentId);
        
                        if (deletequery.length === 0) {
                            console.log('No Department found...');
                        }
                        else {
                            console.log('selected department deleted');
                        }
        
                    } catch (error) {
                        console.log('An error occurred while deleting department:', error);
                    }
                    await displayOpeningPage();

                
                case '2. Delete a role':
                    {
                  let r1 = await role.all();
                    let rChoices = r1.map((rolemap) => ({ name: rolemap.title, value: rolemap.id }));
                    let select_role = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role_selected',
                            message: 'Please select the role: ',
                            choices: rChoices,
                        },
                    ]);
                    let roleId = select_role.role_selected;
                    try {
                        deletequery = await role.deleteFromRole(roleId);
        
                        if (deletequery.length === 0) {
                            console.log('No Role found...');
                        }
                        else {
                            console.log('selected role deleted');
                        }
        
                    } catch (error) {
                        console.log('An error occurred while deleting role:', error);
                    }
                    await displayOpeningPage();
                }
                
                case '3. Delete an employee':
                    {
                  e = await employee.all();
                 let empChoices = e.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
                let select_emp = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'emp_selected',
                            message: 'Please select the employee: ',
                            choices: empChoices,
                        },
                    ]);
                    let empId = select_emp.emp_selected;
                    try {
                        deletequery = await employee.deleteFromEmployee(empId);
        
                        if (deletequery.length === 0) {
                            console.log('No Employee found...');
                        }
                        else {
                            console.log('selected employee deleted');
                        }
        
                    } catch (error) {
                        console.log('An error occurred while deleting an employee:', error);
                    }
                    await displayOpeningPage();
                }
                
                case '4. Exit from deleting':
                
                    console.log('Not deleting from database...');
                    await displayOpeningPage();
                
            }
        
        case '13. Exit':
            console.log('Exiting DepartmentTracker Application...');
            process.exit(0);
    }

    await displayOpeningPage();
}
displayOpeningPage();



