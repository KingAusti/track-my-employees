const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'Bienvenidos al Main Menu',
        choices: [
            {
                name: 'View All Departments',
                value: 'VIEW_DEPT'
            },
            {
                name: 'View All Roles',
                value: 'VIEW_ROLES'
            },
            {
                name: 'View All Employees',
                value: 'VIEW_EMP'
            },
            {
                name: 'Add Department',
                value: 'ADD_DEPT'
            },
            {
                name: 'Add Role',
                value: 'ADD_ROLE'
            },
            {
                name: 'Add Employee',
                value: 'ADD_EMP'
            },
            {
                name: 'Update Employee Role',
                value: 'UPD_ROLE'
            }
        ]
    }
];

module.exports = questions;