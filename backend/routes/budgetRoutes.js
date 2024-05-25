const express = require('express')
const {
	createNewBudget,
	getAllBudgets,
	getBudgetById,
	deleteBudget,
	updateBudget,
} = require('../controllers/budgetController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllBudgets)

//Get Budget By Id
router.get('/:id', getBudgetById)

//Create Budget
router.post('/', createNewBudget)

//Delete Budget
router.delete('/:id', deleteBudget)

//Update Budget
router.patch('/:id', updateBudget)

module.exports = router
