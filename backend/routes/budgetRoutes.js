const express = require('express')
const {
	createNewBudget,
	getAllBudgets,
	getBudgetById,
	deleteBudget,
	updateBudget,
	getBudgetsByIncomeId,
} = require('../controllers/budgetController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllBudgets)

//Get Budget By Id
router.get('/:id', getBudgetById)

//Get Budget By Id
router.get('/income/:id', getBudgetsByIncomeId)

//Create Budget
router.post('/', createNewBudget)

//Delete Budget
router.delete('/:id', deleteBudget)

//Update Budget
router.patch('/:id', updateBudget)

module.exports = router
