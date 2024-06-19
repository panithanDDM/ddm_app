const { pool } = require('../utilities/poolConfig')



// สำหรับการ Login 
const loginUser = async (username, password) => {
    try {
        const query = `SELECT * FROM users WHERE username = $1`
        const value = [username]
        const result = await pool.query(query, value)
        return result
    }
    catch (error) {
        console.error(`Error from loginUser model : ${error}`)
        throw error
    }
}
module.exports.loginUser = loginUser

//สำหรับการแสดงรายละเอียดชื่อ User
const userNameModel = async () => {
    try {
        const query = `SELECT fullname FROM users ORDER BY fullname DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.error(`Error from loginUser model : ${error}`)
        throw error
    }
}
module.exports.userNameModel = userNameModel