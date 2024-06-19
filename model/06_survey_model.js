const { pool } = require('../utilities/poolConfig')


//สำหรับการดึงข้อมูลทั้งหมดมาแสดงที่หน้า Home
const getSurveyModel = async () => {
    try {
        const query = `SELECT * FROM survey ORDER BY date DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from surveySaveModel : ${error}`)
        throw error
    }
}
module.exports.getSurveyModel = getSurveyModel

//สำหรับการนับจำนวน Flight ทั้งหมดที่บิน
const totalFlightModel = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM survey`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalFlight :: ${error}`)
        throw error
    }
}
module.exports.totalFlightModel = totalFlightModel


//ดำเนินการกับฟอร์ม
//สำหรับการบันทึกข้อมูลลง Database 
const surveySaveModel = async (pilot_name, copilot_name, drone_name,
    project_name, latitude,
    longitude, cloud_cover, temperature, wind_speed,
    wind_direction,
    date, image) => {
    try {
        const query = `INSERT INTO survey 
                        (pilot_name, copilot_name, drone_name, project_name, latitude, 
                        longitude, cloud_cover, temperature, wind_speed, wind_direction, 
                        date, image) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                        `
        const values = [pilot_name, copilot_name, drone_name, project_name, latitude,
            longitude, cloud_cover, temperature, wind_speed, wind_direction,
            date, image]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from surveySaveModel : ${error}`)
        throw error
    }
}
module.exports.surveySaveModel = surveySaveModel



//สำหรับการเลือกข้อมูล survey จาก ID 
const getSurveyByIdModel = async (id) => {
    try {
        const query = `SELECT * FROM survey WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.log(`Error from getSurveyByIdModel : ${error}`)
    }
}
module.exports.getSurveyByIdModel = getSurveyByIdModel


//สำหรับการลบข้อมูล
const deleteSurveyModel = async (id) => {
    try {
        const query = `DELETE FROM survey WHERE id = $1`
        await pool.query(query, [id])
    }
    catch (error) {
        console.log(`Error from deleteSurveyModel : ${error}`)
        throw error
    }
}
module.exports.deleteSurveyModel = deleteSurveyModel