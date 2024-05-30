const Category = require('../models/CategoryModel')
const {
	updateTemplate,
	deleteTemplate,
	createTemplate,
	getByIdTemplate,
	getAllTemplate,
} = require('./utils')

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

module.exports = {
	createNewCategory,
	getAllCategories,
	getCategoryById,
	deleteCategory,
	updateCategory,
}
