import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'

const Category = () => {
	const [parentCategories, setParentCategories] = useState([])

	useEffect(() => {
		const getParentCategories = async () => {
			const response = await axiosInstance.get('/api/parent-categories')
			setParentCategories(response.data)
		}

		getParentCategories()
	}, [])

	console.log(parentCategories)

	return (
		<>
			{parentCategories.map((item) => {
				item.title
			})}
		</>
	)
}

export default Category
