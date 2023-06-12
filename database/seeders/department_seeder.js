const { faker } = require('@faker-js/faker');
const department = require('../../models/department');

// Seed departments
async function seedDepartments(num = 10) {
  const generatedNames = new Set();

  for (let index = 0; index < num; index++) {
    let name = faker.commerce.department();
    
    // Checking if the name already exists
    while (generatedNames.has(name)) {
      name = faker.commerce.department();
    }
    generatedNames.add(name);
    await department.create({ name });
  }
}

module.exports = seedDepartments;
