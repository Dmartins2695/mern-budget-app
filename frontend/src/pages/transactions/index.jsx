import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { makeRequest } from '../../utils/resquestTemplate'
import { setIncomes } from '../../feature/data/incomeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { transformDataFOrDroplist } from '../../utils/dataTransformation'
import useDictionary from '../../hooks/useDictionary'
import { handleStateChange } from '../../utils/stateControlFunctions'
import { getParentCategories, getSubCategories } from '../category/functions'

const NewTransaction = (props) => {
	const { selectedIncome } = props
	const { labelIn } = useDictionary()
	const dispatch = useDispatch()
	const { categories, parentCategories } = useSelector((state) => state.category)
	const [parentId, setParentId] = useState('')
	const [newTransaction, setNewTransaction] = useState({
		incomeId: selectedIncome,
		categoryId: '',
		amount: 0,
		description: '',
		title: '',
	})

	useEffect(() => {
		console.log(parentCategories)
		if (parentCategories.length === 0) {
			getParentCategories(dispatch)
		}
	}, [])

	useEffect(() => {
		if (categories.length === 0 && parentId !== '') {
			getSubCategories(dispatch, { item: { _id: parentId } })
		}
	}, [parentId])

	const handleChange = (event, newValue) => {
		setNewTransaction((prev) => ({ ...prev, categoryId: newValue._id }))
	}

	return (
		<Grid
			container
			direction={'column'}
			sx={{ background: 'yellow', padding: 2 }}>
			<Typography variant='h5'>{labelIn('new_transaction')}</Typography>
			<Autocomplete
				disablePortal
				id='combo-box-demo'
				options={transformDataFOrDroplist(parentCategories)}
				sx={{ width: 300 }}
				onChange={handleChange}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				renderInput={(params) => (
					<TextField {...params} label={labelIn('parent_category')} />
				)}
				size='small'
			/>
			<Autocomplete
				disablePortal
				id='combo-box-demo'
				options={transformDataFOrDroplist(categories)}
				sx={{ width: 300 }}
				onChange={handleChange}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				renderInput={(params) => (
					<TextField {...params} label={labelIn('subcategory')} />
				)}
				size='small'
			/>
			<TextField
				id='title'
				variant='standard'
				value={newTransaction.title}
				label={labelIn('new_transaction_title')}
				onChange={(e) => handleStateChange(e, setNewTransaction)}
			/>
			<TextField
				id='amount'
				variant='standard'
				value={newTransaction.amount}
				label={labelIn('new_transaction_amount')}
				onChange={(e) => {
					const value = e.target.value
					if (/^\d*$/.test(value)) {
						// Allow only digits
						handleStateChange(e, setNewTransaction)
					}
				}}
				inputProps={{ inputMode: 'numeric' }}
			/>
			<TextField
				id='description'
				variant='standard'
				value={newTransaction.description}
				label={labelIn('new_transaction_description')}
				onChange={(e) => handleStateChange(e, setNewTransaction)}
			/>
		</Grid>
	)
}

const Transactions = () => {
	const dispatch = useDispatch()
	const { incomes } = useSelector((state) => state.incomes)
	const [selectedIncome, setSelectedIncome] = useState(null)
	const { labelIn } = useDictionary()

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

	return (
		<div>
			<Grid container spacing={2} sx={{ background: 'green' }}>
				<Grid item xs={3} sx={{ background: 'red' }}>
					<Autocomplete
						disablePortal
						id='combo-box-demo'
						options={transformDataFOrDroplist(incomes)}
						sx={{ width: 300 }}
						onChange={handleChange}
						isOptionEqualToValue={(option, value) => option._id === value._id}
						renderInput={(params) => (
							<TextField {...params} label={labelIn('incomes')} />
						)}
					/>
					<NewTransaction selectedIncome={selectedIncome} />
				</Grid>
				<Grid></Grid>
			</Grid>
		</div>
	)
}

export default Transactions
