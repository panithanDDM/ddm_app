const express = require('express')
const router = express.Router()

const autherCheck = require('../middleware/authChecker')
const redirect = require('../middleware/redirectIfAuth')


const registerController = require('../controller/01_register_controller')
const loginController = require('../controller/02_login_controller')





router.get('/', redirect, loginController.loginPageRender)
router.post('/', loginController.loginUserController)
router.get('/logout', loginController.logout)



router.get('/register', redirect, registerController.registerPageRender)
router.post('/register/', registerController.createUser)


module.exports = router