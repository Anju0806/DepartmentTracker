const connect = require("../database/connect")

module.exports = {
    /**
     * Helper to create department
     * @param{{name: string}} attributes
     */
    create: async function (attributes) {
        const defaultSalary=0;
        //console.log(attributes)
        const db = await connect();
        //return db.execute('INSERT INTO `depttracker_db`.`role` (`title`) VALUES (?)', [attributes.name])
        return db.execute('INSERT INTO `depttracker_db`.`role` (`title`, `salary`) VALUES (?, ?)', [attributes.name, defaultSalary])

            .then(result => {
                console.log('abc', result)
            });
    },

    
    async all(){
        const db = await connect();
        return db.execute('SELECT * FROM roles')
        .then(result=>{
            console.log(result)
        })
        }
}
