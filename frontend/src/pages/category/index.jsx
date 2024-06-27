import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setButtonLoading } from '../../feature/loading/loadingSlice'
import { setCallSnackbar } from '../../feature/snackbar/snackbarSlice'
import useDictionary from '../../hooks/useDictionary'
import { makeRequest } from '../../utils/resquestTemplate'
import { DisplayParentCategories } from './components/displayParentCategories'
import { DisplaySubCategories } from './components/displaySubCategories'
import { getParentCategories, getSubCategories } from './functions'

const overflowStyle = {
	overflow: 'auto',
	msOverflowStyle: 'none',
	scrollbarWidth: 'none',
}

const Category = () => {
	const { parentCategories, categories } = useSelector((state) => state.category)
	const [selected, setSelected] = useState(null)
	const [newCategory, setNewCategory] = useState('')
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { buttonLoading } = useSelector((state) => state.loading)

	useEffect(() => {
		getParentCategories(dispatch)
	}, [])

	useEffect(() => {
		if (selected) {
			getSubCategories(dispatch, selected)
		}
	}, [selected])

	const handleAddCategory = () => {
		const handleResponse = () => {
			dispatch(setButtonLoading(false))
			getSubCategories(dispatch, selected)
			dispatch(
				setCallSnackbar({
					severity: 'success',
					message: `Category: ${newCategory} created with success!`,
				}),
			)
		}

		makeRequest({
			dispatch,
			handleResponse,
			loadingAction: setButtonLoading,
			method: 'post',
			url: `/api/category`,
			data: {
				title: newCategory,
				parentCategoryId: selected.item._id,
			},
		})
	}

	return (
		<div tabIndex={0}>
			<Paper sx={{ padding: 5, margin: 5 }}>
				<Typography variant='h5'>{labelIn('general_categories')}</Typography>
				<Grid container spacing={2}>
					<Grid
						item
						xs={3}
						style={{ padding: 0 }}
						sx={{ ...overflowStyle, height: '64vh', marginTop: 3, marginLeft: 2 }}>
						<DisplayParentCategories
							parentCategories={parentCategories}
							selected={selected}
							setSelected={setSelected}
						/>
					</Grid>
					<Grid item xs={3} style={{ padding: 0 }}>
						<Typography variant='h6'>{labelIn('categories')}</Typography>
						<Grid
							sx={{ ...overflowStyle, height: '64vh', marginTop: 0, marginLeft: 2 }}>
							<DisplaySubCategories
								categories={categories}
								getSubCategories={() => getSubCategories(dispatch, selected)}
							/>
						</Grid>
					</Grid>
					<Grid item xs={4} sx={{ paddingLeft: 5, marginLeft: 5 }}>
						<Typography variant='h6'>
							{labelIn('create_new_category_title')}
						</Typography>
						<Grid item xs container justifyContent={'start'} alignItems={'center'}>
							<TextField
								id='newCategory'
								variant='standard'
								value={newCategory}
								label={labelIn('new_category')}
								onChange={(e) => setNewCategory(e.target.value)}
								sx={{ marginRight: 5 }}
							/>
							<LoadingButton
								loading={buttonLoading}
								color='primary'
								variant='contained'
								onClick={handleAddCategory}
								size='small'
								sx={{ mt: 2 }}
								loadingPosition='start'
								startIcon={<AddIcon />}>

								{labelIn('category_button_add')}
							</LoadingButton>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

export default Category
