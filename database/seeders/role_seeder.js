const { faker } = require("@faker-js/faker");
const role = require("../../models/role");

//seed  roles
async function seedRoles(num=10){
    for (let index = 0; index < num; index++) {
        role.create({
            name:faker.person.jobType()
        })
    }
} 

module.exports=seedRoles;