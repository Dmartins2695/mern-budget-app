const Transaction = require('../models/TransactionModel')
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
}
