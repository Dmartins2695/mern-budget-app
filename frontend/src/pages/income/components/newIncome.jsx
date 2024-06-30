import { useTheme } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import { Dialog, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setButtonLoading } from '../../../feature/loading/loadingSlice'
import { setCallSnackbar } from '../../../feature/snackbar/snackbarSlice'
import useDictionary from '../../../hooks/useDictionary'
import { makeRequest } from '../../../utils/requestTemplate'
import { handleStateChange } from '../../../utils/stateControlFunctions'
export const NewIncome = (props) => {
	const { getIncomes, handleModal, open, setOpen } = props
	const theme = useTheme()
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const [newIncomeObject, setNewIncomeObject] = useState({
		title: '',
		amount: '',
	})
	const { buttonLoading } = useSelector((state) => state.loading)

	const handleAddIncome = () => {
		const handleResponse = () => {
			getIncomes()
			dispatch(
				setCallSnackbar({
					severity: 'success',
					message: labelIn('created_new_income'),
				}),
			)
			setOpen(false)
		}

		makeRequest({
			dispatch,
			handleResponse,
			method: 'post',
			url: '/api/income',
			loadingAction: setButtonLoading,
			data: newIncomeObject,
		})
	}

	return (
		<Dialog open={open} onClose={handleModal}>
			<Grid
				container
				direction='column'
				alignItems='flex-start'
				justifyContent='center'
				sx={{
					border: `1px solid ${theme.palette.primary.main + '12'}`,
					background: theme.palette.background.default + '61',
					p: 4,
					borderRadius: '5px',
				}}>
				<Grid
					container
					alignItems={'center'}
					justifyContent={'space-between'}
					sx={{ mb: 2 }}>
					<Typography variant='body1' sx={{ mb: 1 }}>
						{labelIn('new_income')}
					</Typography>
					<IconButton onClick={handleModal}>
						<CloseIcon />
					</IconButton>
				</Grid>
				<Grid container justifyContent={'space-between'} alignItems='center'>
					<Grid item>
						<TextField
							id='title'
							variant='standard'
							value={newIncomeObject.title}
							label={labelIn('new_income_title')}
							onChange={(e) => handleStateChange(e, setNewIncomeObject)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id='amount'
							variant='standard'
							value={newIncomeObject.amount}
							label={labelIn('new_income_amount')}
							onChange={(e) => {
								const value = e.target.value
								if (/^\d*$/.test(value)) {
									// Allow only digits
									handleStateChange(e, setNewIncomeObject)
								}
							}}
							inputProps={{ inputMode: 'numeric' }}
						/>
					</Grid>
				</Grid>
				<Grid container justifyContent='flex-end'>
					<LoadingButton
						loading={buttonLoading}
						variant='contained'
						onClick={handleAddIncome}
						loadingPosition='start'
						startIcon={<AddIcon />}
						size='small'
						sx={{ mt: 2 }}>
						{labelIn('income_button_add')}
					</LoadingButton>
				</Grid>
			</Grid>
		</Dialog>
	)
}
