const express = require('express')
const router = express.Router()


const autherCheck = require('../middleware/authChecker')




const homeControll = require('../controller/03_home_page_controller')




router.get('/', autherCheck, homeControll.homePageRender)

//Project form
router.get('/project', autherCheck, homeControll.projectPageRender)
router.post('/project', homeControll.formUploadProject)

//get By ID 
router.get('/project/:id', autherCheck, homeControll.detailProjectController)
//อัพเดตฟอร์มตาม ID
router.post('/project/:id', autherCheck, homeControll.formUpdateProjectController)



module.exports = router