const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BudgetSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		recurringTime: {
			type: String,
			enum: ['one time', 'week', 'month', 'annual'],
			required: true,
		},
		timeToRenew: {
			type: Number,
		},
		incomeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Income',
			required: true
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Budget', BudgetSchema)
