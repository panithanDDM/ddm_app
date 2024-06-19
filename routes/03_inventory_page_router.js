const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')


const autherCheck = require('../middleware/authChecker')




const inventoryController = require('../controller/04_inventory_controller')




// ตั้งค่า Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/02_inventory_upload')//ตำแหน่งจัดเก็บ
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})


// Inventory page list
router.get('/', autherCheck, inventoryController.inventoryPageRender)


//Inventory Form
router.get('/form', autherCheck, inventoryController.inventoryFormPageRender)
router.post('/form', upload.single('image'), inventoryController.formUploadController)

//get By ID 
router.get('/:id', autherCheck, inventoryController.detailInventoryController)

//อัพเดตฟอร์มตาม ID
router.post('/:id', inventoryController.formUpdateInventoryController)

// ลบข้อมูล Inventory ตาม ID 
router.post('/:id/delete', inventoryController.deleteInventoryController)

module.exports = router