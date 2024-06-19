const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')

//require Middle ware
const autherCheck = require('../middleware/authChecker')


//require controller 
const financeController = require('../controller/05_finance_controller')


// ตั้งค่า Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/03_finance_upload')//ตำแหน่งจัดเก็บ
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})



router.get('/', autherCheck, financeController.financeHomeRender)

// Form finace
router.get('/form', autherCheck, financeController.financeFormPageRender)
router.post('/form', upload.single('image'), financeController.formUploadFinace)
// ลบข้อมูล survey ตาม ID 
router.post('/:id/delete', autherCheck, financeController.deleteFinanceController)



// Admin Page
router.get('/admin', autherCheck, financeController.financeAdminRender)

// Get by ID
router.get('/admin/:id', autherCheck, financeController.detailFinanceController)
//อัพเดตฟอร์มตาม ID
router.post('/admin/:id', autherCheck, financeController.formUpdateFinanceController)



module.exports = router