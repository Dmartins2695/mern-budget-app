import { Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { highlightSelected } from '../../utils/styleFunctions'

const DisplayParentCategories = (props) => {
	const { item, index, selected, setSelected } = props
	
	return (
		<Paper
			sx={(theme) => ({
				margin: 2,
				padding: 1,
				paddingLeft: 3,
				background: highlightSelected(selected, index, theme, 'default'),
			})}
			onClick={() => setSelected(index)}>
			<Typography>{item.title}</Typography>
		</Paper>
	)
}

const Category = () => {
	const [parentCategories, setParentCategories] = useState([])
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		const getParentCategories = async () => {
			const response = await axiosInstance.get('/api/parent-categories')
			setParentCategories(response.data)
		}

		getParentCategories()
	}, [])

	return (
		<Paper sx={{ padding: 5, margin: 5 }}>
			<Grid container>
				<Grid item xs={3}>
					{parentCategories.map((item, index) => {
						console.log(index)
						return (
							<DisplayParentCategories
								key={`${item.title}-${index}`}
								item={item}
								index={index}
								selected={selected}
								setSelected={setSelected}
							/>
						)
					})}
				</Grid>
				<Grid item></Grid>
			</Grid>
		</Paper>
	)
}

export default Category
