const connect = require("../database/connect")

module.exports = {
    /**
     * Helper to create department
     * @param{{name: string}} attributes
     */
    create: async function (attributes) {
        //console.log(attributes)
        const db = await connect();
        return db.execute('INSERT INTO `depttracker_db`.`department` ( `name`) VALUES (?)', [ attributes.name])

            .then(result => {
               // console.log('abc', result)
            });
    },

    
    async all(){
        const db = await connect();
        return db.execute('SELECT * FROM department')
        .then(result=>{
            console.log(result)
        })
        }
}


