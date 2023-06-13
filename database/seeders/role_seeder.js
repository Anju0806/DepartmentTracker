const { faker } = require("@faker-js/faker");
const role = require("../../models/role");

async function seedRoles(num = 11) {
  
    for (let index = 1; index < num; index++) {
        const randomId = Math.floor(Math.random() * 10) + 1;
        const randomSalary = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

      await role.create({
        title: faker.person.jobType(),
        department_id: randomId, // Assign department_id to the role
        salary: randomSalary
      });
    }
  }

module.exports=seedRoles;