const connection = require('./connection');

class DB {

    constructor(connection) {
        this.connection = connection
    }

    findAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;'
        )
    }
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;'
            )
    }
    addNewDept(name) {
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ('${name}');`)
    }
    addFreshRole(role) {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', ${role.dept});`)
    }
    addNewEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id});`)
    }
    addEmployeeRole(emp_id, role_id) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${emp_id}`)
    }
}

module.exports = new DB(connection);