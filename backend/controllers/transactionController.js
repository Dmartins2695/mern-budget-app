const Transaction = require('../models/TransactionModel')
const mongoose = require('mongoose')
const {
	getAllTemplate,
	getByIdTemplate,
	createTemplate,
	deleteTemplate,
	updateTemplate,
} = require('./utils')

//Get All Transactions
const getAllTransactions = async (req, res) => {
	getAllTemplate(req, res, Transaction)
}

//Get transaction by id
const getTransactionById = async (req, res) => {
	getByIdTemplate(req, res, Transaction, 'Transaction')
}

//Get transaction by id
const getTransactionByIncomeId = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
	try {
		const data = await Transaction.find({ incomeId: id, userId: req.user.id })

		if (!data) {
			return res.status(404).json({ error: `Income with id:${id} not Found!` })
		}

		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json(e)
	}
}

//Create transaction

const createNewTransaction = async (req, res) => {
	createTemplate(req, res, Transaction, 'Transaction')
}

//Delete transaction
const deleteTransaction = async (req, res) => {
	deleteTemplate(req, res, Transaction)
}

//Update transaction
const updateTransaction = async (req, res) => {
	updateTemplate(req, res, Transaction, 'Transaction')
}

module.exports = {
	createNewTransaction,
	getAllTransactions,
	getTransactionById,
	deleteTransaction,
	updateTransaction,
	getTransactionByIncomeId,
}
