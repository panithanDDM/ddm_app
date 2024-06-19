const bcrypt = require('bcrypt')


const { pool } = require('../utilities/poolConfig')


// สำหรับดูว่า userName มีใน data base หรือยัง
const getUserByUsername = async (username) => {
    try {
        const query = `SELECT * FROM users WHERE username = $1`
        const value = [username]
        const result = await pool.query(query, value)
        return result.rows[0]
    }
    catch (error) {
        console.error(`Error from getUserByUsername :: ${error}`)
        throw new error
    }
}
module.exports.getUserByUsername = getUserByUsername

//สำหรับเพิ่ม user ไปใน database 
const userRegister = async (fullname, username, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 2)
        const query = `INSERT INTO users 
                        (fullname, username, password, status, financial)
                        VALUES ($1, $2, $3, $4, $5)
                        `
        const valuse = [fullname, username, hashPassword, 'user', false]
        await pool.query(query, valuse)
    }
    catch (error) {
        console.error(`Error from userRister :${error}`)
    }
}
module.exports.userRegister = userRegister

