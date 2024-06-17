import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Autocomplete,
	Dialog,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCallSnackbar } from '../../../feature/snackbar/snackbarSlice'
import useDictionary from '../../../hooks/useDictionary'
import { transformDataFOrDroplist } from '../../../utils/dataTransformation'
import { makeRequest } from '../../../utils/resquestTemplate'
import { handleStateChange } from '../../../utils/stateControlFunctions'
import { getParentCategories, getSubCategories } from '../../category/functions'
import { getTransactions } from '../functions'

const NewTransaction = (props) => {
	const { selectedIncome, setOpenAdd, openAdd, handleOpen } = props
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { categories, parentCategories } = useSelector((state) => state.category)
	const { buttonLoading } = useSelector((state) => state.loading)
	const [parentId, setParentId] = useState('')
	const [newTransaction, setNewTransaction] = useState({
		incomeId: selectedIncome,
		categoryId: '',
		amount: undefined,
		description: '',
		title: '',
	})

	useEffect(() => {
		if (parentCategories.length === 0) {
			getParentCategories(dispatch)
		}
	}, [])

	useEffect(() => {
		if (parentId !== '') {
			getSubCategories(dispatch, { item: { _id: parentId } })
		}
	}, [parentId])

	const handleChange = (event, newValue) => {
		setNewTransaction((prev) => ({ ...prev, categoryId: newValue._id }))
	}

	const handleChangeParent = (event, newValue) => {
		setParentId(newValue._id)
	}

	const addTransaction = () => {
		const handleResponse = (response) => {
			getTransactions(dispatch, selectedIncome)
			dispatch(
				setCallSnackbar({
					severity: 'success',
					message: `${labelIn('created_new_transaction')}`,
				}),
			)
			setOpenAdd(false)
		}

		makeRequest({
			dispatch,
			handleResponse,
			method: 'post',
			url: '/api/transactions',
			data: newTransaction,
		})
	}

	return (
		<Dialog
			open={openAdd}
			onClose={handleOpen}
			PaperProps={{
				sx: {
					p: 4,
					pt: 2,
				},
			}}
			maxWidth>
			<Grid
				container
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}>
				<Typography variant='h6' sx={{ mb: 2 }}>
					{labelIn('new_transaction')}
				</Typography>
				<IconButton onClick={handleOpen}>
					<CloseIcon />
				</IconButton>
			</Grid>
			<Grid
				container
				alignItems={'center'}
				columnSpacing={2}
				sx={{ paddingLeft: 2 }}>
				<Grid item xs={3}>
					<Autocomplete
						id='combo-box-demo'
						options={transformDataFOrDroplist(parentCategories)}
						onChange={handleChangeParent}
						isOptionEqualToValue={(option, value) => option._id === value._id}
						renderInput={(params) => (
							<TextField {...params} label={labelIn('select_parent_category')} />
						)}
						size='small'
						sx={{
							'& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input':
								{ minWidth: '30px' },
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<Autocomplete
						id='combo-box-demo'
						options={transformDataFOrDroplist(categories)}
						onChange={handleChange}
						isOptionEqualToValue={(option, value) => option._id === value._id}
						renderInput={(params) => (
							<TextField {...params} label={labelIn('select_subcategory')} />
						)}
						size='small'
						sx={{
							'& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input':
								{ minWidth: '30px' },
						}}
					/>
				</Grid>
				<Grid xs={6} />
				<Grid item xs={2}>
					<TextField
						id='title'
						variant='standard'
						value={newTransaction.title}
						label={labelIn('form_transaction_title')}
						onChange={(e) => handleStateChange(e, setNewTransaction)}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						id='description'
						variant='standard'
						value={newTransaction.description}
						label={labelIn('form_transaction_description')}
						onChange={(e) => handleStateChange(e, setNewTransaction)}
						fullWidth
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						id='amount'
						variant='standard'
						value={newTransaction.amount}
						label={labelIn('form_transaction_amount')}
						onChange={(e) => {
							const value = e.target.value
							if (/^\d*$/.test(value)) {
								// Allow only digits
								handleStateChange(e, setNewTransaction)
							}
						}}
						inputProps={{ inputMode: 'numeric' }}
					/>
				</Grid>
				<Grid item xs={3}>
					<LoadingButton
						loading={buttonLoading}
						variant='contained'
						onClick={addTransaction}
						loadingPosition='start'
						startIcon={<div />}
						size='small'
						sx={{ mt: 4, ml: 2 }}>
						{labelIn('form_button_new_transaction')}
					</LoadingButton>
				</Grid>
			</Grid>
		</Dialog>
	)
}

export default NewTransaction
