const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')

//require Middle ware
const autherCheck = require('../middleware/authChecker')


//require controller 
const surveyController = require('../controller/06_survey_controller')


// ตั้งค่า Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/04_survey_upload')//ตำแหน่งจัดเก็บ
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})



router.get('/', autherCheck, surveyController.surveyPageRender)

// Survey form
router.get('/form', autherCheck, surveyController.surveyFormRender)
router.post('/form', upload.single('image'), surveyController.formUploadSurvey)

//get By ID 
router.get('/:id', autherCheck, surveyController.detailSurveyController)

// ลบข้อมูล survey ตาม ID 
router.post('/:id/delete', autherCheck, surveyController.deleteSurveyController)
module.exports = router