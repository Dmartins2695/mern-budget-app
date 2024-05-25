const Category = require('../models/CategoryModel')
const { getAllowedFields, filterRequestBodyFields } = require('./utils')
const mongoose = require('mongoose')

//Get All Categories
const getAllCategories = async (req, res) => {
	const category = await Category.find({}).sort({ createdAt: -1 })

	res.status(200).json(category)
}

//Get Category by id
const getCategoryById = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const category = await Category.findById(id)

	if (!category) {
		return res.status(404).json({ error: 'Category not Found!' })
	}

	res.status(200).json(category)
}

//Create Category

const createNewCategory = async (req, res) => {
	const allowedFields = getAllowedFields(Category.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)
	try {
		const category = await Category.create({ $set: updateFields })
		res.status(200).json(category)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

//Delete Category
const deleteCategory = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const category = await Category.findOneAndDelete({ _id: id })

	if (!category) {
		return res.status(404).json({ error: 'Category not Found!' })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

//Update Category
const updateCategory = async (req, res) => {
	const { id } = req.params

	const allowedFields = getAllowedFields(Category.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
	
	try {
		const budget = await Category.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true, runValidators: true },
		)

		if (!budget) {
			return res.status(404).json({ error: 'Budget not Found!' })
		}

		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	createNewCategory,
	getAllCategories,
	getCategoryById,
	deleteCategory,
	updateCategory,
}
