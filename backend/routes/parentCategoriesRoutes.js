const express = require('express')
const router = express.Router()
const {
	getAllParentCategories,
} = require('../controllers/parentCategoriesController')
//Get all Parent Categories
router.get('/', getAllParentCategories)

module.exports = router
