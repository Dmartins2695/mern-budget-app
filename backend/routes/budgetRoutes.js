const express = require('express')
const Budget = require('../models/BudgetModel')

const router = express.Router()

//Get all Budgets
router.get('', (req, res) => {})

//Get Budget By Id
router.get('/:id', (req, res) => {})

//Create Budget
router.post('/', async (req, res) => {
	const { title } = req.body
	try {
		const budget = await Budget.create({ title })
		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
})

//Delete Budget
router.delete('/', (req, res) => {})

//Update Budget
router.patch('/', (req, res) => {})

module.exports = router
