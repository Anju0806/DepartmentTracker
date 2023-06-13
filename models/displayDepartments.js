
module.exports = {
/**
   * Display departments in a formatted table
   * @param {Array} departments - Array of department objects
   */
displayDepartments: function (departments) {
    
    console.log('-------------------------------------------');
    console.log('Departments:');
    console.log('-------------------------------------------');
    console.log('ID\t\tName');
    console.log('-------------------------------------------');
    departments.forEach((dept) => {
      console.log(`${dept.id}\t\t${dept.name}`);
    });
    console.log('-------------------------------------------');
  }

}