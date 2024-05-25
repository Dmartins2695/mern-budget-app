
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
	console.log(body)
	allowedFields.forEach((field) => {
		if (body[field] !== undefined) {
			updateFields[field] = body[field]
		}
	})
	return updateFields
}

module.exports = {
	getAllowedFields,
	filterRequestBodyFields,
}
