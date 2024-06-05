const ParentCategory = require('../models/ParentCategoryModel')

//Get All Incomes
const getAllParentCategories = async (req, res) => {
	try {
		const data = await ParentCategory.find({}).sort({ title: -1 })

		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json(e)
	}
}

module.exports = {
	getAllParentCategories,
}
