const express = require('express');
const db = require('../db/connect');
const router = express.Router();

// Sets up the route to get the employees information based on the department they belong to
router.get('/deptEmployees/:id', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name
    FROM employees employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    on roles.department_id = departments.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    WHERE department_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: rows
        });
    });
});

// sets up the route to get the employee information based on the manager they are under
router.get('/manager/:id', (req, res) => {
    const sql =  `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Full_Name, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name, roles.title AS Role
    FROM employees employee
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    LEFT JOIN roles
    ON employee.role_id = roles.id
    WHERE manager.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Sets up the route to return the information on a single employee based on their ID
router.get('/employee/:id', (req, res) => {
    const sql =  `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Full_Name, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name, roles.title AS Role
    FROM employees employee
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    LEFT JOIN roles
    ON employee.role_id = roles.id
    WHERE employee.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Sets up the route to delete an employee
router.delete('/employee/:id', (req,res) => {
    const sql = `DELETE FROM employees 
    WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// sets up the route to update an employee's information
router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employees 
    SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?
    WHERE id = ?`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Sets up the route to add a new employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        }) ;
    });
});

// sets up the route to get and display all of the employees in the database
router.get('/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name
    FROM employees employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    on roles.department_id = departments.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;