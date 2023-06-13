const { faker } = require("@faker-js/faker");
const employee = require("../../models/employee");

//seed employee
async function seedEmployees(num = 10) {

    for (let index = 1; index < num; index++) {
        const randomnum = index;
        const randomId = Math.floor(Math.random() * 10) + 1;
        /* let randomManagerID = Math.floor(Math.random() * 10) + 1;

        // Checking if the name already exists
        while (randomManagerID === index) {
            randomManagerID = Math.floor(Math.random() * 10) + 1;
        } */
        await employee.create({
            id:randomnum,
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            role_id: randomId,
            manager_id: randomnum,
        })
    }
}

module.exports = seedEmployees;

