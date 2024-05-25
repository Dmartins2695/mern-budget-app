const Budget = require('../models/BudgetModel')
const mongoose = require('mongoose')

const validateId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
}

//Get All Budgets
const getAllBudgets = async (req, res) => {
	const budgets = await Budget.find({}).sort({ createdAt: -1 })

	res.status(200).json(budgets)
}

//Get budget by id
const getBudgetById = async (req, res) => {
	const { id } = req.params

	validateId(id)

	const budget = await Budget.findById(id)

	if (!budget) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json(budget)
}

//Create Budget

const createNewBudget = async (req, res) => {
	const { title } = req.body
	try {
		const budget = await Budget.create({ title })
		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete Budget
const deleteBudget = async (req, res) => {
	const { id } = req.params

	validateId(id)

	const budget = await Budget.findOneAndDelete({ _id: id })

	if (!budget) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update Budget
const updateBudget = async (req, res) => {
	const { id } = req.params

	validateId(id)

	const budget = await Budget.findOneAndUpdate(
		{ _id: id },
		{ ...req.body },
		{ new: true },
	)

	if (!budget) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json(budget)
}

module.exports = {
	createNewBudget,
	getAllBudgets,
	getBudgetById,
	deleteBudget,
	updateBudget,
}
