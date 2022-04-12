const express = require('express');
const router = express.Router();

// set up routes to get information based on the api call
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));

module.exports = router;