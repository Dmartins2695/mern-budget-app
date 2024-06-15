import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../config/axiosInstance'
import {
	setModalButtonLoading,
	setModalLoading,
} from '../../../feature/loading/loadingSlice'
import { setCallSnackbar } from '../../../feature/snackbar/snackbarSlice'
import useDictionary from '../../../hooks/useDictionary'

export const DisplaySubCategories = (props) => {
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
