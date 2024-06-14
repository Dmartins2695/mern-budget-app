const express = require('express')
const {
	getAllCategories,
	getCategoryById,
	createNewCategory,
	deleteCategory,
	updateCategory,
	getCategoryByParentId,
} = require('../controllers/categoryController')

const router = express.Router()

//Get all Category
router.get('/', getAllCategories)

//Get Category By Id
router.get('/:id', getCategoryById)

//Get Category By Parent Id
router.get('/parent/:id', getCategoryByParentId)

//Create Category
router.post('/', createNewCategory)

//Delete Category
router.delete('/:id', deleteCategory)

//Update Category
router.patch('/:id', updateCategory)

module.exports = router
