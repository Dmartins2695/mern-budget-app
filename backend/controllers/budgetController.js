const { default: mongoose } = require('mongoose')
const Budget = require('../models/BudgetModel')
const {
	updateTemplate,
	createTemplate,
	getByIdTemplate,
	getAllTemplate,
	deleteTemplate,
} = require('./utils')

//Get All Budgets
const getAllBudgets = async (req, res) => {
	getAllTemplate(req, res, Budget)
}

//Get budget by id
const getBudgetById = async (req, res) => {
	getByIdTemplate(req, res, Budget, 'Budget')
}

//Get budgets with incomeId

const getBudgetsByIncomeId = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
	try {
		const budgets = await Budget.find({ userId: req.user.id, id })
			.populate({
				path: 'categoryId',
				populate: {
					path: 'parentCategoryId',
				},
			})
			.exec()

		// Organize the data into the desired format
		const result = {}

		budgets.forEach((budget) => {
			const parentCategory = budget.categoryId.parentCategoryId
			const category = budget.categoryId

			if (!result[parentCategory._id]) {
				result[parentCategory._id] = {
					title: parentCategory.title,
					list: {},
				}
			}

			if (!result[parentCategory._id].list[category._id]) {
				result[parentCategory._id].list[category._id] = {
					title: category.title,
					list: [],
				}
			}

			result[parentCategory._id].list[category._id].list.push({
				title: budget.title,
				amount: budget.amount,
				recurringTime: budget.recurringTime,
				timeToRenew: budget.timeToRenew,
				createdAt: budget.createdAt,
				updatedAt: budget.updatedAt,
			})
		})

		// Convert the result object to the desired JSON format
		const finalResult = Object.values(result).map((parentCategory) => ({
			title: parentCategory.title,
			list: Object.values(parentCategory.list),
		}))

		return finalResult ? res.status(200).json(finalResult) : res.status(400).json({ error: `No Budgets associated to incomeId: ${id}!` })
	} catch (e) {
		return res.status(400).json(e)
	}
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
	getBudgetsByIncomeId,
}