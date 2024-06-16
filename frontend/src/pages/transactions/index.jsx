import LoadingButton from '@mui/lab/LoadingButton'
import {
	Autocomplete,
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIncomes } from '../../feature/data/incomeSlice'
import { setCallSnackbar } from '../../feature/snackbar/snackbarSlice'
import useDictionary from '../../hooks/useDictionary'
import { transformDataFOrDroplist } from '../../utils/dataTransformation'
import { makeRequest } from '../../utils/resquestTemplate'
import { handleStateChange } from '../../utils/stateControlFunctions'
import { getParentCategories, getSubCategories } from '../category/functions'
import { setTransaction } from '../../feature/data/transactionsSlice'

const NewTransaction = (props) => {
	const { selectedIncome, setOpenAdd } = props
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

	const getTransactions = () => {}

	const addTransaction = () => {
		const handleResponse = (response) => {
			getTransactions()
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
			url: '/api/transaction',
			data: newTransaction,
		})
	}

	return (
		<Grid container direction={'column'} sx={{ padding: 2 }}>
			<Typography variant='h5' sx={{ mb: 2 }}>
				{labelIn('new_transaction')}
			</Typography>
			<Autocomplete
				disablePortal
				id='combo-box-demo'
				options={transformDataFOrDroplist(parentCategories)}
				sx={{ mt: 2, ml: 2 }}
				onChange={handleChangeParent}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				renderInput={(params) => (
					<TextField {...params} label={labelIn('select_parent_category')} />
				)}
				size='small'
			/>
			<Autocomplete
				disablePortal
				id='combo-box-demo'
				options={transformDataFOrDroplist(categories)}
				sx={{ mt: 2, ml: 2 }}
				onChange={handleChange}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				renderInput={(params) => (
					<TextField {...params} label={labelIn('select_subcategory')} />
				)}
				size='small'
			/>
			<TextField
				id='title'
				variant='standard'
				value={newTransaction.title}
				label={labelIn('form_transaction_title')}
				onChange={(e) => handleStateChange(e, setNewTransaction)}
				sx={{ mt: 1, ml: 2 }}
			/>
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
				sx={{ mt: 1, ml: 2 }}
			/>
			<TextField
				id='description'
				variant='standard'
				value={newTransaction.description}
				label={labelIn('form_transaction_description')}
				onChange={(e) => handleStateChange(e, setNewTransaction)}
				sx={{ mt: 1, ml: 2 }}
			/>
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
	)
}

const DisplayTransactions = (props) => {
	const { selectedIncome } = props
	const dispatch = useDispatch()
	const { labelIn } = useDictionary()
	const { transactions } = useSelector((state) => state.transactions)

	useEffect(() => {
		if (selectedIncome !== null) {
			const handleResponse = (response) => {
				dispatch(setTransaction(response.data))
			}

			makeRequest({
				dispatch,
				handleResponse,
				method: 'get',
				url: `api/transactions/income/${selectedIncome._id}`,
				timer: 0,
			})
		}
	}, [selectedIncome])

	return (
		<>
			{transactions.map((item, index) => {
				return (
					<Card key={`${index}-${item.title}`}>
						<CardHeader title={item.title} />
						<CardContent>
							<Grid container justifyContent={'space-between'}>
								<Typography>{item.description}</Typography>
								<Typography>{item.amount}</Typography>
							</Grid>
						</CardContent>
					</Card>
				)
			})}
		</>
	)
}

const Transactions = () => {
	const dispatch = useDispatch()
	const { labelIn } = useDictionary()
	const { incomes } = useSelector((state) => state.incomes)
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

	const handleChange = (event, newValue) => {
		setSelectedIncome(newValue)
	}

	const handleOpen = () => {
		setOpenAdd((prev) => !prev)
	}

	return (
		<div>
			<Typography variant='h4'>{labelIn('menu_item_transactions')}</Typography>
			<Grid container spacing={2} sx={{ pl: 2, pt: 2, pb: 2 }}>
				<Grid item xs={3}>
					<Autocomplete
						disablePortal
						id='combo-box-demo'
						options={transformDataFOrDroplist(incomes)}
						sx={{ m: 2 }}
						onChange={handleChange}
						isOptionEqualToValue={(option, value) => option._id === value._id}
						size='small'
						renderInput={(params) => (
							<TextField {...params} label={labelIn('select_incomes')} />
						)}
					/>
					{selectedIncome && (
						<Button
							sx={{ ml: 2 }}
							onClick={handleOpen}
							color={openAdd ? 'error' : 'primary'}
							variant={openAdd ? 'outlined' : 'text'}
							size={'small'}>
							{openAdd
								? labelIn('close_add_transaction')
								: labelIn('open_add_transaction')}
						</Button>
					)}
					{openAdd && (
						<NewTransaction selectedIncome={selectedIncome} setOpenAdd={setOpenAdd} />
					)}
				</Grid>
				<Grid
					item
					xs={4}
					sx={{
						overflow: 'auto',
						msOverflowStyle: 'none',
						scrollbarWidth: 'none',
					}}>
					<DisplayTransactions selectedIncome={selectedIncome} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Transactions
