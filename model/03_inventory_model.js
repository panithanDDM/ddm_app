const { pool } = require('../utilities/poolConfig')



//ดึงข้อมูลทั้งหมดมาแสดง
const getInventoryModel = async () => {
    try {
        const query = `SELECT * FROM inventory ORDER BY date DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getInventoryModel : ${error}`)
        throw error
    }
}
module.exports.getInventoryModel = getInventoryModel


//สำหรับการบันทึกข้อมูลลง Database 
const inventorySaveModel = async (name, model, snumber, type, status, usecycle, date, image) => {
    try {
        const query = `INSERT INTO inventory 
                        (name, model, snumber, type, status, usecycle, date, image)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        `
        const values = [name, model, snumber, type, status, usecycle, date, image]
        await pool.query(query, values)
        console.log(`Inventory Save success : ${name}`)
    }
    catch (error) {
        console.log(`Error from inventorySaveModel : ${error}`)
        throw error
    }
}
module.exports.inventorySaveModel = inventorySaveModel





// นับจำนวน Inventory ทั้งหมด
const totalInventoryItemModel = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalInventoryItemModel :: ${error}`)
    }
}
module.exports.totalInventoryItemModel = totalInventoryItemModel
// นับจำนวน Inventory ที่ status = Active
const activeItemInventoryModel = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Active'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.activeItemInventoryModel = activeItemInventoryModel
// นับจำนวน Inventory ที่ status = damaged
const damageItemInventoryModel = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Damaged'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.damageItemInventoryModel = damageItemInventoryModel
// นับจำนวน Inventory ที่ status = Pendingg
const pendingItemInventoryModel = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Pending'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.pendingItemInventoryModel = pendingItemInventoryModel





//สำหรับการเลือกข้อมูล Inventory จาก ID 
const getInventoryByIdModel = async (id) => {
    try {
        const query = `SELECT * FROM inventory WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.log(`Error from getInventoryByIdModel : ${error}`)
    }
}
module.exports.getInventoryByIdModel = getInventoryByIdModel

//สำหรับการอัพเดตตาม ID
const updateInventoryModel = async (id, newData) => {
    try {
        const { name, model, snumber, type, status, usecycle, date } = newData
        const query = `UPDATE inventory SET 
                        name = $1, model = $2, snumber = $3, type = $4, 
                        status = $5, usecycle = $6, date = $7 WHERE id = $8`
        const values = [name, model, snumber, type, status, usecycle, date, id]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from updateInventoryModel : ${error}`)
        throw error
    }
}
module.exports.updateInventoryModel = updateInventoryModel


//สำหรับการลบข้อมูล
const deleteInventoryModel = async (id) => {
    try {
        const query = `DELETE FROM inventory WHERE id = $1`
        await pool.query(query, [id])
    }
    catch (error) {
        console.log(`Error from deleteInventoryModel : ${error}`)
        throw error
    }
}
module.exports.deleteInventoryModel = deleteInventoryModel


// ดึงข้อมูลอุปกรณ์ทั้งหมดที่เป็น type = Drone มาแสดง
const getInventoryDroneData = async (req, res) => {
    try {
        const query = `SELECT name FROM inventory WHERE type = 'Drone'
                        ORDER BY name DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getInventoryDroneData : ${error}`)
        throw error
    }
}
module.exports.getInventoryDroneData = getInventoryDroneData