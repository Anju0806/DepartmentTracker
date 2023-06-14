const connect = require("../database/connect")

module.exports = {
    /**
   * Helper to create employee
   * @param {{ firstname: string, lastname: string, role_id: number, manager_id: number }} attributes
   */
    create: async function (attributes) {
        const db = await connect();
        console.log(attributes);
        return db.execute('INSERT INTO `depttracker_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)', [attributes.firstname, attributes.lastname, attributes.role_id, attributes.manager_id])

            .then(result => {
                //console.log('abc', result)
            });
    },

    /**
    * Helper to update employee's role
    * @param {{ id: number, role_id: number }} attributes - Object containing the employee ID and new role ID
    */
    updateEmployeeRole: async function (attributes) {
        //const { id, role_id } = attributes;
        const db = await connect();
        return db.execute(`UPDATE depttracker_db.employee SET role_id = ${attributes.role_id} WHERE id = ${attributes.id}`);
    },

    /**
    * Helper to update employee's role
    * @param {{ id: number, manager_id: number }} attributes - Object containing the employee ID and new role ID
    */
    updateEmployeeManager: async function (attributes) {
        const db = await connect();
        return db.execute(`UPDATE depttracker_db.employee SET manager_id = ${attributes.manager_id} WHERE id = ${attributes.id}`);
    },
    employeeByManager: async function (managerId) {
        const db = await connect();
        const query = `SELECT e.id, e.first_name, e.last_name 
                       FROM employee AS e 
                       WHERE e.manager_id = ${managerId}`;
      
        return db.execute(query)
          .then(result => {
            return result[0];
          });
      },
      employeeByDepartment: async function (departmentId) {
        const db = await connect();
        const query = `SELECT e.id, e.first_name, e.last_name 
                       FROM employee AS e 
                       WHERE e.role_id IN 
                       (SELECT r.id 
                        FROM role AS r 
                        WHERE r.department_id = ${departmentId})`;
      
        return db.execute(query)
          .then(result => {
            return result[0];
          });
      },
    deleteFromEmployee: async function (empId) {
        const db = await connect();
        return db.execute(`DELETE FROM employee WHERE id = ${empId}`)
    
          .then(result => {
            return result[0].affectedRows;
          });
      },

    async all() {
        const db = await connect();
        return db
            .execute(
                'SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, m.first_name AS manager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.id ASC')
            .then(result => {
                return result[0];
            });
    }
}


