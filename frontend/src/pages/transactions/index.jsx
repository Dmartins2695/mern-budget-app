import { Autocomplete, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { makeRequest } from '../../utils/resquestTemplate'
import { setIncomes } from '../../feature/data/incomeSlice'
import { useDispatch, useSelector } from 'react-redux'

const Transactions = () => {
	const dispatch = useDispatch()
	const { incomes } = useSelector((state) => state.incomes)
	const [selectedValue, setSelectedValue] = useState(null)

	const handleChange = (event, newValue) => {
		setSelectedValue(newValue)
	}

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

	const transformData = (incomes) => {
		let newData = []
		incomes.forEach((item) => {
			newData.push({ ...item, label: item.title })
		})

		return newData
	}

	return (
		<div>
			<Grid container>
				<Autocomplete
					disablePortal
					id='combo-box-demo'
					options={transformData(incomes)}
					sx={{ width: 300 }}
					onChange={handleChange}
					isOptionEqualToValue={(option, value) => option._id === value._id}
					renderInput={(params) => <TextField {...params} label='Incomes' />}
				/>
			</Grid>
		</div>
	)
}

export default Transactions
