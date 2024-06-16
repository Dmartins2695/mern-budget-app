const express = require('express')
const {
	createNewTransaction,
	deleteTransaction,
	getAllTransactions,
	getTransactionById,
	updateTransaction,
	getTransactionByIncomeId,
} = require('../controllers/transactionController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllTransactions)

//Get Budget By Id
router.get('/:id', getTransactionById)

//Get Budget By Id
router.get('/income/:id', getTransactionByIncomeId)

//Create Budget
router.post('/', createNewTransaction)

//Delete Budget
router.delete('/:id', deleteTransaction)

//Update Budget
router.patch('/:id', updateTransaction)

module.exports = router
