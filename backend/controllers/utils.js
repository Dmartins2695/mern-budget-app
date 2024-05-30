const mongoose = require('mongoose')

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
	const budgets = await schema.find({ userId: req.user.id }).sort({
		createdAt: -1,
	})

	res.status(200).json(budgets)
}

const getByIdTemplate = async (req, res, schema, title) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const budget = await schema.findOne({ _id: id, userId: req.user.id })

	if (!budget) {
		return res.status(404).json({ error: `${title} not Found!` })
	}

	res.status(200).json(budget)
}

const deleteTemplate = async (req, res, schema, title) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Id' })
	}

	const budget = await schema.findOneAndDelete({ _id: id, userId: req.user.id })

	if (!budget) {
		return res.status(404).json({ error: `${title} not Found!` })
	}

	res.status(200).json({ message: 'Deleted with success' })
}

const createTemplate = async (req, res, schema) => {
	const allowedFields = getAllowedFields(schema.schema)
	const createFields = filterRequestBodyFields(allowedFields, req.body)

	try {
		const budget = await schema.create({ ...createFields, userId: req.user.id })
		res.status(200).json(budget)
	} catch (e) {
		res.status(400).json({ error: e.message })
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

		res.status(200).json(income)
	} catch (e) {
		res.status(400).json({ error: e.message })
	}
}

module.exports = {
	getAllowedFields,
	filterRequestBodyFields,
	updateTemplate,
	createTemplate,
	deleteTemplate,
	getByIdTemplate,
	getAllTemplate,
}
