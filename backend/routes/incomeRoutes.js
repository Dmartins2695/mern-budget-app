const express = require('express')

const router = express.Router()
//Get all Incomes in Budget
router.get('', (req, res) => {})
//Get Income By Id
router.get('/:id', (req, res) => {})
//Create Income
router.post('/', (req, res) => {})
//Delete Income
router.delete('/', (req, res) => {})
//Update Income
router.patch('/', (req, res) => {})

module.exports = router
