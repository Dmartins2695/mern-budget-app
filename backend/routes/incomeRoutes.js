const express = require('express')
const {
	createNewIncome,
	getAllIncomes,
	getIncomeById,
	deleteIncome,
	updateIncome,
} = require('../controllers/incomeController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllIncomes)

//Get Budget By Id
router.get('/:id', getIncomeById)

//Create Budget
router.post('/', createNewIncome)

//Delete Budget
router.delete('/:id', deleteIncome)

//Update Budget
router.patch('/:id', updateIncome)

module.exports = router
