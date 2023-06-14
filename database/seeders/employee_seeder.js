const { faker } = require("@faker-js/faker");
const employee = require("../../models/employee");

//seed employee
async function seedEmployees(num = 11) {

    for (let index = 1; index < num; index++) {
        let randomId = Math.floor(Math.random() * 10) + 1;
        while(randomId == index){
            randomId = Math.floor(Math.random() * 10) + 1;
        }
        await employee.create({
            //id:randomnum,
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            role_id: randomId,
            manager_id: randomId,

        })
    }
}

module.exports = seedEmployees;

