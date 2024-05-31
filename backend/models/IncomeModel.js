const mongoose = require('mongoose')

const Schema = mongoose.Schema

const IncomeSchema = new Schema(
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
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Income', IncomeSchema)
