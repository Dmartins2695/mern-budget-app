const mongoose = require('mongoose')
const IncomeModel = require('./IncomeModel')
const CategoryModel = require('./CategoryModel')
const ExpenseModel = require('./ExpenseModel')
const TransactionModel = require('./TransactionModel')

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
		},
		incomes: {
			type: IncomeModel,
		},
		categories: {
			type: CategoryModel,
		},
		expenses: {
			type: ExpenseModel,
		},
		transactions: {
			type: TransactionModel,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Budget', BudgetSchema)
