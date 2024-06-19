const bcrypt = require('bcrypt')
const { pool } = require('../utilities/poolConfig')

//require Model
const registerModel = require('../model/01_register_model')


// สำหรับแสดงหน้า register
const registerPageRender = (req, res) => {
    res.render('register_page', {
        title: 'Register',
        flash: req.flash()
    })
}
module.exports.registerPageRender = registerPageRender


//สำหรับนำข้อมูลจากฟอร์ม register มาใส่ที่ model register 
const createUser = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword } = req.body

        //ตรวจสอบว่ามี username นี้หรือยัง
        const existingUser = await registerModel.getUserByUsername(username)
        if (existingUser) { // ถ้ามี Username ในระบบแล้ว
            req.flash('error', 'Username is already registered')
            return res.redirect('/register')
        } else { //ถ้ายังไม่มี Username ในระบบ
            if (password !== confirmPassword) { //ถ้ารหัสผ่านไม่ตรงกัน
                req.flash('error', 'Password do not macth')
                res.redirect('/register/')
            } else {
                await registerModel.userRegister(fullname, username, password)
                res.redirect('/')
            }
        }
    }
    catch (error) {
        console.error(`Error from createUser controller ::${error}`)
    }

}
module.exports.createUser = createUser