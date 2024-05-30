const Budget = require('../models/BudgetModel')
const {
	updateTemplate,
	createTemplate,
	getByIdTemplate,
	getAllTemplate,
} = require('./utils')

//Get All Budgets
const getAllBudgets = async (req, res) => {
	getAllTemplate(req, res, Budget)
}

//Get budget by id
const getBudgetById = async (req, res) => {
	getByIdTemplate(req, res, Budget, 'Budget')
}

//Create Budget

const createNewBudget = async (req, res) => {
	createTemplate(req, res, Budget)
}

//Delete Budget
const deleteBudget = async (req, res) => {
	deleteTemplate(req, res, Budget, 'Budget')
}

//Update Budget
const updateBudget = async (req, res) => {
	updateTemplate(req, res, Budget, 'Budget')
}

module.exports = {
	createNewBudget,
	getAllBudgets,
	getBudgetById,
	deleteBudget,
	updateBudget,
}
