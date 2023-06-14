const connect = require("../database/connect")

module.exports = {
    /**
     * Helper to create department
     * @param{{name: string}} attributes
     */
    create: async function (attributes) {
        const db = await connect();
        return db.execute('INSERT INTO `depttracker_db`.`role` (`title`, `salary`, `department_id`) VALUES (?, ?, ?)', [attributes.title, attributes.salary, attributes.department_id])
            .then(result => {
                //console.log('abc', result)
            });
    },
    async all() {
        const db = await connect();
        return db
            .execute(
                'SELECT r.id, r.title, d.name AS department, r.salary FROM role AS r INNER JOIN department AS d ON r.department_id = d.id')
            .then(result => {
                return result[0];
            });
    },
}

/* WHEN I choose to view all roles
THEN I am presented with the 
job title, role id, the department that role belongs to, and the salary for that role
 */
