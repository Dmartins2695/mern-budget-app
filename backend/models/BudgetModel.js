const mongoose = require('mongoose')

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
		userId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Budget', BudgetSchema)
