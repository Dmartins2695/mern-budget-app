const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		incomeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Income',
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Transaction', TransactionSchema)
