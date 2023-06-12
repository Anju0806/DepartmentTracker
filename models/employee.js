const connect = require("../database/connect")

module.exports = {
    /**
   * Helper to create employee
   * @param {{ firstname: string, lastname: string, role_id: number, manager_id: number }} attributes
   */
    create: async function (attributes) {
        const db = await connect();
        return db.execute('INSERT INTO `depttracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?, ?)', [attributes.id, attributes.firstname, attributes.lastname, attributes.role_id, attributes.manager_id])

            .then(result => {
                //console.log('abc', result)
            });
    },

    
    async all(){
        const db = await connect();
        return db.execute('SELECT * FROM employee')
        .then(result=>{
            console.log(result)
        })
        }
}
