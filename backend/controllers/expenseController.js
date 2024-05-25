const Expense = require('../models/ExpenseModel')
const { getAllowedFields, filterRequestBodyFields } = require('./utils')
const mongoose = require('mongoose')

//Get All Expenses
const getAllExpenses = async (req, res) => {
	const expenses = await Expense.find({}).sort({ createdAt: -1 })

	res.status(200).json(expenses)
}

//Get expense by id
const getExpenseById = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const expense = await Expense.findById(id)

	if (!expense) {
		return res.status(404).json({ error: 'Budget not Found!' })
	}

	res.status(200).json(expense)
}

//Create expense

const createNewExpense = async (req, res) => {
	const allowedFields = getAllowedFields(Expense.schema)
	const createFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const expense = await Expense.create({ ...createFields })
		res.status(200).json(expense)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete expense
const deleteExpense = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const expense = await Expense.findOneAndDelete({ _id: id })

	if (!expense) {
		return res.status(404).json({ error: 'expense not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update expense
const updateExpense = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const allowedFields = getAllowedFields(Expense.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const expense = await Expense.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true, runValidators: true },
		)

		if (!expense) {
			return res.status(404).json({ error: 'expense not Found!' })
		}

		res.status(200).json(expense)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	createNewExpense,
	getAllExpenses,
	getExpenseById,
	deleteExpense,
	updateExpense,
}
