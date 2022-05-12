const { prompt } = require('inquirer');
const questions = require('./questions');

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