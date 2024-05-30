const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ParentCategorySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('ParentCategory', ParentCategorySchema)
