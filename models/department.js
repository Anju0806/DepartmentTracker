const connect = require("../database/connect")

module.exports = {
  /**
   * Helper to create department
   * @param{{name: string}} attributes
   */
  create: async function (attributes) {
    //console.log(attributes)
    const db = await connect();
    return db.execute('INSERT INTO `depttracker_db`.`department` ( `name`) VALUES (?)', [attributes.name])

      .then(result => {
        // console.log('abc', result)
      });
  },

  deleteFromDepartment: async function (departmentId) {
    const db = await connect();
    return db.execute(`DELETE FROM department WHERE id = ${departmentId}`)

      .then(result => {
        return result[0].affectedRows;
      });
  },

  budget: async function () {
    const db = await connect();
    return db
      .execute(`SELECT department.name AS department, SUM(role.salary) AS total_budget
      FROM role
      INNER JOIN department ON role.department_id = department.id
      GROUP BY department.name`)
      .then(result => {
        return result[0];
      });
  },

  /**
   * Fetch all departments
   */
  all: async function () {
    const db = await connect();
    return db
      .execute('SELECT * FROM department')
      .then(result => {
        return result[0];
      });
  },
};

