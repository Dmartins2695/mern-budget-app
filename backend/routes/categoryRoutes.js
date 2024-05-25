const express = require('express')
const {getAllCategories,getCategoryById, createNewCategory, deleteCategory, updateCategory} = require('../controllers/categoryController')

const router = express.Router()

//Get all Budgets
router.get('/', getAllCategories)

//Get Budget By Id
router.get('/:id', getCategoryById)

//Create Budget
router.post('/',createNewCategory )

//Delete Budget
router.delete('/:id', deleteCategory)

//Update Budget
router.patch('/:id', updateCategory)

module.exports = router
