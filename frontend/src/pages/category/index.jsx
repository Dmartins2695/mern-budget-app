import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { highlightSelected } from '../../utils/styleFunctions'
import useDictionary from '../../hooks/useDictionary'

const DisplayParentCategories = (props) => {
	const { item, index, selected, setSelected } = props

	return (
		<div>
			<Paper
				sx={(theme) => ({
					margin: 2,
					padding: 1,
					paddingLeft: 3,
					background: highlightSelected(selected?.index, index, theme, 'default'),
				})}
				onClick={() => setSelected({ index, item })}>
				<Typography>{item.title}</Typography>
			</Paper>
		</div>
	)
}

const Category = () => {
	const [parentCategories, setParentCategories] = useState([])
	const [selected, setSelected] = useState(null)
	const [SubCategories, setSubcategories] = useState([])
	const [newCategory, setNewCategory] = useState('')
	const { labelIn } = useDictionary()

	const getSubCategories = async () => {
		try {
			const response = await axiosInstance.get(
				`/api/category/parent/${selected.item._id}`,
			)
			setSubcategories(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		const getParentCategories = async () => {
			const response = await axiosInstance.get('/api/parent-categories')
			setParentCategories(response.data)
		}

		getParentCategories()
	}, [])

	useEffect(() => {
		if (selected) {
			getSubCategories()
		}
	}, [selected])

	const handleAddCategory = (e) => {
		const addCategory = async () => {
			try {
				const response = await axiosInstance.post('/api/category', {
					title: newCategory,
					parentCategoryId: selected.item._id,
				})
				if (response.status === 200) {
					getSubCategories()
					// add snackbar alert to success with name of created Income
				}
			} catch (e) {
				console.log(e)
			}
		}

		addCategory()
	}

	return (
		<div tabIndex={0}>
			<Paper sx={{ padding: 5, margin: 5 }}>
				<Typography variant='h5'>Categories</Typography>
				<Grid container>
					<Grid item xs={3}>
						{parentCategories.map((item, index) => {
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
					<Grid item flexGrow={1}>
						<Grid container flexGrow={1} direction={'column'} alignItems={'start'}>
							<Grid item xs={3} sx={{ background: 'red', margin: 2, padding: 2 }}>
								<Typography variant='h6'>Existing SubCategories</Typography>
								{SubCategories.map((item, index) => {
									return <div key={`${item.title}-${index}`}>{item.title}</div>
								})}
							</Grid>
							<Grid item flexGrow={1} sx={{ background: 'green' }}>
								<TextField
									id='newCategory'
									variant='standard'
									value={newCategory}
									label={labelIn('new_category_title')}
									onChange={(e) => setNewCategory(e.target.value)}
								/>
								<Button
									variant='contained'
									onClick={handleAddCategory}
									size='small'
									sx={{ mt: 2 }}>
									{labelIn('income_button_add')}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

export default Category
