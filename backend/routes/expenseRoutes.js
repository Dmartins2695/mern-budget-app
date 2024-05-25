const express = require('express')
const {
	createNewExpense,
	getAllExpenses,
	getExpenseById,
	deleteExpense,
	updateExpense,
} = require('../controllers/expenseController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllExpenses)

//Get Budget By Id
router.get('/:id', getExpenseById)

//Create Budget
router.post('/', createNewExpense)

//Delete Budget
router.delete('/:id', deleteExpense)

//Update Budget
router.patch('/:id', updateExpense)

module.exports = router
