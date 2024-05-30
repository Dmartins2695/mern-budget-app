const Income = require('../models/IncomeModel')
const {
	updateTemplate,
	deleteTemplate,
	createTemplate,
	getByIdTemplate,
	getAllTemplate,
} = require('./utils')

//Get All Incomes
const getAllIncomes = async (req, res) => {
	getAllTemplate(req, res, Income)
}

//Get income by id
const getIncomeById = async (req, res) => {
	getByIdTemplate(req, res, Income, 'Income')
}

//Create income

const createNewIncome = async (req, res) => {
	createTemplate(req, res, Income, 'Income')
}

//Delete income
const deleteIncome = async (req, res) => {
	deleteTemplate(req, res, Income)
}

//Update income
const updateIncome = (req, res) => {
	updateTemplate(req, res, Income, 'Income')
}

module.exports = {
	createNewIncome,
	getAllIncomes,
	getIncomeById,
	deleteIncome,
	updateIncome,
}
