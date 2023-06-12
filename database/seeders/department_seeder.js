const { faker } = require("@faker-js/faker");
const department = require("../../models/department");

//seed  departments
async function seedDepartments(num=10){
    for (let index = 0; index < num; index++) {

        
        department.create({
            name:faker.commerce.department()
        }) 
    }
} 

module.exports=seedDepartments;