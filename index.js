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
            if (answers.startup === 'Employee Menu') {
                this.employeeMenu();
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
                .then((data) => {console.log(' '); console.table(data.data)})
                .then(this.deptMenu());
                
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
                })
                .then(this.deptMenu());
                const newDeptObj = {
                    name: answers.addDept
                }
                addMe(newDeptObj);
            }
            if (answers.deptList === "Delete a Department") {
                fetch(`http://localhost:3001/api/department/${answers.deleteDept.id}`, {
                    method: 'Delete'
                })
                .then(this.deptMenu());
            }
            if (answers.deptList === "Update a Department") {
                let updateMe = (updateText) => fetch(`http://localhost:3001/api/department/${answers.updateDept.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                .then(this.deptMenu());
                let updateDeptObj = {
                    name: answers.yesUpdateDept
                }
                updateMe(updateDeptObj);

            }
        })
        .catch(err => {
            console.log(err);
        })
    };

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
                .then((data) => {console.table(data.data)})
                .then(this.rolesMenu());
                
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
                })
                .then(this.rolesMenu());
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
                })
                .then(this.rolesMenu());
            }
            if (answers.roleList === "Update a Role") {
                let updateMeRole = (updateText) => fetch(`http://localhost:3001/api/role/${answers.updateRole.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                .then(this.rolesMenu());
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
    };

    employeeMenu() {
        inquirer.prompt(eQues)
        .then((answers) => {
            console.log(answers);
            if (answers.emplList === "Go Back"){
                this.initialize();
            }
            if (answers.emplList === "View all Employees") {
                fetch('http://localhost:3001/api/employees', {
                    method: 'GET'
                })
                .then((res) => res.json())
                .then((data) => {console.log(' '); console.table(data.data)})
                .then(this.employeeMenu());
                
            }
            if (answers.emplList === "Add an Employee") {
                if (!answers.addEmplFirstName || !answers.addEmplLastName || !answers.addEmplRole || !answers.addEmplManager) {
                    return;
                }
                const addMeEmpl = (employee) => 
                fetch(`http://localhost:3001/api/employee`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employee),
                })
                .then(this.employeeMenu());
                const newEmplObj = {
                    first_name: answers.addEmplFirstName,
                    last_name: answers.addEmplLastName,
                    role_id: answers.addEmplRole.id,
                    manager_id: answers.addEmplManager.id
                }
                addMeEmpl(newEmplObj);
            }
            if (answers.emplList === "Delete an Employee") {
                fetch(`http://localhost:3001/api/employee/${answers.deleteEmployee.id}`, {
                    method: 'Delete'
                })
                .then(this.employeeMenu());
            }
            if (answers.emplList === "Update an Employee") {
                let updateMeEmpl = (updateText) => fetch(`http://localhost:3001/api/employee/${answers.updateEmployee.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                .then(this.employeeMenu());
                let roleID = () => {
                    if (answers.updateEmplRole) {
                        return answers.updateEmplRole.id;
                    } else {
                        return answers.updateEmployee.role_id;
                    }
                };
                let manID = () => {
                    if (answers.updateEmplMan) {
                        return answers.updateEmplMan.id;
                    } else {
                        return answers.updateEmployee.manager_id;
                    }
                };
                let updateEmplObj = {
                    first_name: answers.updateEmplFirstName || answers.updateEmployee.first_name,
                    last_name: answers.updateEmplLastName || answers.updateEmployee.last_name,
                    role_id: roleID(),
                    manager_id: manID()
                };
                console.log('Employee updated to the following:');
                console.table(updateEmplObj);
                updateMeEmpl(updateEmplObj);
            }
        });
    };
}
module.exports = Construction;