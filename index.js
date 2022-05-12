const { prompt } = require('inquirer');
const questions = require('./questions');
const db = require('./models');
require("console.table");

//main switch statement which holds all question functions
function init() {
    prompt(questions)
    .then(res => {
        let answer = res.options;
        switch(answer) {
            case 'VIEW_DEPT':
                viewDept()
                break;

            case 'VIEW_ROLES':
                viewRole()
                break;

            case 'VIEW_EMP':
                viewEmp()
                break;

            case 'ADD_DEPT':
                addDept()
                break;

            case 'ADD_ROLE':
                addRole()
                break;

            case 'ADD_EMP':
                addEmp()
                break;

            case 'UPD_ROLE':
                updRole()
                break;
        }
    })
}

//view all departments function
function viewDept() {
    
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    })
    .then(() => init())

}

//view all roles function
function viewRole() {
    
    db.findAllRoles()
    .then(([rows]) => {
        let sweetRoles = rows;
        console.log('\n');
        console.table(sweetRoles);
    })
    .then(() => init())

}

//view all employees function
function viewEmp() {
    
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => init())
}

//add new dept function
function addDept() {

    prompt([
        {
            name: 'newDept',
            // type: 'text',
            message: 'Whats the name of the new department',            

        }
    ])
    .then(res => {
        let name = res.newDept;
        console.log(name);
        db.addNewDept(name)
        .then( () => {
            console.log(`${name} department added!`)            
        })
        .then(() => init())
    })   
}

//add new role function
function addRole() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        let choices = departments.map(({ id, name }) => ({
            value: id,
            name: name
        }))

        prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "How much would you like to overpay for this role?"
        },
        {
            type: "list",
            name: "dept",
            message: "Which department do they belong to (enter the id)?",
            choices: choices
        }
        ])
        .then(res => {
            db.addFreshRole(res)
        .then( () => {
            console.log(`${res.title} role added!`)            
        })
        .then(() => init())
        })
    })
}

//add new employee function
function addEmp() {
        //questions prompt
        prompt([
        {
            name: "first_name",
            message: "Whats the new employee's first name?"
        },
        {
            name: "last_name",
            message: "What is their surname"
        }
        ])
        .then(res => {
            let first = res.first_name;
            let last = res.last_name;

            db.findAllRoles()
                .then(([rows]) => {
                    let role = rows;
                    let roleChoices = role.map(({ id, title}) => ({
                        value: id,
                        name: title,
                    }))

                    prompt({
                        type: "list",
                        name: "role_id",
                        message: "What will they be pretending to do all day?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleID = res.role_id

                            db.findAllEmployees()
                            .then(([rows]) => {
                                let employees = rows
                                let managerChoices = employees.map( ({ id, first_name }) => ({
                                    value: id,
                                    name: first_name
                                }));
                                managerChoices.push({value: null, name: "NA"})

                                prompt({
                                    type: "list",
                                    name: "manager",
                                    message: "Who the manager be(enter the id)?",
                                    choices: managerChoices
                                })
                                .then(res => {
                                    let employee = {
                                        first_name: first,
                                        last_name: last,
                                        role_id: roleID,
                                        manager_id: res.manager
                                    }
                                    db.addNewEmployee(employee)
                                    .then(() => {
                                        console.log(`${first} ${last} added`)
                                    })
                                    .then(() => init())
                                })
                            })
                        })
                })
        })
    
}

//update employee role function
function updRole() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        let employeeChoices = employees.map(({ id, first_name, last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`          
        }))
        //questions prompt
        prompt({
            type: "list",
            name: "employee",
            message: "which employee needs to be termin--I mean updated?",
            choices: employeeChoices
        })
        .then(res => {
            let employeeID = res.employee;

            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    let roleChoices = roles.map(({ id, title }) => ({
                        value: id,
                        name: title
                    }))

                    prompt({
                        type: "list",
                        name: 'role',
                        message: 'What is their new role?',
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleID = res.role;
                            db.addEmployeeRole(employeeID, roleID)
                            .then(() => console.log("Updated role"))
                            .then(() => init())
                        })
                })
        })
    })
}

init();
//END