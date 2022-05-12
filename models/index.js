//import connection sheet
const connection = require('./connection');

class DB {

    constructor(connection) {
        this.connection = connection
    }
    //find all departments function
    findAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        )
    }
    //find all roles function
    findAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;'
        )
    }
    //find all employees function
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;'
        )
    }
    //add new department function
    addNewDept(name) {
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ('${name}');`
        )
    }
    //add new role function
    addFreshRole(role) {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', ${role.dept});`
        )
    }
    //add new employee function
    addNewEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id});`
        )
    }
    //change employee role function
    addEmployeeRole(emp_id, role_id) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${emp_id}`
        )
    }
}

module.exports = new DB(connection);
//END