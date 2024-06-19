const { pool } = require('../utilities/poolConfig')


//ดึงข้อมูลทั้งหมดมาแสดง
const getProjectData = async () => {
    try {
        const query = `SELECT * FROM project`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getProjectData : ${error}`)
        throw error
    }
}
module.exports.getProjectData = getProjectData


// การบันทึกข้อมูลลง Data  base 
const projectSaveModel = async (project_name, project_status) => {
    try {
        const query = `INSERT INTO project
                        (project_name, project_status)
                        VALUES ($1, $2)`
        const values = [project_name, project_status]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from projectSaveModel : ${error}`)
        throw error
    }
}
module.exports.projectSaveModel = projectSaveModel


//ดึงข้อมูลทั้งหมดที่ status = working มาแสดง
const getProjectWorkingData = async () => {
    try {
        const query = `SELECT * FROM project WHERE project_status = 'Ongoing'
                        ORDER BY project_name DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.log(`Error from getProjectWorkingData : ${error}`)
        throw error
    }
}
module.exports.getProjectWorkingData = getProjectWorkingData



//สำหรับการเลือกข้อมูล project จาก ID 
const getProjectByID = async (id) => {
    try {
        const query = `SELECT * FROM project WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.log(`Error from getProjectByID : ${error}`)
    }
}
module.exports.getProjectByID = getProjectByID


//สำหรับการอัพเดตตาม ID
const updateProjectModel = async (id, project_status) => {
    try {
        const query = `UPDATE project SET
                        project_status = $1
                        WHERE id = $2`
        const values = [project_status, id]
        await pool.query(query, values)
    }
    catch (error) {
        console.log(`Error from updateProjectModel : ${error}`)
        throw error
    }
}
module.exports.updateProjectModel = updateProjectModel
