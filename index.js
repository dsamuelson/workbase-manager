const inquirer = require ('inquirer');
const db = require('./db/connect');
const cTable = require('console.table');
const fetch = require('node-fetch');
const { startQuestion:sQues, deptQuestions:dQues, roleQuestions:rQues, emplQuestions:eQues } = require('./src/questions');
class Construction {

    initialize() {
        inquirer.prompt(sQues)
        .then(answers => {
            console.log(answers.startup);
            if (answers.startup === 'Department Menu') {
                this.deptMenu();
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
                const updateMe = (updateText) => fetch(`http://localhost:3001/api/department/${answers.updateDept.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updateText),
                })
                const updateDeptObj = {
                    name: answers.yesUpdateDept
                }
                updateMe(updateDeptObj);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}
module.exports = Construction;