// require Model
const inventoryModel = require('../model/03_inventory_model')
const usersModel = require('../model/02_login_model')
const homeModel = require('../model/04_home_model')
const surveyModel = require('../model/06_survey_model')

// สำหรับแสดงหน้า Survey Home
const surveyPageRender = async (req, res) => {
    try {
        //ดึงข้อมูลทั้งหมด
        const surveyData = await surveyModel.getSurveyModel()
        //ดึงข้อมูล Total Flight
        const totalFlight = await surveyModel.totalFlightModel()

        res.render('04_survey/01_survey_home', {
            title: 'Survey',
            surveyData: surveyData,
            totalFlight: totalFlight
        })
    }
    catch (error) {
        console.log(`Error from surveyPageRender : ${error}`)
        throw error
    }
}
module.exports.surveyPageRender = surveyPageRender

// สำหรับแสดงหน้า survey form
const surveyFormRender = async (req, res) => {
    try {
        //เอาข้อมูลชื่อโดรนจาก inventory Model
        const droneList = await inventoryModel.getInventoryDroneData()
        //เอาข้อมูล fullname จาก usersModel
        const userName = await usersModel.userNameModel()
        //เอาชื่อข้อมูล project จาก project = "working"
        const projectName = await homeModel.getProjectWorkingData()
        res.render('04_survey/02_survey_form', {
            flash: req.flash(),
            title: 'Survey Form',
            userName: userName,
            droneList: droneList,
            projectName: projectName
        })
    }
    catch (error) {
        console.log(`Error from financeFormPageRender : ${error}`)
    }
}
module.exports.surveyFormRender = surveyFormRender


//สำหรับการบันทึกข้อมูลลง Data base 
const formUploadSurvey = async (req, res) => {
    const { pilot_name, copilot_name, drone_name, project_name, latitude, longitude,
        cloud_cover, temperature, wind_speed, wind_direction, date } = req.body
    const image = req.file.filename
    try {
        await surveyModel.surveySaveModel(pilot_name, copilot_name, drone_name, project_name, latitude, longitude, cloud_cover, temperature, wind_speed, wind_direction, date, image)
        res.redirect('/survey')
    }
    catch (error) {
        console.error(`Error from form UploadController :${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect('/survey/form/');
    }
}
module.exports.formUploadSurvey = formUploadSurvey


//การดึงข้อมูลจาก database มาแสดง โดยเลือกจาก ID
const detailSurveyController = async (req, res) => {
    const id = req.params.id // รับค่ามาจาก URL
    try {
        const detailSurvey = await surveyModel.getSurveyByIdModel(id)

        //ตรวจสอบว่ามี data เข้ามาหรือเปล่า
        if (!detailSurvey) {
            return res.status(400).send('Drone operation ID item not found')
        }

        res.render('04_survey/03_survey_detail', {
            title: detailSurvey.project_name,
            detailSurvey: detailSurvey
        })
    }
    catch (error) {
        console.log(`Error from detailInventoryController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailSurveyController = detailSurveyController



// สำหรับการลบข้อมูล survey
const deleteSurveyController = async (req, res) => {
    try {
        const id = req.params.id
        await surveyModel.deleteSurveyModel(id)
        res.redirect('/survey')
    }
    catch (error) {
        console.log(`Error from deleteSurveyController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.deleteSurveyController = deleteSurveyController