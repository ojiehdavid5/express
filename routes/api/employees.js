const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST=require("../../config/roles");
const verifyRoles=require("../../middleware/verifyRoles");



router.route('/')
    .get( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor) ,employeesController.getAllEmployees)
    .post(  verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.createNewEmployee)
    .put( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.updateEmployee)
    .delete( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;