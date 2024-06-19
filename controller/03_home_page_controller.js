// Home model 
const homeModel = require('../model/04_home_model')




// สำหรับแสดงหน้า home page
const homePageRender = (req, res) => {
    const user = req.user;
    res.render('01_home_page/01_home_page', {
        flash: req.flash(),
        title: 'DevDrone Mapper'
    })
    // console.log(user.id)
    console.log(`user id is .......... ${user.id}`)
}
module.exports.homePageRender = homePageRender


//สำหรับการแสดงหน้า project 
const projectPageRender = async (req, res) => {
    try {
        const project = await homeModel.getProjectData()
        res.render('01_home_page/02_project_page', {
            flash: req.flash(),
            title: 'DDM project detail',
            project: project
        })
    }
    catch (error) {
        console.log(`Error from projectPageRender : ${error}`)
        throw error
    }
}
module.exports.projectPageRender = projectPageRender


//การดึงข้อมูลจาก database มาแสดง โดยเลือกจาก ID
const detailProjectController = async (req, res) => {
    const id = req.params.id
    try {
        const project = await homeModel.getProjectData()
        const detailProject = await homeModel.getProjectByID(id)

        //ตรวจสอบว่ามี data เข้ามาหรือเปล่า
        if (!detailProject) {
            return res.status(400).send('Project ID not found')
        }

        res.render('01_home_page/02_project_page', {
            flash: req.flash(),
            title: 'DDM project detail',
            project: project,
            detailProject: detailProject
        })
    }
    catch (error) {
        console.log(`Error from detailProjectController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailProjectController = detailProjectController


//ฟอร์มสำหรับการอัพเดต Inventory
const formUpdateProjectController = async (req, res) => {
    const id = req.params.id
    const { project_status } = req.body
    try {
        console.log(id, project_status)
        await homeModel.updateProjectModel(id, project_status)
        res.redirect("/home/project")
    }
    catch (error) {
        console.log(`Error from formUpdateProjectController : ${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect(`/home/project`)
    }
}
module.exports.formUpdateProjectController = formUpdateProjectController




// สำหรับการอัพโหลดข้อมูล Project
const formUploadProject = async (req, res) => {
    const { project_name, project_status } = req.body
    console.log(project_name, project_status)
    try {
        await homeModel.projectSaveModel(project_name, project_status)
        res.redirect('/home/project');
    }
    catch (error) {
        console.error(`Error from form formUploadProject :${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The Project name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect('/home/project');
    }
}
module.exports.formUploadProject = formUploadProject

