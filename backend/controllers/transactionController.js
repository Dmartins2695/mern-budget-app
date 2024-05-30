const Transaction = require('../models/TransactionModel')
const { getAllowedFields, filterRequestBodyFields } = require('./utils')
const mongoose = require('mongoose')

//Get All Transactions
const getAllTransaction = async (req, res) => {
	const transactions = await Transaction.find({}).sort({ createdAt: -1 })

	res.status(200).json(transactions)
}

//Get transaction by id
const getTransactionById = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const transaction = await Transaction.findById(id)

	if (!transaction) {
		return res.status(404).json({ error: 'Transaction not Found!' })
	}

	res.status(200).json(transaction)
}

//Create transaction

const createNewTransaction = async (req, res) => {
	const allowedFields = getAllowedFields(Transaction.schema)
	const createFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const transaction = await Transaction.create({ ...createFields })
		res.status(200).json(transaction)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete transaction
const deleteTransaction = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const transaction = await Transaction.findOneAndDelete({ _id: id })

	if (!transaction) {
		return res.status(404).json({ error: 'Transaction not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update transaction
const updateTransaction = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const allowedFields = getAllowedFields(Transaction.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const transaction = await Transaction.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true, runValidators: true },
		)

		if (!transaction) {
			return res.status(404).json({ error: 'Transaction not Found!' })
		}

		res.status(200).json(transaction)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	createNewTransaction,
	getAllTransactions,
	getTransactionById,
	deleteTransaction,
	updateTransaction,
}
