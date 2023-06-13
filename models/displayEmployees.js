const employee = require("./employee")

module.exports = {
  /**
     * Display departments in a formatted table
     * @param {Array} employees - Array of department objects
     */
  displayEmployees: function (employees) {
    console.table(employees)
  }
}

