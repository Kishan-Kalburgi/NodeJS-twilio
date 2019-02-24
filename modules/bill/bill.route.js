const express = require('express')
const router = express.Router()
const billController = require('../../modules/bill/bill.controller')

router.get('/all', billController.getAllBills)

router.get('/byid/:id', billController.getByID)

router.post('/add', billController.addBill)

router.put('/edit', billController.updateBill)

router.put('/delete', billController.deleteBill)

module.exports = router