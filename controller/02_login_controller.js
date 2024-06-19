const bcrypt = require('bcrypt')

//require Model
const loginModel = require('../model/02_login_model')


// สำหรับแสดงหน้า login 
const loginPageRender = (req, res) => {
    res.render('index', {
        flash: req.flash(),
        title: 'DevDrone Mapper'
    })
}
module.exports.loginPageRender = loginPageRender


// ฟังชั่นการตรวจสอบผู้ใช้ Login
const loginUserController = async (req, res) => {
    try {
        const { username, password } = req.body

        const result = await loginModel.loginUser(username, password)

        if (result.rows.length > 0) {
            const user = result.rows[0]
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                req.session.userId = user.id
                res.redirect('/home/')
            } else {
                req.flash('error', 'Invalid Password')
                res.redirect('/')
            }
        } else {
            req.flash('error', 'NOT FOUND USERNAME FOR LOGIN')
            res.redirect('/')
        }
    }
    catch (error) {
        console.log(`Error from loginUserController : ${error}`)
        throw error
    }
}
module.exports.loginUserController = loginUserController



// ฟังชั่นสำหรับการ LOGOUT 
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
module.exports.logout = logout
