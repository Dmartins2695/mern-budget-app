const Category = require('../models/CategoryModel')
const {
	updateTemplate,
	deleteTemplate,
	createTemplate,
	getByIdTemplate,
	getAllTemplate,
} = require('./utils')
const mongoose = require('mongoose')
//Get All Categories
const getAllCategories = async (req, res) => {
	getAllTemplate(req, res, Category)
}

//Get Category by id
const getCategoryById = async (req, res) => {
	getByIdTemplate(req, res, Category, 'Category')
}

//Create Category
const createNewCategory = async (req, res) => {
	createTemplate(req, res, Category, 'Category')
}

//Delete Category
const deleteCategory = async (req, res) => {
	deleteTemplate(req, res, Category)
}

//Update Category
const updateCategory = async (req, res) => {
	updateTemplate(req, res, Category, 'Category')
}

const getCategoryByParentId = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	try {
		const data = await Category.find({
			parentCategoryId: id,
			userId: req.user.id,
		})

		if (!data) {
			return res.status(404).json({ error: `Parent Category id:${id} not Found!` })
		}

		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json(e)
	}
}

module.exports = {
	createNewCategory,
	getAllCategories,
	getCategoryById,
	deleteCategory,
	updateCategory,
	getCategoryByParentId,
}
