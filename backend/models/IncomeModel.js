const mongoose = require('mongoose')

const Schema = mongoose.Schema

const IncomeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		budgetId: {
			type: Schema.Types.ObjectId,
			ref: 'Budget',
		},
		source: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Income', IncomeSchema)
