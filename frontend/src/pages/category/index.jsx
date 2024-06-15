import LoadingButton from '@mui/lab/LoadingButton'
import {
	CircularProgress,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCategories,
	setParentCategories,
} from '../../feature/data/categorySlice'
import { setButtonLoading } from '../../feature/loading/loadingSlice'
import { setCallSnackbar } from '../../feature/snackbar/snackbarSlice'
import useDictionary from '../../hooks/useDictionary'
import { makeRequest } from '../../utils/resquestTemplate'
import { DisplayParentCategories } from './components/displayParentCategories'
import { DisplaySubCategories } from './components/displaySubCategories'
import AddIcon from '@mui/icons-material/Add'

const Category = () => {
	const { parentCategories } = useSelector((state) => state.category)
	const { categories } = useSelector((state) => state.category)
	const [selected, setSelected] = useState(null)
	const [newCategory, setNewCategory] = useState('')
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { buttonLoading } = useSelector((state) => state.loading)

	useEffect(() => {
		const handleResponse = (response) => {
			dispatch(setParentCategories(response.data))
		}

		makeRequest({
			dispatch,
			handleResponse,
			method: 'get',
			url: `/api/parent-categories`,
			timer: 0,
		})
	}, [])

	useEffect(() => {
		if (selected) {
			getSubCategories()
		}
	}, [selected])

	const getSubCategories = () => {
		const handleResponse = (response) => {
			dispatch(setCategories(response.data))
		}

		makeRequest({
			dispatch,
			handleResponse,
			method: 'get',
			url: `/api/category/parent/${selected.item._id}`,
			timer: 0,
		})
	}

	const handleAddCategory = () => {
		const handleResponse = () => {
			dispatch(setButtonLoading(false))
			getSubCategories()
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
					<Grid item xs={3}>
						<Typography variant='h6'>{labelIn('categories')}</Typography>
						{categories.map((item, index) => {
							return (
								<DisplaySubCategories
									key={`${item.title}-${index}`}
									item={item}
									getSubCategories={getSubCategories}
								/>
							)
						})}
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
