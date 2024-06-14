import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../config/axiosInstance'
import {
	setButtonLoading,
	setModalButtonLoading,
	setModalLoading,
} from '../../feature/loading/loadingSlice'
import useDictionary from '../../hooks/useDictionary'
import { highlightSelected } from '../../utils/styleFunctions'
import { setCallSnackbar } from '../../feature/snackbar/snackbarSlice'
import {
	setCategories,
	setParentCategories,
} from '../../feature/data/categorySlice'

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

const DisplaySubCategories = (props) => {
	const { item, getSubCategories } = props
	const [openModal, setOpenModal] = useState(false)
	const dispatch = useDispatch()
	const { modalButtonLoading } = useSelector((state) => state.loading)
	const { labelIn } = useDictionary()

	const handleOpenModalState = () => {
		setOpenModal((prev) => !prev)
	}

	const handleDeleteCategory = () => {
		const deleteCategory = async () => {
			try {
				const response = await axiosInstance.delete(`/api/category/${item._id}`)
				if (response.status === 200) {
					getSubCategories()
					dispatch(setModalLoading(false))
					handleOpenModalState()
				} else {
					dispatch(
						setCallSnackbar({ severity: 'error', message: response.data.error }),
					)
				}
			} catch (e) {
				console.log(e)
				dispatch(setModalButtonLoading(false))
				dispatch(
					setCallSnackbar({
						severity: 'error',
						message: e.response.data.error || e.response.statusText,
					}),
				)
			}
		}
		dispatch(setModalButtonLoading(true))
		setTimeout(() => {
			deleteCategory()
		}, 2000)
	}

	return (
		<div>
			<Grid container justifyContent={'flex-start'} alignItems={'center'}>
				<Paper
					elevation={0}
					sx={(theme) => ({
						marginTop: 1,
						padding: 1,
						paddingLeft: 3,
						background: theme.palette.background.default,
						width: 'inherit',
					})}>
					<Grid container justifyContent={'space-between'} alignItems={'center'}>
						<Typography variant='body1'>{item.title}</Typography>
						<DeleteOutlineIcon
							sx={{ cursor: 'pointer' }}
							color='error'
							fontSize='sm'
							onClick={handleOpenModalState} // open modal to confirm delete of category
						/>
					</Grid>
				</Paper>
				<Dialog
					open={openModal}
					onClose={handleOpenModalState}
					PaperProps={{
						sx: {
							p: 2,
						},
					}}>
					<DialogTitle id='alert-dialog-title'>
						{labelIn('delete_category_modal')}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							{labelIn('delete_category_confirm_text')}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleOpenModalState}
							variant='outlined'
							color='secondary'
							size={'small'}>
							{labelIn('delete_category_modal_cancel')}
						</Button>
						<LoadingButton
							loading={modalButtonLoading}
							onClick={handleDeleteCategory}
							loadingPosition='start'
							variant='contained'
							color='error'
							size={'small'}>
							{labelIn('delete_category_modal_confirm')}
						</LoadingButton>
					</DialogActions>
				</Dialog>
			</Grid>
		</div>
	)
}

const Category = () => {
	const { parentCategories } = useSelector((state) => state.category)
	const { categories } = useSelector((state) => state.category)
	const [selected, setSelected] = useState(null)
	const [newCategory, setNewCategory] = useState('')
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { buttonLoading } = useSelector((state) => state.loading)

	const getSubCategories = async (props) => {
		try {
			const response = await axiosInstance.get(
				`/api/category/parent/${selected.item._id}`,
			)
			dispatch(setCategories(response.data))
			return true
		} catch (e) {
			dispatch(
				setCallSnackbar({
					severity: 'error',
					message: e.response.data.error || e.response.statusText,
				}),
			)
			console.log(e)
		}
	}

	useEffect(() => {
		const getParentCategories = async () => {
			const response = await axiosInstance.get('/api/parent-categories')
			dispatch(setParentCategories(response.data))
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
					dispatch(setButtonLoading(false))
					getSubCategories()
					dispatch(
						setCallSnackbar({
							severity: 'success',
							message: `Category: ${newCategory} created with success!`,
						}),
					)
				}
			} catch (e) {
				console.log(e)
				dispatch(setButtonLoading(false))
				dispatch(
					setCallSnackbar({
						severity: 'error',
						message: 'You must select a Category first!',
					}),
				)
			}
		}
		dispatch(setButtonLoading(true))
		setTimeout(() => {
			addCategory()
		}, 2000)
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
								loadingIndicator={
									<CircularProgress
										sx={{
											color: 'white',
										}}
										size={24}
									/>
								}>
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
