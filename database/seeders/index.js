require('dotenv').config();
//const department = require('../../models/department');
const connect=require('../connect'); 
const seedDepartments = require('./department_seeder');



async function main(){
 

 const db=await connect();
 await db.execute('DROP TABLE IF EXISTS department');
 const sql='CREATE TABLE `depttracker_db`.`department` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(30) NOT NULL,PRIMARY KEY (`id`))';
 await db.execute(sql);
 await seedDepartments();

 }

 main();