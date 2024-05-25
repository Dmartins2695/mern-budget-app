const mongoose = require('mongoose')
const Income = require('./IncomeModel')
const Category = require('./CategoryModel')
const Expense = require('./ExpenseModel')
const Transaction = require('./TransactionModel')

const Schema = mongoose.Schema

const BudgetSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		totalIncome: {
			type: Number,
			default: 0,
		},
		totalSpent: {
			type: Number,
			default: 0,
		},
		totalSpent: {
			type: Number,
			default: 0,
		},
		totalProjected: {
			type: Number,
			default: 0,
		}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Budget', BudgetSchema)
