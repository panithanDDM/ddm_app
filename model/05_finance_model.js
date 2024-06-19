const { pool } = require('../utilities/poolConfig')

// ดึงข้อมูลมาแสดงของที่ User แต่ละคน
//ดึงข้อมูลทั้งหมดมาแสดง
const getfinanceModel = async (user) => {
    try {
        const query = `SELECT * FROM finance WHERE name = $1 ORDER BY date DESC`
        const values = [user]
        const result = await pool.query(query, values)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getfinanceModel : ${error}`)
        throw error
    }
}
module.exports.getfinanceModel = getfinanceModel


//เรียกข้อมูลราคาทั้งหมดของ price
const getFinanceTotla = async (user) => {
    try {
        const query = `SELECT SUM(price) AS total_price
                        FROM finance
                        WHERE name = $1`
        const values = [user]
        const result = await pool.query(query, values)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const totalPrice = result.rows[0].total_price;
        return totalPrice !== null ? totalPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].total_price;
    }
    catch (error) {
        console.log(`Error from getFinanceTotla : ${error}`)
        throw error
    }
}
module.exports.getFinanceTotla = getFinanceTotla

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = accept
const getFinanceAccept = async (user) => {
    try {
        const query = `SELECT SUM(price) AS accept_price
                        FROM finance
                        WHERE status = 'Accept' AND
                        name = $1`
        const values = [user]
        const result = await pool.query(query, values)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const acceptPrice = result.rows[0].accept_price;
        return acceptPrice !== null ? acceptPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].accept_price;
    }
    catch (error) {
        console.log(`Error from getFinanceAccept : ${error}`)
        throw error
    }
}
module.exports.getFinanceAccept = getFinanceAccept

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = reject
const getFinanceReject = async (user) => {
    try {
        const query = `SELECT SUM(price) AS reject_price
                        FROM finance
                        WHERE status = 'Reject' AND
                        name = $1`
        const values = [user]
        const result = await pool.query(query, values)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const rejectPrice = result.rows[0].reject_price;
        return rejectPrice !== null ? rejectPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].reject_price;
    }
    catch (error) {
        console.log(`Error from getFinanceReject : ${error}`)
        throw error
    }
}
module.exports.getFinanceReject = getFinanceReject

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = pending
const getFinancePending = async (user) => {
    try {
        const query = `SELECT SUM(price) AS pending_price
                        FROM finance
                        WHERE status = 'Pending' AND
                        name = $1`
        const values = [user]
        const result = await pool.query(query, values)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const pendingPrice = result.rows[0].pending_price;
        return pendingPrice !== null ? pendingPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].pending_price;
    }
    catch (error) {
        console.log(`Error from getFinancePending : ${error}`)
        throw error
    }
}
module.exports.getFinancePending = getFinancePending



//ดำเนินการกับฟอร์ม
//สำหรับการบันทึกข้อมูลลง Database 
const financeSaveModel = async (name, date, section, type, project_name, price, image, description) => {
    try {
        const query = `INSERT INTO finance
                        (name, date, section, type, project_name, price, image, status, description)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        const values = [name, date, section, type, project_name, price, image, 'Pending', description]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from financeSaveModel : ${error}`)
        throw error
    }
}
module.exports.financeSaveModel = financeSaveModel

//สำหรับลบข้อมูลออกจาก Data base 
const deleteFinanceModel = async (id) => {
    try {
        const query = `DELETE FROM finance WHERE id = $1`
        await pool.query(query, [id])
    }
    catch (error) {
        console.log(`Error from deleteFinanceModel : ${error}`)
    }
}
module.exports.deleteFinanceModel = deleteFinanceModel



/// สำหรับหน้า admin
// เรียกข้อมูลทั้งหมดมาแสดง
const getFinanceAdminModel = async () => {
    try {
        const query = `SELECT * FROM finance ORDER BY id DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getFinanceAdminModel : ${error}`)
        throw error
    }
}
module.exports.getFinanceAdminModel = getFinanceAdminModel

//เรียกข้อมูลราคาทั้งหมดของ price
const getFinanceTotlaAdmin = async () => {
    try {
        const query = `SELECT SUM(price) AS total_price
                        FROM finance`
        const result = await pool.query(query)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const totalPrice = result.rows[0].total_price;
        return totalPrice !== null ? totalPrice : 0; // ถ้าไม่มีค่า ให้คืน 0

        // return result.rows[0].total_price;
    }
    catch (error) {
        console.log(`Error from getFinanceTotlaAdmin : ${error}`)
        throw error
    }
}
module.exports.getFinanceTotlaAdmin = getFinanceTotlaAdmin

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = accept
const getFinanceAcceptAdmin = async () => {
    try {
        const query = `SELECT SUM(price) AS accept_price
                        FROM finance
                        WHERE status = 'Accept'`
        const result = await pool.query(query)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const acceptPrice = result.rows[0].accept_price;
        return acceptPrice !== null ? acceptPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].accept_price;
    }
    catch (error) {
        console.log(`Error from getFinanceAcceptAdmin : ${error}`)
        throw error
    }
}
module.exports.getFinanceAcceptAdmin = getFinanceAcceptAdmin

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = reject
const getFinanceRejectAdmin = async () => {
    try {
        const query = `SELECT SUM(price) AS reject_price
                        FROM finance
                        WHERE status = 'Reject'`
        const result = await pool.query(query)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const rejectPrice = result.rows[0].reject_price;
        return rejectPrice !== null ? rejectPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].reject_price;
    }
    catch (error) {
        console.log(`Error from getFinanceRejectAdmin : ${error}`)
        throw error
    }
}
module.exports.getFinanceRejectAdmin = getFinanceRejectAdmin

//เรียกข้อมูลราคาทั้งหมดของ price ที่ status = pending
const getFinancePendingAdmin = async () => {
    try {
        const query = `SELECT SUM(price) AS pending_price
                        FROM finance
                        WHERE status = 'Pending'`
        const result = await pool.query(query)
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        const pendingPrice = result.rows[0].pending_price;
        return pendingPrice !== null ? pendingPrice : 0; // ถ้าไม่มีค่า ให้คืน 0
        // return result.rows[0].pending_price;
    }
    catch (error) {
        console.log(`Error from getFinancePendingAdmin : ${error}`)
        throw error
    }
}
module.exports.getFinancePendingAdmin = getFinancePendingAdmin

// สำหรับการดึงข้อมูลมาตาม ID 
const getFinanceByIdModel = async (id) => {
    try {
        const query = `SELECT * FROM finance WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.log(`Error from getFinanceByIdModel : ${error}`)
        throw error
    }
}
module.exports.getFinanceByIdModel = getFinanceByIdModel

//สำหรับการอัพเดตตาม ID
const updateFinanceModel = async (id, status) => {
    try {
        const query = `UPDATE finance SET
                        status = $1
                        WHERE id = $2`
        const values = [status, id]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from updateFinanceModel : ${error}`)
        throw error
    }
}
module.exports.updateFinanceModel = updateFinanceModel