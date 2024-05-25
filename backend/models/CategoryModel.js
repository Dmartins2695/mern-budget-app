const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
        amount:{
            type: Number,
            required: true,
            default:  0
        },
        amountUsed:{
            type: Number,
            default:  0
        },
		budgetId: {
			type: Schema.Types.ObjectId,
			ref: 'Budget',
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Category', CategorySchema)
