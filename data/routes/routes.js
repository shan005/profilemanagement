const express = require('express')
const router = express.Router();





//imports
const AdminUserController = require('../controllers/adminusercontroller')


//AdminUser
router.post('/addAdminUserHimself', AdminUserController.addAdminUserHimself)
router.post('/adminUserLogin', AdminUserController.adminuserLogin)
router.post('/adminAddAdminsUsers', AdminUserController.adminAddAdminsUsers)
router.post('/updateAdminUserHimself', AdminUserController.updateAdminUserHimself)
router.post('/adminUpdateAdminsUsers', AdminUserController.adminUpdateAdminsUsers)



module.exports = router;