export const handleStateChange = (e, func) => {
	let object = {}
	object[e.target.id] = e.target.value
	func((prev) => ({ ...prev, ...object }))
}
