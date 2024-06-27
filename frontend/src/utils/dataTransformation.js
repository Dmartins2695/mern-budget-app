export const transformDataFOrDroplist = (incomes) => {
	let newData = []
	incomes &&
		incomes.forEach((item) => {
			newData.push({ ...item, label: item.title })
		})

	return newData
}
