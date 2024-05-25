const Budget = require('../models/BudgetModel')
const { getAllowedFields, filterRequestBodyFields } = require('./utils')
const mongoose = require('mongoose')

//Get All Budgets
const getAllBudgets = async (req, res) => {
	const budgets = await Budget.find({}).sort({ createdAt: -1 })

	res.status(200).json(budgets)
}

//Get budget by id
const getBudgetById = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const budget = await Budget.findById(id)

	if (!budget) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json(budget)
}

//Create Budget

const createNewBudget = async (req, res) => {

	const allowedFields = getAllowedFields(Budget.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)
	
	try {
		const budget = await Budget.create({ $set: updateFields })
		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete Budget
const deleteBudget = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const budget = await Budget.findOneAndDelete({ _id: id })

	if (!budget) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update Budget
const updateBudget = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const allowedFields = getAllowedFields(Budget.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const budget = await Budget.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true, runValidators: true },
		)

		if (!budget) {
			return res.status(404).json({ error: 'Budget not Found!' })
		}

		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	createNewBudget,
	getAllBudgets,
	getBudgetById,
	deleteBudget,
	updateBudget,
}
