const express = require('express');
const router = express.Router()
const controller = require('../server/controllers/userController')


router.post('/addEmp', controller.addEmp)
router.get('/getAll', controller.getAllEmp)
router.post('/emp/:empId', controller.updateEmp)
router.delete('/emp/:empId', controller.deleteEmp)


module.exports = router;
