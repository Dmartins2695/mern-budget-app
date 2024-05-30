const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		parentCategoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ParentCategory'
		},
		userId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Category', CategorySchema)
