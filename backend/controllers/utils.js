const mongoose = require('mongoose')
const ParentCategoryModel = require('../models/ParentCategoryModel')

const getAllowedFields = (schema) => {
	return Object.keys(schema.paths).filter(
		(field) =>
			field !== '__v' &&
			field !== '_id' &&
			field !== 'createdAt' &&
			field !== 'updatedAt',
	)
}

const filterRequestBodyFields = (allowedFields, body) => {
	const updateFields = {}
	allowedFields.forEach((field) => {
		if (body[field] !== undefined) {
			updateFields[field] = body[field]
		}
	})
	return updateFields
}

const getAllTemplate = async (req, res, schema) => {
	try {
		const data = await schema.find({ userId: req.user.id }).sort({
			createdAt: -1,
		})
		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json(e)
	}
}

const getByIdTemplate = async (req, res, schema, title) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
	try {
		const data = await schema.findOne({ _id: id, userId: req.user.id })

		if (!data) {
			return res.status(404).json({ error: `${title} not Found!` })
		}

		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json(e)
	}
}

const deleteTemplate = async (req, res, schema, title) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}
	try {
		const data = await schema.findOneAndDelete({ _id: id, userId: req.user.id })

		if (!data) {
			return res.status(404).json({ error: `${title} not Found!` })
		}
		return res.status(200).json({ message: 'Deleted with success' })
	} catch (e) {
		return res.status(400).json(e)
	}
}

const createTemplate = async (req, res, schema) => {
	const allowedFields = getAllowedFields(schema.schema)
	const createFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const data = await schema.create({ ...createFields, userId: req.user.id })
		return res.status(200).json(data)
	} catch (e) {
		return res.status(400).json({ error: e.message })
	}
}

const updateTemplate = async (req, res, schema, title) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const allowedFields = getAllowedFields(schema.schema)
	const updateFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const income = await schema.findOneAndUpdate(
			{ _id: id, userId: userId },
			{ $set: updateFields },
			{ new: true, runValidators: true },
		)

		if (!income) {
			return res.status(404).json({ error: `${title} not Found!` })
		}

		return res.status(200).json(income)
	} catch (e) {
		return res.status(400).json({ error: e.message })
	}
}

const permCategories = [
	{ title: 'Auto & Transport' },
	{ title: 'Bills & Utilities' },
	{ title: 'Business Services' },
	{ title: 'Education' },
	{ title: 'Education' },
	{ title: 'Entertainment' },
	{ title: 'Fees & Charges' },
	{ title: 'Financial' },
	{ title: 'Food & Dinning' },
	{ title: 'Gifts & Donations' },
	{ title: 'Health & Fitness' },
	{ title: 'Home' },
	{ title: 'Investments' },
	{ title: 'Kids' },
	{ title: 'Loans' },
	{ title: 'Misc Expenses' },
]

const createParentCategories = () => {
	permCategories.forEach(async (item) => {
		const created = await ParentCategoryModel.create(item)
	})
	console.log('* Static Categories Created *')
}

module.exports = {
	getAllowedFields,
	filterRequestBodyFields,
	updateTemplate,
	createTemplate,
	deleteTemplate,
	getByIdTemplate,
	getAllTemplate,
	createParentCategories,
}
