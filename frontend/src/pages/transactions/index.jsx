import LoadingButton from '@mui/lab/LoadingButton'
import {
	Autocomplete,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	Grid,
	IconButton,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIncomes } from '../../feature/data/incomeSlice'
import { DataGrid } from '@mui/x-data-grid'
import { setCallSnackbar } from '../../feature/snackbar/snackbarSlice'
import useDictionary from '../../hooks/useDictionary'
import { transformDataFOrDroplist } from '../../utils/dataTransformation'
import { makeRequest } from '../../utils/resquestTemplate'
import { handleStateChange } from '../../utils/stateControlFunctions'
import { getParentCategories, getSubCategories } from '../category/functions'
import { getTransactions } from './functions'
import CloseIcon from '@mui/icons-material/Close'

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

const headers = [
	{ field: 'title', headerName: 'Title', flex: 1 },
	{ field: 'description', headerName: 'Description', flex: 1 },
	{ field: 'createdAt', headerName: 'Created', flex: 1 },
	{ field: 'amount', headerName: 'Amount', flex: 1 },
]

const Transactions = () => {
	const dispatch = useDispatch()
	const { labelIn } = useDictionary()
	const { incomes } = useSelector((state) => state.incomes)
	const { transactions } = useSelector((state) => state.transactions)
	const [selectedIncome, setSelectedIncome] = useState(null)
	const [openAdd, setOpenAdd] = useState(false)

	useEffect(() => {
		if (incomes.length === 0) {
			const handleResponse = (response) => {
				dispatch(setIncomes(response.data))
			}

			makeRequest({
				dispatch,
				handleResponse,
				method: 'get',
				url: '/api/income',
				timer: 0,
			})
		}
	}, [])

	useEffect(() => {
		if (selectedIncome) getTransactions(dispatch, selectedIncome)
	}, [selectedIncome])

	const handleChange = (event, newValue) => {
		setSelectedIncome(newValue)
	}

	const handleOpen = () => {
		setOpenAdd((prev) => !prev)
	}

	const addIdToData = (data) => {
		if (data) {
			const newData = []
			data.forEach((item) => {
				newData.push({ ...item, id: item._id })
			})
			return newData
		}
		return []
	}

	return (
		<div>
			<Typography variant='h4'>{labelIn('menu_item_transactions')}</Typography>
			<div style={{ padding: 25 }}>
				<Grid container alignContent={'center'} justifyContent={'space-between'}>
					<Grid item xs>
						<Autocomplete
							disablePortal
							id='combo-box-demo'
							options={transformDataFOrDroplist(incomes)}
							sx={{ m: 2, width: 300 }}
							onChange={handleChange}
							isOptionEqualToValue={(option, value) => option._id === value._id}
							size='small'
							renderInput={(params) => (
								<TextField {...params} label={labelIn('select_incomes')} />
							)}
						/>
					</Grid>
					<Grid
						container
						item
						xs
						alignContent={'center'}
						justifyContent={'flex-end'}>
						{selectedIncome && (
							<Button
								sx={{ ml: 2 }}
								onClick={handleOpen}
								color={'primary'}
								variant={'text'}
								size={'small'}>
								{labelIn('open_add_transaction')}
							</Button>
						)}
					</Grid>
				</Grid>
				<NewTransaction
					selectedIncome={selectedIncome}
					setOpenAdd={setOpenAdd}
					handleOpen={handleOpen}
					openAdd={openAdd}
				/>
				<DataGrid columns={headers} rows={addIdToData(transactions)} autoHeight />
			</div>
		</div>
	)
}

export default Transactions
