const inquirer = require ('inquirer');
const db = require('./db/connect');
const cTable = require('console.table');
const fetch = require('node-fetch');
const { startQuestion:sQues, deptQuestions:dQues, roleQuestions:rQues, emplQuestions:eQues } = require('./src/questions');
const { title } = require('process');
class Construction {

    initialize() {
        inquirer.prompt(sQues)
        .then(answers => {
            console.log(answers.startup);
            if (answers.startup === 'Department Menu') {
                this.deptMenu();
            }
            if (answers.startup === 'Role Menu') {
                this.rolesMenu();
            }
            // for ease of use this will stop the app if quit is selected
            if (answers.startup === "Quit") {
                process.exit();
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    deptMenu() {
        inquirer.prompt(dQues)
        .then(answers => {
            console.log(answers);
            if (answers.deptList === "Go Back"){
                this.initialize();
            }
            if (answers.deptList === "View All Departments") {
                fetch('http://localhost:3001/api/departments', {
                    method: 'GET'
                })
                .then((res) => res.json())
                .then((data) => {console.table(data.data)});
                
            }
            if (answers.deptList === "Add a Department") {
                if (!answers.addDept) {
                    return;
                }

                const addMe = (department) => 
                fetch(`http://localhost:3001/api/department`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(department),
                });
                const newDeptObj = {
                    name: answers.addDept
                }
                addMe(newDeptObj);
            }
            if (answers.deptList === "Delete a Department") {
                fetch(`http://localhost:3001/api/department/${answers.deleteDept.id}`, {
                    method: 'Delete'
                });
            }
            if (answers.deptList === "Update a Department") {
                let updateMe = (updateText) => fetch(`http://localhost:3001/api/department/${answers.updateDept.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                let updateDeptObj = {
                    name: answers.yesUpdateDept
                }
                updateMe(updateDeptObj);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    rolesMenu() {
        inquirer.prompt(rQues)
        .then(answers => {
            console.log(answers);
            if (answers.roleList === "Go Back"){
                this.initialize();
            }
            if (answers.roleList === "View all Roles") {
                fetch('http://localhost:3001/api/roles', {
                    method: 'GET'
                })
                .then((res) => res.json())
                .then((data) => {console.table(data.data)});
                
            }
            if (answers.roleList === "Add a Role") {
                if (!answers.addRoleTitle || !answers.addRoleSalary || !answers.addRoleDept) {
                    return;
                }
                const addMeRole = (role) => 
                fetch(`http://localhost:3001/api/role`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(role),
                });
                const newRoleObj = {
                    title: answers.addRoleTitle,
                    salary: answers.addRoleSalary,
                    department_id: answers.addRoleDept.id
                }
                addMeRole(newRoleObj);
            }
            if (answers.roleList === "Delete a Role") {
                fetch(`http://localhost:3001/api/role/${answers.deleteRole.id}`, {
                    method: 'Delete'
                });
            }
            if (answers.roleList === "Update a Role") {
                let updateMeRole = (updateText) => fetch(`http://localhost:3001/api/role/${answers.updateRole.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                let updateRoleObj = {
                    title: answers.updateRoleTitle || answers.updateRole.title,
                    salary: answers.updateRoleSalary || answers.updateRole.salary,
                    department_id: answers.updateRoleDept || answers.updateRole.department_id
                };
                console.log('Role updated to the following:');
                console.table(updateRoleObj);
                updateMeRole(updateRoleObj);
            }
        })
    }
}
module.exports = Construction;