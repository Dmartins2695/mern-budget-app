import {
	Autocomplete,
	Button,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIncomes } from '../../feature/data/incomeSlice'
import useDictionary from '../../hooks/useDictionary'
import { transformDataFOrDroplist } from '../../utils/dataTransformation'
import { makeRequest } from '../../utils/resquestTemplate'
import { getTransactions } from './functions'
import NewTransaction from './components/newTransaction'

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
