//require model
const homeModel = require('../model/04_home_model')
const financeModel = require('../model/05_finance_model')

// แสดงหน้า Finance
const financeHomeRender = async (req, res) => {
    const user = req.user.fullname
    try {
        let financeData = await financeModel.getfinanceModel(user)
        let totalPrice = await financeModel.getFinanceTotla(user)
        let acceptPrice = await financeModel.getFinanceAccept(user)
        let rejectPrice = await financeModel.getFinanceReject(user)
        let pendingPrice = await financeModel.getFinancePending(user)

        res.render('02_financial/01_finance_home', {
            title: 'Financial',
            financeData: financeData,
            totalPrice: totalPrice,
            acceptPrice: acceptPrice,
            rejectPrice: rejectPrice,
            pendingPrice: pendingPrice
        })
    }
    catch (error) {
        console.log(`Error from financeHomeRender : ${error}`)
        throw error
    }
}
module.exports.financeHomeRender = financeHomeRender



//สำหรับแสดงหน้า Form การเงิน
const financeFormPageRender = async (req, res) => {
    try {
        const project = await homeModel.getProjectWorkingData()
        res.render('02_financial/02_finance_form', {
            title: 'Financial Form',
            project: project
        })
    }
    catch (error) {
        console.log(`Error from financeFormPageRender : ${error}`)
    }
}
module.exports.financeFormPageRender = financeFormPageRender


//สำหรับการบันทึกข้อมูลลง data base 
const formUploadFinace = async (req, res) => {
    let { name, date, section, type, project_name, price, description } = req.body
    const image = req.file.filename
    price = price.replace(/,/g, ''); // ลบจุลภาคออกจากค่า
    console.log(name, date, section, type, project_name, price, description)
    try {
        await financeModel.financeSaveModel(name, date, section, type, project_name, price, image, description)
        res.redirect('/finance')
    }
    catch (error) {
        console.error(`Error from form UploadController :${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect('/finance/form/');
    }
}
module.exports.formUploadFinace = formUploadFinace


// สำหรับการลบข้อมูล finance
const deleteFinanceController = async (req, res) => {
    try {
        const id = req.params.id
        await financeModel.deleteFinanceModel(id)
        res.redirect('/finance')
        console.log(id)
    }
    catch (error) {
        console.log(`Error from deleteFinanceController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.deleteFinanceController = deleteFinanceController





/// สำหรับหน้า admin
// แสดงหน้า Finance Admin
const financeAdminRender = async (req, res) => {
    const status = req.user.status
    try {
        //สำหรับแสดงข้อมูลทั้งหมด เอาไปใส่ในตาราง
        const data = await financeModel.getFinanceAdminModel()
        //สำหรับแสดงข้อมูลจำนวนเงินทั้งหมด
        const totalPrice = await financeModel.getFinanceTotlaAdmin()
        //สำหรับแสดงข้อมูลจำนวนเงินทั้งหมดที่ status = accept
        const acceptPrice = await financeModel.getFinanceAcceptAdmin()
        //สำหรับแสดงข้อมูลจำนวนเงินทั้งหมดที่ status = reject
        const rejectPrice = await financeModel.getFinanceRejectAdmin()
        //สำหรับแสดงข้อมูลจำนวนเงินทั้งหมดที่ status = Pending
        const pendingPrice = await financeModel.getFinancePendingAdmin()

        if (status === 'admin') {
            res.render('02_financial/03_finance_admin', {
                title: 'Financial Admin',
                data: data,
                totalPrice: totalPrice,
                acceptPrice: acceptPrice,
                rejectPrice: rejectPrice,
                pendingPrice: pendingPrice
            })

        } else if (status === 'user') { // ถ้าไม่ใช้ admin
            return res.redirect('/home')
        }
    }
    catch (error) {
        console.log(`Error from financeAdminRender : ${error}`)
        throw error
    }
}
module.exports.financeAdminRender = financeAdminRender

//การดึงข้อมูลจาก database มาแสดง โดยเลือกจาก ID
const detailFinanceController = async (req, res) => {
    const id = req.params.id // รับค่ามาจาก URL
    console.log(id)

    try {
        const detailFinance = await financeModel.getFinanceByIdModel(id)

        //ตรวจสอบว่ามี data เข้ามาหรือเปล่า
        if (!detailFinance) {
            return res.status(400).send('Inventory item not found')
        }
        res.render('02_financial/04_finance_admin_detail', {
            title: `Finance ID ${detailFinance.id}`,
            detailFinance: detailFinance,
            flash: req.flash()

        })
    }
    catch (error) {
        console.log(`Error from detailFinanceController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailFinanceController = detailFinanceController


//ฟอร์มสำหรับการอัพเดต finacnce
const formUpdateFinanceController = async (req, res) => {
    const id = req.params.id
    const { status } = req.body
    try {
        await financeModel.updateFinanceModel(id, status)
        res.redirect(`/finance/admin/`)
    }
    catch (error) {
        console.log(`Error from formUpdateInventoryController : ${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect(`/finance/admin/${id}`)
    }

}
module.exports.formUpdateFinanceController = formUpdateFinanceController