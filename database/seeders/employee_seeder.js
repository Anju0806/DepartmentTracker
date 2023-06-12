const { faker } = require("@faker-js/faker");
const role = require("../../models/employee");

//seed employee
async function seedEmployees(num=10){
    for (let index = 0; index < num; index++) {
        role.create({
            firstname:faker.person.firstName(),
            lastname:faker.person.lastName()
        })
    }
} 

module.exports=seedEmployees;