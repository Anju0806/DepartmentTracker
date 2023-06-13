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

    
   /*  async all(){
        const db = await connect();
        return db.execute('SELECT * FROM department')
        .then(result=>{
            console.log(result)
        })
        }
} */

  /**
   * Fetch all departments
   */
  all: async function () {
    const db = await connect();
    return db
      .execute('SELECT * FROM department')
      .then(result => {
        // Process the result and return the department data
        // You can modify this based on your database structure and ORM used
        return result[0];
      });
  },

  
};

