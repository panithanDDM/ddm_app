
// Inventory Model
const inventoryModel = require('../model/03_inventory_model')

// สำหรับการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
const calculateDays = (startDate, endDate) => {
    const diffInMs = Math.abs(endDate - startDate);
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
}

// สำหรับแสดงหน้า inventory list
const inventoryPageRender = async (req, res) => {
    try {
        // Get date inventory
        const data = await inventoryModel.getInventoryModel()
        // Get Totle inventory Item
        const totalItem = await inventoryModel.totalInventoryItemModel()
        // Get Total inventory Adtive
        const totalItemActive = await inventoryModel.activeItemInventoryModel()
        // Get Total inventory damaged
        const totalItemDamaged = await inventoryModel.damageItemInventoryModel()
        // Get Total inventory pending
        const totalItemPending = await inventoryModel.pendingItemInventoryModel()

        // ฟังชั่นการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
        const currentDate = new Date()
        for (const item of data) {
            const itemDate = new Date(item.date)
            item.daysPassed = calculateDays(itemDate, currentDate)
        }
        // ฟังชั่นการคำนวนวันที่ว่าผ่านมากี่วันแล้ว

        res.render('03_inventory/01_inventory_list', {
            flash: req.flash(),
            title: 'Inventory List',
            data: data,
            totalItem: totalItem,
            totalItemActive: totalItemActive,
            totalItemDamaged: totalItemDamaged,
            totalItemPending: totalItemPending
        })
    }
    catch (error) {
        console.log(`Error from inventoryPageRender : ${error}`)
        throw error
    }
}
module.exports.inventoryPageRender = inventoryPageRender


// แสดงหน้าฟอร์มอัพโหลด Inventory
const inventoryFormPageRender = (req, res) => {
    res.render('03_inventory/02_inventory_form', {
        flash: req.flash(),
        title: 'Inventory Form'
    })
}
module.exports.inventoryFormPageRender = inventoryFormPageRender

// สำหรับการบันทึกข้อมูลลง data base 
const formUploadController = async (req, res) => {
    const { name, model, snumber, type, status, usecycle, date } = req.body
    const image = req.file.filename

    try {
        await inventoryModel.inventorySaveModel(name, model, snumber, type, status, usecycle, date, image)
        res.redirect('/inventory')
    }
    catch (error) {
        console.error(`Error from form UploadController :${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect('/inventory/form');
    }
}
module.exports.formUploadController = formUploadController



//การดึงข้อมูลจาก database มาแสดง โดยเลือกจาก ID
const detailInventoryController = async (req, res) => {
    const id = req.params.id // รับค่ามาจาก URL
    try {
        const detailInventory = await inventoryModel.getInventoryByIdModel(id)

        //ตรวจสอบว่ามี data เข้ามาหรือเปล่า
        if (!detailInventory) {
            return res.status(400).send('Inventory item not found')
        }

        // ฟังชั่นการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
        const currentDate = new Date();
        const itemDate = new Date(detailInventory.date)
        const daysPassed = calculateDays(itemDate, currentDate)

        res.render('03_inventory/03_inventory_detail', {
            title: detailInventory.name,
            detailInventory: detailInventory,
            daysPassed: daysPassed,
            flash: req.flash(),
        })
    }
    catch (error) {
        console.log(`Error from detailInventoryController : ${error}`)
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailInventoryController = detailInventoryController


//ฟอร์มสำหรับการอัพเดต Inventory
const formUpdateInventoryController = async (req, res) => {
    const id = req.params.id
    const { name, model, snumber, type, status, usecycle, date } = req.body

    try {
        const newData = { name, model, snumber, type, status, usecycle, date }
        await inventoryModel.updateInventoryModel(id, newData)
        res.redirect(`/inventory/${id}`)
    }
    catch (error) {
        console.log(`Error from formUpdateInventoryController : ${error}`)
        if (error.code === '23505') {
            req.flash('error', 'The item name already exists. Please use a different name.');
        } else {
            req.flash('error', 'An unexpected error occurred. Please try again.');
        }
        res.redirect(`/inventory/${id}`)
    }
}
module.exports.formUpdateInventoryController = formUpdateInventoryController


// สำหรับการลบข้อมูล Inventory
const deleteInventoryController = async (req, res) => {
    try {
        const id = req.params.id
        await inventoryModel.deleteInventoryModel(id)
        res.redirect('/inventory')
    }
    catch (error) {
        console.log(`Error from deleteInventoryController : ${error}`)
    }
}
module.exports.deleteInventoryController = deleteInventoryController
