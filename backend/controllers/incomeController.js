const Income = require('../models/IncomeModel')
const {
	getAllowedFields,
	filterRequestBodyFields,
	updateTemplate,
} = require('./utils')
const mongoose = require('mongoose')

//Get All Incomes
const getAllIncomes = async (req, res) => {
	const incomes = await Income.find({ userId: req.user.id }).sort({
		createdAt: -1,
	})

	res.status(200).json(incomes)
}

//Get income by id
const getIncomeById = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const income = await Income.findOne({ _id: id, userId: req.user.id })

	if (!income) {
		return res.status(404).json({ error: 'Income not Found!' })
	}

	res.status(200).json(income)
}

//Create income

const createNewIncome = async (req, res) => {
	const allowedFields = getAllowedFields(Income.schema)
	const createFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const income = await Income.create({ ...createFields, userId: req.user.id })
		res.status(200).json(income)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete income
const deleteIncome = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const income = await Income.findOneAndDelete({ _id: id, userId: req.user.id })

	if (!income) {
		return res.status(404).json({ error: 'Income not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update income
const updateIncome = (req, res) => {
	updateTemplate(req, res, Income, 'Income')
}

module.exports = {
	createNewIncome,
	getAllIncomes,
	getIncomeById,
	deleteIncome,
	updateIncome,
}
